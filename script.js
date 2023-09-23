document.addEventListener("DOMContentLoaded", function () {
    let dataOfStudent = []; // empty array that store data of students added through link

    // fetching data from URL
    fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
        .then(response => response.json())
        .then(data => {
            dataOfStudent = data; // Store the student data in the array
            displayStudents(dataOfStudent); // Display default of data
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display student data
    function displayStudents(students) {
        const tableBody = document.getElementById("student-data");
        tableBody.innerHTML = ''; // Clear existing data
    
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>
                    <img src="./asset/dp 1.svg" alt="Student Image" width="25">
                    ${student.first_name} ${student.last_name}
                </td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // functions for sorting

    function passingStatus() {
        const passedStudents = dataOfStudent.filter(student => student.passing);
        displayStudents(passedStudents);
    }

    function fullNameSorting(order) {
        dataOfStudent.sort((a, b) => {
            const fullNameA = `${a.first_name} ${a.last_name}`;
            const fullNameB = `${b.first_name} ${b.last_name}`;
            return order === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
        });
        displayStudents(dataOfStudent);
    }

    function sortStudentsByClass() {
        dataOfStudent.sort((a, b) => a.class - b.class);
        displayStudents(dataOfStudent);
    }

    function markBasedSorting() {
        dataOfStudent.sort((a, b) => a.marks - b.marks);
        displayStudents(dataOfStudent);
    }

    function genderBasedSorting() {
        // Separating male and female students
        const males = dataOfStudent.filter(student => student.gender.toLowerCase() === 'male');
        const females = dataOfStudent.filter(student => student.gender.toLowerCase() === 'female');
        
        // keeping both gender together
        const allGenderStudent = [...males, ...females];
        displayStudents(allGenderStudent);
    }

    // Event listeners
    document.getElementById('sort-az').addEventListener('click', () => fullNameSorting('asc'));
    document.getElementById('sort-za').addEventListener('click', () => fullNameSorting('desc'));
    document.getElementById('sort-marks').addEventListener('click', markBasedSorting);
    document.getElementById('sort-passing').addEventListener('click', passingStatus);
    document.getElementById('sort-class').addEventListener('click', sortStudentsByClass);
    document.getElementById('sort-gender').addEventListener('click', genderBasedSorting);

    // Search functionality
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredStudents = dataOfStudent.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
        displayStudents(filteredStudents);
    });
});
