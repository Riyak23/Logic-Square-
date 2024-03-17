import React, { useState } from 'react';
import '../Component/style.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    salary: '',
    location: ''
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newEmployee.name.trim() !== '' &&
      newEmployee.department.trim() !== '' &&
      newEmployee.salary.trim() !== '' &&
      newEmployee.location.trim() !== ''
    ) {
      if (editIndex !== null) {
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = newEmployee;
        setEmployees(updatedEmployees);
        setEditIndex(null);
      } else {
        setEmployees([...employees, newEmployee]);
      }
      setNewEmployee({
        name: '',
        department: '',
        salary: '',
        location: ''
      });
    }
  };

  const handleEdit = (index) => {
    setNewEmployee(employees[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="resource-management-container">
      <div className="dashboard">
        <div className="overview">
          <div className="overview-section">
            <h2>Total Employees</h2>
            <p>{employees.length}</p>
          </div>
          <div className="overview-section">
            <h2>Available Employees</h2>
            <p>{employees.length}</p>
          </div>
        </div>
        <div className="employees-list">
          <h2>Employees</h2>
          <ul>
            {employees.map((employee, index) => (
              <li key={index}>
                {employee.name} - {employee.department} - {employee.salary} - {employee.location}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter department"
              name="department"
              value={newEmployee.department}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter salary"
              name="salary"
              value={newEmployee.salary}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter location"
              name="location"
              value={newEmployee.location}
              onChange={handleChange}
            />
            <button type="submit">{editIndex !== null ? 'Update Employee' : 'Add Employee'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

