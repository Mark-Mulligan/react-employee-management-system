import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import ErrorModal from "../components/modals/ErrorModal";
import axios from "axios";
import util from "../util/util";

// GLOBAL VARIABLES FOR REACT-CHARTJS-2
defaults.global.defaultFontColor = "rgba(220,220,215,255)";
defaults.global.elements.line.borderColor = "rgba(220,220,215,255)";

const AnalyticsPage = (props) => {
  const [departments, setDepartments] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.userLoggedIn) {
      getDepartments();
      getRoleData();
      getEmployeeData();
    }
  }, [props.userLoggedIn]);

  const getDepartments = () => {
    axios
      .get("/api/departments")
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("there was an error connecting to the server.");
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.");
        }
        console.log(error.config);
      });
  };

  const getRoleData = () => {
    axios
      .get("/api/roles/data/chartdata")
      .then((response) => {
        setRoleData(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("There was an error connecting to the server.");
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.");
        }
        console.log(error.config);
      });
  };

  const getEmployeeData = () => {
    axios
      .get("/api/employees/data/chartdata")
      .then((response) => {
        setEmployeeData(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.statusText);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("There was an error connecting to the server.");
        } else {
          console.log("Error", error.message);
          setErrorMessage("There was an error loading the page.");
        }
        console.log(error.config);
      });
  };

  return (
    <div className="container-fluid mt-5">
      <div className="mb-4">
        <h1 className="text-center">Company Overview</h1>
      </div>
      {errorMessage ? (
        <ErrorModal modalMessage={errorMessage} />
      ) : (
        <div>
          <Row>
            <Col lg={6} md={12} className="mb-5">
              {departments.length > 0 && (
                <Doughnut
                  data={util.formatDataForChart(
                    departments,
                    "name",
                    "departmentUtilization"
                  )}
                  height={400}
                  width={400}
                  options={util.optionsForDepUtilChart(
                    departments,
                    "name",
                    "departmentUtilization"
                  )}
                />
              )}
            </Col>
            <Col lg={6} md={12} className="mb-5">
              {departments.length > 0 && (
                <Doughnut
                  data={util.formatDataForChart(
                    departments,
                    "name",
                    "employees"
                  )}
                  height={400}
                  width={400}
                  options={util.optionsEmployeesPerDeptChart(
                    departments,
                    "employees"
                  )}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12} className="mb-5 pl-4 pr-4">
              {roleData.length > 0 && (
                <Bar
                  data={util.formatDataForChart(
                    roleData,
                    "title",
                    "salary",
                    "Salary ($)"
                  )}
                  height={400}
                  options={util.optionsForSalaryRangeChart(
                    roleData,
                    "title",
                    "salary"
                  )}
                />
              )}
            </Col>
            <Col lg={6} md={12} className="mb-5 pl-4 pr-4">
              {employeeData.length > 0 && (
                <Bar
                  data={util.formatDataForChart(
                    employeeData,
                    "year",
                    "employees_hired",
                    "Employees Hired"
                  )}
                  height={400}
                  options={util.optionsForEmployeesHiredChart()}
                />
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
