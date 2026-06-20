import { XMLParser } from 'fast-xml-parser';

async function testFetch() {
  try {
    const response = await fetch('https://opac.iainsorong.ac.id/oai.php?verb=ListRecords&metadataPrefix=oai_dc');
    const xmlData = await response.text();
    
    const parser = new XMLParser({ removeNSPrefix: true, ignoreAttributes: false });
    const parsedData = parser.parse(xmlData);
    
    console.log(Object.keys(parsedData));
    console.log(Object.keys(parsedData['OAI-PMH'] || {}));
    console.log(parsedData['OAI-PMH']?.ListRecords?.record?.length);
  } catch (e) {
    console.error("Fetch failed:", e.message);
  }
}

testFetch();
