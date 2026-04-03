document.addEventListener("DOMContentLoaded", () => {

  // Header
  fetch('components/header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      document.querySelector('.menu-btn').onclick = () => {
        document.querySelector('.sidebar').classList.toggle('active');
      };
    });

  // Footer
  fetch('components/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });

  // Teachers
  fetch('data/teachers.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('teacherList');

      data.forEach(t => {
        container.innerHTML += `
          <div class="teacher-card">
            <img src="${t.image}">
            <h3>${t.name}</h3>
            <p>${t.subject}</p>
          </div>
        `;
      });
    });

  // Students
  let studentsData = [];

  fetch('data/students.json')
    .then(res => res.json())
    .then(data => {
      studentsData = data;
      displayStudents(data);
    });

  function displayStudents(data) {
    const container = document.getElementById('studentList');
    container.innerHTML = '';

    data.forEach(s => {
      container.innerHTML += `
        <div class="student-card">
          <img src="${s.image}">
          <h3>${s.name}</h3>
          <p>${s.semester} Semester</p>
        </div>
      `;
    });
  }

  document.addEventListener("input", (e) => {
    if (e.target.id === "searchInput") {
      const value = e.target.value.toLowerCase();
      const filtered = studentsData.filter(s =>
        s.name.toLowerCase().includes(value)
      );
      displayStudents(filtered);
    }
  });

});

// Theme
function toggleTheme() {
  document.body.classList.toggle('light');
}
