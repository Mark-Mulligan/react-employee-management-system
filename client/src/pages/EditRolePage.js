import React, { useState } from "react";
import axios from "axios";
import RoleForm from "../components/forms/RoleForm";
import ErrorModal from "../components/modals/ErrorModal";

const EditRolePage = (props) => {
  const roleId = props.match.params.id;
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event, title, salary, departmentId) => {
    event.preventDefault();
    axios
      .put(`/api/roles/${roleId}`, {
        title, salary, departmentId
      })
      .then(
        (response) => {
          if (response.status === 200) {
            props.history.push("/roles");
          }
        },
        (error) => {
          console.log(error);
          setErrorMessage("There was an error updating the role.");
        }
      );
  };

  return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">Edit Role</h2>
        {errorMessage ? (
          <ErrorModal modalMessage={errorMessage} />
        ) : (
          <RoleForm
            history={props.history}
            handleFormSubmit={handleFormSubmit}
            roleId={roleId}
          />
        )}
      </div>
  )
}

export default EditRolePage;