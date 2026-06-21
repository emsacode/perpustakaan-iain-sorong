import os
import random

berita_dir = "/Users/iwan/Documents/Aplikasi/Perpustakaan_IAIN_Sorong/astro-web/src/content/berita"
os.makedirs(berita_dir, exist_ok=True)

images = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop"
]

posts = [
    {
        "title": "5 Tips Mencari Jurnal Internasional Gratis untuk Skripsi",
        "desc": "Kesulitan mencari referensi jurnal berkualitas? Berikut adalah 5 sumber jurnal internasional gratis yang wajib diketahui oleh mahasiswa tingkat akhir.",
        "cat": "Tips Literasi",
        "slug": "tips-mencari-jurnal-internasional-gratis",
        "content": "Menulis skripsi membutuhkan referensi yang kuat. Salah satu kendala terbesar adalah menemukan jurnal internasional gratis. \n\n### 1. Google Scholar\nPastikan Anda menggunakan fitur pencarian lanjutan (advanced search).\n\n### 2. Directory of Open Access Journals (DOAJ)\nDOAJ adalah direktori online yang mengindeks jurnal akses terbuka (open access).\n\n### 3. Perpustakaan Nasional (PNRI)\nJadilah anggota PNRI untuk mengakses database jurnal internasional yang dilanggan oleh pemerintah.\n\nJangan lupa untuk selalu memverifikasi kredibilitas jurnal sebelum digunakan."
    },
    {
        "title": "Panduan Menggunakan OPAC Perpustakaan IAIN Sorong",
        "desc": "Mencari buku di perpustakaan kini lebih mudah dengan OPAC. Simak panduan lengkap cara mencari dan menemukan lokasi buku di rak.",
        "cat": "Panduan",
        "slug": "panduan-menggunakan-opac-perpustakaan",
        "content": "Online Public Access Catalog (OPAC) adalah sistem pencarian buku digital.\n\nLangkah-langkah:\n1. Buka situs OPAC IAIN Sorong.\n2. Masukkan kata kunci (judul/pengarang).\n3. Catat Nomor Panggil (Call Number).\n4. Cari di rak sesuai nomor panggil tersebut."
    },
    {
        "title": "Manfaat Membaca Buku Fisik di Era Digital",
        "desc": "Meskipun e-book semakin populer, buku fisik masih memiliki keunggulan yang tidak bisa digantikan. Apa saja manfaatnya?",
        "cat": "Artikel",
        "slug": "manfaat-membaca-buku-fisik",
        "content": "Buku fisik menawarkan sensasi taktil yang membantu memori dan pemahaman yang lebih baik.\n\nMenurut penelitian, membaca dari kertas mengurangi kelelahan mata (digital eye strain) dibandingkan membaca dari layar. Selain itu, buku fisik meminimalkan distraksi dari notifikasi gadget."
    },
    {
        "title": "Pengumuman: Jam Layanan Selama Bulan Ramadhan",
        "desc": "Penyesuaian jam buka layanan Perpustakaan IAIN Sorong selama bulan suci Ramadhan 1447 H.",
        "cat": "Pengumuman",
        "slug": "jam-layanan-ramadhan",
        "content": "Diberitahukan kepada seluruh sivitas akademika, jam layanan perpustakaan disesuaikan menjadi:\n- **Senin - Kamis**: 08.00 - 15.00 WIT\n- **Jumat**: 08.00 - 14.30 WIT\n\nHarap maklum dan selamat menunaikan ibadah puasa."
    },
    {
        "title": "Cara Menghindari Plagiarisme dalam Penulisan Karya Ilmiah",
        "desc": "Plagiarisme adalah pelanggaran akademik yang serius. Pelajari teknik parafrase dan pengutipan yang benar.",
        "cat": "Tips Literasi",
        "slug": "cara-menghindari-plagiarisme",
        "content": "Karya ilmiah menuntut orisinalitas. Berikut tips menghindarinya:\n\n1. **Kutipan Langsung:** Gunakan tanda kutip dan sebutkan sumber dengan jelas.\n2. **Parafrase:** Tulis ulang ide penulis asli dengan gaya bahasa Anda sendiri tanpa mengubah maknanya.\n3. **Gunakan Aplikasi Plagiarism Checker:** Seperti Turnitin atau Mendeley untuk mengecek tingkat kemiripan."
    },
    {
        "title": "Mengenal Mendeley: Aplikasi Manajemen Referensi",
        "desc": "Kelola daftar pustaka secara otomatis dengan Mendeley. Menghemat waktu dan meminimalisir kesalahan format.",
        "cat": "Tutorial",
        "slug": "mengenal-mendeley-manajemen-referensi",
        "content": "Mendeley adalah aplikasi *reference manager* gratis.\n\nFitur utama:\n- Import sitasi dari browser langsung ke library.\n- Generate daftar pustaka otomatis di Microsoft Word.\n- Membaca dan memberi anotasi langsung pada file PDF."
    },
    {
        "title": "Fasilitas Baru: Ruang Home Theater Perpustakaan",
        "desc": "Perpustakaan kini dilengkapi dengan ruang Home Theater untuk menunjang pembelajaran multimedia mahasiswa.",
        "cat": "Kegiatan",
        "slug": "fasilitas-baru-ruang-home-theater",
        "content": "Kabar gembira! Ruang Home Theater di lantai atas kini sudah bisa direservasi.\n\nFasilitas ini dilengkapi dengan proyektor resolusi tinggi, sound system kedap suara, dan kapasitas 30 orang. Cocok untuk bedah film sejarah, nobar dokumenter pendidikan, atau presentasi kelompok."
    },
    {
        "title": "Pentingnya Literasi Informasi Bagi Mahasiswa",
        "desc": "Di era banjir informasi, kemampuan literasi informasi menjadi keterampilan wajib agar tidak terjebak hoaks.",
        "cat": "Artikel",
        "slug": "pentingnya-literasi-informasi",
        "content": "Literasi informasi adalah kemampuan untuk mengenali kapan informasi dibutuhkan, dan kemampuan untuk menemukan, mengevaluasi, serta menggunakan informasi tersebut secara efektif.\n\nMahasiswa yang literat informasi akan mampu menghasilkan riset yang kredibel dan dapat dipertanggungjawabkan."
    },
    {
        "title": "Cara Daftar Keanggotaan Perpustakaan via K-Online",
        "desc": "Mahasiswa baru wajib mendaftar sebagai anggota perpustakaan. Ikuti langkah-langkah pendaftaran online berikut ini.",
        "cat": "Panduan",
        "slug": "cara-daftar-anggota-konline",
        "content": "Pendaftaran keanggotaan kini sepenuhnya digital melalui sistem K-Online.\n\n1. Kunjungi website K-Online IAIN Sorong.\n2. Login dengan akun Siakad.\n3. Lengkapi biodata dan unggah pas foto.\n4. Validasi ke petugas sirkulasi untuk aktivasi."
    },
    {
        "title": "Tips Fokus Membaca Buku Teks Tebal",
        "desc": "Sering mengantuk saat membaca buku referensi kuliah? Coba terapkan teknik Pomodoro dan Active Reading.",
        "cat": "Tips Literasi",
        "slug": "tips-fokus-membaca-buku-tebal",
        "content": "Buku referensi kuliah seringkali tebal dan padat.\n\n- **Gunakan Teknik Pomodoro:** 25 menit membaca, 5 menit istirahat.\n- **Active Reading:** Jangan sekadar membaca, tapi buatlah catatan kecil di margin, atau gunakan highlighter untuk ide pokok."
    },
    {
        "title": "Apa Itu E-Resources dan Bagaimana Cara Mengaksesnya?",
        "desc": "Perpustakaan melanggan berbagai database jurnal elektronik. Maksimalkan fasilitas ini untuk riset Anda.",
        "cat": "Panduan",
        "slug": "apa-itu-e-resources",
        "content": "E-Resources adalah sumber informasi elektronik berupa jurnal, e-book, dan prosiding.\n\nAnda dapat mengaksesnya melalui jaringan Wi-Fi kampus tanpa perlu login, atau menggunakan VPN kampus jika mengakses dari rumah."
    },
    {
        "title": "Kegiatan Kelas Literasi Mahasiswa Baru 2026",
        "desc": "Perpustakaan IAIN Sorong mengadakan Kelas Literasi untuk memperkenalkan layanan dan fasilitas kepada mahasiswa baru.",
        "cat": "Kegiatan",
        "slug": "kelas-literasi-maba-2026",
        "content": "Kelas Literasi (KILAU) telah sukses diselenggarakan.\n\nLebih dari 500 mahasiswa baru berpartisipasi dalam orientasi pengenalan OPAC, e-resources, dan tata tertib peminjaman buku. Diharapkan kegiatan ini meningkatkan minat kunjungan ke perpustakaan."
    },
    {
        "title": "Cara Membuat Daftar Pustaka Format APA Style",
        "desc": "Banyak jurnal dan skripsi mewajibkan format APA. Pahami struktur dasarnya agar tidak salah tulis.",
        "cat": "Tips Literasi",
        "slug": "format-daftar-pustaka-apa-style",
        "content": "American Psychological Association (APA) adalah gaya pengutipan yang umum digunakan di ilmu sosial.\n\n**Format Buku:**\nNama Belakang, Inisial. (Tahun). *Judul buku (cetak miring)*. Kota Penerbit: Nama Penerbit.\n\nContoh: Sugiyono. (2019). *Metode Penelitian Kuantitatif*. Bandung: Alfabeta."
    },
    {
        "title": "Review Buku: Sejarah Peradaban Islam",
        "desc": "Salah satu koleksi terpopuler di IAIN Sorong. Buku yang mengupas tuntas perjalanan panjang peradaban Islam.",
        "cat": "Review",
        "slug": "review-buku-sejarah-peradaban-islam",
        "content": "Buku \"Sejarah Peradaban Islam\" karya Prof. Dr. Badri Yatim ini menjadi rujukan wajib mahasiswa Fakultas Tarbiyah dan Ushuluddin.\n\nBahasanya mudah dipahami, sistematis, dan mencakup periode klasik hingga modern."
    },
    {
        "title": "SOP Peminjaman Buku Secara Mandiri",
        "desc": "Pahami tata cara peminjaman koleksi sirkulasi secara mandiri agar proses pelayanan lebih cepat.",
        "cat": "Pengumuman",
        "slug": "sop-peminjaman-mandiri",
        "content": "Kami mengingatkan kembali SOP peminjaman:\n\n1. Maksimal peminjaman 3 eksemplar.\n2. Waktu peminjaman 7 hari.\n3. Perpanjangan dapat dilakukan 1x sebelum jatuh tempo.\n4. Denda keterlambatan adalah Rp. 500/hari/buku."
    },
    {
        "title": "Membangun Kebiasaan Menulis Makalah yang Baik",
        "desc": "Sering menunda menulis makalah? Mulailah dengan membuat kerangka tulisan (outline).",
        "cat": "Tips Literasi",
        "slug": "kebiasaan-menulis-makalah",
        "content": "Menulis makalah butuh struktur. Langkah terbaik:\n\n1. Tentukan topik spesifik.\n2. Buat Outline (Pendahuluan, Isi, Penutup).\n3. Cari referensi yang relevan.\n4. Tulis draf tanpa memikirkan editing terlebih dahulu (free writing).\n5. Lakukan revisi dan cek sitasi."
    },
    {
        "title": "Layanan Bebas Pustaka untuk Syarat Wisuda",
        "desc": "Surat Bebas Pustaka kini bisa diurus secara online. Cek syarat dan ketentuannya.",
        "cat": "Pengumuman",
        "slug": "layanan-bebas-pustaka-wisuda",
        "content": "Bagi calon wisudawan, pengurusan Surat Keterangan Bebas Pustaka (SKBP) wajib dilakukan.\n\nSyaratnya:\n- Tidak memiliki tanggungan buku yang dipinjam.\n- Tidak memiliki denda yang belum dibayar.\n- Telah menyerahkan *hardcopy* dan *softcopy* skripsi ke perpustakaan."
    },
    {
        "title": "Memanfaatkan Ruang Diskusi di Perpustakaan",
        "desc": "Ruang diskusi di lantai atas perpustakaan didesain untuk kerja kelompok yang nyaman tanpa mengganggu pemustaka lain.",
        "cat": "Fasilitas",
        "slug": "memanfaatkan-ruang-diskusi",
        "content": "Ruang diskusi kami dilengkapi dengan papan tulis (whiteboard) dan stop kontak.\n\nSyarat penggunaan:\n- Berkelompok minimal 3 orang.\n- Melakukan reservasi melalui resepsionis.\n- Dilarang membawa makanan berat ke dalam ruangan."
    },
    {
        "title": "Mengenal Koleksi Tandon (Reserve)",
        "desc": "Mengapa ada buku yang hanya boleh dibaca di tempat dan tidak boleh dipinjam pulang?",
        "cat": "Artikel",
        "slug": "mengenal-koleksi-tandon",
        "content": "Koleksi Tandon adalah buku referensi inti atau buku yang jumlah eksemplarnya terbatas namun sangat sering dicari mahasiswa.\n\nTujuannya agar buku tersebut selalu tersedia di perpustakaan kapan pun mahasiswa membutuhkannya, sehingga asas keadilan akses informasi dapat tercapai."
    },
    {
        "title": "Podcast Episode 5: Ngobrol Santai Seputar Jurnal Scopus",
        "desc": "Simak perbincangan seru bersama Dosen berprestasi IAIN Sorong tentang tips menembus jurnal Scopus Q1.",
        "cat": "Kegiatan",
        "slug": "podcast-episode-5-scopus",
        "content": "Pada episode terbaru Podcast Pustaka, kami mengundang Dr. Ahmad untuk berbagi pengalaman *submit* artikel ke jurnal terindeks Scopus.\n\nBeliau membagikan tips mulai dari pemilihan jurnal yang tepat, membalas komentar *reviewer*, hingga menghindari jurnal predator."
    }
]

for i, post in enumerate(posts):
    date = f"2026-06-{20-i:02d}"
    img = random.choice(images)
    
    mdx_content = f"""---
title: "{post['title']}"
date: "{date}"
description: "{post['desc']}"
image: "{img}"
category: "{post['cat']}"
author: "Admin Pustaka"
readTime: "3 menit baca"
---

{post['content']}
"""
    
    file_path = os.path.join(berita_dir, f"{post['slug']}.mdx")
    with open(file_path, "w") as f:
        f.write(mdx_content)

print(f"Successfully generated {len(posts)} MDX files in {berita_dir}")
