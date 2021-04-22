import React, { useState } from "react";
import axios from "axios";
import ErrorModal from "../components/modals/ErrorModal";
import RoleForm from "../components/forms/RoleForm";

const CreateRolePage = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e, title, salary, departmentId) => {
    e.preventDefault();
    axios
      .post("/api/roles", {
        title, salary, departmentId
      })
      .then(
        (response) => {
          if (response.status === 201) {
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
      <h2 className="text-center mb-4">Create Role</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <RoleForm handleFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default CreateRolePage;