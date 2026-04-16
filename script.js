// ================================
// ✅ FULL FIXED SCRIPT (SAFE)
// ================================

// --- RUN AFTER FULL LOAD ---
window.addEventListener('load', () => {

    const savedLang = localStorage.getItem('lang');

    if (savedLang === 'en') {
        document.body.classList.add('lang-en-active');
    }

    // ⏰ Start clock
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 👨‍🏫 Teacher system
    loadTeachers();
    setupSearchAndFilter();
});

// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 500);
});

// --- CLOCK & DATE ---
function updateDateTime() {
    const now = new Date();
    const el = document.getElementById('current-datetime');
    const yearEl = document.getElementById('year');

    if (!el || !yearEl) return; // 🔥 prevent crash

    const isEnglish = document.body.classList.contains('lang-en-active');

    if (isEnglish) {
        const date = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const time = now.toLocaleTimeString('en-US');

        el.textContent = `${date} | ${time}`;
        yearEl.textContent = now.getFullYear();

    } else {
        const date = new Intl.DateTimeFormat('bn-BD', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(now);

        const time = new Intl.DateTimeFormat('bn-BD', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(now);

        const yearBn = new Intl.NumberFormat('bn-BD').format(now.getFullYear());

        el.textContent = `${date} | ${time}`;
        yearEl.textContent = yearBn;
    }
}

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

    if (!nav || !overlay || !icon) return;

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
    if (!header) return;

    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ================================
// 👨‍🏫 TEACHER SYSTEM
// ================================

let allTeachers = [];

// --- LOAD TEACHERS ---
async function loadTeachers() {
    const container = document.getElementById('teacher-container');
    if (!container) return;

    try {
        const res = await fetch('./teachers.json');
        allTeachers = await res.json();

        displayTeachers(allTeachers);

    } catch (error) {
        console.error("❌ Teacher load error:", error);
        container.innerHTML = "<p style='color:red;text-align:center;'>Failed to load teachers</p>";
    }
}

// --- HIGHLIGHT ---
function highlight(text, keyword) {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
}

// --- DISPLAY ---
function displayTeachers(list, keyword = '') {
    const container = document.getElementById('teacher-container');
    if (!container) return;

    container.innerHTML = '';

    list.forEach(t => {
        container.innerHTML += `
            <div class="card" style="text-align:center;">
                <img src="${t.image}" 
                style="width:120px;height:120px;border-radius:50%;margin:0 auto 15px;display:block;border:4px solid var(--primary-yellow);">

                <h3 style="color: var(--primary-green);">
                    <span class="en">${highlight(t.name_en, keyword)}</span>
                    <span class="bn">${highlight(t.name_bn, keyword)}</span>
                </h3>

                <p style="font-weight:600;color:#666;margin-bottom:10px;">
                    <span class="en">${highlight(t.position_en, keyword)}</span>
                    <span class="bn">${highlight(t.position_bn, keyword)}</span>
                </p>

                <p><i class="fa-solid fa-envelope"></i> ${t.email}</p>
            </div>
        `;
    });
}

// --- SEARCH + FILTER ---
function setupSearchAndFilter() {
    const input = document.getElementById('search-input');
    const filter = document.getElementById('filter-select');

    if (!input || !filter) return;

    function applyFilter() {
        const keyword = input.value.toLowerCase();
        const selected = filter.value.toLowerCase();

        const filtered = allTeachers.filter(t => {
            const matchSearch =
                t.name_en.toLowerCase().includes(keyword) ||
                t.name_bn.includes(keyword) ||
                t.position_en.toLowerCase().includes(keyword) ||
                t.position_bn.includes(keyword);

            const matchFilter =
                selected === '' ||
                t.position_en.toLowerCase().includes(selected);

            return matchSearch && matchFilter;
        });

        displayTeachers(filtered, keyword);
    }

    input.addEventListener('input', applyFilter);
    filter.addEventListener('change', applyFilter);
}
