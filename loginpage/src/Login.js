import React, { useState } from "react";
// CSS Module sheet for applying local changes and not passing to children
import styles from "./css/login.module.css";
import Image from "./Images/Image.svg";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import SignupIcon from "./Images/signup.svg";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useHistory } from "react-router-dom";
const currencies = [
  {
    value: "user",
    label: "user",
  },
  {
    value: "admin",
    label: "admin",
  },
];
function Login(props) {
  const [text, setText] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectvalue, setselectvalue] = useState("user");
  const [signuperror, setsignuperror] = useState(false);
  // signuperror checks if user there in database or not while signing up
  const [loginerror, setloginerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  // loginerrror checks password matching with database or not if user exists in database while logging in
  const [totalerror, settotalerror] = useState(false);
  // totalerror checks whether user in database or not while logging in
  // let history = useHistory();
  function handleSignupchange(text, username, adminoruser) {
    if (username !== "" && password !== "") {
      // If both username and password are null then fetch /signup api and then insert data into database after hashing password
      if (password.length < 8) {
        setpassworderror(true);
      } else {
        alert(username);
      }
    } else {
      alert("Please fill the form correctly");
    }
  }
  function handleLoginchange(text, username, adminoruser) {
    alert("Logged in");
  }

  const handleChange = (event) => {
    setselectvalue(event.target.value);
  };
  return (
    <>
      {totalerror ? (
        <Typography
          variant="h4"
          component="h2"
          style={{ textAlign: "center", color: "red" }}
        >
          You haven't signed up yet!!!
        </Typography>
      ) : (
        ""
      )}
      <div className={styles.outerbox}>
        <div className={styles.imageclass}>
          <img
            src={text === "Sign Up" ? SignupIcon : Image}
            className={styles.image}
            alt="Image Here"
          />
        </div>
        <div className={styles.loginask}>
          <Typography variant="h4" component="h2">
            {text}
          </Typography>
          <div style={{ width: "60px" }}>
            <hr
              style={{
                width: "60px",
                backgroundColor: "violet",
                height: "3px",
                borderRadius: "20px",
              }}
            />
          </div>
          <div className={styles.textfields}>
            {text === "Sign Up" ? (
              ""
            ) : (
              <Typography
                variant="h5"
                component="h2"
                style={{ textAlign: "left" }}
              >
                If you have signed up please log in now
              </Typography>
            )}
            <TextField
              id="outlined-basic"
              label="Username"
              type="text"
              helperText="Please enter username"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            {passworderror ? (
              <TextField
                id="outlined-error-helper-text"
                error
                label="Error"
                type="password"
                helperText="Password length must be greater than 7"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            ) : (
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                helperText="Please enter password"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            )}
            {text === "Sign Up" ? (
              <TextField
                id="outlined-select-selectvalue"
                select
                label="Select"
                value={selectvalue}
                onChange={handleChange}
                helperText="Please select User/Admin"
                required
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              ""
            )}
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              type="submit"
              className={styles.buttonchange}
              style={{
                backgroundColor: "green",
                width: "180px",
              }}
              onClick={() => {
                text === "Sign Up"
                  ? handleSignupchange(text, username, selectvalue)
                  : handleLoginchange(text, username);
              }}
            >
              <VpnKeyIcon sx={{ mr: 1 }} />
              {text === "Login" ? "Login" : "Sign Up"}
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              className={styles.buttonchange}
              style={{
                backgroundColor: "red",
                width: "180px",
                marginBottom: "50px",
              }}
              onClick={() => {
                setText(text === "Login" ? "Sign Up" : "Login");
                settotalerror(false);
                setloginerror(false);
                setsignuperror(false);
              }}
            >
              <LoginIcon sx={{ mr: 1 }} />
              {text === "Sign Up" ? "Login" : "Sign Up"}
            </Fab>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
