import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const LoginRegisterForm = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, confirmPassword);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
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
          <TextField
            required
            fullWidth
            type="password"
            id="password-input"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderConfirmPassword = () => {
    return (
      <div className="mb-3">
        <TextField
          required
          fullWidth
          type="password"
          id="confirm-password-input"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="container-fluid max-width-600 mt-4">
      {!loginForm && !registerForm ? (
        <div>
          <button
            className="btn btn-dark mr-4"
            onClick={() => setLoginForm(true)}
          >
            Login
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => setRegisterForm(true)}
          >
            Register
          </button>
        </div>
      ) : null}

      {loginForm || registerForm ? (
        <div>
          <form onSubmit={handleLoginRegistration}>
            {renderFormInputs()}
            {registerForm && renderConfirmPassword()}
            <div>
              <button type="submit" className="btn btn-dark mr-4">
                {loginForm ? "Login" : "Create Account"}
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default LoginRegisterForm;
