// ==========================================
// 🌟 CNPI DEPARTMENT OF FOOD TECHNOLOGY
// 🌟 MAIN SCRIPT (100% INTACT & ORGANIZED)
// ==========================================

// --- 1. GLOBAL VARIABLES ---
let allTeachers = [];
let allStaff = [];
let allStudents = [];
let filteredStudents = [];
let allNotices = [];
let allLabs = [];
let allSemesters = [];

let currentPage = 1;
const perPage = 10;

// --- 2. INITIALIZATION (ON PAGE LOAD) ---
window.addEventListener('load', () => {
    // Language Setup
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
        document.body.classList.add('lang-en-active');
    }

    // Clock Setup
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Data Loading
    loadNotices().then(() => displayNotices(5));
    loadTeachers();
    setupSearchAndFilter();
    loadStaff();
    loadLabs();
    loadSemesters();
    loadStudents();

    // Page Entrance Animations
    document.body.classList.add("loaded");

    // Remove Preloader
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
    }, 1000);
});

// --- 3. UTILITY FUNCTIONS ---

// 🕒 Real-time Clock
function updateDateTime() {
    const now = new Date();
    const el = document.getElementById('current-datetime');
    const yearEl = document.getElementById('year');

    if (!el || !yearEl) return;

    const isEnglish = document.body.classList.contains('lang-en-active');

    if (isEnglish) {
        const date = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        el.textContent = `${date} | ${time}`;
        yearEl.textContent = now.getFullYear();
    } else {
        const date = new Intl.DateTimeFormat('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now);
        const time = new Intl.DateTimeFormat('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
        const yearBn = new Intl.NumberFormat('bn-BD').format(now.getFullYear());
        
        el.textContent = `${date} | ${time}`;
        yearEl.textContent = yearBn;
    }
}

// 🌐 Language Toggle
function toggleLanguage() {
    document.body.classList.toggle('lang-en-active');
    localStorage.setItem('lang', document.body.classList.contains('lang-en-active') ? 'en' : 'bn');
    
    // Update active components
    updateDateTime();
    displayTeachers(allTeachers);
    displayStaff(allStaff);
    displayNotices();
    displayLabs();
    if (allSemesters) displaySemesters(allSemesters);
}

// 📱 Mobile Menu
function toggleMenu() {
    document.getElementById('navbar')?.classList.toggle('active');
    document.querySelector('.menu-overlay')?.classList.toggle('active');
}

function closeMenu() {
    if (window.innerWidth <= 768) toggleMenu();
}

// --- 4. TEACHERS MODULE ---
async function loadTeachers() {
    try {
        const res = await fetch('teachers.json');
        allTeachers = await res.json();
        displayTeachers(allTeachers);
    } catch (e) {
        console.error("Teachers load error:", e);
    }
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
            ) && (selected === '' || t.position_en.toLowerCase().includes(selected));
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
                <img src="${t.image}" onerror="this.src='https://via.placeholder.com/150'">
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
            <p class="teacher-mobile">📱 ${mobile}</p>
        </div>`;
    });
}

// --- 5. STAFF MODULE ---
async function loadStaff() {
    try {
        const res = await fetch('staff.json');
        allStaff = await res.json();
        displayStaff(allStaff);
    } catch (e) {
        console.error("Staff load error:", e);
    }
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
                <img src="${s.image}" onerror="this.src='https://via.placeholder.com/150'">
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
            <p class="teacher-mobile">📱 ${mobile}</p>
        </div>`;
    });
}

// --- 6. NOTICES MODULE ---
async function loadNotices() {
    try {
        const res = await fetch('notices.json');
        allNotices = await res.json();
    } catch (e) {
        console.error("Notice load error:", e);
    }
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
        const isNew = diff <= 7 ? '<span class="badge new">NEW</span>' : '';
        const text = document.body.classList.contains('lang-en-active') ? n.text_en : n.text_bn;
        const fileBtn = n.file ? `<a href="${n.file}" target="_blank" class="download-btn">📥</a>` : '';

        container.innerHTML += `
        <li>
            <div class="notice-date">${dateObj.toLocaleDateString()}</div>
            <div class="notice-text">
                ${text} ${isNew}
            </div>
            ${fileBtn}
        </li>`;
    });
}

// --- 7. LABS MODULE ---
async function loadLabs() {
    const container = document.getElementById('lab-container');
    if (!container) return;
    
    try {
        const res = await fetch('labs.json');
        allLabs = await res.json();
        displayLabs();
    } catch (err) {
        container.innerHTML = "<p style='color:red'>Failed to load labs.</p>";
    }
}

