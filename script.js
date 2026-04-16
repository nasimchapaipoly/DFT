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

// --- CLOCK ---
function updateDateTime() {
    const now = new Date();
    const isEnglish = document.body.classList.contains('lang-en-active');

    if (isEnglish) {
        document.getElementById('current-datetime').textContent =
            now.toLocaleString('en-US');
        document.getElementById('year').textContent = now.getFullYear();
    } else {
        document.getElementById('current-datetime').textContent =
            new Intl.DateTimeFormat('bn-BD').format(now);
        document.getElementById('year').textContent =
            new Intl.NumberFormat('bn-BD').format(now.getFullYear());
    }
}

setInterval(updateDateTime, 1000);
updateDateTime();

// --- LANGUAGE ---
function toggleLanguage() {
    document.body.classList.toggle('lang-en-active');
}

// --- MENU ---
function toggleMenu() {
    document.getElementById('navbar').classList.toggle('active');
    document.querySelector('.menu-overlay').classList.toggle('active');
}

// --- LOAD TEACHERS (MAIN PART) ---
async function loadTeachers() {
    const container = document.getElementById('teacher-container');
    if (!container) return;

    try {
        const res = await fetch('./teachers.json');
        const data = await res.json();

        container.innerHTML = '';

        data.forEach(t => {
            container.innerHTML += `
                <div class="card" style="text-align:center;">
                    <img src="${t.image}" 
                    style="width:120px;height:120px;border-radius:50%;margin-bottom:15px;border:4px solid #F4D160;">

                    <h3 style="color:#116530;">
                        <span class="en">${t.name_en}</span>
                        <span class="bn">${t.name_bn}</span>
                    </h3>

                    <p>
                        <span class="en">${t.position_en}</span>
                        <span class="bn">${t.position_bn}</span>
                    </p>

                    <p>${t.email}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = "❌ Failed to load";
    }
}

loadTeachers();
