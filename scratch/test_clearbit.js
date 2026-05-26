async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    console.log(`GET ${url} status: ${res.status}`);
    return res.status === 200;
  } catch (err) {
    console.log(`GET ${url} error: ${err.message}`);
    return false;
  }
}

async function run() {
  const domains = [
    "unitel.ao",
    "sonangol.co.ao",
    "bancobai.ao",
    "bfa.ao",
    "emis.co.ao",
    "ensa.ao",
    "tpa.ao"
  ];

  for (const dom of domains) {
    const url = `https://logo.clearbit.com/${dom}`;
    const ok = await checkUrl(url);
    console.log(`${dom} logo: ${ok ? "OK" : "FAILED"} (${url})`);
  }
}
run();
