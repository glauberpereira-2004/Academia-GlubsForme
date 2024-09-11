document.addEventListener('DOMContentLoaded', function () {
    const studentList = document.getElementById('studentList');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (studentList) {
        renderStudentList();
    }

    function renderStudentList() {
        studentList.innerHTML = '';

        students.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${student.name}</strong> - CPF: ${student.cpf} <br>
                Data de Nascimento: ${student.dob} <br>
                Contrato: ${student.contract} meses <br>
                Status: ${student.frozen ? 'Contrato Congelado' : 'Ativo'} <br>
            `;

            // Botão Editar
            const editButton = document.createElement('button');
            editButton.innerText = 'Editar';
            editButton.onclick = function () {
                editStudent(student.id);
            };

            // Botão Excluir
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.onclick = function () {
                deleteStudent(student.id);
            };

            // Botão Gerenciar Treinos
            const manageWorkoutButton = document.createElement('button');
            manageWorkoutButton.innerText = 'Gerenciar Treinos';
            manageWorkoutButton.onclick = function () {
                manageWorkout(student.id);
            };

            // Botão Congelar/Descongelar Contrato
            const toggleFrozenButton = document.createElement('button');
            toggleFrozenButton.innerText = student.frozen ? 'Descongelar Contrato' : 'Congelar Contrato';
            toggleFrozenButton.onclick = function () {
                toggleFrozen(student.id);
            };

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            li.appendChild(manageWorkoutButton);
            li.appendChild(toggleFrozenButton);

            studentList.appendChild(li);
        });
    }

    // Função para editar o aluno
    window.editStudent = function (id) {
        const student = students.find(s => s.id === id);
        if (student) {
            // Abrir um prompt para editar o aluno
            const newName = prompt('Digite o novo nome do aluno:', student.name);
            const newCpf = prompt('Digite o novo CPF do aluno:', student.cpf);
            const newDob = prompt('Digite a nova data de nascimento do aluno:', student.dob);
            const newContract = prompt('Digite o novo número de meses do contrato:', student.contract);

            // Verificar se os valores não são vazios e atualizar o aluno
            if (newName && newCpf && newDob && newContract) {
                student.name = newName;
                student.cpf = newCpf;
                student.dob = newDob;
                student.contract = newContract;

                // Atualizar o localStorage
                localStorage.setItem('students', JSON.stringify(students));

                // Renderizar novamente a lista de alunos
                renderStudentList();
            }
        }
    };

    window.deleteStudent = function (id) {
        students = students.filter(student => student.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudentList();
    };

    window.manageWorkout = function (id) {
        localStorage.setItem('currentStudentId', id);
        window.location.href = '/treino/treino.html';
    };

    window.toggleFrozen = function (id) {
        const student = students.find(s => s.id === id);
        if (student) {
            student.frozen = !student.frozen;
            localStorage.setItem('students', JSON.stringify(students));
            renderStudentList();
        }
    };
});
