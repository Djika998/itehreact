import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dugme from "./Dugme";

const Login = ({ users, user, setUser }) => {
  const [name, setName] = useState("djika");
  const [mail, setMail] = useState("djika@djika.com");

  const history = useHistory();

  const clickLogin = () => {
    const foundUser = users.filter(
      (one) => one.name == name && one.email == mail
    );

    if (foundUser[0]) {
      console.log(foundUser[0]);
      setUser(foundUser[0]);

      history.push("/trainings");
    } else {
      alert("Los log in");
    }
  };

  return (
    <>
      <h1>Login</h1>

      <div className="forma">
        <div>Ime</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>Mail</div>
        <input
          type="text"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <br />
        <br />
        <Dugme
          text="Log in"
          color="rgb(190, 255, 246)"
          click={clickLogin}
        ></Dugme>
      </div>
    </>
  );
};

export default Login;
