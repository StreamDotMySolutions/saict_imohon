/**
 * Screenshot capture for the SAICT iMohon user manual.
 *
 * Runs on a workstation with a working Chromium (the server is Ubuntu 20.04 /
 * glibc 2.31, which current Playwright no longer supports).
 *
 * Point it at the DEMO instance, never production. The demo is bound to
 * 127.0.0.1:8080 on the server, so open a tunnel first:
 *
 *     ssh -L 8080:127.0.0.1:8080 root@<server>
 *
 * Then:
 *     npm install
 *     npx playwright install chromium
 *     node capture.mjs
 *
 * Output lands in ./screenshots as NN-role-screen.png. Numbers are FIXED per
 * screen, not sequential, so a skipped screen never renumbers the others and
 * the figure references in the manual stay valid.
 */

import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.IMOHON_URL ?? 'http://localhost:8080';

// Defaults to the manual's own image folder so captures land where the HTML
// expects them. Override with IMOHON_OUT to write somewhere else.
const OUT = path.resolve(process.env.IMOHON_OUT ?? '../../docs/screenshots');

// Desktop-only app: layouts show a blocking alert below 768px.
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2; // retina-ish, so screenshots stay sharp in a PDF

const ACCOUNTS = {
  user:    { email: 'user@local',    password: 'password' },
  manager: { email: 'manager@local', password: 'password' },
  admin:   { email: 'admin@local',   password: 'password' },
};

const captured = [];
const skipped = [];

/** Refuse to run against anything that looks like production. */
function assertNotProduction(url) {
  if (/rtm\.gov\.my/i.test(url)) {
    throw new Error(
      `Refusing to run against "${url}".\n` +
      'That is the production site with real staff records. Use the demo ' +
      'instance over an SSH tunnel instead (see the header of this file).'
    );
  }
}

/** Resolve record IDs from the API so the script survives a reseed. */
async function discoverIds(request) {
  const login = await request.post(`${BASE}/api/login`, {
    data: ACCOUNTS.user,
    headers: { Accept: 'application/json' },
  });
  if (!login.ok()) throw new Error(`Login failed (HTTP ${login.status()}). Is the demo running?`);

  const { token } = await login.json();
  const auth = { Authorization: `Bearer ${token}`, Accept: 'application/json' };

  const res = await request.get(`${BASE}/api/user/mohon-requests`, { headers: auth });
  const rows = (await res.json())?.mohons?.data ?? [];
  const byStep = (s) => rows.find((r) => String(r.step) === String(s));

  const ids = {
    draft:     byStep(0)?.id,
    submitted: byStep(1)?.id,
    rejected:  byStep(2)?.id,
    approved:  byStep(4)?.id,
  };

  const missing = Object.entries(ids).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.warn(`! No demo record for: ${missing.join(', ')} - those screens will be skipped.`);
    console.warn('  Reseed with ManualDemoSeeder on the server to get a full set.\n');
  }
  return ids;
}

/** Capture with a FIXED number so manual figure references never shift. */
async function shoot(page, num, role, name, label) {
  const file = `${String(num).padStart(2, '0')}-${role}-${name}.png`;
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, file), fullPage: true });
  captured.push({ num, file, label });
  console.log(`  ✓ ${file}`);
}

async function login(page, role) {
  const { email, password } = ACCOUNTS[role];
  await page.goto(`${BASE}/sign-in-by-email`, { waitUntil: 'domcontentloaded' });
  await page.fill('input[type=email]', email);
  await page.fill('input[type=password]', password);
  await page.click('button[type=submit]');
  // Wait for the token to land in localStorage rather than guessing a URL.
  await page.waitForFunction(() => !!localStorage.getItem('token'), { timeout: 20000 });
  await page.waitForTimeout(1200);
}

