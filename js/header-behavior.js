
// --- Load header and footer early ---
(function loadContent() {
  const fetchFragment = async (id, file) => {
    try {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
      return true;
    } catch (e) {
      console.error(`Failed to load ${file}:`, e);
      return false;
    }
  };

  // Load header first, then run logic
  fetchFragment('header', 'header.html').then(success => {
    if (success) {
      runHeaderScripts(); // Run only after header is injected
    }
  });

  fetchFragment('footer', 'footer.html');
})();

// --- Sticky Header + Active Link Highlighting ---
function runHeaderScripts() {
  // Debounce
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Scroll handler
  function handleScroll() {
    const header = document.getElementById("main-header");
    const belowContent = document.getElementById("headBelowContent");

    if (!header || !belowContent) return;

    const headerOffset = header.offsetTop;
    const headerHeight = header.offsetHeight;
    const belowContentOffset = belowContent.offsetTop;
    const belowContentHeight = belowContent.offsetHeight;

    if (window.pageYOffset > headerOffset + headerHeight + 5) {
      header.classList.add("sticky-header", "visible");
      header.classList.remove("headerAnimate");
      applyNavbarStyles();
    } else {
      if (window.pageYOffset < belowContentOffset + belowContentHeight + 4) {
        header.classList.remove("sticky-header", "visible");
        header.classList.add("headerAnimate");
      }
    }
  }

  // Responsive navbar styles
  function applyNavbarStyles() {
    const navbar = document.getElementById("navbarSupportedContent");
    if (!navbar) return;

    const isTablet = window.matchMedia("(max-width: 991.98px)").matches;

    if (isTablet) {
      navbar.setAttribute("style", "max-height: calc(100vh - 75px); overflow-y: auto;");
    } else {
      navbar.removeAttribute("style");
    }
  }

  function highlightActiveLink() {
    // Get the current filename only (e.g., 'kurti.html')
    const currentPage = window.location.pathname.split('/').pop().split('?')[0];
  
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      const href = link.getAttribute('href')?.split('?')[0];
      if (!href || href === '#') return;
  
      if (href === currentPage) {
        link.classList.add('active');
  
        const parentDropdown = link.closest('.dropdown');
        const toggleLink = parentDropdown?.querySelector('.nav-link.dropdown-toggle');
        toggleLink?.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Attach debounced listeners
  const debouncedScroll = debounce(handleScroll, 0);
  const debouncedResize = debounce(applyNavbarStyles, 0);

  window.addEventListener("scroll", debouncedScroll);
  window.addEventListener("resize", debouncedResize);

  // Initial run after DOM + header loaded
  handleScroll();
  applyNavbarStyles();
  highlightActiveLink();
}