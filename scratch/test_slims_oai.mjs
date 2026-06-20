async function testSlimsOai() {
  console.log("Checking SLiMS OAI-PMH...");
  try {
    const res = await fetch('https://opac.iainsorong.ac.id/index.php?p=oai&verb=Identify');
    console.log("SLiMS OAI Status:", res.status);
    const text = await res.text();
    console.log("SLiMS OAI Response Sample:", text.slice(0, 500));
  } catch (err) {
    console.error("SLiMS OAI Error:", err.message);
  }
}

testSlimsOai();
