const selected = new Set();
let seconds = 0;

setInterval(() => {
  seconds++;
  const timer = document.querySelector('#timer');
  if (timer) {
    timer.textContent =
      String(Math.floor(seconds / 60)).padStart(2, '0') + ':' +
      String(seconds % 60).padStart(2, '0');
  }
}, 1000);

function setNotice(message, bad = false) {
  const n = document.querySelector('#notice');
  if (!n) return;
  n.textContent = message;
  n.classList.toggle('error', bad);
}

const fingerprintButton = document.querySelector('#execute');
if (fingerprintButton) {
  const press = () => fingerprintButton.classList.add('pressing');
  const release = () => fingerprintButton.classList.remove('pressing');
  fingerprintButton.addEventListener('pointerdown', press);
  fingerprintButton.addEventListener('pointerup', release);
  fingerprintButton.addEventListener('pointercancel', release);
  fingerprintButton.addEventListener('pointerleave', release);
  fingerprintButton.addEventListener('blur', release);
}

document.querySelector('#execute').onclick = async () => {
  const button = document.querySelector('#execute');
  const url = document.querySelector('#channel').value.trim();
  const manual = document.querySelector('#manual').value.trim();

  const chosen = [...new Set(
    [...manual].filter(x => ![' ', '\n', '\r', '\t'].includes(x))
  )].slice(0, 5);

  if (!/^https?:\/\/((www\.)?whatsapp\.com|wa\.me)\/channel\//i.test(url)) {
    setNotice('Masukkan URL WhatsApp Channel yang valid.', true);
    return;
  }

  if (!chosen.length) {
    setNotice('Masukkan minimal satu emoji.', true);
    return;
  }

  button.disabled = true;
  button.classList.add('loading');
  button.setAttribute('aria-busy', 'true');
  setNotice('Menghubungkan ke BotWA API…');

  try {
    const response = await fetch('/.netlify/functions/react', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url, emojis: chosen })
    });

    const data = await response.json();

    if (!response.ok || data.status === false) {
      throw new Error(data.error || 'Permintaan ditolak API.');
    }

    setNotice('Berhasil menerima respons dari BotWA API.');
  } catch (err) {
    setNotice(err.message || 'Permintaan gagal.', true);
  } finally {
    button.disabled = false;
    button.classList.remove('loading');
    button.removeAttribute('aria-busy');
  }
};
