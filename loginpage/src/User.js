import React, { useContext } from "react";
import { MyContext } from "./App";
import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useHistory } from "react-router-dom";
function User() {
  const { useroradmin, username, signuporsignin } = useContext(MyContext);
  let history = useHistory();
  if (username !== "" && username!==null) {
    console.log(username)
    return (
      <div>
        <Typography variant="h4">
          Hello {useroradmin} Your username is {username} and you have{" "}
          {signuporsignin} just now
        </Typography>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          style={{
            backgroundColor: "red",
            width: "180px",
            marginBottom: "50px",
          }}
          onClick={() => {
            localStorage.clear();
            history.push("/");
            window.addEventListener("popstate", function () {
              history.push("/");
            });
          }}
        >
          <LoginIcon sx={{ mr: 1 }} />
          Log out
        </Fab>
      </div>
    );
  }
  else 
  {
    return <h1>Error!!!</h1>
  }
}

export default User;
