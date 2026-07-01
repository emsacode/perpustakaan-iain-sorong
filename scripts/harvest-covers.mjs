import fs from 'fs';
import fetch from 'node-fetch';

async function run() {
  console.log('=== STARTING COVER HARVESTING FOR SLIMS OPAC ===');
  
  const catalogPath = './src/data/catalog.json';
  if (!fs.existsSync(catalogPath)) {
    console.error('catalog.json not found!');
    return;
  }
  
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const opacItems = catalog.filter(item => item.id.startsWith('opac-'));
  
  console.log(`Total SLiMS items to process: ${opacItems.length}`);
  
  const covers = {};
  const CONCURRENCY = 30;
  
  async function fetchCover(item) {
    const biblioId = item.id.replace('opac-', '');
    try {
      const res = await fetch(`https://opac.iainsorong.ac.id/index.php?p=show_detail&id=${biblioId}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      if (res.ok) {
        const html = await res.text();
        const match = html.match(/createthumb\.php\?filename=images\/docs\/[^&"']+/);
        if (match) {
          covers[item.id] = `https://opac.iainsorong.ac.id/lib/minigalnano/${match[0]}&width=200`;
        }
      }
    } catch (err) {
      // ignore errors to let the loop continue
    }
  }
  
  for (let i = 0; i < opacItems.length; i += CONCURRENCY) {
    const batch = opacItems.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(item => fetchCover(item)));
    console.log(`Processed ${Math.min(i + CONCURRENCY, opacItems.length)} / ${opacItems.length}...`);
    // brief pause between batches to be nice to the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  fs.writeFileSync('./src/data/covers.json', JSON.stringify(covers, null, 2));
  console.log(`💾 Cover harvesting completed! Saved ${Object.keys(covers).length} covers to src/data/covers.json`);
}

run();
