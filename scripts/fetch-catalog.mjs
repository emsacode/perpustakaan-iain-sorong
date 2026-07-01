import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_ID = 'app-brim';
const CLIENT_SECRET = 'demo-secret-brim-001';
const API_URL = 'https://api.emsacode.com';

async function fetchAll() {
  console.log("Fetching access token...");
  const tokenRes = await fetch(`${API_URL}/oauth/token`, {
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

  if (!tokenRes.ok) {
    throw new Error(`Failed to fetch token: ${tokenRes.status}`);
  }

  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;
  if (!token) throw new Error("No access token found in response");

  const catalog = [];

  // Helper to fetch paginated
  async function fetchPages(endpoint, typeName) {
    let page = 1;
    const limit = 100;
    let hasMore = true;
    const results = [];

    console.log(`Fetching ${typeName} from ${endpoint}...`);
    while (hasMore) {
      try {
        const url = `${API_URL}${endpoint}?limit=${limit}&page=${page}`;
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = json.data || [];
        results.push(...data);
        console.log(`Page ${page}: fetched ${data.length} items`);
        if (data.length < limit || data.length === 0) {
          hasMore = false;
        } else {
          page++;
        }
      } catch (err) {
        console.error(`Error fetching page ${page}:`, err.message);
        hasMore = false;
      }
    }
    return results;
  }

  // 1. Fetch SLiMS Books
  const books = await fetchPages('/api/v1/library/opac', 'SLiMS OPAC Books');
  books.forEach(b => {
    const idNum = parseInt(b.biblio_id) || Math.floor(Math.random() * 10000);
    catalog.push({
      id: `opac-${b.biblio_id}`,
      title: b.title || 'Untitled Book',
      subtitle: 'Buku Cetak Perpustakaan',
      views: 10 + (idNum % 90),
      abstract: b.description || 'Tidak ada deskripsi tersedia.',
      authors: b.author ? b.author.split(',').map(name => ({ name: name.trim(), type: 'Perorangan' })) : [{ name: 'N/A', type: 'Perorangan' }],
      editors: [],
      translators: [],
      published_date: b.publish_year || 'N/A',
      code: `SLiMS-${b.biblio_id}`,
      isbn_issn: b.isbn || '-',
      classification: b.subject ? b.subject.split(',')[0].trim() : '000',
      type: 'Buku Cetak',
      subject: b.subject ? b.subject.split(',')[0].trim() : 'Umum',
      format: 'Cetak',
      publisher: b.publisher || 'N/A',
      city: 'N/A',
      year: parseInt(b.publish_year) || 2020,
      circulation: 'Sirkulasi',
      rent_fee: 0,
      penalty_per_day: 500,
      source: 'Katalog SLiMS (OPAC)',
      download_url: b.opac_url || `https://opac.iainsorong.ac.id/index.php?p=show_detail&id=${b.biblio_id}`,
      physical_availability: true
    });
  });

  // 2. Fetch EPrints Theses
  const theses = await fetchPages('/api/v1/library/repository', 'EPrints Theses');
  theses.forEach(t => {
    const idNum = parseInt(t.eprint_id) || Math.floor(Math.random() * 10000);
    catalog.push({
      id: `epr-${t.eprint_id}`,
      title: t.title || 'Untitled Thesis',
      subtitle: 'Skripsi / Tugas Akhir Digital',
      views: 15 + (idNum % 120),
      abstract: t.abstract || 'Tidak ada abstrak tersedia.',
      authors: t.creator ? t.creator.split(',').map(name => ({ name: name.trim(), type: 'Perorangan' })) : [{ name: 'N/A', type: 'Perorangan' }],
      editors: [],
      translators: [],
      published_date: t.year_graduated ? String(t.year_graduated) : 'N/A',
      code: `EPR-${t.eprint_id}`,
      isbn_issn: '-',
      classification: 'SR-S1',
      type: 'Karya Ilmiah - Skripsi (S1)',
      subject: t.subject || 'Tugas Akhir',
      format: 'Digital',
      publisher: 'IAIN Sorong',
      city: 'Sorong',
      year: parseInt(t.year_graduated) || 2022,
      circulation: 'Non-Sirkulasi',
      rent_fee: 0,
      penalty_per_day: 0,
      source: 'Repository Ilmiah (EPrints)',
      download_url: t.document_url || '#',
      physical_availability: false
    });
  });

  // 3. Fetch OJS Journals
  const journals = await fetchPages('/api/v1/library/journals', 'OJS Journals');
  journals.forEach(j => {
    const idNum = parseInt(j.article_id) || Math.floor(Math.random() * 10000);
    const pubYear = j.published_date ? new Date(j.published_date).getFullYear() : 2018;
    catalog.push({
      id: `ojs-${j.article_id}`,
      title: j.title || 'Untitled Article',
      subtitle: j.journal_title || 'Artikel Jurnal Ilmiah',
      views: 5 + (idNum % 80),
      abstract: j.abstract || 'Tidak ada abstrak tersedia.',
      authors: j.author ? j.author.split(',').map(name => ({ name: name.trim(), type: 'Perorangan' })) : [{ name: 'N/A', type: 'Perorangan' }],
      editors: [],
      translators: [],
      published_date: j.published_date ? new Date(j.published_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
      code: `OJS-${j.article_id}`,
      isbn_issn: '-',
      classification: 'Jurnal',
      type: 'Artikel Jurnal',
      subject: 'Jurnal Ilmiah',
      format: 'Digital',
      publisher: j.journal_title || 'Rumah Jurnal IAIN Sorong',
      city: 'Sorong',
      year: pubYear,
      circulation: 'Non-Sirkulasi',
      rent_fee: 0,
      penalty_per_day: 0,
      source: 'Rumah Jurnal (OJS)',
      download_url: j.pdf_url || '#',
      physical_availability: false
    });
  });

  console.log(`Saving ${catalog.length} items to src/data/catalog.json...`);
  const outPath = path.resolve(__dirname, '../src/data/catalog.json');
  fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log("Catalog updated successfully!");
}

fetchAll().catch(console.error);
