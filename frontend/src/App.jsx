import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";



function App() {

  const [page, setPage] =
    useState("landing");

  const token =
    localStorage.getItem("token");

  const logout = () => {

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