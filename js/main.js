// Load Header
fetch('components/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Load Footer
fetch('components/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

// Sidebar Toggle (GLOBAL)
window.toggleMenu = function () {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
};

// Theme Toggle (NEW)
window.toggleTheme = function () {
  document.body.classList.toggle('light');
};
