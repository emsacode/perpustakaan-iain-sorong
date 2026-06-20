import { XMLParser } from 'fast-xml-parser';

async function checkOAI() {
  const parser = new XMLParser({ ignoreAttributes: false });

  console.log("Checking EPrints OAI-PMH completeListSize...");
  try {
    const res = await fetch('https://repositori.iainsorong.ac.id/cgi/oai2?verb=ListIdentifiers&metadataPrefix=oai_dc');
    const text = await res.text();
    const jsonObj = parser.parse(text);
    const resumptionToken = jsonObj['OAI-PMH']?.ListIdentifiers?.resumptionToken;
    console.log("EPrints Resumption Token:", resumptionToken);
    
    // Also let's print list count in first page in case completeListSize is missing
    const headers = jsonObj['OAI-PMH']?.ListIdentifiers?.header || [];
    console.log("EPrints First page headers count:", Array.isArray(headers) ? headers.length : 1);
  } catch (err) {
    console.error("EPrints Error:", err);
  }

  console.log("\nChecking OJS OAI-PMH completeListSize...");
  try {
    const res = await fetch('https://e-jurnal.iainsorong.ac.id/index.php/index/oai?verb=ListIdentifiers&metadataPrefix=oai_dc');
    const text = await res.text();
    const jsonObj = parser.parse(text);
    const resumptionToken = jsonObj['OAI-PMH']?.ListIdentifiers?.resumptionToken;
    console.log("OJS Resumption Token:", resumptionToken);

    const headers = jsonObj['OAI-PMH']?.ListIdentifiers?.header || [];
    console.log("OJS First page headers count:", Array.isArray(headers) ? headers.length : 1);
  } catch (err) {
    console.error("OJS Error:", err);
  }
}

checkOAI();