function displayLabs() {
    const container = document.getElementById('lab-container');
    if (!container) return;
    
    container.innerHTML = '';
    allLabs.forEach(lab => {
        const images = lab.images.map(img => `<img src="${img}" onerror="this.src='https://via.placeholder.com/400x200'">`).join('');
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
                <button class="prev" onclick="moveSlide(this, -1)">&#10094;</button>
                <div class="slider-wrapper">
                    <div class="slider-track">${images}</div>
                </div>
                <button class="next" onclick="moveSlide(this, 1)">&#10095;</button>
            </div>
        </div>`;
    });
    
    initSliders();
}

function initSliders() {
    document.querySelectorAll(".lab-slider").forEach(slider => {
        const track = slider.querySelector(".slider-track");
        const imgCount = track.querySelectorAll("img").length;
        if (imgCount > 1) {
            setInterval(() => moveSlide(slider.querySelector(".next"), 1), 5000);
        }
    });
}

function moveSlide(btn, dir) {
    const slider = btn.closest(".lab-slider");
    const track = slider.querySelector(".slider-track");
    const imgs = track.querySelectorAll("img");
    
    let index = parseInt(slider.dataset.index) + dir;
    if (index >= imgs.length) index = 0;
    if (index < 0) index = imgs.length - 1;
    
    slider.dataset.index = index;
    track.style.transform = `translateX(-${index * 100}%)`;
}

// --- 8. SEMESTERS MODULE ---
async function loadSemesters() {
    try {
        const res = await fetch('semester.json');
        allSemesters = await res.json();
        displaySemesters(allSemesters);
    } catch (e) {
        console.error("Semester load error:", e);
    }
}

function displaySemesters(data) {
    Object.keys(data).forEach(sem => {
        // নিশ্চিত করুন আপনার HTML-এ id="sem1", id="sem2" এই ডিভগুলো 'accordion-body' ক্লাসের ভেতরে আছে
        const container = document.getElementById("sem" + sem);
        if (!container) return;
        
        let html = "<ul class='semester-list'>"; // একটি নির্দিষ্ট ক্লাস যোগ করলাম স্টাইল করার জন্য
        data[sem].forEach(sub => {
            html += `
                <li>
                    <span class="sub-name">${sub.name}</span> 
                    <a href="${sub.pdf}" target="_blank" class="download-btn">
                         <i class="fa-solid fa-file-pdf"></i> Download
                    </a>
                </li>`;
        });
        html += "</ul>";
        container.innerHTML = html;
    });
}

// অ্যাকর্ডিয়ন ওপেন-ক্লোজ করার আধুনিক নিয়ম
function toggleAccordion(index) {
    const bodies = document.querySelectorAll('.accordion-body');
    const headers = document.querySelectorAll('.accordion-header');

    // যেটাতে ক্লিক করেছেন সেটা ছাড়া বাকি সব বন্ধ করতে চাইলে নিচের অংশটুকু ব্যবহার করুন (ঐচ্ছিক)
    /*
    bodies.forEach((body, i) => {
        if(i !== index) body.classList.remove('active');
    });
    */

    if (bodies[index]) {
        bodies[index].classList.toggle('active');
        // আইকন ঘোরানোর জন্য হেডার-এ একটি ক্লাস টগল করা
        if(headers[index]) headers[index].classList.toggle('open');
    }
}

// --- 9. STUDENTS MODULE ---
// ==========================================
// 👨‍🎓 STUDENT MANAGEMENT (COMPLETE & FIXED)
// ==========================================

// ১. স্টুডেন্ট ডাটা লোড করা
async function loadStudents() {
    try {
        const res = await fetch('students.json');
        allStudents = await res.json();
        
        // শুরুতে সব স্টুডেন্ট দেখানো হবে
        displayStudents(allStudents); 
        setupStudentSearch();
    } catch (err) {
        console.error("Failed to load students", err);
    }
}

// ২. টেবিল ডিসপ্লে ফাংশন (উইথ পেজিনেশন)
function displayStudents(list) {
    const container = document.getElementById('student-container');
    const countEl = document.getElementById('student-count');

    if (!container) return;
    filteredStudents = list;

    if (countEl) countEl.textContent = "Total Students: " + list.length;

    if (list.length === 0) {
        container.innerHTML = `<tr><td colspan="10" style="text-align:center;">❌ No students found</td></tr>`;
        return;
    }

    // পেজিনেশন লজিক
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
            <td>${s.guardian || '-'}</td>
        </tr>
    `).join('');

    setupPagination(list.length);
}

// ৩. সার্চ এবং ফিল্টার (ডেবাউন্সড)
function setupStudentSearch() {
    const input = document.getElementById('student-search');
    const filters = ['semester-filter', 'group-filter', 'shift-filter'].map(id => document.getElementById(id));

    let timer;

    function apply() {
        const keyword = input.value ? input.value.toLowerCase() : "";
        const [sem, group, shift] = filters.map(f => f ? f.value : "");

        const filtered = allStudents.filter(s =>
            s.name.toLowerCase().includes(keyword) &&
            (!sem || s.semester === sem) &&
            (!group || s.group === group) &&
            (!shift || s.shift === shift)
        );

        currentPage = 1;
        displayStudents(filtered);
    }

    if(input) {
        input.oninput = () => {
            clearTimeout(timer);
            timer = setTimeout(apply, 300);
        };
    }

    filters.forEach(f => {
        if(f) f.onchange = apply;
    });
}

// ৪. পেজিনেশন সেটআপ
function setupPagination(total) {
    const pageContainer = document.getElementById('pagination');
    if (!pageContainer) return;

    const totalPages = Math.ceil(total / perPage);
    pageContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = (i === currentPage) ? 'active-page' : '';
        btn.onclick = () => {
            currentPage = i;
            displayStudents(filteredStudents);
        };
        pageContainer.appendChild(btn);
    }
}

