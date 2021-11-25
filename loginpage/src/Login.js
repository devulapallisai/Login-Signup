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
  const [passworderror,setpassworderror]=useState(false);
  // loginerrror checks password matching with database or not if user exists in database while logging in
  const [totalerror, settotalerror] = useState(false);
  // totalerror checks whether user in database or not while logging in
  let history = useHistory();
  function handleSignupchange(text, username, adminoruser) {
    if (username !== "" && password !== "") {
      // If both username and password are null then fetch /signup api and then insert data into database after hashing password
      fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username,
          userpass: password,
          typeuser: selectvalue,
        }),
      }).then((response) => {
        if (response.ok) {
          // If response is not any internal server error or any 404 kind of
          response.json().then((data) => {
            if (!data.error) {
              // If user already exist in database /signup api sends json data as {"error":true} so if we use !data.error we are checking whether person signing up is already there in database or not for not duplicating database entries
              props.alert(text, username, adminoruser);
               // Here we are redirecting to /user or /admin conditionally after signing up 
              history.push(`/${adminoruser}`);
            } else {
              setsignuperror(true);
            }
          });
        } else {
          // If there is any internal server error or any kind of problem resulting in bad request 404 or 501
          history.push(`/error`);
        }
      });
    } else {
      // If any of username and password are null then we return alert to fill form correctly
      alert("Please fill the form correctly");
    }
  }
  function handleLoginchange(text, username, adminoruser) {
    if (username !== "" && password !== "") {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, userpass: password }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (!data.error) {
              setloginerror(false);
              adminoruser = data.typeuser;
              // I am passing props from Child component to Parents componennt via a function called alert in database which is a function and in App.js I am creating context and passing all username,typeofuser,typeofentry(login/signup) to all child components
              props.alert(text, username, adminoruser);

              // Here we are redirecting to /user or /admin conditionally after logging in
              history.push(`/${adminoruser}`);
            } else {
              if(password.length<8){
                setpassworderror(true)
              }else{
                setloginerror(true);
              }
              // If database return password not matching but username exists /login api returns json data {"error":true} which we use for checking password incorrect or not
            }
          });
        } else {
          settotalerror(true);
          // If database return user donot exist in database not matching /login api 
        }
      });
    } else {
      alert("Please fill the form correctly");
    }
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
            {signuperror ? (
              <TextField
              error
              id="outlined-error-helper-text"
              label="Error"
              type="text"
              helperText='You have already signed up'
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            ) : (
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
            )}
            {loginerror ? (
              <TextField
                id="outlined-error-helper-text"
                error
                label="Error"
                type="password"
                helperText="Please enter correct password"
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
