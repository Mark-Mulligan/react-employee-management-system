import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import PrivateRoute from "./routing/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import BoostrapNavbar from "./components/navigation/BootstrapNavbar";
import AllEmployeesPage from "./pages/AllEmployeesPage";
import EmployeePage from "./pages/EmployeePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentPage from "./pages/DepartmentPage";
import CreateDepartmentPage from "./pages/CreateDepartmentPage";
import EditDepartmentPage from "./pages/EditDepartmentPage";
import RolesPage from "./pages/RolesPage";
import RolePage from "./pages/RolePage";
import CreateRolePage from "./pages/CreateRolePage";
import EditRolePage from "./pages/EditRolePage";
import EditEmployeePage from "./pages/EditEmployeePage";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const checkForLoggedInUser = async () => {
    try {
      const response = await axios.get("/api/auth/user");
      if (response.data) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkForLoggedInUser();
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage
                  {...props}
                  userLoggedIn={userLoggedIn}
                  setUserLoggedIn={setUserLoggedIn}
                />
              )}
            />

            <Route component={BoostrapNavbar} />
          </Switch>

          <PrivateRoute
            exact
            path="/dashboard"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={AnalyticsPage}
          />
          <PrivateRoute
            exact
            path="/employees"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={AllEmployeesPage}
          />
          <PrivateRoute
            exact
            path="/employees/new"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={CreateEmployeePage}
          />
          <PrivateRoute
            exact
            path="/employee/:id"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={EmployeePage}
          />
          <PrivateRoute
            exact
            path="/employee/:id/edit"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={EditEmployeePage}
          />
          <PrivateRoute
            exact
            path="/departments"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={DepartmentsPage}
          />
          <PrivateRoute
            exact
            path="/departments/new"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={CreateDepartmentPage}
          />
          <PrivateRoute
            exact
            path="/department/:id"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={DepartmentPage}
          />
          <PrivateRoute
            exact
            path="/department/:id/edit"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={EditDepartmentPage}
          />

          <PrivateRoute
            exact
            path="/roles"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={RolesPage}
          />
          <PrivateRoute
            exact
            path="/roles/new"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={CreateRolePage}
          />
          <PrivateRoute
            exact
            path="/role/:id"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={RolePage}
          />
          <PrivateRoute
            exact
            path="/role/:id/edit"
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            component={EditRolePage}
          />
        </BrowserRouter>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
