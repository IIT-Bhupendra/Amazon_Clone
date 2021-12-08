import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import db from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();
  const signIn = (e) => {
    e.preventDefault();
    // Firebase Login Stuff Here
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__box">
        <h2 className="login__title">Sign-In</h2>
        <form>
          <div className="login__inputDiv">
            <label htmlFor="email">Email</label>
            <input
              className="login__input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__inputDiv">
            <label htmlFor="password">Password</label>
            <input
              className="login__input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={signIn} type="submit" className="btn login__button">
            Sign-In
          </button>
        </form>
        <small className="login__tnc">
          By continuing, you agree to Amazon Clone's Conditions of Use and
          Privacy Notice.
        </small>
      </div>
      <h4 className="divider">
        <span>New to Amazon?</span>
      </h4>
      <form>
        <button onClick={signUp} className="btn register__button">
          Create Your Account
        </button>
      </form>
    </div>
  );
}

export default Login;
