import React, { useEffect, useState } from "react";
import axios from "axios";
import VerticalTable from "../components/tables/VerticalTable";
import EditDeleteGroup from "../components/buttons/EditDeleteGroup";
import ErrorModal from "../components/modals/ErrorModal";

const headerAndKeys = [
  { header: "Name:", key: "name" },
  { header: "Department Id:", key: "id" },
  { header: "Employees:", key: "employees", type: "number" },
  { header: "Roles:", key: "roles", type: "number" },
  { header: "Total Utilization:", key: "departmentUtilization", type: "money" },
];

const DepartmentPage = (props) => {
  const departmentId = props.match.params.id;
  const [department, setDepartment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getDepartmentInfo = () => {
    axios
      .get(`/api/departments/${departmentId}`)
      .then(({ data }) => {
        setDepartment(data.data[0]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
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
    axios.delete(`/api/departments/${departmentId}`).then(
      (response) => {
        if (response.status === 200) {
          props.history.push("/departments");
        }
      },
      (error) => {
        console.log(error);
        setErrorMessage("There was an error deleteing the department.")
      }
    );
  };

  useEffect(() => {
    if (props.userLoggedIn) {
      getDepartmentInfo()
    }
  }, [props.userLoggedIn])

  return (
    <div className="container mt-5">
      <h2 className="text-center">Department Profile</h2>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <div>
          <VerticalTable
            headersAndKeys={headerAndKeys}
            tableData={department}
          />
          <EditDeleteGroup
            modalMessage="Warning! Deleting this Department will also delete all the roles and employees in this department.  Are you sure you want to delete it?"
            handleDeleteClick={handleDeleteClick}
            linkTo={`${departmentId}/edit`}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
