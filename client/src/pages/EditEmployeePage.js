import React, { useState } from "react";
import axios from "axios";
import EmployeeForm from "../components/forms/EmployeeForm";
import ErrorModal from "../components/modals/ErrorModal";

const EditEmployeePage = (props) => {
  const employeeId = props.match.params.id;
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditFormSubmit = (event, employeeObj) => {
    const { firstName, lastName, dateHired, roleId, managerId } = employeeObj;
    event.preventDefault();
    axios
      .put(`/api/employees/${employeeId}`, {
        firstName,
        lastName,
        dateHired,
        roleId,
        managerId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            props.history.push("/employees");
          }
        },
        (error) => {
          console.log(error);
          setErrorMessage("There was an error updating the employee.");
        }
      );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Edit Employee</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <EmployeeForm
          employeeId={employeeId}
          handleFormSubmit={handleEditFormSubmit}
          history={props.history}
        />
      )}
    </div>
  );
};

export default EditEmployeePage;
