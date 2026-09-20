# Reaction — Neon Invisible Edition

Versi lengkap dengan tema neon grayscale / hitam glass-invisible.

## Fungsi yang dipertahankan
- Input WhatsApp Channel URL
- Pilihan hingga 5 emoji
- Manual reaction
- Request ke `/.netlify/functions/react`
- Progress dan hasil request
- Reset session
- Timer session
- Netlify Function + API key tetap di server

## Deploy Netlify
1. Upload seluruh isi ZIP ke repository.
2. Publish directory: `.`
3. Functions directory: `netlify/functions`
4. Tambahkan environment variable `BOTWA_API_KEY`.
5. Deploy ulang.

Tidak ada perubahan pada endpoint atau logika pengiriman di `script.js` dan `netlify/functions/react.js`; perubahan utama ada pada tampilan/CSS.


## Fingerprint UI
Tombol pengiriman menggunakan kartu fingerprint scanner dari HTML/CSS yang diberikan, dengan tema neon grayscale / hitam invisible. Endpoint dan logika request tetap dipertahankan.
