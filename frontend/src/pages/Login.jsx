import { useState } from "react";
import api from "../services/api";
import "../styles/auth.css";

function Login({ goToRegister }) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            username,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      window.location.reload();

    } catch {

      alert("Login Failed");
    }
  };

  return (

    <div className="auth-page">

      <div className="navbar">

        <div className="logo">
          🏥 HealthAI
        </div>

        <div className="nav-links">
          <span>Home</span>
          <span>Features</span>
          <span>Analytics</span>
          <span>Doctors</span>
          <span>Sign In</span>
        </div>

      </div>

      <div className="auth-container">

        <div className="auth-image">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2785/2785544.png"
            alt="Healthcare AI"
          />

        </div>

        <div className="auth-card">

          <h1 className="auth-title">
            Welcome Back
          </h1>

          <input
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="auth-btn"
            onClick={login}
          >
            Login
          </button>

          <div className="auth-link">
            Don't have an account?{" "}
            <button
              onClick={goToRegister}
            >
              Sign Up
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;