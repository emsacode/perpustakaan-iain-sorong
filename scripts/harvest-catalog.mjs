import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, '../src/data/catalog.json');

const CLIENT_ID = 'app-brim';
const CLIENT_SECRET = 'demo-secret-brim-001';
const GATEWAY_URL = 'https://api.emsacode.com';

// Helper to generate deterministic view counts based on record ID
function getDeterministicViews(idStr) {
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = (hash << 5) - hash + idStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash % 140) + 15; // Views range: 15 to 155
}

// Classification mapping based on subject keywords
function getClassification(subject) {
  if (!subject) return '000';
  const subLower = subject.toLowerCase();
  if (subLower.includes('islam') || subLower.includes('agama') || subLower.includes('syariah')) {
    return '297'; // Islam classification
  } else if (subLower.includes('pendidikan') || subLower.includes('tarbiyah') || subLower.includes('belajar')) {
    return '370'; // Education classification
  } else if (subLower.includes('hukum') || subLower.includes('jurisprudence')) {
    return '340'; // Law classification
  } else if (subLower.includes('komputer') || subLower.includes('jaringan') || subLower.includes('software') || subLower.includes('teknologi')) {
    return '005'; // Computer Science
  }
  return '000';
}

async function harvestAll() {
  console.log("=== STARTING DYNAMIC HARVESTING FROM HALSEN GATEWAY ===");
  
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

    console.log("OAuth2 Authentication successful.");

    // Preserve special/manual entries
    let existingCatalog = [];
    if (fs.existsSync(catalogPath)) {
      try {
        existingCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      } catch (err) {
        console.error("⚠️ Failed to read existing catalog.json:", err.message);
      }
    }

    // Keep manually added entries (like STLC Cards Edu)
    const preservedEntries = existingCatalog.filter(
      item => item.id === 'cards-edu-stlc-2026'
    );

    const conformedRecords = [...preservedEntries];

    // Helper to fetch paginated data from an endpoint
    async function fetchAllPages(endpoint, typeName) {
      let page = 1;
      const limit = 100;
      let hasMore = true;
      const results = [];

      console.log(`Fetching all pages for ${typeName} from ${endpoint}...`);
      while (hasMore) {
        const url = `${GATEWAY_URL}${endpoint}?limit=${limit}&page=${page}`;
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = json.data || [];
        results.push(...data);
        console.log(`Page ${page}: fetched ${data.length} records`);
        if (data.length < limit || data.length === 0) {
          hasMore = false;
        } else {
          page++;
        }
      }
      return results;
    }

    // 2. Fetch SLiMS OPAC Books
    try {
      const slimsData = await fetchAllPages('/api/v1/library/opac', 'SLiMS OPAC Books');
      console.log(`Successfully fetched ${slimsData.length} records from SLiMS OPAC.`);
      
      slimsData.forEach(item => {
        const id = `opac-${item.biblio_id}`;
        const authorNames = item.author ? item.author.split(',') : ['Penulis Tidak Diketahui'];
        const authors = authorNames.map(a => ({ name: a.trim(), type: 'Perorangan' }));
        
        conformedRecords.push({
          id,
          title: (item.title || 'Tanpa Judul').toUpperCase(),
          subtitle: "Buku Cetak Perpustakaan",
          views: getDeterministicViews(id),
          abstract: item.description ? item.description.trim() : "Tidak ada sinopsis/deskripsi yang tersedia untuk buku ini.",
          authors,
          editors: [],
          translators: [],
          published_date: String(item.publish_year || "Unknown"),
          code: `SLIMS-${item.biblio_id}`,
          isbn_issn: item.isbn || '-',
          classification: getClassification(item.subject || 'Umum'),
          type: 'Buku Cetak',
          subject: item.subject || 'Umum',
          format: 'Cetak',
          publisher: item.publisher || 'IAIN Sorong',
          city: '-',
          year: parseInt(item.publish_year, 10) || new Date().getFullYear(),
          circulation: 'Sirkulasi',
          rent_fee: 0,
          penalty_per_day: 0,
          source: 'Perpustakaan (SLiMS OPAC)',
          download_url: item.opac_url || '#',
          physical_availability: true
        });
      });
    } catch (err) {
      console.error("⚠️ SLiMS OPAC fetch failed:", err.message);
    }

    // 3. Fetch EPrints repository
    try {
      const eprintsData = await fetchAllPages('/api/v1/library/repository', 'EPrints Repository');
      console.log(`Successfully fetched ${eprintsData.length} records from EPrints Repository.`);
      
      eprintsData.forEach(item => {
        const id = `eprints-${item.eprint_id}`;
        if (conformedRecords.some(r => r.id === id)) return; // Avoid duplication

        const authorNames = item.creator ? item.creator.split(',') : ['Penulis Tidak Diketahui'];
        const authors = authorNames.map(a => ({ name: a.trim(), type: 'Perorangan' }));

        conformedRecords.push({
          id,
          title: (item.title || 'Tanpa Judul').toUpperCase(),
          subtitle: "Dalam bentuk skripsi karya ilmiah",
          views: getDeterministicViews(id),
          abstract: item.abstract ? item.abstract.trim() : "Tidak ada abstrak yang tersedia untuk dokumen skripsi ini.",
          authors,
          editors: [],
          translators: [],
          published_date: String(item.year_graduated || "Unknown"),
          code: `EP-${item.eprint_id}`,
          isbn_issn: '-',
          classification: getClassification(item.subject || 'Skripsi'),
          type: 'Karya Ilmiah - Skripsi (S1)',
          subject: item.subject || 'Skripsi',
          format: 'Digital',
          publisher: 'Repositori IAIN Sorong',
          city: 'Sorong',
          year: parseInt(item.year_graduated, 10) || new Date().getFullYear(),
          circulation: 'Non-Sirkulasi',
          rent_fee: 0,
          penalty_per_day: 0,
          source: 'Repository Ilmiah (EPrints)',
          download_url: item.document_url || '#',
          physical_availability: false
        });
      });
    } catch (err) {
      console.error("⚠️ EPrints fetch failed:", err.message);
    }

    // 4. Fetch OJS journals
    try {
      const ojsData = await fetchAllPages('/api/v1/library/journals', 'OJS Journals');
      console.log(`Successfully fetched ${ojsData.length} records from OJS Journals.`);
      
      ojsData.forEach(item => {
        const id = `ojs-${item.article_id}`;
        const authorNames = item.author ? item.author.split(',') : ['Penulis Tidak Diketahui'];
        const authors = authorNames.map(a => ({ name: a.trim(), type: 'Perorangan' }));

        let parsedYear = new Date().getFullYear();
        if (item.published_date) {
          parsedYear = new Date(item.published_date).getFullYear();
        } else if (item.volume_issue) {
          const matchYear = item.volume_issue.match(/\d{4}/);
          if (matchYear) parsedYear = parseInt(matchYear[0], 10);
        }

        conformedRecords.push({
          id,
          title: (item.title || 'Tanpa Judul').toUpperCase(),
          subtitle: `${item.journal_title || 'Jurnal'} (${item.volume_issue || ''})`,
          views: getDeterministicViews(id),
          abstract: item.abstract ? item.abstract.trim() : "Tidak ada abstrak yang tersedia untuk jurnal ini.",
          authors,
          editors: [],
          translators: [],
          published_date: item.published_date ? item.published_date.split('T')[0] : "Unknown",
          code: `OJS-${item.article_id}`,
          isbn_issn: '-',
          classification: 'Jurnal',
          type: 'Jurnal Ilmiah',
          subject: 'Jurnal',
          format: 'Digital',
          publisher: item.journal_title || 'Rumah Jurnal IAIN Sorong',
          city: '-',
          year: parsedYear,
          circulation: 'Non-Sirkulasi',
          rent_fee: 0,
          penalty_per_day: 0,
          source: 'Jurnal Ilmiah (OJS)',
          download_url: item.pdf_url || '#',
          physical_availability: false
        });
      });
    } catch (err) {
      console.error("⚠️ OJS failed:", err.message);
    }

    // Write final output to catalog.json
    fs.writeFileSync(catalogPath, JSON.stringify(conformedRecords, null, 2), 'utf8');
    console.log(`💾 Dynamic Harvesting Completed! Total items: ${conformedRecords.length} written to: ${catalogPath}`);

  } catch (error) {
    console.error("❌ Dynamic harvesting pipeline failed:", error.message);
  }
}

harvestAll();
