// Ensure you include these CDNs in your HTML before calling this script:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>

function calculateGPA(marks) {
    // Standard Polytechnic scale assumption
    if (marks >= 80) return 4.00;
    if (marks >= 75) return 3.75;
    if (marks >= 70) return 3.50;
    if (marks >= 65) return 3.25;
    if (marks >= 60) return 3.00;
    if (marks >= 50) return 2.50;
    if (marks >= 40) return 2.00;
    return 0.00; // Fail
}

export function generateStudentReport(studentData, subjectsArray) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(255, 107, 0); // Primary Orange
    doc.text("Food Technology Department", 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Official Academic Transcript", 14, 30);

    // Student Info
    doc.setFontSize(12);
    doc.text(`Name: ${studentData.name}`, 14, 45);
    doc.text(`Roll No: ${studentData.roll}`, 14, 52);
    doc.text(`Semester: ${studentData.semester}`, 14, 59);

    // Table Setup
    const tableColumn = ["Subject Code", "Subject Name", "Marks Obtained", "Grade Point"];
    const tableRows = [];
    let totalGradePoints = 0;

    subjectsArray.forEach(sub => {
        const gp = calculateGPA(sub.marks);
        totalGradePoints += gp;
        const rowData = [sub.code, sub.name, sub.marks, gp.toFixed(2)];
        tableRows.push(rowData);
    });

    const averageGPA = (totalGradePoints / subjectsArray.length).toFixed(2);

    // Generate Table
    doc.autoTable({
        startY: 70,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [255, 107, 0] } // Orange header
    });

    // Footer with Final CGPA
    const finalY = doc.lastAutoTable.finalY || 70;
    doc.setFontSize(14);
    doc.text(`Final GPA: ${averageGPA}`, 14, finalY + 15);

    // Save PDF
    doc.save(`${studentData.roll}_Result.pdf`);
}
