import { useEffect, useState } from "react";

function Signup() {
  console.log("component rerendered");
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  // const [myMap, setMyMap] = useState(new Map());

  // const updateMap = (key, value) => {
  //   setMyMap(myMap.set(key, value)); //REVIEW this won't trigger any rerender, because react compares references from"old" map with "new" map, and both have the same.
  //   // setMyMap(new Map(myMap.set(key, value)));//REVIEW this will trigger component rerender, because generates a new map each time. Chose the option that works better
  //   console.log("myMap", myMap);
  // };

  // console.log("myMap", myMap);
  //REVIEW use of for...in to loop over an object an extract undefined values
  // let veryBig;
  // const person = {
  //   name: "raul",
  //   age: 200,
  // };
  // person.headDiameter = veryBig;

  // for (const property in person) {
  //   console.log(`${property}: ${person[property]}`);
  //   if (typeof person[property] === "undefined") {
  //     // do something when a field has an undefined value as value
  //     console.log("one undefined", property);
  //   }
  // }
  const handleAttachPicture = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    // setMyMap(myMap.set(e.target.name, e.target.value));
    // setMyMap(new Map(myMap.set(e.target.name, e.target.value)));
    // console.log("myMap", myMap);
    // updateMap(e.target.name, e.target.value);
  };

  const submitPicture = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    // fetch("http://localhost:5001/api/users/imageUpload", requestOptions)
    fetch(`${serverURL}/api/users/imageUpload`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setNewUser({ ...newUser, userPicture: result.userPicture });
      })
      .catch((error) => console.log("error", error));
  };
  const signup = () => {
    // Check email format, password lenght ...avoid making useless requests to the server
    // console.log("myMap submit", myMap);
    // myMap.forEach((value, key) => {
    //   if (value === "" || value === "undefined") {
    //     console.log(key + "is undefined or empty:", value);
    //   }
    // });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // urlencoded.append("password", myMap.get("password"));
    // urlencoded.append("userName", myMap.get("userName"));
    urlencoded.append("password", newUser.password);
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append(
      "userPicture",
      newUser.userPicture
        ? newUser.userPicture
        : "https://cdn-icons-png.flaticon.com/512/634/634742.png"
    );
    // urlencoded.forEach((value, key) => {
    //   console.log(value + ":" + key);
    // });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    // fetch("http://localhost:5001/api/users/signup", requestOptions)
    fetch(`${serverURL}/api/users/signup`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="show-borders">
      <h2>Signup</h2>

      <div className="container">
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={handleInputChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputChange}
        />
        <label htmlFor="password"> password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleInputChange}
        />

        <form className="container-row">
          <input type="file" name="file" onChange={handleAttachPicture} />
          <button onClick={submitPicture}>upload</button>
        </form>
      </div>

      <button onClick={signup}>Signup</button>
      <div>{newUser && <img src={newUser.userPicture} alt="" />}</div>
    </div>
  );
}

export default Signup;
