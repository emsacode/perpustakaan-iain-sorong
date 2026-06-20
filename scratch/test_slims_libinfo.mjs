import * as cheerio from 'cheerio';

async function testSlimsLibInfo() {
  console.log("Checking SLiMS libinfo...");
  try {
    const res = await fetch('https://opac.iainsorong.ac.id/index.php?p=libinfo');
    console.log("SLiMS LibInfo Status:", res.status);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Let's print out all divs or elements that look like they have the library stats
    console.log("Printing text elements from libinfo...");
    $('main, .content, .entry-content, div').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 50 && text.length < 500 && (text.toLowerCase().includes('koleksi') || text.toLowerCase().includes('anggota') || text.toLowerCase().includes('collection') || text.toLowerCase().includes('member'))) {
        console.log(`Tag <${el.name}>: "${text.replace(/\s+/g, ' ')}"`);
      }
    });
  } catch (err) {
    console.error("SLiMS LibInfo Error:", err.message);
  }
}

testSlimsLibInfo();
