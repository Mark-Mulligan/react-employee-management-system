import React, { useState } from "react";
import axios from "axios";
import ErrorModal from "../components/modals/ErrorModal";
import DepartmentForm from "../components/forms/DepartmentForm";

const CreateDepartmentPage = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    axios.post("/api/departments", { departmentName }).then(
      (response) => {
        if (response.status === 201) {
          history.push("/departments");
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
    <h2 className="text-center mb-3">Create Department</h2>
    {errorMessage ? (
      <ErrorModal modalMessage={errorMessage} />
    ) : (
      <DepartmentForm handleFormSubmit={handleFormSubmit} />
    )}
  </div>
  )
};

export default CreateDepartmentPage;
