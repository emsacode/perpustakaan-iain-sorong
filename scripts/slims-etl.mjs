import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function extractSlimsData() {
  console.log("=== STARTING SLIMS ETL PIPELINE ===");
  
  // Nanti di sini akan diisi dengan koneksi mysql2 ke database SLiMS.
  // const mysql = require('mysql2/promise');
  // const connection = await mysql.createConnection({host: process.env.DB_HOST, ...});

  // Sementara menggunakan DUMMY DATA sesuai spesifikasi dari user
  const dashboardData = {
    last_updated: new Date().toISOString(),
    koleksi: {
      total_judul: 26286,
      katalog_tersedia_persen: 84, // 84% Semua jenis koleksi tercatat
      total_eksemplar: 82511,
      eksemplar_tersedia_persen: 92, // 92% Salinan fisik tersedia
      rasio_buku: 3.14, // 1 : 3.14
      judul_tersedia: 24748,
      ketersediaan_katalog_persen: 94.2
    },
    kunjungan: {
      hari_ini: 247,
      target_harian_persen: 82, // 82%
      kunjungan_bulan_ini: 5820,
      download_eresources_bulan: 9204,
      download_eresources_minggu: 2450,
      download_target_persen: 68
    },
    top_peminjam: [
      { rank: 1, nama: "Ahmad Fauzi", jumlah: 47 },
      { rank: 2, nama: "Siti Rahma", jumlah: 42 },
      { rank: 3, nama: "Budi Santoso", jumlah: 38 }
    ],
    demografi: [
      { tipe: "Mahasiswa", jumlah: 182, persen: 73.7 },
      { tipe: "Dosen", jumlah: 38, persen: 15.4 },
      { tipe: "Tenaga Pendidikan", jumlah: 19, persen: 7.7 },
      { tipe: "Tamu", jumlah: 8, persen: 3.2 }
    ],
    grafik_kunjungan_7_hari: {
      labels: ['5 Des', '6 Des', '7 Des', '8 Des', '9 Des', '10 Des', '11 Des'],
      data: [180, 210, 195, 230, 260, 245, 247]
    }
  };

  // Write results to src/data/dashboard_gold.json
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dataDir = path.resolve(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'dashboard_gold.json');
  fs.writeFileSync(outputPath, JSON.stringify(dashboardData, null, 2));
  console.log(`=== SLIMS ETL PIPELINE COMPLETED ===\nSaved gold data to: ${outputPath}`);
}

extractSlimsData();
