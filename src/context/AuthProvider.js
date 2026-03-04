import React, { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const KEY = "demo_logged_in";

function normalizePhone(s) {
  return (s || "").trim().replace(/[^\d+]/g, "");
}

function isValidE164(phone) {
  // E.164: + then 8-15 digits (simple)
  return /^\+\d{8,15}$/.test(phone);
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(KEY) === "true";
  });

  function login(rawPhone) {
    const phone = normalizePhone(rawPhone);

    // MOCK LOGIC: accept any valid phone format
    if (isValidE164(phone)) {
      localStorage.setItem(KEY, "true");
      setIsLoggedIn(true);
      return { ok: true };
    }

    return { ok: false, message: "Invalid phone number." };
  }

  function logout() {
    localStorage.removeItem(KEY);
    setIsLoggedIn(false);
  }

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}