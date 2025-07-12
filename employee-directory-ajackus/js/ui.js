// ui.js
export function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = type === "success" ? "#388e3c" : "#d32f2f";
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2200);
}

export function clearFormErrors() {
  ["FirstName", "LastName", "Email", "Department", "Role"].forEach(field => {
    document.getElementById("error" + field).textContent = "";
  });
  document.getElementById("formErrors").textContent = "";
}

export function showFormErrors(errors) {
  clearFormErrors();
  Object.entries(errors).forEach(([key, msg]) => {
    document.getElementById("error" + key.charAt(0).toUpperCase() + key.slice(1)).textContent = msg;
  });
}
