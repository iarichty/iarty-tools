# AGENTS.md — Panduan untuk AI Coding Agent

Dokumen ini menjelaskan arsitektur, panduan, dan aturan kerja untuk proyek **iarty-tools** (`tools.iarty.biz.id`).

---

## 1. Ringkasan Proyek

**iarty-tools** adalah aplikasi web utilitas & analitik media sosial (Instagram, TikTok, Threads, X/Twitter) dengan prinsip *privacy-first*.
Semua pemrosesan file export ZIP/JSON berjalan **100% di browser (client-side)** melalui Web Worker dan JSZip — tidak ada data pengguna yang dikirim ke server backend mana pun.

- **Domain Produk:** `tools.iarty.biz.id`
- **Tech Stack:** React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS v4 + Framer Motion 12 + React Router DOM 7 + JSZip 3
- **Routing:** File-based routing via `vite-plugin-pages` (`src/pages/`)
- **Penyimpanan Lokal:** `localStorage` hanya menyimpan *snapshot* perbandingan username + timestamp (deteksi unfollower).

---

## 2. Aturan & Konvensi Penting

1. **100% Client-Side & Privacy First:** Jangan pernah membuat transmisi data pengguna / file export ke remote server. Semua parsing wajib tetap di sisi klien.
2. **Web Worker untuk Parsing Berat:** Operasi ekstraksi dan parsing ZIP/JSON besar harus dijalankan di `src/lib/analysis/analysis.worker.ts` agar thread UI tidak membeku.
3. **SEO & Metadata:** Setiap penambahan rute/halaman baru harus menyertakan `<HelmetContainer title="..." />` dari `src/components/HelmetContainer.tsx`.
4. **Multibahasa (i18n):** Teks antarmuka utama dikelola di `src/lib/i18n.ts` (dukungan `id` dan `en`). Selalu daftarkan key terjemahan di kedua bahasa jika menambah teks baru.
5. **PWA & Offline Asset:** File `/sw.js` dan `/manifest.webmanifest` berada di `public/`. Jangan membuat rewrite SPA yang menimpa file aset statis dan service worker ini.
6. **Strict Types & Clean Code:** Hindari penggunaan `any` tanpa alasan yang jelas. Pastikan `npm run typecheck` dan `npm test` selalu lulus.

---

## 3. Struktur Direktori Utama

```
iarty-tools/
├── public/                 # Static assets, favicon, manifest.webmanifest, sw.js
├── src/
│   ├── components/         # Komponen UI umum (Navbar, Footer, HelmetContainer, dll.)
│   │   └── analysis/       # Komponen visual analitik bersama (Insight, List, Charts, dll.)
│   ├── config/             # Metadata SEO, konstanta
│   ├── context/            # React Context (ThemeContext, i18n)
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Page layouts (MainLayout)
│   ├── lib/                # Pure logic & utilities
│   │   ├── analysis/       # Parser (IG, TikTok, Threads, X), demo generator, snapshots, Web Worker
│   │   ├── export.ts       # Export CSV, ZIP, Summary Image
│   │   └── i18n.ts         # Kamus bahasa ID & EN
│   └── pages/              # File-based routing (vite-plugin-pages)
│       ├── instagram/      # /instagram
│       ├── tiktok/         # /tiktok
│       ├── threads/        # /threads
│       ├── x/              # /x
│       └── [...all].tsx    # 404 Not Found
```

---

## 4. Alur Menambah Platform Baru

1. Daftarkan identitas platform di `src/lib/platforms.ts` (id, nama, ikon, tema warna, rute).
2. Tulis parser data di `src/lib/analysis/parsers.ts` (pastikan *pure function* dan worker-safe).
3. Sambungkan parser ke worker di `src/lib/analysis/analysis.worker.ts`.
4. Buat halaman di `src/pages/<platform>/index.tsx` memanfaatkan konfigurasi `AnalyzePageConfig`.
5. Tambahkan aset ikon di `public/img/` dan key bahasa di `src/lib/i18n.ts`.

---

## 5. Verifikasi & Pengujian

Sebelum commit atau push, selalu jalankan:

```bash
npm run typecheck
npm test
npm run build
```
