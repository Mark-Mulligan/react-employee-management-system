import React, { useState } from "react";
import axios from "axios";
import DepartmentForm from "../components/forms/DepartmentForm";
import ErrorModal from "../components/modals/ErrorModal";

const EditDepartmentPage = (props) => {
  const departmentId = props.match.params.id;
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    axios
      .put(`/api/departments/${departmentId}`, {
        departmentName: departmentName,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            props.history.push("/departments");
          }
        },
        (error) => {
          console.log(error);
          setErrorMessage("There was an error updating the department.")
        }
      );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Department</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <DepartmentForm
          handleFormSubmit={handleFormSubmit}
          departmentId={departmentId}
          history={props.history}
        />
      )}
    </div>
  )
}

export default EditDepartmentPage;