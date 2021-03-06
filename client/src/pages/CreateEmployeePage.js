import React, { useState } from "react";
import axios from "axios";
import EmployeeForm from "../components/forms/EmployeeForm";
import ErrorModal from "../components/modals/ErrorModal";

const CreateEmployeePage = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateFormSubmit = (event, employeeObj) => {
    const {firstName, lastName, dateHired, roleId, managerId} = employeeObj;

    event.preventDefault();
    axios
      .post("/api/employees", {
        firstName,
        lastName,
        dateHired,
        roleId,
        managerId,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            props.history.push("/employees");
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
      <h2 className="text-center mb-3">Create Employee</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <EmployeeForm
          userLoggedIn={props.userLoggedIn}
          handleFormSubmit={handleCreateFormSubmit}
          history={props.history}
        />
      )}
    </div>
  );
}

export default CreateEmployeePage;