async function logout(page) {
  await page.goto(`${BASE}/sign-out`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.evaluate(() => localStorage.removeItem('token')).catch(() => {});
  await page.waitForTimeout(400);
}

/** Visit a path and capture it; never let one bad screen kill the run. */
async function visit(page, num, role, name, urlPath, label) {
  if (urlPath.includes('undefined')) {
    skipped.push(`${num} ${role}-${name} (no demo record)`);
    console.warn(`  ! skipped ${num} ${name}: no demo record`);
    return;
  }
  try {
    await page.goto(`${BASE}${urlPath}`, { waitUntil: 'domcontentloaded' });
    await shoot(page, num, role, name, label);
  } catch (err) {
    skipped.push(`${num} ${role}-${name}: ${err.message.split('\n')[0]}`);
    console.warn(`  ! skipped ${num} ${name}: ${err.message.split('\n')[0]}`);
  }
}

/**
 * The approval screens filter by Bootstrap nav tabs held in React state, not
 * in the URL, so each tab has to be clicked to be captured.
 */
async function visitTabs(page, role, name, urlPath, tabs) {
  try {
    await page.goto(`${BASE}${urlPath}`, { waitUntil: 'domcontentloaded' });
    for (const [num, tabLabel, caption] of tabs) {
      try {
        const tab = page.locator('.nav-tabs .nav-link', { hasText: tabLabel }).first();
        await tab.click({ timeout: 8000 });
        await shoot(page, num, role, `${name}-${tabLabel.toLowerCase()}`, caption);
      } catch (err) {
        skipped.push(`${num} ${role}-${name}-${tabLabel}`);
        console.warn(`  ! skipped tab "${tabLabel}": ${err.message.split('\n')[0]}`);
      }
    }
  } catch (err) {
    console.warn(`  ! skipped ${name}: ${err.message.split('\n')[0]}`);
  }
}

const main = async () => {
  assertNotProduction(BASE);
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    locale: 'ms-MY',
  });
  const page = await context.newPage();

  console.log(`Capturing from ${BASE}\n`);
  const ids = await discoverIds(context.request);

  // ---- Public / auth screens (01-04) ------------------------------------
  console.log('Auth');
  await visit(page,  1, 'auth', 'sign-in-email',  '/sign-in-by-email', 'Skrin log masuk (e-mel)');
  await visit(page,  2, 'auth', 'sign-in-nric',   '/sign-in-by-nric',  'Skrin log masuk (No. Kad Pengenalan)');
  await visit(page,  3, 'auth', 'sign-up',        '/sign-up',          'Skrin pendaftaran pengguna baharu');
  await visit(page,  4, 'auth', 'password-reset', '/password/email',   'Skrin set semula katalaluan');

  // ---- Pengguna (05-14) -------------------------------------------------
  console.log('\nPengguna');
  await login(page, 'user');
  await visit(page,  5, 'user', 'dashboard',       '/dashboard',                       'Papan pemuka pengguna');
  await visit(page,  6, 'user', 'mohon-list',      '/mohon',                           'Senarai permohonan');
  await visit(page,  7, 'user', 'mohon-items',     `/mohon-items/${ids.draft}`,        'Pengurusan item permohonan (draf)');
  await visit(page,  8, 'user', 'mohon-show-draft',`/mohon/${ids.draft}`,              'Butiran permohonan draf');
  await visit(page,  9, 'user', 'mohon-rejected',  `/mohon/${ids.rejected}`,           'Permohonan ditolak beserta sebab');
  await visit(page, 10, 'user', 'mohon-approved',  `/mohon/${ids.approved}`,           'Permohonan yang diluluskan');
  await visit(page, 11, 'user', 'tracking',        '/user/tracking',                   'Penjejakan status permohonan');
  await visit(page, 12, 'user', 'agihan',          '/user/agihan',                     'Senarai agihan untuk pengguna');
  await visit(page, 13, 'user', 'requested-items', '/user/requested-items',            'Item yang dimohon');
  await visit(page, 14, 'user', 'account',         '/account',                         'Tetapan akaun pengguna');
  await logout(page);

  // ---- Pengurus (15-18) -------------------------------------------------
  console.log('\nPengurus');
  await login(page, 'manager');
  await visit(page, 15, 'manager', 'dashboard', '/dashboard', 'Papan pemuka pengurus');
  await visitTabs(page, 'manager', 'approval', '/mohon-approval/by-manager', [
    [16, 'Menunggu', 'Permohonan menunggu kelulusan pengurus'],
    [17, 'Lulus',    'Permohonan yang telah diluluskan pengurus'],
    [18, 'Gagal',    'Permohonan yang telah ditolak pengurus'],
  ]);
  await logout(page);

  // ---- Admin (19-30) ----------------------------------------------------
  console.log('\nAdmin');
  await login(page, 'admin');
  await visit(page, 19, 'admin', 'dashboard', '/admin/dashboard', 'Papan pemuka admin');
  await visitTabs(page, 'admin', 'approval', '/mohon-approval/by-admin', [
    [20, 'Baharu', 'Permohonan baharu untuk diproses admin'],
    [21, 'Lulus',  'Permohonan yang telah diluluskan admin'],
    [22, 'Gagal',  'Permohonan yang telah ditolak admin'],
  ]);
  await visit(page, 23, 'admin', 'agihan-list',   '/admin/agihan',                                  'Senarai permohonan sedia untuk agihan');
  await visit(page, 24, 'admin', 'agihan-detail', `/admin/agihan/${ids.approved}`,                  'Butiran agihan bagi satu permohonan');
  await visit(page, 25, 'admin', 'dist-request',  `/mohon-distribution-requests/${ids.approved}`,    'Permohonan agihan');
  await visit(page, 26, 'admin', 'tracking',      '/admin/tracking',                                'Penjejakan keseluruhan');
  await visit(page, 27, 'admin', 'inventories',   '/inventories',                                   'Pengurusan inventori');
  await visit(page, 28, 'admin', 'categories',    '/categories',                                    'Pengurusan kategori item');
  await visit(page, 29, 'admin', 'users',         '/users',                                         'Pengurusan pengguna');
  await visit(page, 30, 'admin', 'departments',   '/user-departments',                              'Pengurusan jabatan');
  await logout(page);

  await browser.close();

  console.log(`\nDone. ${captured.length} captured, ${skipped.length} skipped.`);
  console.log(`Output: ${OUT}`);

  if (skipped.length) {
    console.log('\nSkipped:');
    for (const s of skipped) console.log(`  - ${s}`);
  }

  console.log('\nFigure list:');
  for (const c of captured.sort((a, b) => a.num - b.num)) {
    console.log(`  Rajah ${c.num}: ${c.label}  (${c.file})`);
  }
};

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
