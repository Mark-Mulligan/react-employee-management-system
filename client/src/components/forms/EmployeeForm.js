import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../modals/DeleteModal";
import DateInput from "../inputs/DateInput";

const EmployeeForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [managerId, setManagerId] = useState("");
  const [dateHired, setDateHired] = useState(new Date());
  const [departmentValues, setDepartmentValues] = useState([]);
  const [roleValues, setRoleValues] = useState([]);
  const [managerValues, setManagerValues] = useState([]);

  const getEmployeeInfo = (id) => {
    axios.get(`/api/employees/${id}`).then(
      (response) => {
        if (response.status === 200) {
          const employeeData = response.data[0];
          setFirstName(employeeData.first_name);
          setLastName(employeeData.last_name);
          setDepartmentId(employeeData.departmentId);
          setRoleId(employeeData.role_id);
          setManagerId(employeeData.manager_id);
          setDateHired(employeeData.date_hired);

          getManagerValues();
          getRolesValues(employeeData.department_id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const convertManagerId = (managerId) => {
    return !managerId ? "0" : managerId;
  };

  const getDepartmentValues = async () => {
    try {
      const { data } = await axios.get("/api/departments");
      setDepartmentValues(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Need to fix route
  const getRolesValues = async (departmentId) => {
    const { data } = await axios.get(`/api/roles?departmentid=${departmentId}`);
    setRoleValues(data.data);
  };

  const getManagerValues = async () => {
    const { data } = await axios.get(`/api/employees?managers=true`);
    setManagerValues(data.data);
  };

  const handleDepartmentSelect = (event) => {
    const departmentId = event.target.value;
    getRolesValues(departmentId);
    setDepartmentId(departmentId);
    setRoleId("");
  };

  const handleDeleteClick = () => {
    axios.delete(`/api/employee/${props.employeeId}`).then(
      (response) => {
        if (response.status === 200) {
          props.history.push("/employees");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (props.userLoggedIn) {
      if (props.employeeId) {
        getEmployeeInfo(props.employeeId);
        getDepartmentValues();
      } else {
        getDepartmentValues();
        getManagerValues();
      }
    }
  }, [props.userLoggedIn]);

  const renderRolePlacholder = () => {
    return departmentId ? "Choose" : "Must select department";
  };

  const renderMenuItems = (dataArr, key1, key2) => {
    if (dataArr.length > 0) {
      return dataArr.map((data) => {
        return (
          <MenuItem key={data[key1]} value={data[key1]}>
            {data[key2]}
          </MenuItem>
        );
      });
    }
  };

  return (
    <Form
      onSubmit={(event) =>
        props.handleFormSubmit(event, firstName, lastName, roleId, managerId)
      }
    >
      <Row>
        <Col className="mb-4" xs={12} sm={6}>
          <FormControl fullWidth={true}>
            <TextField
              id="firstNameInput"
              label="First Name"
              variant="outlined"
              value={firstName}
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col className="mb-4" xs={12} sm={6}>
          <FormControl fullWidth={true}>
            <TextField
              id="lastNameInput"
              label="Last Name"
              variant="outlined"
              value={lastName}
              required={true}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col className="mb-4" sm={12}>
          <FormControl fullWidth>
            <DateInput
              id="date-input"
              onDateChange={setDateHired}
              value={dateHired}
            />
          </FormControl>
        </Col>
      </Row>

      <Row>
        <Col className="mb-4" sm={12} md={4}>
          {departmentValues.length > 0 && (
            <FormControl required variant="outlined" fullWidth={true}>
              <InputLabel id="demo-simple-select-outlined-label">
                Department
              </InputLabel>
              <Select
                defaultValue=""
                labelId="departmentSelectLabel"
                id="departmentSelect"
                value={departmentId}
                onChange={handleDepartmentSelect}
                label="Department"
              >
                {renderMenuItems(departmentValues, "id", "name")}
              </Select>
            </FormControl>
          )}
        </Col>
        <Col sm={12} md={4} className="mb-4">
          {roleValues.length > 0 && (
            <FormControl required variant="outlined" fullWidth={true}>
              <InputLabel id="roleSelectLabel">Role</InputLabel>
              <Select
                defaultValue=""
                labelId="roleSelectLabel"
                id="roleSelect"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                label="Role"
              >
                {renderMenuItems(roleValues, "id", "title")}
              </Select>
            </FormControl>
          )}
        </Col>

        <Col sm={12} md={4} className="mb-4">
          {departmentId && (
            <FormControl required variant="outlined" fullWidth={true}>
              <InputLabel id="managerSelectLabel">Manager</InputLabel>
              <Select
                defaultValue=""
                labelId="managerSelectLabel"
                id="managerSelect"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
                label="Manager"
              >
                <MenuItem value={0}>No Manager</MenuItem>
                {renderMenuItems(managerValues, "id", "manager")}
              </Select>
            </FormControl>
          )}
        </Col>
      </Row>

      <div className="">
        <Button className="mr-3 mb-3" variant="light" type="submit">
          {props.employeeId ? "Submit Changes" : "Create Employee"}
        </Button>
        {props.employeeId ? (
          <DeleteModal
            modalMessage="Are you sure you want to delete this employee?"
            handleDeleteClick={handleDeleteClick}
          />
        ) : null}
        <Button
          className="mb-3"
          as={Link}
          to={"/employees"}
          variant="outline-light"
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EmployeeForm;
