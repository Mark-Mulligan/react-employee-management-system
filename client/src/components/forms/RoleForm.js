import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";

const RoleForm = (props) => {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentValues, setDepartmentValues] = useState([]);

  useEffect(() => {
    getDepartmentValues();
    if (props.roleId) {
      getRoleInfo(props.roleId);
    }
  }, [props.departmentId]);

  const getDepartmentValues = async () => {
    const { data } = await axios.get(
      "/api/departments"
    );
    setDepartmentValues(data.data);
  };

  const getRoleInfo = (id) => {
    axios.get(`/api/roles/${id}`).then(
      (response) => {
        if (response.status === 200) {
          console.log(response);
          const roleData = response.data.data[0];
          setTitle(roleData.title);
          setSalary(roleData.salary);
          setDepartmentId(roleData.department_id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleDeleteClick = () => {
    axios.delete(`/api/roles/${props.roleId}`).then(
      (response) => {
        if (response.status === 200) {
          props.history.push("/roles");
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
  }

  return (
    <form
      onSubmit={(event) =>
        props.handleFormSubmit(
          event,
          title,
          salary,
          departmentId
        )
      }
    >
      <Row>
        <Col md={4} sm={12} className="mb-4">
          <FormControl fullWidth={true}>
            <TextField
              id="roleNameInput"
              label="Title"
              variant="outlined"
              value={title}
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col md={4} sm={12} className="mb-4">
          <FormControl fullWidth={true}>
            <TextField
              id="roleSalaryInput"
              label="Salary"
              type="number"
              variant="outlined"
              value={salary}
              required={true}
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col md={4} sm={12} className="mb-4">
          <FormControl required variant="outlined" fullWidth={true}>
            <InputLabel id="departmentSelectLabel">
              Department
            </InputLabel>
            <Select
              labelId="departmentSelectLabel"
              id="departmentSelect"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              label="Department"
            >
              {renderMenuItems(
                departmentValues,
                "id",
                "name"
              )}
            </Select>
          </FormControl>
        </Col>
      </Row>

      <div>
        <Button className="mr-3 mb-3" variant="light" type="submit">
          {props.roleId ? "Submit Changes" : "Create Role"}
        </Button>
        {props.roleId ? (
          <DeleteModal
            modalMessage="Warning! Deleting this role will also delete all the employees that have this role.  Are you sure you want to delete it?"
            handleDeleteClick={handleDeleteClick}
          />
        ) : null}
        <Button className="mb-3" as={Link} to={"/roles"} variant="outline-light">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default RoleForm;


