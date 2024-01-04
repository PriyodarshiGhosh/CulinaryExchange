import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Recipe created by you</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Publicly uploaded recipes</Link>
      <Link to="/search">Search</Link>
      {!cookies.access_token ? (
        <>
        <Link to="/login">Login</Link>,
        <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};