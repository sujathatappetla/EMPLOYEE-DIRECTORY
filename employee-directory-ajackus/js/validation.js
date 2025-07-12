// validation.js
export function validateEmployee(data, existingEmails = [], editingId = null) {
  const errors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email format.";
  else if (existingEmails.includes(data.email) && editingId === null)
    errors.email = "Email already exists.";
  if (!data.department.trim()) errors.department = "Department is required.";
  if (!data.role.trim()) errors.role = "Role is required.";
  return errors;
}
