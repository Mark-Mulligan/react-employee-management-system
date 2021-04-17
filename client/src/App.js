import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
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
import RolesPage from "./pages/RolesPage";
import RolePage from "./pages/RolePage";
import CreateRolePage from "./pages/CreateRolePage";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "./App.css";


const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  root: {
    background: 'rgb(35,35,35);',
    color: 'rgba(220,220,215,255)',
    fontFamily: 'Roboto, sans-serif'
  },
});

function App() {
  const classes = useStyles();
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
    console.log("use effect in app ran");
    checkForLoggedInUser();
  }, []);

  return (
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
