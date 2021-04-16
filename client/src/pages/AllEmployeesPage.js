import React from 'react';

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First" },
  { field: "last_name", headerName: "Last" },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
  },
  {
    field: "manager",
    headerName: "Manager",
    width: 150,
    valueFormatter: ({ value }) => (!value ? "N/A" : value),
  },
];

const AllEmployeesPage = (props) => {
  return (
    <div>
    {console.log(props)}
    All Employees Page
    </div>
  )
}

export default AllEmployeesPage;