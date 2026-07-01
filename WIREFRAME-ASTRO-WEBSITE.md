# Wireframe Website Astro

Dokumen ini memetakan struktur tampilan website Perpustakaan IAIN Sorong berdasarkan sumber front-end dari folder Astro.

## 1. Tujuan UI

- Membuat website terasa resmi, informatif, dan mudah dipakai.
- Menonjolkan akses cepat ke katalog, statistik, berita, dan layanan digital.
- Menyediakan jalur navigasi yang jelas untuk pengguna umum, mahasiswa, dosen, dan pustakawan.

## 2. Struktur Global

### 2.1 Header

- Logo institusi di kiri.
- Navigasi utama:
  - Beranda
  - Tentang Kami
  - Layanan Digital
  - Fasilitas
  - Literasi & Publikasi
  - Berita
  - PPID
- Aksi kanan:
  - pemilih bahasa
  - tombol cari
  - menu mobile

### 2.2 Footer

- Alamat dan lokasi fisik.
- Kontak layanan.
- Status jam operasional.
- Media sosial.
- identitas institusi dan NPP.

### 2.3 Elemen lintas halaman

- Search modal.
- Widget chatbot.
- Floating widget.
- Kontainer halaman yang konsisten.

## 3. Homepage

### 3.1 Hero

- Headline utama tentang perpustakaan.
- Subheadline yang menjelaskan fungsi layanan.
- Search box utama dengan pilihan mode pencarian:
  - katalog buku
  - repository
  - jurnal
  - Google Scholar

### 3.2 Live Dashboard

- Ringkasan statistik operasional.
- Kartu angka utama.
- Status layanan.
- Akses cepat ke informasi yang sering dicari.

### 3.3 Digital Ecosystem

- Grid akses cepat ke:
  - katalog
  - repository
  - jurnal
  - e-resources
  - pendaftaran/layanan terkait
- Setiap kartu harus langsung mengarahkan pengguna ke layanan utama.

### 3.4 Profil Singkat

- Ringkasan identitas perpustakaan.
- Nilai, peran, dan fungsi layanan.
- Cuplikan statistik penting.

### 3.5 E-Resources

- Ringkasan sumber daya elektronik.
- Penjelasan singkat dan tautan ke sumber eksternal/internal.

### 3.6 Koleksi Terbaru

- Daftar koleksi baru.
- Kartu buku dengan metadata dasar.
- Tombol akses katalog lengkap.

### 3.7 Berita

- Daftar berita terbaru.
- Highlight artikel unggulan.
- Arahkan ke halaman detail berita.

### 3.8 Testimonial

- Ulasan pengguna layanan.
- Menambah bukti sosial dan kepercayaan.

## 4. Halaman Profil

### 4.1 Hero halaman

- Judul halaman.
- Deskripsi singkat institusi.
- Penekanan pada fungsi akademik.

### 4.2 Isi utama

- Narasi tentang sejarah dan peran perpustakaan.
- Card peran dan fungsi.
- Quote atau motto layanan.
- Statistik ringkas.

### 4.3 Sidebar

- Profil Singkat
- Visi & Misi
- Struktur Organisasi
- Jam Buka Layanan

## 5. Halaman Statistik

### 5.1 Hero statistik

- Judul dashboard.
- Waktu pembaruan data.
- Penjelasan bahwa data bersifat live.

### 5.2 Metrik utama

- Total judul katalog.
- Total eksemplar fisik.
- Rasio koleksi.
- Tingkat ketersediaan.

### 5.3 Visualisasi

- Grafik kunjungan 7 hari terakhir.
- Donut chart demografi pengunjung.
- Distribusi unduhan e-resources.
- Top peminjam.

### 5.4 Sidebar

- Dashboard SLiMS
- Profil Singkat
- Struktur Organisasi

## 6. Halaman PPID

### 6.1 Hero

- Judul layanan informasi publik.
- Penjelasan singkat fungsi PPID.

### 6.2 Kartu layanan

- permohonan informasi
- alur pengajuan
- daftar informasi tersedia
- jadwal layanan
- kontak

### 6.3 Unduhan dokumen

- SOP
- formulir
- kebijakan
- materi pendukung

## 7. Halaman Berita

### 7.1 Listing berita

- kartu berita dengan judul, tanggal, kategori, ringkasan
- gambar utama
- pagination atau navigasi lanjutan

### 7.2 Halaman detail

- hero artikel
- isi artikel
- TOC
- artikel terkait
- tombol share

## 8. Halaman Katalog Koleksi

### 8.1 Listing katalog

- search bar
- filter
- kartu buku
- pagination

### 8.2 Detail katalog

- metadata buku
- status ketersediaan
- CTA pinjam/lihat detail

## 9. Arah Implementasi

### Tahap 1

- Rapikan shell global.
- Seragamkan heading, card, dan spacing.

### Tahap 2

- Konsolidasikan layout sidebar.
- Ubah homepage menjadi alur section yang lebih jelas.

### Tahap 3

- Standarkan semua halaman layanan agar memakai bahasa visual yang sama.
- Pastikan desain mobile tetap nyaman dipakai.

