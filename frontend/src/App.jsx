import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import api from "./services/api";



function App() {

  const [page, setPage] =
    useState("landing");

  const token =
    localStorage.getItem("token");

  const logout = async () => {

    try {
      await api.post("/auth/logout");
    } catch {
      // Local logout should still complete if the server session is already gone.
    }

    localStorage.removeItem(
      "token"
    );

    window.location.reload();
  };

  if (token) {

    return (
      <Home
        logout={logout}
      />
    );
  }

  if (page === "register") {

    return (
      <Register
        goToLogin={() =>
          setPage("login")
        }
      />
    );
  }

  if (page === "landing") {
    return (
      <LandingPage
        goToLogin={() =>
          setPage("login")
        }
      />
    );
  }

  return (
    <Login
      goToRegister={() =>
        setPage("register")
      }
    />
  );
}

export default App;
