// Mock employee data
let employees = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", department: "IT", role: "Developer" }
];

let editingId = null;

// Render employee list
function renderEmployees(list) {
  const container = document.getElementById('employeeList');
  container.innerHTML = '';
  list.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

// Add/Edit Employee
document.getElementById('addEmployeeBtn').onclick = () => {
  editingId = null;
  openForm();
};

function openForm(emp = {}) {
  document.getElementById('employeeForm').reset();
  document.getElementById('employeeFormModal').classList.remove('hidden');
  if (emp.id) {
    document.querySelector('[name="firstName"]').value = emp.firstName;
    document.querySelector('[name="lastName"]').value = emp.lastName;
    document.querySelector('[name="email"]').value = emp.email;
    document.querySelector('[name="department"]').value = emp.department;
    document.querySelector('[name="role"]').value = emp.role;
  }
}

document.getElementById('cancelBtn').onclick = () => {
  document.getElementById('employeeFormModal').classList.add('hidden');
  document.getElementById('formErrors').innerText = '';
};

document.getElementById('employeeForm').onsubmit = function(e) {
  e.preventDefault();
  const data = {
    firstName: this.firstName.value.trim(),
    lastName: this.lastName.value.trim(),
    email: this.email.value.trim(),
    department: this.department.value.trim(),
    role: this.role.value.trim()
  };
  // Simple validation
  if (!data.firstName || !data.lastName || !data.email || !data.department || !data.role) {
    document.getElementById('formErrors').innerText = 'All fields are required.';
    return;
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    document.getElementById('formErrors').innerText = 'Invalid email format.';
    return;
  }
  if (editingId) {
    const idx = employees.findIndex(emp => emp.id === editingId);
    employees[idx] = { ...employees[idx], ...data };
  } else {
    data.id = Date.now();
    employees.push(data);
  }
  document.getElementById('employeeFormModal').classList.add('hidden');
  document.getElementById('formErrors').innerText = '';
  renderEmployees(employees);
};

window.editEmployee = function(id) {
  editingId = id;
  const emp = employees.find(e => e.id === id);
  openForm(emp);
};

window.deleteEmployee = function(id) {
  employees = employees.filter(e => e.id !== id);
  renderEmployees(employees);
};

// Filter, Search, Sort
document.getElementById('searchBar').oninput = function() {
  const val = this.value.toLowerCase();
  renderEmployees(employees.filter(emp =>
    emp.firstName.toLowerCase().includes(val) ||
    emp.lastName.toLowerCase().includes(val) ||
    emp.email.toLowerCase().includes(val)
  ));
};

document.getElementById('applyFilter').onclick = function() {
  const fn = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();
  renderEmployees(employees.filter(emp =>
    (!fn || emp.firstName.toLowerCase().includes(fn)) &&
    (!dept || emp.department.toLowerCase().includes(dept)) &&
    (!role || emp.role.toLowerCase().includes(role))
  ));
};

document.getElementById('resetFilter').onclick = function() {
  document.getElementById('filterFirstName').value = '';
  document.getElementById('filterDepartment').value = '';
  document.getElementById('filterRole').value = '';
  renderEmployees(employees);
};

document.getElementById('sortBy').onchange = function() {
  const val = this.value;
  let sorted = [...employees];
  if (val === 'firstName') sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if (val === 'department') sorted.sort((a, b) => a.department.localeCompare(b.department));
  renderEmployees(sorted);
};

window.onload = () => {
  renderEmployees(employees);
};
