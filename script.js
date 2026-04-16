// --- APPLY SAVED LANGUAGE ON LOAD ---
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang');

    if (savedLang === 'en') {
        document.body.classList.add('lang-en-active');
    }

    loadTeachers();
});

// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 500);
    }
});

// --- CLOCK & DATE ---
function updateDateTime() {
    const now = new Date();
    const isEnglish = document.body.classList.contains('lang-en-active');

    if (isEnglish) {
        const date = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const time = now.toLocaleTimeString('en-US');

        document.getElementById('current-datetime').textContent = `${date} | ${time}`;
        document.getElementById('year').textContent = now.getFullYear();

    } else {
        const date = new Intl.DateTimeFormat('bn-BD', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(now);

        // ✅ FIXED Bengali time (works everywhere)
        const time = now.toLocaleTimeString('bn-BD', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const yearBn = new Intl.NumberFormat('bn-BD').format(now.getFullYear());

        document.getElementById('current-datetime').textContent = `${date} | ${time}`;
        document.getElementById('year').textContent = yearBn;
    }
}

setInterval(updateDateTime, 1000);
updateDateTime();

// --- LANGUAGE TOGGLE ---
function toggleLanguage() {
    document.body.classList.toggle('lang-en-active');

    if (document.body.classList.contains('lang-en-active')) {
        localStorage.setItem('lang', 'en');
    } else {
        localStorage.setItem('lang', 'bn');
    }

    updateDateTime();
}

// --- MOBILE MENU ---
function toggleMenu() {
    const nav = document.getElementById('navbar');
    const overlay = document.querySelector('.menu-overlay');
    const icon = document.querySelector('.menu-toggle i');

    nav.classList.toggle('active');
    overlay.classList.toggle('active');

    if (nav.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
}

// --- CLOSE MENU ---
function closeMenu() {
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

// --- HEADER SHADOW ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// --- LOAD TEACHERS FROM JSON ---
async function loadTeachers() {
    const container = document.getElementById('teacher-container');
    if (!container) return;

    try {
        const res = await fetch('./teachers.json');
        const teachers = await res.json();

        container.innerHTML = '';

        teachers.forEach(t => {
            container.innerHTML += `
                <div class="card" style="text-align:center;">
                    <img src="${t.image}" 
                    style="width:120px;height:120px;border-radius:50%;margin:0 auto 15px;display:block;border:4px solid var(--primary-yellow);">

                    <h3 style="color: var(--primary-green);">
                        <span class="en">${t.name_en}</span>
                        <span class="bn">${t.name_bn}</span>
                    </h3>

                    <p style="font-weight:600;color:#666;margin-bottom:10px;">
                        <span class="en">${t.position_en}</span>
                        <span class="bn">${t.position_bn}</span>
                    </p>

                    <p><i class="fa-solid fa-envelope"></i> ${t.email}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("❌ Teacher load error:", error);
        container.innerHTML = "<p style='color:red;text-align:center;'>Failed to load teachers</p>";
    }
}
