import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function normalizePhone(s) {
  return (s || "").trim().replace(/[^\d+]/g, "");
}

function validatePhone(raw) {
  const phone = normalizePhone(raw);

  if (phone === "+") return "Phone number is required.";
  if (!/^\+\d{8,15}$/.test(phone)) return "Enter a valid international phone number.";
  return "";
}

export default function LoginPage() {
  const nav = useNavigate();
  const { isLoggedIn, login } = useAuth();

  const [phone, setPhone] = useState("+");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isLoggedIn) nav("/", { replace: true });
  }, [isLoggedIn, nav]);

  function onChangePhone(e) {
    let v = e.target.value;

    // keep '+' always present
    if (!v.startsWith("+")) v = "+" + v.replace(/\+/g, "");
    v = normalizePhone(v);

    // never allow empty string; minimum is "+"
    if (v.length === 0) v = "+";

    setPhone(v);
    if (err) setErr("");
  }

  function onSubmit(e) {
    e.preventDefault();

    const v = validatePhone(phone);
    if (v) {
      setErr(v);
      return;
    }

    const r = login(phone);
    if (!r.ok) {
      setErr("Login failed. Please try again.");
      return;
    }

    nav("/", { replace: true });
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>

        <form className="stack" onSubmit={onSubmit}>
          <div className="stack" style={{ gap: 6 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>
              Phone number
            </label>

            <input
              className="input"
              type="tel"
              inputMode="tel"
              placeholder="+1234567890"
              value={phone}
              onChange={onChangePhone}
            />

            {err ? <div className="error">{err}</div> : null}
          </div>

          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}