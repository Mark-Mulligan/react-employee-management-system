import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import ErrorModal from "../components/modals/ErrorModal";
import "./DepartmentsPage.css";

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "name", headerName: "Name", width: 160 },
  {
    field: "employees",
    headerName: "Total Employees",
    width: 160,
    type: "number",
  },
  {
    field: "roles",
    headerName: "Total Roles",
    width: 130,
    type: "number",
  },
  {
    field: "departmentUtilization",
    headerName: "Total Utilization",
    width: 160,
    type: "number",
    valueFormatter: ({ value }) => {
      if (value) {
        return `$${value.toLocaleString()}`;
      } else {
        return `$0`;
      }
    },
  },
];

const DepartmentsPage = (props) => {
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getDepartments = () => {
    axios
      .get('/api/departments')
      .then(({ data }) => {
        console.log(data);
        setDepartments(data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage('There was an error connecting to the server.  Please reload the page.');
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.")
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    if (props.userLoggedIn) {
      console.log('department page mounted');
      getDepartments();
    }
  }, [props.userLoggedIn])

  return (
    <div className="mt-5">
      <h2 className="text-center">Departments</h2>
      <div className="departments-table-container">
        {errorMessage ? (
          <ErrorModal modalMessage={errorMessage} />
        ) : (
          <DataGrid
            autoHeight={true}
            scrollbarSize={20}
            rowHeight={30}
            rows={departments}
            columns={columns}
            disableSelectionOnClick={true}
            onRowClick={(data) => {
              props.history.push(`/department/${data.row.id}`);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DepartmentsPage;