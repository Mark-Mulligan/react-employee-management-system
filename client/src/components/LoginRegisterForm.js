import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import PasswordInput from "../components/inputs/PasswordInput";

const LoginRegisterForm = ({ history, setUserLoggedIn }) => {
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginRegistration = async (e) => {
    e.preventDefault();
    if (loginForm) {
      try {
        const response = await axios.post("/api/auth/login", {
          username,
          password,
        });
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setUserLoggedIn(true);
        history.push("/dashboard");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        alert(err.response.data.message);
      }
    } else if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    } else {
      try {
        const response = await axios.post("/api/auth/register", {
          username,
          password,
        });
        console.log(response);
      } catch (err) {
        console.log(err.response);
        alert(err.response.data.message);
      }
    }
  };

  const handleCancel = () => {
    loginForm ? setLoginForm(false) : setRegisterForm(false);
  };

  const renderFormInputs = () => {
    return (
      <div>
        <h2>{loginForm ? "Login" : "Creat New Account"}</h2>
        <div className="mb-3">
          <TextField
            required
            fullWidth
            id="username-input"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <PasswordInput
            password={password}
            setPassword={setPassword}
            inputId="password-input"
            label="Password"
          />
        </div>
      </div>
    );
  };

  const renderConfirmPassword = () => {
    return (
      <div className="mb-3">
        <PasswordInput
          password={confirmPassword}
          setPassword={setConfirmPassword}
          inputId="confirm-password-input"
          label="Confirm Password"
        />
      </div>
    );
  };

  return (
    <div className="container-fluid max-width-600 mt-4">
      {!loginForm && !registerForm ? (
        <div>
          <Button
            className="mr-4"
            variant="light"
            onClick={() => setLoginForm(true)}
          >
            Login
          </Button>
          <Button
            className="mr-4"
            variant="outline-light"
            onClick={() => setRegisterForm(true)}
          >
            Create Account
          </Button>
        </div>
      ) : null}

      {loginForm || registerForm ? (
        <div>
          <form onSubmit={handleLoginRegistration}>
            {renderFormInputs()}
            {registerForm && renderConfirmPassword()}
            <div>
              <Button className="mr-4" variant="light" type="submit">
                {loginForm ? "Login" : "Create Account"}
              </Button>
              <Button onClick={handleCancel} variant="outline-light">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default LoginRegisterForm;
