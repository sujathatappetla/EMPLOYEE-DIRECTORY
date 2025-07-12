<#-- employee-list.ftl: Freemarker template for rendering employee cards -->
<#list employees as emp>
  <div class="employee-card">
    <h3>${emp.firstName} ${emp.lastName}</h3>
    <p>Email: ${emp.email}</p>
    <p>Department: ${emp.department}</p>
    <p>Role: ${emp.role}</p>
    <div class="employee-actions">
      <button class="secondary-btn" onclick="editEmployee(${emp.id})">Edit</button>
      <button class="secondary-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
    </div>
  </div>
</#list>
