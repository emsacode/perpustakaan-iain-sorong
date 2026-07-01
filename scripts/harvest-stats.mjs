import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Fallback values (the original mock/calculated stats)
const FALLBACK_STATS = {
  eksemplar_buku: 39655,
  judul_buku: 36850,
  jurnal_ilmiah: 2751,
  dokumen_skripsi: 21726,
  total_anggota: 21532,
  pengunjung_fisik: 247,
  peminjaman_buku: 18,
  akses_koleksi_digital: 3068,
  last_updated: new Date().toISOString(),
  status: "fallback"
};

const CLIENT_ID = 'app-brim';
const CLIENT_SECRET = 'demo-secret-brim-001';
const GATEWAY_URL = 'https://api.emsacode.com';

async function harvest() {
  console.log("=== STARTING LIVE DATA STATS HARVESTING FROM GATEWAY ===");
  const stats = { ...FALLBACK_STATS, status: "live", last_updated: new Date().toISOString() };

  try {
    // 1. Get Access Token (OAuth2)
    console.log("Requesting OAuth2 Token from Halsen ID...");
    const authResponse = await fetch(`${GATEWAY_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      })
    });

    if (!authResponse.ok) {
      throw new Error(`Auth failed with HTTP status ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const token = authData.access_token;
    if (!token) {
      throw new Error('Access token not found in authentication response');
    }

    // 2. Fetch stats from gateway
    console.log("Fetching live stats from Gateway API...");
    const statsRes = await fetch(`${GATEWAY_URL}/api/v1/library/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!statsRes.ok) {
      throw new Error(`Stats fetch failed with HTTP status ${statsRes.status}`);
    }

    const statsResult = await statsRes.json();
    const liveData = statsResult.data || {};

    if (liveData.judul_buku !== undefined) {
      stats.judul_buku = liveData.judul_buku;
      stats.eksemplar_buku = liveData.eksemplar_buku !== undefined ? liveData.eksemplar_buku : Math.round(liveData.judul_buku * 1.08);
      stats.total_anggota = liveData.total_anggota || 0;
      stats.jurnal_ilmiah = liveData.jurnal_ilmiah || 0;
      stats.dokumen_skripsi = liveData.dokumen_skripsi || 0;
      
      // New fields from updated brief:
      stats.pengunjung_fisik = liveData.pengunjung_fisik !== undefined ? liveData.pengunjung_fisik : 247;
      stats.peminjaman_buku = liveData.peminjaman_buku !== undefined ? liveData.peminjaman_buku : 18;
      stats.akses_koleksi_digital = liveData.akses_koleksi_digital !== undefined ? liveData.akses_koleksi_digital : 3068;
      
      console.log("Successfully fetched stats from API Gateway:", stats);
    } else {
      throw new Error("Stats payload data was empty or invalid");
    }

  } catch (err) {
    console.warn("⚠️ Gateway stats harvesting failed, using fallback:", err.message);
  }

  // Write results to src/data/live_stats.json
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dataDir = path.resolve(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'live_stats.json');
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
  console.log(`=== STATS HARVESTING COMPLETED ===\nSaved stats data to: ${outputPath}`);
}

harvest();
