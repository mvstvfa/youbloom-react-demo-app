import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Header() {
  const nav = useNavigate();
  const loc = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const onLoginPage = loc.pathname === "/login";

  return (
    <div className="card row space" style={{ marginBottom: 14 }}>
      <div className="row" style={{ gap: 10 }}>
        <Link to="/" style={{ fontWeight: 800, letterSpacing: 0.2 }}>
          React Demo App
        </Link>
        <span className="badge">{isLoggedIn ? "Logged in" : "Guest"}</span>
      </div>

      <div className="row" style={{ gap: 10 }}>
        {isLoggedIn ? (
          <button
            className="btn ghost"
            onClick={() => {
              logout();
              nav("/login");
            }}
          >
            Logout
          </button>
        ) : onLoginPage ? null : (
          <Link className="btn ghost" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}