document.addEventListener('DOMContentLoaded', function() {
    const workoutDetails = document.getElementById('workoutDetails');
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let currentStudentId = localStorage.getItem('currentStudentId');

    if (workoutDetails && currentStudentId) {
        const student = students.find(s => s.id == currentStudentId);

        if (student) {
            if (!Array.isArray(student.workout)) {
                student.workout = [];
            }
            renderWorkoutDetails(student);
        } else {
            workoutDetails.innerHTML = '<p>Estudante não encontrado.</p>';
        }
    } else {
        workoutDetails.innerHTML = '<p>Detalhes do treino não disponíveis.</p>';
    }

    function renderWorkoutDetails(student) {
        workoutDetails.innerHTML = '';

        if (student.workout.length === 0) {
            workoutDetails.innerHTML = '<p>Nenhum treino cadastrado.</p>';
        } else {
            student.workout.forEach((workout, index) => {
                const div = document.createElement('div');
                div.className = 'workout';
                div.innerHTML = `
                    <p>Treino ${index + 1}: ${workout.name}</p>
                    <button class="edit-workout" data-index="${index}">Editar</button>
                    <button class="delete-workout" data-index="${index}">Excluir</button>
                    <button class="add-exercise" data-index="${index}">Adicionar Exercício</button>
                    <div class="exercises">
                        ${workout.exercises && workout.exercises.length > 0 ? workout.exercises.map((exercise, exerciseIndex) => `
                            <div class="exercise">
                                <p>Exercício ${exerciseIndex + 1}: ${exercise}</p>
                                <button class="edit-exercise" data-workout-index="${index}" data-exercise-index="${exerciseIndex}">Editar Exercício</button>
                                <button class="delete-exercise" data-workout-index="${index}" data-exercise-index="${exerciseIndex}">Excluir Exercício</button>
                            </div>
                        `).join('') : '<p>Nenhum exercício cadastrado.</p>'}
                    </div>
                `;
                workoutDetails.appendChild(div);
            });
        }
    }

    document.getElementById('addWorkout').addEventListener('click', function() {
        const student = students.find(s => s.id == currentStudentId);
        if (student) {
            const name = prompt('Digite o nome do novo treino:');
            if (name) {
                student.workout.push({ name: name, exercises: [] });
                localStorage.setItem('students', JSON.stringify(students));
                renderWorkoutDetails(student);
            }
        }
    });

    workoutDetails.addEventListener('click', function(e) {
        const student = students.find(s => s.id == currentStudentId);

        if (!student) return;

        if (e.target.classList.contains('edit-workout')) {
            const index = e.target.dataset.index;
            const name = prompt('Editar nome do treino:', student.workout[index].name);
            if (name !== null) {
                student.workout[index].name = name;
                localStorage.setItem('students', JSON.stringify(students));
                renderWorkoutDetails(student);
            }
        }

        if (e.target.classList.contains('delete-workout')) {
            const index = e.target.dataset.index;
            student.workout.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            renderWorkoutDetails(student);
        }

        if (e.target.classList.contains('add-exercise')) {
            const index = e.target.dataset.index;
            const exercise = prompt('Digite o nome do exercício:');
            if (exercise) {
                student.workout[index].exercises.push(exercise);
                localStorage.setItem('students', JSON.stringify(students));
                renderWorkoutDetails(student);
            }
        }
        
        if (e.target.classList.contains('delete-exercise')) {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('edit-workout')) {
                const index = e.target.dataset.index;
                const name = prompt('Editar nome do treino:', student.workout[index].name);
                if (name !== null) {
                    student.workout[index].name = name;
                    localStorage.setItem('students', JSON.stringify(students));
                    renderWorkoutDetails(student);
                }
            }
    
            if (e.target.classList.contains('delete-workout')) {
                const index = e.target.dataset.index;
                student.workout.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(students));
                renderWorkoutDetails(student);
            }
    
            if (e.target.classList.contains('add-exercise')) {
                const index = e.target.dataset.index;
                const exercise = prompt('Digite o nome do exercício:');
                if (exercise) {
                    student.workout[index].exercises.push(exercise);
                    localStorage.setItem('students', JSON.stringify(students));
                    renderWorkoutDetails(student);
                }
            }
            

            if (e.target.classList.contains('delete-exercise')) {
                const workoutIndex = e.target.dataset.workoutIndex; // Índice do treino
                const exerciseIndex = e.target.dataset.exerciseIndex; // Índice do exercício
                
        
                student.workout[workoutIndex].exercises.splice(exerciseIndex,1); // Removendo o exercício específic
                localStorage.setItem('students', JSON.stringify(students));
                renderWorkoutDetails(student);
                
            }
            
            


            
            localStorage.setItem('students', JSON.stringify(students));
            renderWorkoutDetails(student);
        }

        if (e.target.classList.contains('edit-exercise')) {
            const workoutIndex = e.target.dataset.workoutIndex;
            const exerciseIndex = e.target.dataset.exerciseIndex;
            const exercise = prompt('Editar exercício:', student.workout[workoutIndex].exercises[exerciseIndex]);
            if (exercise !== null) {
                student.workout[workoutIndex].exercises[exerciseIndex] = exercise;
                localStorage.setItem('students', JSON.stringify(students));
                renderWorkoutDetails(student);
            }
        }
        

    });
});
