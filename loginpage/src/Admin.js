import React, { useContext } from "react";
import { MyContext } from "./App";
import { Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useHistory } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";

function Admin() {
  let history = useHistory();
  // using context provided values and embedding in text
  const { useroradmin, username, signuporsignin } = useContext(MyContext);
  if (username !== "" && username !== null) {
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
            // onclicking send to home page again with clearing all local storage and therefore clearing all passed data in the session further
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
  } else {
    return <h1>Error!!!</h1>;
  }
}
export default Admin;
