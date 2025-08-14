import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import UserLoginPage from "./components/UserLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import { AppProvider } from "./components/AppContext";

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
