// Initialize AOS Animations
AOS.init({ once: true, offset: 100 });

// Remove Preloader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check local storage for theme
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Hamburger Menu
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Simple Language Toggle (English/Bangla)
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'en';

const translations = {
    en: { home: "Home", teachers: "Teachers", labs: "Labs", students: "Students", login: "Login", hero_title: "Welcome to the Food Technology Department", explore: "Explore Now" },
    bn: { home: "হোম", teachers: "শিক্ষকগণ", labs: "ল্যাবসমূহ", students: "শিক্ষার্থীবৃন্দ", login: "লগইন", hero_title: "খাদ্য প্রযুক্তি বিভাগে স্বাগতম", explore: "অন্বেষণ করুন" }
};

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    langToggle.innerText = currentLang === 'en' ? 'BN' : 'EN';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
});

// Scroll Spy implementation
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});
