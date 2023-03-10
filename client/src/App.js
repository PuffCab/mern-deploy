import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import Signup from "./views/Signup";
import Login from "./views/Login";
import { getToken } from "./utils/getToken";
import Profile from "./views/Profile";

function App() {
  const fetchData = async () => {
    const response = await fetch("http://localhost:5001/api/cities/all");
    const data = await response.json();
    console.log("data :>> ", data);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  // useEffect(() => {
  //   fetchData();
  //   const token = getToken();

  //   if (token) {
  //     console.log("LOGGED IN");
  //   } else {
  //     console.log("NOT logged in");
  //   }
  // }, []);

  return (
    <div className="App">
      <h1>Travel App</h1>
      <button style={{ backgroundColor: "red" }} onClick={logout}>
        Logout
      </button>
      <Signup />
      <Login />
      <Profile />
    </div>
  );
}

export default App;
