import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

function Login() {
  const [loginUser, setLoginUser] = useState({});

  const handleInputChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const login = () => {
    // Check email format, password lenght ...avoid making useless requests to the server
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginUser.email);
    urlencoded.append("password", loginUser.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          console.log(result.token);
          localStorage.setItem("token", result.token);
          setLoginUser(result.user);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginUser(null);
  };
  useEffect(() => {
    const token = getToken();

    if (token) {
      console.log("LOGGED IN");
    } else {
      console.log("NOT logged in");
    }
  }, [loginUser]);

  return (
    <div className="show-borders">
      <button style={{ backgroundColor: "red" }} onClick={logout}>
        logout
      </button>
      <h2>Login</h2>

      <div className="container">
        <label htmlFor="login-email">email</label>
        <input
          type="email"
          name="email"
          id="login-email"
          onChange={handleInputChange}
        />
        <label htmlFor="login-password"> password</label>
        <input
          type="password"
          name="password"
          id="login-password"
          onChange={handleInputChange}
        />
      </div>

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
