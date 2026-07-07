const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const courseInput = document.getElementById('course');
const submitBtn = document.getElementById('submitBtn');
const formTitle = document.getElementById('formTitle');
const studentTableBody = document.getElementById('studentTableBody');
const studentCount = document.getElementById('studentCount');

let students = [];
let editIndex = -1;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameValue = fullNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const courseValue = courseInput.value.trim();

    let isValid = true;

    if (nameValue.length < 2) {
        document.getElementById('nameError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('nameError').classList.add('hidden');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        document.getElementById('emailError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('emailError').classList.add('hidden');
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phoneValue)) {
        document.getElementById('phoneError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('phoneError').classList.add('hidden');
    }

    if (courseValue === '') {
        document.getElementById('courseError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('courseError').classList.add('hidden');
    }

    if (isValid) {
        const studentData = {
            name: nameValue,
            email: emailValue,
            phone: phoneValue,
            course: courseValue
        };

        if (editIndex === -1) {
            students.push(studentData);
        } else {
            students[editIndex] = studentData;
            editIndex = -1;
            submitBtn.innerText = 'Register Student';
            formTitle.innerText = 'Register Student';
        }

        form.reset();
        renderTable();
    }
});

function renderTable() {
    studentTableBody.innerHTML = '';

    if (students.length === 0) {
        studentTableBody.innerHTML = `
            <tr id="emptyRow">
                <td colspan="5" class="px-6 py-10 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center space-y-2">
                        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <span>No students registered yet.</span>
                    </div>
                </td>
            </tr>
        `;
        studentCount.innerText = '0 Students';
        return;
    }

    studentCount.innerText = students.length + (students.length === 1 ? ' Student' : ' Students');

    for (let i = 0; i < students.length; i++) {
        const s = students[i];
        const tr = document.createElement('tr');
        tr.className = 'border-b border-slate-100 hover:bg-slate-50 transition-colors';

        tr.innerHTML = `
            <td class="px-6 py-4 font-medium text-slate-900">${s.name}</td>
            <td class="px-6 py-4 text-slate-600">${s.email}</td>
            <td class="px-6 py-4 text-slate-600">${s.phone}</td>
            <td class="px-6 py-4 text-slate-600">${s.course}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button onclick="editStudent(${i})" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-md transition shadow-sm hover:shadow-md">
                    Edit
                </button>
                <button onclick="deleteStudent(${i})" class="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-md transition shadow-sm hover:shadow-md">
                    Delete
                </button>
            </td>
        `;
        studentTableBody.appendChild(tr);
    }
}

window.deleteStudent = function (index) {
    students.splice(index, 1);
    if (editIndex === index) {
        editIndex = -1;
        form.reset();
        submitBtn.innerText = 'Register Student';
        formTitle.innerText = 'Register Student';
    } else if (editIndex > index) {
        editIndex--;
    }
    renderTable();
};

window.editStudent = function (index) {
    const s = students[index];
    fullNameInput.value = s.name;
    emailInput.value = s.email;
    phoneInput.value = s.phone;
    courseInput.value = s.course;

    editIndex = index;
    submitBtn.innerText = 'Update Student';
    formTitle.innerText = 'Edit Student';

    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('phoneError').classList.add('hidden');
    document.getElementById('courseError').classList.add('hidden');

    fullNameInput.focus();
};
