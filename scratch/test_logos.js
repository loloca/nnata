async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status === 200;
  } catch (err) {
    return false;
  }
}

async function run() {
  const logos = {
    unitel: "https://upload.wikimedia.org/wikipedia/pt/3/3b/Unitel_Logo.png",
    sonangol: "https://upload.wikimedia.org/wikipedia/pt/4/47/Logo_Sonangol.png",
    bai: "https://upload.wikimedia.org/wikipedia/pt/3/3d/Logo_Banco_BAI.png",
    bfa: "https://upload.wikimedia.org/wikipedia/commons/c/c5/BFA_logo.png" // let's check
  };

  for (const name in logos) {
    const ok = await checkUrl(logos[name]);
    console.log(`${name} logo: ${ok ? "OK" : "FAILED"} (${logos[name]})`);
  }
}
run();
