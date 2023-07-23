import "../../assets/styles/startScreen.css";

import { loginInToBackend } from "../../utils";

import { useContext, useState } from "react";

import defaultUser from "../../utils/defaultUser";
import { WholeAppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const { changeUser } = useContext(WholeAppContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make sure to define and implement the loginInToBackend function
      const user = await loginInToBackend(
        username,
        email,
        password,
        defaultUser
      );
      await changeUser(user);
      await navigate("/loginScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleLogin(e);
      }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default StartScreen;
