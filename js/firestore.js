import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from './firebase.js'; // Assuming you initialized Firebase in firebase.js

const db = getFirestore(app);

// Function to fetch and render teachers
async function loadTeachers() {
    const teacherGrid = document.getElementById('teacher-grid');
    if (!teacherGrid) return;

    try {
        const querySnapshot = await getDocs(collection(db, "teachers"));
        teacherGrid.innerHTML = ''; // Clear placeholders

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-aos', 'zoom-in');
            
            card.innerHTML = `
                <img src="${data.imageUrl || 'assets/images/default-avatar.png'}" alt="${data.name}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; margin-bottom:1rem;">
                <h3>${data.name}</h3>
                <p class="text-orange">${data.designation}</p>
                <p style="font-size:0.9rem; color:var(--text-muted); margin-top:10px;">${data.specialty}</p>
            `;
            teacherGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching teachers: ", error);
        teacherGrid.innerHTML = '<p>Failed to load faculty data.</p>';
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', loadTeachers);
