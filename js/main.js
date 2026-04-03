// Loader
window.onload = () => {
  document.getElementById('loader').style.display = 'none';
};

// Load Components
fetch('components/header.html')
  .then(res => res.text())
  .then(data => document.getElementById('header').innerHTML = data);

fetch('components/footer.html')
  .then(res => res.text())
  .then(data => document.getElementById('footer').innerHTML = data);

// Dark Mode
function toggleDark() {
  document.body.classList.toggle('dark');
}

// Sidebar Toggle
function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}

// Scroll Spy
window.addEventListener('scroll', () => {
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('nav a');

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
});

AOS.init();
