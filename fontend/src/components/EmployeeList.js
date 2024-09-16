import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async (page) => {
    const response = await fetch(`/employees?page=${page}`);
    const data = await response.json();
    setEmployees(data.employees);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure, you want to delete this?')) {
      fetch(`/delete-employee/${id}`, { method: 'DELETE' })
        .then(() => fetchEmployees(currentPage));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td><img src={emp.photo_url} alt={emp.name} width="50" /></td>
              <td>{`${emp.first_name} ${emp.last_name}`}</td>
              <td>{emp.email}</td>
              <td>{emp.mobile}</td>
              <td>{emp.dob}</td>
              <td>
                <button onClick={() => window.location.href = `/edit-employee/${emp.id}`}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
