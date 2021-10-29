import Login from "./Login";
import React, { useState,createContext,useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Admin from "./Admin";
import User from "./User";
import Error from "./Error";

const MyContext = createContext("");
// creating context
function App() {
  const [selectvalue, setselectvalue] = useState("");
  const [username, setusername] = useState("");
  const [text, settext] = useState("");
  function takedata(text, username, selectvalue) {
    // passing data from login.js to parent component and useing this to set the values in this component like setusername and all and passing through all child. I have used contextapi/contexthook here 
    setselectvalue(selectvalue)
    settext(text)
    setusername(username)
    // setting data from login to this variables
    localStorage.setItem("text", text);
    localStorage.setItem("selectvalue", selectvalue);
    localStorage.setItem("username", username);
    // stroing the data  in localstorage 
    // storing 
  }
  // using data to set again once page reload on dependency of changing username
  useEffect(()=>{
    setusername(localStorage.getItem("username"))
  },[username])
  useEffect(()=>{
    setselectvalue(localStorage.getItem("selectvalue"))
  },[username])
  useEffect(()=>{
    settext(localStorage.getItem("text"))
  },[username])
  return (
    <div className="App">
      <Router>
        <Switch>
          <MyContext.Provider
            value={{
              useroradmin: selectvalue,
              username: username,
              signuporsignin: text,
            }}
          >
            <Route exact path="/">
              <Login alert={takedata} />
            </Route>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/user" component={User} />
            <Route exact path="/error" component={Error} />
          </MyContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
export { MyContext };