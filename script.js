// ================================
// 🔥 FINAL COMPLETE SCRIPT (100% FULL)
// ================================

// GLOBAL
let allTeachers = [];
let allStaff = [];
let allStudents = [];
let filteredStudents = [];
let allNotices = [];
let allLabs = [];
let allSemesters = [];

let currentPage = 1;
const perPage = 10;


// ================================
// 🚀 INIT
// ================================
window.addEventListener('load', () => {

    // 🌐 Language
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
        document.body.classList.add('lang-en-active');
    }

    // ⏰ Clock
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 📢 Notice
    loadNotices().then(() => {
        displayNotices(5);
    });

    // 👨‍🏫 Teachers
    loadTeachers();
    setupSearchAndFilter();

    // 👨‍💼 Staff
    loadStaff();

    // 🧪 Labs
    loadLabs();

    // 📚 Semester
    loadSemesters();

    // 👨‍🎓 Students
    loadStudents();

    // 🎬 Page animation
    document.body.classList.add("loaded");

    // 🧹 Preloader remove
    setTimeout(() => {
        const p = document.getElementById('preloader');
        if (p) p.style.display = 'none';
    }, 1000);
});


// ================================
// ⏰ CLOCK FINAL FIX (EN/BN PERFECT)
// ================================
function updateDateTime() {

    const now = new Date();
    const el = document.getElementById('current-datetime');
    const yearEl = document.getElementById('year');

    if (!el || !yearEl) return;

    const isEnglish = document.body.classList.contains('lang-en-active');

    if (isEnglish) {

        const date = now.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const time = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

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

// ================================
// 🌐 LANGUAGE
// ================================
function toggleLanguage() {
    document.body.classList.toggle('lang-en-active');

    localStorage.setItem(
        'lang',
        document.body.classList.contains('lang-en-active') ? 'en' : 'bn'
    );

    updateDateTime();

    displayTeachers(allTeachers);
    displayStaff(allStaff);
    displayNotices();
    displayLabs();
    displaySemesters(allSemesters);
}


// ================================
// 📱 MENU
// ================================
function toggleMenu() {
    document.getElementById('navbar')?.classList.toggle('active');
    document.querySelector('.menu-overlay')?.classList.toggle('active');
}

function closeMenu() {
    if (window.innerWidth <= 768) toggleMenu();
}


// ================================
// 👨‍🏫 TEACHERS
// ================================
async function loadTeachers() {
    const res = await fetch('teachers.json');
    allTeachers = await res.json();
    displayTeachers(allTeachers);
}

function setupSearchAndFilter() {
    const input = document.getElementById('search-input');
    const filter = document.getElementById('filter-select');

    function apply() {
        const keyword = input.value.toLowerCase();
        const selected = filter.value.toLowerCase();

        const filtered = allTeachers.filter(t => {
            return (
                t.name_en.toLowerCase().includes(keyword) ||
                t.name_bn.includes(keyword) ||
                t.position_en.toLowerCase().includes(keyword)
            ) &&
            (selected === '' || t.position_en.toLowerCase().includes(selected));
        });

        displayTeachers(filtered);
    }

    input?.addEventListener('input', apply);
    filter?.addEventListener('change', apply);
}

function displayTeachers(list) {
    const container = document.getElementById('teacher-container');
    if (!container) return;

    container.innerHTML = '';

    list.forEach(t => {
        const mobile = (t.mobile || '').split(',')[0].trim();

        container.innerHTML += `
        <div class="teacher-card">

            <div class="teacher-img">
                <img src="${t.image}">
            </div>

            <h3>
                <span class="en">${t.name_en}</span>
                <span class="bn">${t.name_bn}</span>
            </h3>

            <p class="designation">
                <span class="en">${t.position_en}</span>
                <span class="bn">${t.position_bn}</span>
            </p>

            <div class="teacher-contact">
                <a href="tel:${mobile}" onclick="event.stopPropagation()">📞</a>
                <a href="mailto:${t.email}" onclick="event.stopPropagation()">📧</a>
            </div>

            <p class="teacher-mobile">
                <span class="en">📱 ${mobile}</span>
                <span class="bn">📱 ${mobile}</span>
            </p>

        </div>`;
    });
}


// ================================
// 👨‍💼 STAFF
// ================================
async function loadStaff() {
    const res = await fetch('staff.json');
    allStaff = await res.json();
    displayStaff(allStaff);
}

function displayStaff(list) {
    const container = document.getElementById('staff-container');
    if (!container) return;

    container.innerHTML = '';

    list.forEach(s => {
        const mobile = (s.mobile || '').split(',')[0].trim();

        container.innerHTML += `
        <div class="teacher-card">

            <div class="teacher-img">
                <img src="${s.image}">
            </div>

            <h3>
                <span class="en">${s.name_en}</span>
                <span class="bn">${s.name_bn}</span>
            </h3>

            <p class="designation">
                <span class="en">${s.position_en}</span>
                <span class="bn">${s.position_bn}</span>
            </p>

            <div class="teacher-contact">
                <a href="tel:${mobile}" onclick="event.stopPropagation()">📞</a>
                <a href="mailto:${s.email}" onclick="event.stopPropagation()">📧</a>
            </div>

            <p class="teacher-mobile">
                <span class="en">📱 ${mobile}</span>
                <span class="bn">📱 ${mobile}</span>
            </p>

        </div>`;
    });
}


// ================================
// 📢 NOTICE
// ================================
async function loadNotices() {
    const res = await fetch('notices.json');
    allNotices = await res.json();
}

function displayNotices(limit = null) {
    const container = document.getElementById('notice-list');
    if (!container) return;

    container.innerHTML = '';

    const sorted = [...allNotices].sort((a, b) => new Date(b.date) - new Date(a.date));
    const list = limit ? sorted.slice(0, limit) : sorted;

    list.forEach(n => {
        const dateObj = new Date(n.date);
        const diff = (new Date() - dateObj) / (1000 * 60 * 60 * 24);

        container.innerHTML += `
        <li>
            <div class="notice-date">${dateObj.toLocaleDateString()}</div>

            <div class="notice-text">
                ${document.body.classList.contains('lang-en-active') ? n.text_en : n.text_bn}
                ${diff <= 7 ? '<span class="badge new">NEW</span>' : ''}
            </div>

            ${n.file ? `<a href="${n.file}" target="_blank" class="download-btn">📥</a>` : ''}
        </li>`;
    });
}


// ================================
// 🧪 LAB FINAL FIX
// ================================

async function loadLabs() {
    const container = document.getElementById('lab-container');
    if (!container) return;

    try {
        const res = await fetch('labs.json');
        if (!res.ok) throw new Error();

        allLabs = await res.json();

        displayLabs();

    } catch (err) {
        console.error("Lab load error:", err);
        container.innerHTML = "<p style='color:red'>Failed to load labs</p>";
    }
}


// DISPLAY
function displayLabs() {
    const container = document.getElementById('lab-container');
    if (!container) return;

    container.innerHTML = '';

    const isEnglish = document.body.classList.contains('lang-en-active');

    allLabs.forEach((lab, i) => {

        const images = lab.images.map(img => `
            <img src="${img}">
        `).join('');

        container.innerHTML += `
        <div class="card">

            <h3>
                <span class="en">${lab.name_en}</span>
                <span class="bn">${lab.name_bn}</span>
            </h3>

            <p class="lab-desc">
                <span class="en">${lab.desc_en}</span>
                <span class="bn">${lab.desc_bn}</span>
            </p>

            <div class="lab-slider" data-index="0">

                <button class="prev">&#10094;</button>

                <div class="slider-wrapper">
                    <div class="slider-track">
                        ${images}
                    </div>
                </div>

                <button class="next">&#10095;</button>

            </div>

        </div>`;
    });

    initSliders();
}


// ================================
// 🎬 SLIDER FIX (SMOOTH)
// ================================
function initSliders() {

    document.querySelectorAll(".lab-slider").forEach(slider => {

        const track = slider.querySelector(".slider-track");
        const images = track.querySelectorAll("img");

        let index = 0;

        function updateSlide() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        // NEXT
        slider.querySelector(".next").onclick = () => {
            index = (index + 1) % images.length;
            updateSlide();
        };

        // PREV
        slider.querySelector(".prev").onclick = () => {
            index = (index - 1 + images.length) % images.length;
            updateSlide();
        };

        // AUTO SLIDE
        setInterval(() => {
            index = (index + 1) % images.length;
            updateSlide();
        }, 3000);
    });
}

// ================================
// 📚 SEMESTER (FINAL FIX)
// ================================

async function loadSemesters() {
    try {
        const res = await fetch('semester.json');
        if (!res.ok) throw new Error();

        const data = await res.json();

        displaySemesters(data);

    } catch (err) {
        console.error("Semester load error:", err);
    }
}


// DISPLAY (MATCH YOUR HTML)
function displaySemesters(data) {

    // 🔥 তোমার HTML already sem1, sem2... আছে
    Object.keys(data).forEach(sem => {

        const container = document.getElementById("sem" + sem);
        if (!container) return;

        let html = "<ul>";

        data[sem].forEach(sub => {

            html += `
                <li>
                    ${sub.name}
                    <a href="${sub.pdf}" target="_blank" class="download-btn">📥</a>
                </li>
            `;
        });

        html += "</ul>";

        container.innerHTML = html;
    });
}


// TOGGLE (CLICK OPEN)
function toggleSemester(num) {
    const box = document.getElementById("sem" + num);
    if (!box) return;

    box.classList.toggle("active");
}


// ACCORDION
function toggleAccordion(i) {
    const items = document.querySelectorAll('.accordion-body');
    if (!items[i]) return;

    items[i].classList.toggle('active');
}

// ================================
// 👨‍🎓 STUDENT (FULL)
// ================================


// LOAD
async function loadStudents() {
    try {
        const res = await fetch('students.json');
        allStudents = await res.json();

        displayStudents(allStudents); // ✅ show all first
        setupStudentSearch();
    } catch (err) {
        console.error("Failed to load students", err);
    }
}


// DISPLAY
function displayStudents(list) {
    const container = document.getElementById('student-container');
    const countEl = document.getElementById('student-count');

    if (!container) return;

    filteredStudents = list;

    if (countEl) countEl.textContent = "Total: " + list.length;

    if (list.length === 0) {
        container.innerHTML = `
        <tr>
            <td colspan="10" style="text-align:center;">❌ No students found</td>
        </tr>`;
        return;
    }

    const start = (currentPage - 1) * perPage;
    const pageData = list.slice(start, start + perPage);

    container.innerHTML = pageData.map((s, i) => `
        <tr>
            <td>${start + i + 1}</td>
            <td><img src="${s.image}" onerror="this.src='default.png'" class="table-img"></td>
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>${s.registration}</td>
            <td>${s.semester}</td>
            <td>${s.group}</td>
            <td>${s.shift}</td>
            <td>${s.mobile}</td>
            <td>${s.guardian || '-'}</td> <!-- ✅ NEW -->
        </tr>
    `).join('');

    setupPagination(list.length);
}


// SEARCH + FILTER
function setupStudentSearch() {
    const input = document.getElementById('student-search');
    const sem = document.getElementById('semester-filter');
    const group = document.getElementById('group-filter');
    const shift = document.getElementById('shift-filter');

    let timer;

    function apply() {
        const keyword = input.value.toLowerCase();

        const filtered = allStudents.filter(s =>
            s.name.toLowerCase().includes(keyword) &&
            (!sem.value || s.semester === sem.value) &&
            (!group.value || s.group === group.value) &&
            (!shift.value || s.shift === shift.value)
        );

        currentPage = 1;
        displayStudents(filtered);
    }

    // ✅ debounce search
    input.oninput = () => {
        clearTimeout(timer);
        timer = setTimeout(apply, 300);
    };

    sem.onchange = apply;
    group.onchange = apply;
    shift.onchange = apply;
}


// PAGINATION
function setupPagination(total) {
    const pageContainer = document.getElementById('pagination');
    if (!pageContainer) return;

    const totalPages = Math.ceil(total / perPage);
    pageContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        pageContainer.innerHTML += `
        <button class="${i === currentPage ? 'active-page' : ''}" 
        onclick="goPage(${i})">${i}</button>`;
    }
}

function goPage(p) {
    currentPage = p;
    displayStudents(filteredStudents);
}


// PRINT
function printStudents() {
    const printWindow = window.open('', '', 'width=1000,height=700');

    const now = new Date();
    const printTime = now.toLocaleString();

    let tableRows = filteredStudents.map((s, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>${s.registration}</td>
            <td>${s.semester}</td>
            <td>${s.group}</td>
            <td>${s.shift}</td>
            <td>${s.mobile}</td>
            <td>${s.guardian || '-'}</td>
        </tr>
    `).join('');

    printWindow.document.write(`
    <html>
    <head>
        <title>Student Information</title>

        <style>
            @page {
                size: A4 portrait;
                margin: 30px;
            }

/* PAGE NUMBER */
.page-number:after {
    content: counter(page);
}

            body {
                font-family: Arial, sans-serif;
            }

            /* HEADER TABLE (SAFE FOR PRINT) */
            .header-table {
                width: 100%;
                margin-bottom: 10px;
            }

            .header-table td {
                border: none;
                text-align: center;
            }

            .header-table img {
                width: 100px;
            }

            .header-text h3,
            .header-text h4 {
                margin: 2px;
            }

            /* TABLE */
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
            }

            th, td {
                border: 1px solid #000;
                padding: 6px;
                text-align: center;
            }

            th {
                background: #f2f2f2;
            }

            thead {
                display: table-header-group; /* 🔥 repeat header */
            }

            tfoot {
                display: table-footer-group; /* 🔥 repeat footer */
            }

            tr {
                page-break-inside: avoid;
            }

            /* SIGNATURE */
            .signature {
                margin-top: 60px;
                display: flex;
                justify-content: space-between;
                text-align: center;
            }

            .sign-box {
                width: 22%;
            }

            .sign-line {
                margin-top: 50px;
                border-top: 1px solid #000;
            }

            /* FOOTER */
            .footer {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }

        </style>
    </head>

    <body>

        <!-- HEADER WITH LOGOS (VISIBLE) -->
        <table class="header-table">
            <tr>
                <td style="width: 100px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/500px-Government_Seal_of_Bangladesh.svg.png">
                </td>

                <td class="header-text">
                    <h2>Chapainawabganj Polytechnic Institute</h2>
                    <h3>Department: Food Technology</h3>
                    <h4>Student Information</h4>
                </td>

                <td style="width: 100px;">
                    <img src="https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-cnpi-chapainawabganj/2024/12/d24884ba85bd4a638c87214b8f286ea1.png">
                </td>
            </tr>
        </table>

        <!-- MAIN TABLE -->
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Reg</th>
                    <th>Semester</th>
                    <th>Group</th>
                    <th>Shift</th>
                    <th>Mobile</th>
                    <th>Guardian</th>
                </tr>
            </thead>

            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <!-- SIGNATURE -->
        <div class="signature">
            <div class="sign-box">
                <div class="sign-line"></div>
                Jr. Instructor / Instructor
            </div>
            <div class="sign-box">
                <div class="sign-line"></div>
                Department Head
            </div>
            <div class="sign-box">
                <div class="sign-line"></div>
                Vice Principal
            </div>
            <div class="sign-box">
                <div class="sign-line"></div>
                Principal
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
    <div>Printing Time: ${printTime}</div>

    <div>
        Page <span class="page-number"></span>
    </div>

    <div>Website: dft.pro.bd</div>
</div>

    </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.print();
}
// EXPORT CSV
function exportStudents() {
    let csv = "Name,Roll,Registration,Semester,Shift,Group,Mobile,Guardian\n";

    filteredStudents.forEach(s => {
        csv += `${s.name},${s.roll},${s.registration},${s.semester},${s.shift},${s.group},${s.mobile},${s.guardian || ''}\n`;
    });

    const blob = new Blob([csv]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "students.csv";
    a.click();
}
