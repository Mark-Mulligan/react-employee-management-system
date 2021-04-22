import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import ErrorModal from "../components/modals/ErrorModal";

import "./AllEmployeesPage.css";

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
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getEmployees = () => {
    axios
      .get("/api/employees")
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("There was an error connecting to the server.");
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.");
        }
        console.log(error.config);
      });
  }; 

  useEffect(() => {
    if (props.userLoggedIn) {
      getEmployees();
    }
  }, [props.userLoggedIn]);

  return (
    <div className="mt-5">
      <h2 className="text-center">Employees</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <div className="employee-table-container">
          <DataGrid
            autoHeight={true}
            rowHeight={30}
            scrollbarSize={20}
            rows={employees}
            columns={columns}
            disableSelectionOnClick={true}
            onRowClick={(data) => {
              props.history.push(`/employee/${data.row.id}`);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AllEmployeesPage;