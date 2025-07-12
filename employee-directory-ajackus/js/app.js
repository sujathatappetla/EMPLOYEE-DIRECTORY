// app.js
import { validateEmployee } from "./validation.js";
import { showToast, clearFormErrors, showFormErrors } from "./ui.js";

// Mock data
let employees = [
  { id: 1, firstName: "sujatha", lastName: "thappetla", email: "sujithapetla09@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "amrutha", lastName: "palla", email: "amruthapalla014@example.com", department: "IT", role: "Developer" }
];
let editingId = null;

function renderEmployees(list) {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }
  list.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <div class="employee-actions">
        <button class="secondary-btn" data-edit="${emp.id}">Edit</button>
        <button class="secondary-btn" data-delete="${emp.id}">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
  
  // Attach event listeners for edit/delete
  container.querySelectorAll("[data-edit]").forEach(btn => {
    btn.onclick = () => openForm(employees.find(e => e.id === +btn.dataset.edit));
  });
  container.querySelectorAll("[data-delete]").forEach(btn => {
    btn.onclick = () => {
      if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(e => e.id !== +btn.dataset.delete);
        renderEmployees(employees);
        showToast("Employee deleted");
      }
    };
  });
}

function openForm(emp = null) {
  editingId = emp ? emp.id : null;
  document.getElementById("formTitle").textContent = editingId ? "Edit Employee" : "Add Employee";
  document.getElementById("employeeForm").reset();
  clearFormErrors();
  if (emp) {
    document.querySelector('[name="firstName"]').value = emp.firstName;
    document.querySelector('[name="lastName"]').value = emp.lastName;
    document.querySelector('[name="email"]').value = emp.email;
    document.querySelector('[name="department"]').value = emp.department;
    document.querySelector('[name="role"]').value = emp.role;
  }
  document.getElementById("employeeFormModal").classList.remove("hidden");
}

document.getElementById("addEmployeeBtn").onclick = () => openForm();

document.getElementById("cancelBtn").onclick = () => {
  document.getElementById("employeeFormModal").classList.add("hidden");
  clearFormErrors();
};

document.getElementById("employeeForm").onsubmit = function(e) {
  e.preventDefault();
  const data = {
    firstName: this.firstName.value.trim(),
    lastName: this.lastName.value.trim(),
    email: this.email.value.trim(),
    department: this.department.value.trim(),
    role: this.role.value.trim()
  };
  const existingEmails = employees.map(e => e.email);
  const errors = validateEmployee(data, existingEmails, editingId);
  if (Object.keys(errors).length > 0) {
    showFormErrors(errors);
    return;
  }
  if (editingId) {
    const idx = employees.findIndex(emp => emp.id === editingId);
    employees[idx] = { ...employees[idx], ...data };
    showToast("Employee updated");
  } else {
    data.id = Date.now();
    employees.push(data);
    showToast("Employee added");
  }
  document.getElementById("employeeFormModal").classList.add("hidden");
  clearFormErrors();
  renderEmployees(employees);
};

document.getElementById("searchBar").oninput = function() {
  const val = this.value.toLowerCase();
  renderEmployees(employees.filter(emp =>
    emp.firstName.toLowerCase().includes(val) ||
    emp.lastName.toLowerCase().includes(val) ||
    emp.email.toLowerCase().includes(val)
  ));
};

document.getElementById("applyFilter").onclick = function() {
  const fn = document.getElementById("filterFirstName").value.toLowerCase();
  const dept = document.getElementById("filterDepartment").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();
  renderEmployees(employees.filter(emp =>
    (!fn || emp.firstName.toLowerCase().includes(fn)) &&
    (!dept || emp.department.toLowerCase().includes(dept)) &&
    (!role || emp.role.toLowerCase().includes(role))
  ));
};

document.getElementById("resetFilter").onclick = function() {
  document.getElementById("filterFirstName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";
  renderEmployees(employees);
};

document.getElementById("sortBy").onchange = function() {
  const val = this.value;
  let sorted = [...employees];
  if (val === "firstName") sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if (val === "department") sorted.sort((a, b) => a.department.localeCompare(b.department));
  renderEmployees(sorted);
};

window.onload = () => {
  renderEmployees(employees);
};
