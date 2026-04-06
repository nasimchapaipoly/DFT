// --- PRELOADER LOGIC ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Adds a slight delay to ensure smooth transition
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            // Remove it completely from DOM after fading out
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 500); // Loader shows for at least 0.5 seconds
    }
});

// --- CLOCK & DATE LOGIC (Switches based on language) ---
function updateDateTime() {
    const now = new Date();
    const isEnglishActive = document.body.classList.contains('lang-en-active');

    if (isEnglishActive) {
        // Formats in English
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', dateOptions); 
        const timeStr = now.toLocaleTimeString('en-US');
        
        document.getElementById('current-datetime').textContent = `${dateStr} | ${timeStr}`;
        document.getElementById('year').textContent = now.getFullYear();
    } else {
        // Formats in Bengali (Default)
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = new Intl.DateTimeFormat('bn-BD', dateOptions).format(now);
        
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const timeStr = new Intl.DateTimeFormat('bn-BD', timeOptions).format(now);
        
        // Translating the year to Bengali digits for footer copyright
        const yearBn = new Intl.NumberFormat('bn-BD', { useGrouping: false }).format(now.getFullYear());

        document.getElementById('current-datetime').textContent = `${dateStr} | ${timeStr}`;
        document.getElementById('year').textContent = yearBn;
    }
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// --- LANGUAGE TOGGLE LOGIC ---
function toggleLanguage() {
    // Toggles English ON instead of Bengali (Since Bengali is now default)
    document.body.classList.toggle('lang-en-active');
    updateDateTime(); // Instantly updates the clock language on click
}

// --- MOBILE MENU TOGGLE LOGIC ---
function toggleMenu() {
    const nav = document.getElementById('navbar');
    const overlay = document.querySelector('.menu-overlay');
    const icon = document.querySelector('.menu-toggle i');
    
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if(nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
}

// Close menu when clicking a link on mobile
function closeMenu() {
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

// --- HEADER SCROLL SHADOW LOGIC ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});
