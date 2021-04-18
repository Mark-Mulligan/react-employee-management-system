import React, { useState, useEffect } from "react";
import axios from "axios";
import VerticalTable from "../components/tables/VerticalTable";
import EditDeleteGroup from "../components/buttons/EditDeleteGroup";
import ErrorModal from "../components/modals/ErrorModal";

const headerAndKeys = [
  { header: "Title:", key: "title" },
  { header: "Department:", key: "name" },
  { header: "Role Id:", key: "id" },
  { header: "Employees:", key: "employees", type: "number" },
  { header: "Salary:", key: "salary", type: "money" },
  { header: "Total Utilization:", key: "roleUtilization", type: "money" },
];

const RolePage = (props) => {
  const roleId = props.match.params.id;
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getRole = () => {
    axios
      .get(`/api/roles/${roleId}`)
      .then((response) => {
        setRole(response.data.data[0]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText)
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("There was an error connecting to the server. Please reload the page.")
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.")
        }
        console.log(error.config);
      });
  };

  const handleDeleteClick = () => {
    axios.delete(`/api/roles/${roleId}`).then(
      (response) => {
        if (response.status === 200) {
          props.history.push("/roles");
        }
      },
      (error) => {
        console.log(error);
        setErrorMessage("There was an error deleteing the role.")
      }
    );
  };

  useEffect(() => {
    if (props.userLoggedIn) {
      getRole();
    }
  }, [props.userLoggedIn])

  return (
    <div className="container mt-5">
      <h2 className="text-center">Role Profile</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <div>
          <VerticalTable
            headersAndKeys={headerAndKeys}
            tableData={role}
          />
          <EditDeleteGroup
            modalMessage="Warning! Deleting this role will also delete all the employees that have this role.  Are you sure you want to delete it?"
            handleDeleteClick={handleDeleteClick}
            linkTo={`${roleId}/edit`}
          />
        </div>
      )}
    </div>
  );
}

export default RolePage;