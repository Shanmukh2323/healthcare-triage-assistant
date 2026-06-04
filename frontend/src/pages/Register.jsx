import { useState } from "react";
import api from "../services/api";
import "../styles/auth.css";

function Register({ goToLogin }) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("patient");

  const [patientDetails, setPatientDetails] =
    useState({
      full_name: "",
      age: "",
      gender: "",
      phone_number: "",
      preferred_language: "English"
    });

  const getErrorMessage = (error) => {

    const detail =
      error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          const field =
            item.loc?.[item.loc.length - 1];

          return field
            ? `${field}: ${item.msg}`
            : item.msg;
        })
        .join("\n");
    }

    if (typeof detail === "string") {
      return detail;
    }

    return "Registration Failed";
  };

  const register = async () => {

    try {

      if (username.trim().length < 3) {
        alert(
          "Username must be at least 3 characters"
        );

        return;
      }

      if (password.length < 6) {
        alert(
          "Password must be at least 6 characters"
        );

        return;
      }

      const payload = {
        username: username.trim(),
        password,
        role
      };

      if (role === "patient") {
        Object.assign(
          payload,
          {
            ...patientDetails,
            full_name:
              patientDetails.full_name.trim(),
            gender:
              patientDetails.gender.trim(),
            phone_number:
              patientDetails.phone_number.trim(),
            preferred_language:
              patientDetails.preferred_language.trim()
          }
        );
      }

      await api.post(
        "/auth/register",
        payload
      );

      alert(
        "Registration Successful"
      );

      goToLogin();

    } catch (error) {

      alert(
        getErrorMessage(error)
      );
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
          <span>Register</span>
        </div>

      </div>

      <div className="auth-container">

        <div className="auth-image">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Healthcare AI"
          />

        </div>

        <div className="auth-card">

          <h1 className="auth-title">
            Create Account
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

          <select
            className="auth-select"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          >
            <option value="patient">
              Patient
            </option>

            <option value="doctor">
              Doctor
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="asha">
              ASHA Worker
            </option>

          </select>

          {role === "patient" && (
            <>
              <input
                className="auth-input"
                placeholder="Full Name"
                value={patientDetails.full_name}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    full_name: e.target.value
                  })
                }
              />

              <input
                className="auth-input"
                type="number"
                min="0"
                max="130"
                placeholder="Age"
                value={patientDetails.age}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    age: Number(e.target.value)
                  })
                }
              />

              <input
                className="auth-input"
                placeholder="Gender"
                value={patientDetails.gender}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    gender: e.target.value
                  })
                }
              />

              <input
                className="auth-input"
                placeholder="Phone Number"
                value={patientDetails.phone_number}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    phone_number: e.target.value
                  })
                }
              />

              <input
                className="auth-input"
                placeholder="Preferred Language"
                value={patientDetails.preferred_language}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    preferred_language: e.target.value
                  })
                }
              />
            </>
          )}

          <button
            className="auth-btn"
            onClick={register}
          >
            Sign Up
          </button>

          <div className="auth-link">
            Already have an account?{" "}
            <button
              onClick={goToLogin}
            >
              Login
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
