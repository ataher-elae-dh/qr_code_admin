// AuthButton.jsx
import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      try {
        await logout(); // Log out user
        navigate("/login"); // Redirect to login after logout
      } catch (err) {
        console.error("Logout failed:", err);
      }
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
    >
      {user ? "Logout" : "Login"}
    </button>
  );
}