// ৫. প্রফেশনাল প্রিন্ট ফাংশন (A4 SETUP) - FIXED VERSION
function printStudents() {
    if (filteredStudents.length === 0) {
        alert("No data available to print!");
        return;
    }

    const printWindow = window.open('', '', 'width=1000,height=700');
    const printTime = new Date().toLocaleString();

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
        <title>Student List - CNPI Food Technology</title>
        <style>
            @page { size: A4 portrait; margin: 20mm 15mm; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; margin: 0; padding: 0; }
            .header-table { width: 100%; border: none; margin-bottom: 20px; border-bottom: 2px solid #116530; padding-bottom: 10px; }
            .header-table td { border: none; text-align: center; vertical-align: middle; }
            .header-table img { width: 65px; height: auto; }
            .header-text h2 { margin: 0; color: #116530; font-size: 20px; text-transform: uppercase; }
            .header-text p { margin: 2px 0; font-size: 13px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
            th, td { border: 1px solid #000; padding: 6px 4px; text-align: center; }
            th { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; }
            thead { display: table-header-group; } 
            tr { page-break-inside: avoid; }
            .signature-section { margin-top: 60px; display: flex; justify-content: space-between; }
            .sign-box { width: 22%; text-align: center; font-size: 11px; font-weight: bold; }
            .line { border-top: 1px solid #000; margin-bottom: 5px; }
            .print-footer { position: fixed; bottom: 0; width: 100%; font-size: 9px; display: flex; justify-content: space-between; border-top: 1px solid #ddd; padding-top: 5px; }
        </style>
    </head>
    <body>
        <table class="header-table">
            <tr>
                <td style="width: 15%;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/500px-Government_Seal_of_Bangladesh.svg.png"></td>
                <td style="width: 70%;" class="header-text">
                    <h2>Chapainawabganj Polytechnic Institute</h2>
                    <p>Department of Food Technology</p>
                    <p style="background: #eee; display: inline-block; padding: 2px 10px; border-radius: 4px;">Student Information Record</p>
                </td>
                <td style="width: 15%;"><img src="https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-cnpi-chapainawabganj/2024/12/d24884ba85bd4a638c87214b8f286ea1.png"></td>
            </tr>
        </table>
        <table>
            <thead>
                <tr>
                    <th>SL</th><th>Name</th><th>Roll</th><th>Registration</th><th>Sem</th><th>Group</th><th>Shift</th><th>Mobile</th><th>Guardian</th>
                </tr>
            </thead>
            <tbody>${tableRows}</tbody>
        </table>
        <div class="signature-section">
            <div class="sign-box"><div class="line"></div>Class Teacher</div>
            <div class="sign-box"><div class="line"></div>Head of Dept.</div>
            <div class="sign-box"><div class="line"></div>Vice Principal</div>
            <div class="sign-box"><div class="line"></div>Principal</div>
        </div>
        <div class="print-footer">
            <div>Printed on: ${printTime}</div>
            <div>Generated by: dft.pro.bd</div>
        </div>
    </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.onload = function() {
        printWindow.print();
    };
}

// ৬. এক্সপোর্ট সিএসভি (CSV)
function exportStudents() {
    if (filteredStudents.length === 0) {
        alert("No data to export!");
        return;
    }
    let csv = "Name,Roll,Registration,Semester,Shift,Group,Mobile,Guardian\n";
    filteredStudents.forEach(s => {
        csv += `"${s.name}","${s.roll}","${s.registration}","${s.semester}","${s.shift}","${s.group}","${s.mobile}","${s.guardian || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "student_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
