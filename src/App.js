import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}