async function testFetch() {
  console.log("Testing OJS OAI-PMH...");
  try {
    const res = await fetch('https://e-jurnal.iainsorong.ac.id/index.php/index/oai?verb=Identify');
    console.log("OJS Status:", res.status);
    const text = await res.text();
    console.log("OJS Response Sample (first 300 chars):", text.slice(0, 300));
  } catch (err) {
    console.error("OJS Error:", err.message);
  }

  console.log("\nTesting EPrints OAI-PMH...");
  try {
    const res = await fetch('https://repositori.iainsorong.ac.id/cgi/oai2?verb=Identify');
    console.log("EPrints Status:", res.status);
    const text = await res.text();
    console.log("EPrints Response Sample (first 300 chars):", text.slice(0, 300));
  } catch (err) {
    console.error("EPrints Error:", err.message);
  }

  console.log("\nTesting OPAC SLiMS search...");
  try {
    const res = await fetch('https://opac.iainsorong.ac.id/index.php?search=search&query=');
    console.log("OPAC Status:", res.status);
    const text = await res.text();
    console.log("OPAC Response Sample (first 300 chars):", text.slice(0, 300));
  } catch (err) {
    console.error("OPAC Error:", err.message);
  }
}

testFetch();
