function loadPage(event) {
  event.preventDefault();
  const url = event.target.getAttribute('href');
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content-area').innerHTML = data;
    })
    .catch(error => {
      document.getElementById('content-area').innerHTML = `<p>Error loading page: ${error}</p>`;
    });
}

  

