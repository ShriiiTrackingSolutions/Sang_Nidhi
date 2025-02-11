function loadContent(elementId, filePath, callback) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not fetch ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) {
        callback(); // Call the callback function after content is loaded
      }
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

// Function to highlight the active link
function highlightActiveLink() {
  // Get the current page URL path
  let currentPath = window.location.pathname;
  console.log("Current Path: ", currentPath);

  // Extract the current file name
  let currentFile = currentPath.split('/').pop();
  if (currentFile === '') {
    currentFile = 'index.html'; // Default to index.html for the home page
  }
  console.log("Current File: ", currentFile);

  // Select all navigation links
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  console.log("Navigation Links: ", navLinks);

  // Loop through links and add 'active' class to the matching one
  navLinks.forEach(link => {
    console.log("Checking Link: ", link.getAttribute('href'));
    if (link.getAttribute('href') === currentFile) {
      console.log("Matched: ", link.getAttribute('href'));
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Load the header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
  // Adjust paths to point to the "partials" folder
  loadContent('header', 'partials/header.html', highlightActiveLink); // Call highlightActiveLink after header is loaded
  loadContent('footer', 'partials/footer.html');
});
