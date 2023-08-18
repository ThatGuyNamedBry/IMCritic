import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();
    const demoUserCredentials = {
      email: "demo@aa.io",
      password: "password"
    };
    await dispatch(login(demoUserCredentials.email, demoUserCredentials.password))
      .then(() => {
        closeModal();
        // alert("Demo user logged in 😎");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign in</button>
        <button className="demoUserLink" onClick={demoUserLogin}>Demo User</button>
        <div className="signup-div">
          <p className="signup-text">New to IMCritic?</p>
          <OpenModalButton
            buttonText="Create a New Account"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
