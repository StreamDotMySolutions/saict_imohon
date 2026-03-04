<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notifikasi Permohonan Peralatan – SAICT iMohon</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #333333; }
        .wrapper { width: 100%; background-color: #f4f6f8; padding: 32px 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

        /* Header */
        .header { background-color: #003087; padding: 24px 32px; text-align: center; }
        .header img { height: 60px; margin-bottom: 10px; }
        .header h1 { margin: 0; color: #ffffff; font-size: 18px; letter-spacing: 0.5px; }
        .header p  { margin: 4px 0 0; color: #c8d8f0; font-size: 13px; }

        /* Body */
        .body { padding: 32px; }
        .greeting { font-size: 15px; margin-bottom: 20px; }
        .info-box { background-color: #f0f4ff; border-left: 4px solid #003087; border-radius: 4px; padding: 16px 20px; margin: 20px 0; }
        .info-box table { width: 100%; border-collapse: collapse; }
        .info-box td { padding: 5px 0; font-size: 14px; vertical-align: top; }
        .info-box td:first-child { color: #666; width: 45%; }
        .info-box td:last-child { font-weight: bold; color: #003087; }

        /* CTA Button */
        .cta-wrap { text-align: center; margin: 28px 0; }
        .cta-btn {
            display: inline-block;
            background-color: #003087;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.3px;
        }
        .cta-btn:hover { background-color: #00205f; }

        /* Disclaimer */
        .disclaimer {
            background-color: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 16px 20px;
            margin-top: 28px;
            font-size: 12px;
            color: #666666;
            line-height: 1.6;
        }
        .disclaimer strong { color: #444; }

        /* Footer */
        .footer { background-color: #f0f0f0; padding: 20px 32px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e0e0e0; }
        .footer a { color: #003087; text-decoration: none; }

        @media (max-width: 600px) {
            .body { padding: 20px; }
            .header { padding: 16px 20px; }
        }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="container">

        {{-- Header --}}
        <div class="header">
            <img src="{{ config('app.url') }}/logo.png" alt="SAICT iMohon Logo" />
            <h1>SAICT iMohon</h1>
            <p>Sistem Agihan ICT</p>
        </div>

        {{-- Body --}}
        <div class="body">
            <p class="greeting">Assalamualaikum w.b.t dan Salam Sejahtera,</p>
            <p>Yang Berhormat <strong>{{ $data['name'] }}</strong>,</p>

            @if(($data['role'] ?? '') === 'admin')
            <p>
                Anda menerima notifikasi ini kerana terdapat <strong>permohonan peralatan ICT</strong>
                yang telah diluluskan oleh Pelulus 1 dan kini menunggu tindakan pemprosesan daripada pihak Admin.
            </p>
            @elseif(($data['role'] ?? '') === 'requester_rejected')
            <p>
                Kami ingin memaklumkan bahawa <strong>permohonan peralatan ICT</strong> anda telah
                <span style="color:#c0392b;"><strong>DITOLAK</strong></span> oleh Pelulus 1.
            </p>
            @else
            <p>
                Anda menerima notifikasi ini kerana terdapat <strong>permohonan peralatan ICT baharu</strong>
                yang memerlukan kelulusan anda melalui sistem SAICT iMohon.
            </p>
            @endif

            {{-- Info Box --}}
            <div class="info-box">
                <table>
                    <tr>
                        <td>Pemohon</td>
                        <td>: {{ $data['requester_name'] }}</td>
                    </tr>
                    <tr>
                        <td>E-mel Pemohon</td>
                        <td>: {{ $data['requester_email'] }}</td>
                    </tr>
                    @if(in_array($data['role'] ?? '', ['admin', 'requester_rejected']))
                    <tr>
                        <td>{{ ($data['role'] ?? '') === 'admin' ? 'Diluluskan Oleh' : 'Ditolak Oleh' }}</td>
                        <td>: {{ $data['manager_name'] }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td>No. Rujukan</td>
                        <td>: {{ $data['reference_no'] }}</td>
                    </tr>
                    <tr>
                        <td>Tarikh</td>
                        <td>: {{ $data['date'] }}</td>
                    </tr>
                    @if(($data['role'] ?? '') === 'requester_rejected' && !empty($data['message']))
                    <tr>
                        <td>Sebab Penolakan</td>
                        <td>: {{ $data['message'] }}</td>
                    </tr>
                    @endif
                    @if(($data['role'] ?? '') !== 'requester_rejected')
                    <tr>
                        <td>Tindakan Diperlukan</td>
                        @if(($data['role'] ?? '') === 'admin')
                        <td>: <span style="color:#c0392b;">Proses Permohonan</span></td>
                        @else
                        <td>: <span style="color:#c0392b;">Semak &amp; Luluskan Permohonan</span></td>
                        @endif
                    </tr>
                    @endif
                </table>
            </div>

            <p style="font-size:14px; color:#555;">
                Sila log masuk ke sistem untuk menyemak butiran permohonan dan mengambil tindakan yang sewajarnya.
            </p>

            {{-- CTA --}}
            <div class="cta-wrap">
                @if(($data['role'] ?? '') === 'requester_rejected')
                <a href="{{ $data['system_url'] }}" class="cta-btn" style="background-color:#c0392b;">
                    Lihat Permohonan Saya
                </a>
                @else
                <a href="{{ $data['system_url'] }}" class="cta-btn">Log Masuk ke SAICT iMohon</a>
                @endif
            </div>

            {{-- Disclaimer --}}
            <div class="disclaimer">
                <strong>NOTIS PENAFIAN &amp; KERAHSIAAN</strong><br /><br />
                E-mel ini dan sebarang lampiran adalah SULIT dan hanya untuk kegunaan individu atau entiti yang
                disebutkan sebagai penerima. Sekiranya anda menerima e-mel ini secara tidak sengaja, sila
                maklumkan kepada penghantar dengan segera dan padamkan e-mel ini beserta semua salinannya.
                Penyebaran, pengedaran, atau penggandaan e-mel ini oleh mana-mana pihak yang tidak berkenaan
                adalah dilarang sama sekali.<br /><br />
                E-mel ini dijana secara automatik oleh sistem SAICT iMohon. Sila <strong>jangan balas</strong>
                e-mel ini. Sekiranya anda memerlukan bantuan, sila hubungi pentadbir sistem anda.
            </div>
        </div>

        {{-- Footer --}}
        <div class="footer">
            &copy; {{ date('Y') }} SAICT iMohon &nbsp;|&nbsp; Sistem Agihan ICT<br />
            <small>E-mel ini dijana secara automatik. Sila jangan balas.</small>
        </div>

    </div>
</div>
</body>
</html>
