# Audit Struktur Website Astro

Dokumen ini merangkum kondisi front-end Astro yang dipakai sebagai sumber utama website Perpustakaan IAIN Sorong.

## 1. Ringkasan Arsitektur

- Framework: Astro.
- Styling: Tailwind CSS dengan token warna kustom pada `tailwind.config.mjs`.
- Layout utama:
  - `src/layouts/Layout.astro`
  - `src/layouts/LayoutSidebar.astro`
- Komponen utama:
  - `src/components/Header.astro`
  - `src/components/Hero.astro`
  - `src/components/LiveDashboard.astro`
  - `src/components/DigitalEcosystem.astro`
  - `src/components/Profil.astro`
  - `src/components/EResources.astro`
  - `src/components/KoleksiTerbaru.astro`
  - `src/components/Berita.astro`
  - `src/components/Testimonial.astro`
  - `src/components/Footer.astro`
  - utilitas interaktif: `SearchModal.astro`, `ChatbotButton.astro`, `FloatingWidget.astro`
- Konten data:
  - `src/data/live_stats.json`
  - `src/data/dashboard_gold.json`
  - `src/data/catalog.json`
  - `src/data/epaper.json`
  - `src/search-index.json.ts`

## 2. Halaman Yang Sudah Ada

- Beranda: `src/pages/index.astro`
- Profil: `src/pages/profil.astro`
- Statistik: `src/pages/statistik.astro`
- PPID: `src/pages/ppid.astro`
- Berita detail: `src/pages/berita/[slug].astro`
- Katalog koleksi:
  - `src/pages/koleksi/katalog/index.astro`
  - `src/pages/koleksi/katalog/[id].astro`
- Pencarian internal: `src/pages/search-index.json.ts`

## 3. Temuan Utama

### 3.1 Layout global masih terlalu minimal

- `src/styles/global.css` hanya memuat directive Tailwind.
- Shell visual masih ditentukan tersebar di banyak komponen, sehingga konsistensi antar halaman belum kuat.
- Layout belum menyediakan sistem background, spacing, dan komponen generik yang bisa dipakai ulang.

### 3.2 Layout utama belum memusatkan pengalaman navigasi

- `Layout.astro` memuat font, widget aksesibilitas, dan widget floating, tetapi masih belum memberi kerangka visual yang konsisten untuk seluruh halaman.
- Title halaman belum memanfaatkan prop judul secara penuh untuk format `<title>`.

### 3.3 Halaman sidebar sudah fungsional, tetapi belum seragam

- `LayoutSidebar.astro` sudah menyediakan hero halaman dan submenu.
- Struktur visual masih terasa berbeda dengan halaman utama karena masing-masing halaman memakai gaya komponen yang sedikit berbeda.
- Sidebar aktif sudah ada, tetapi treatment spacing, panel, dan content area masih bisa dibuat lebih rapi dan lebih mudah dipindai.

### 3.4 Beranda sudah kaya konten, tetapi narasinya bisa disatukan

- Beranda sudah memiliki:
  - hero pencarian
  - dashboard live
  - akses ekosistem digital
  - profil
  - e-resources
  - koleksi terbaru
  - berita
  - testimonial
- Masalahnya bukan pada jumlah konten, melainkan pada transisi antarblok yang belum punya ritme visual yang sama.

### 3.5 Footer sudah informatif, tetapi masih bisa lebih ringkas

- Informasi operasional, kontak, dan sosial sudah lengkap.
- Styling footer cenderung padat sehingga butuh penyederhanaan visual agar lebih mudah dipindai.

## 4. Prioritas Perbaikan

### Prioritas 1

- Rapikan shell global di `Layout.astro` dan `global.css`.
- Standarkan background, container, dan spacing antar halaman.
- Perbaiki `title` halaman agar sesuai judul page.

### Prioritas 2

- Satukan treatment visual pada `LayoutSidebar.astro`.
- Buat panel sidebar dan panel konten lebih jelas.
- Pertahankan data yang sudah ada tanpa mengubah struktur konten.

### Prioritas 3

- Rapikan homepage agar narasi lebih mengalir.
- Tambahkan penanda section yang lebih konsisten.
- Pastikan halaman-halaman utama terasa satu sistem desain.

## 5. Risiko

- Beberapa file data di `src/data/` sedang berubah dari luar pekerjaan ini.
- Halaman tertentu masih bergantung pada data API fallback.
- Perubahan styling global harus diuji agar tidak mengganggu widget interaktif dan komponen chart.

