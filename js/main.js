// Load Header
fetch('components/header.html')
  .then(res => res.text())
  .then(data => document.getElementById('header').innerHTML = data);

// Load Footer
fetch('components/footer.html')
  .then(res => res.text())
  .then(data => document.getElementById('footer').innerHTML = data);

// Sidebar toggle
function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}
