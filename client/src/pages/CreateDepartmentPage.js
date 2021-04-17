import React, { useState } from "react";
import axios from "axios";
import ErrorModal from "../components/modals/ErrorModal";
import DepartmentForm from "../components/forms/DepartmentForm";

const CreateDepartmentPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (event, departmentName, userId) => {
    event.preventDefault();
    axios.post("/departments", { departmentName, userId }).then(
      (response) => {
        if (response.status === 200) {
          this.props.history.push("/departments");
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "There was an error updating the role.",
        });
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