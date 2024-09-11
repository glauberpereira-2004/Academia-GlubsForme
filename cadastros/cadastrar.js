document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (studentForm) {
        studentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const cpf = document.getElementById('cpf').value;
            const dob = document.getElementById('dob').value;
            const contract = document.getElementById('contract').value;

            const student = {
                id: Date.now(),
                name,
                cpf,
                dob,
                contract,
                frozen: false,
                workout: []
            };

            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            studentForm.reset();
            window.location.href = '/alunos/alunos.html';
        });
    }
});
