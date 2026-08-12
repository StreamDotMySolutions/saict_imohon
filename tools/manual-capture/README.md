# Menangkap tangkapan skrin untuk Manual Pengguna iMohon

Skrip ini dijalankan pada mesin **Windows** (bukan pelayan). Pelayan menggunakan
Ubuntu 20.04 / glibc 2.31, dan Playwright versi terkini tidak lagi menyokongnya.

## Mengapa instance demo, bukan tapak sebenar

Pangkalan data produksi (`imohon_dev`) mengandungi rekod kakitangan yang sebenar —
nama, e-mel dan nombor kad pengenalan. Skrin admin dan pengurus memaparkan
permohonan orang lain, jadi data tersebut akan muncul dalam tangkapan skrin.

Instance demo menggunakan pangkalan data berasingan (`imohon_manual`) yang diisi
dengan data rekaan sepenuhnya. Skrip ini akan **menolak** untuk berjalan jika
URL mengandungi `rtm.gov.my`.

## Langkah

**1. Buka tunnel SSH** (demo terikat pada `127.0.0.1:8080` di pelayan, tidak
boleh dicapai dari internet):

```bash
ssh -L 8080:127.0.0.1:8080 root@<pelayan>
```

Biarkan tetingkap ini terbuka. Sahkan di Windows dengan membuka
<http://localhost:8080> dalam pelayar — anda sepatutnya melihat skrin log masuk.

**2. Pasang kebergantungan** (sekali sahaja):

```powershell
cd manual
npm install
npx playwright install chromium
```

**3. Jalankan tangkapan skrin:**

```powershell
node capture.mjs
```

Gambar akan disimpan terus ke dalam `docs/screenshots/` sebagai
`NN-peranan-skrin.png`, bernombor mengikut rujukan Rajah dalam manual. Skrip
akan mencetak senarai Rajah pada akhir larian.

Untuk menyimpan di tempat lain:

```powershell
$env:IMOHON_OUT="C:\temp\screenshots"; node capture.mjs
```

Selepas tangkapan skrin siap, buka `docs/manual-pengguna-imohon.html` dalam
pelayar dan cetak ke PDF (Ctrl+P → Save as PDF).

## Akaun demo

| Peranan  | E-mel            | Katalaluan |
|----------|------------------|------------|
| Pengguna | `user@local`     | `password` |
| Pengurus | `manager@local`  | `password` |
| Admin    | `admin@local`    | `password` |

Akaun ini hanya wujud dalam pangkalan data demo.

## Nota

- Paparan ditetapkan pada 1440x900. Aplikasi ini untuk desktop sahaja dan
  memaparkan amaran di bawah 768px.
- `deviceScaleFactor` ialah 2 supaya gambar kekal jelas dalam PDF.
- Jika satu skrin gagal, skrip meneruskan skrin yang lain dan mencatat amaran.
- Untuk menetapkan URL lain: `IMOHON_URL=http://localhost:9090 node capture.mjs`

## Menjana semula data demo

Di pelayan:

```bash
cd /opt/imohon-demo/backend
sudo -u www-data php artisan migrate:fresh --force
sudo -u www-data php artisan db:seed --class=UserSeeder --force
sudo -u www-data php artisan db:seed --class=ManualDemoSeeder --force
```

`ManualDemoSeeder` mencipta permohonan pada setiap peringkat aliran kerja
(draf, menunggu pengurus, ditolak, dalam proses admin, diluluskan) berserta
agihan yang menunggu kelulusan dan agihan yang telah diserahkan.
