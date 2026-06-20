import * as cheerio from 'cheerio';

async function testOpac() {
  console.log("Fetching OPAC search results...");
  try {
    const res = await fetch('https://opac.iainsorong.ac.id/index.php?search=search&query=');
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Let's print out all divs or elements that look like they have the search result info
    console.log("Searching for result count text...");
    
    // In SLiMS standard templates, the count is often in a div with class "alert alert-info", "info", "search-info", or similar.
    // Let's print any text containing "menampilkan" or "found" or "dari".
    $('*').each((i, el) => {
      const text = $(el).text().trim();
      if (text.toLowerCase().includes('menampilkan') || text.toLowerCase().includes('ditemukan') || text.toLowerCase().includes('found')) {
        // limit size of print
        if (text.length < 200) {
          console.log(`Tag <${el.name}> (class: "${$(el).attr('class')}"): "${text}"`);
        }
      }
    });
  } catch (err) {
    console.error("OPAC Error:", err);
  }
}

testOpac();
