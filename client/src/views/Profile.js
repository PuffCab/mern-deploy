import React, { useState } from "react";
import { getToken } from "../utils/getToken";

function Profile() {
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const getProfile = () => {
    const token = getToken();

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch("http://localhost:5001/api/users/profile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setUserProfile({
            userName: result.user.userName,
            email: result.user.email,
            userPicture: result.user.userPicture,
          });
          setError(null);
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log("you need to Login first");
      setError("you need to Login first");
      setUserProfile(null);
    }
  };

  return (
    <div>
      <h3>User Profile</h3>
      <button onClick={getProfile}>get profile</button>
      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
          <p>{userProfile.email}</p>
          <img
            style={{ width: "100px" }}
            src={userProfile.userPicture}
            alt=""
          />
        </div>
      )}
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
    </div>
  );
}

export default Profile;
