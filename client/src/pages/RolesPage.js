import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import ErrorModal from "../components/modals/ErrorModal";
import "./RolesPage.css";

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "title", headerName: "Title", width: 170 },
  {
    field: "department",
    headerName: "Department",
    width: 170,
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 140,
    type: "number",
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
  },
];

const RolesPage = (props) => {
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getRoles = () => {
    axios
      .get("/api/roles")
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("There was an error connecting to the server. Please reload the page.");
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.");
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    if (props.userLoggedIn) {
      getRoles();
    }
  }, [props.userLoggedIn]);

  return (
    <div className="mt-5">
      <h2 className="text-center">Roles</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <div className="roles-table-container">
          <DataGrid
            style={{ color: "rgba(189,189,189,255" }}
            autoHeight={true}
            scrollbarSize={20}
            rowHeight={30}
            rows={roles}
            columns={columns}
            disableSelectionOnClick={true}
            onRowClick={(data) => {
              props.history.push(`/role/${data.row.id}`);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default RolesPage;