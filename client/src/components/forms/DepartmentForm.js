import React, { useEffect, useState } from "react";
import { TextField, FormControl } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteModal from "../modals/DeleteModal";
import ErrorModal from "../modals/ErrorModal";

const DepartmentForm = (props) => {
  const [departmentName, setDepartmentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (props.departmentId) {
      getDepartmentInfo(props.departmentId)
    }
  }, [props.departmentId])

  const getDepartmentInfo = (id) => {
    axios.get(`/department/${id}`).then(
      (response) => {
        if (response.status === 200) {
          const departmentData = response.data[0];
          setDepartmentName(departmentData.name);
        }
      },
      (error) => {
        console.log(error);
        setErrorMessage("There was an error getting the department info.");
      }
    );
  };

  const handleDeleteClick = () => {
    axios.delete(`/department/${props.departmentId}`).then(
      (response) => {
        if (response.status === 200) {
          props.history.push("/departments");
        }
      },
      (error) => {
        console.log(error);
        setErrorMessage("There was an deleting the department.")
      }
    );
  };

  return (
    <div>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <form
          onSubmit={(e) =>
            props.handleFormSubmit(e, departmentName)
          }
        >
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              id="departmentNameInput"
              label="Name"
              variant="outlined"
              value={departmentName}
              required={true}
              onChange={(e) =>
                setDepartmentName(e.target.value)
              }
            />
          </FormControl>
          <div>
            <Button className="mr-3 mb-3" variant="light" type="submit">
              {props.departmentId
                ? "Submit Changes"
                : "Create Department"}
            </Button>
            {props.departmentId ? (
              <DeleteModal
                modalMessage="Warning! Deleting this department will also delete all the roles and employees in the department.  Are you sure you want to delete it?"
                handleDeleteClick={handleDeleteClick}
              />
            ) : null}
            <Button
              className="mb-3"
              as={Link}
              to={"/departments"}
              variant="outline-light"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default DepartmentForm;