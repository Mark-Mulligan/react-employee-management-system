import React, { useState, useEffect } from "react";
import axios from "axios";
import VerticalTable from "../components/tables/VerticalTable";
import ErrorModal from "../components/modals/ErrorModal";
import EditDeleteGroup from "../components/buttons/EditDeleteGroup";

const headerAndKeys = [
  { header: "First Name:", key: "first_name" },
  { header: "Last Name:", key: "last_name" },
  { header: "Employee Id:", key: "id" },
  { header: "Title:", key: "title" },
  { header: "Manager", key:"manager"},
  { header: "Department:", key: "department" },
  { header: "Salary:", key: "salary", type: 'money' },
];

const EmployeePage = (props) => {
  const employeeId = props.match.params.id;
  const [employee, setEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getEmployee = () => {
    axios.get(`/api/employees/${employeeId}`)
      .then(({ data }) => {
        setEmployee(data.data[0]);
        console.log(data.data);
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

  const handleDeleteClick = () => {
    axios.delete(`/api/employees/${employeeId}`).then(
      (response) => {
        if (response.status === 200) {
          props.history.push("/employees");
        }
      },
      (error) => {
        console.log(error);
        setErrorMessage("There was an error deleting the employee.")
      }
    );
  };

  useEffect(() => {
    if (props.userLoggedIn) {
      getEmployee();
    }
  }, [props.userLoggedIn])

  return (
    <div className="container mt-5 text-center">
      <h2>Employee Profile</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <div>
          <VerticalTable
            headersAndKeys={headerAndKeys}
            tableData={employee}
          />
          <EditDeleteGroup
            modalMessage="Are you sure you want to delete this employee?"
            handleDeleteClick={handleDeleteClick}
            linkTo={`${employeeId}/edit`}
          />
        </div>
      )}
    </div>
  );
}

export default EmployeePage;