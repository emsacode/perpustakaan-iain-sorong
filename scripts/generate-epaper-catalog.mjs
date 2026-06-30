import fs from 'fs';
import path from 'path';

const epaperDir = path.join(process.cwd(), 'public', 'epaper');
const outputJson = path.join(process.cwd(), 'src', 'data', 'epaper.json');

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function parseDate(dateString) {
  // Rough parsing for sorting (e.g. "17 Juni 2026")
  const parts = dateString.split(' ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const months = {
      'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
      'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };
    const month = months[parts[1]] || '01';
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return dateString;
}

try {
  const files = fs.readdirSync(epaperDir).filter(f => f.endsWith('.pdf'));
  
  const catalog = files.map(file => {
    // Expected format: "Penerbit - 17 Juni 2026.pdf"
    let publisher = 'Unknown';
    let dateStr = '';
    
    // Using regex to capture publisher and date safely
    const match = file.match(/^(.+?)\s*-\s*(.+?)\.pdf$/);
    
    if (match) {
      publisher = match[1].trim();
      dateStr = match[2].trim();
    } else {
      // Fallback
      publisher = file.replace('.pdf', '');
    }
    
    const slug = generateSlug(file.replace('.pdf', ''));
    
    return {
      title: `${publisher} - ${dateStr}`,
      publisher: publisher,
      date: dateStr,
      sortDate: parseDate(dateStr),
      filename: file,
      slug: slug,
      url: `/epaper/${encodeURIComponent(file)}`
    };
  });
  
  // Sort by date descending, then publisher
  catalog.sort((a, b) => {
    if (a.sortDate === b.sortDate) {
      return a.publisher.localeCompare(b.publisher);
    }
    return b.sortDate.localeCompare(a.sortDate);
  });
  
  fs.writeFileSync(outputJson, JSON.stringify(catalog, null, 2));
  console.log(`Successfully generated epaper.json with ${catalog.length} items.`);
} catch (error) {
  console.error('Error generating catalog:', error);
}
