function loadContent(callback) {
  let loaded = 0;

  const checkDone = () => {
    loaded++;
    if (loaded === 2 && typeof callback === 'function') {
      callback();
    }
  };

  const loadFragment = (url, selector) => {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.querySelector(selector).innerHTML = html;
        checkDone();
      })
      .catch(err => {
        console.error('Error loading fragment:', err);
        checkDone(); // Still count even if it failed
      });
  };

  loadFragment('/header.html', '#header');
  loadFragment('/footer.html', '#footer');
}
