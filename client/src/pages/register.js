import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MY_IP } from "../constants";
export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const result=await axios.post(MY_IP+"/auth/register", {
          username,
          password,
        });
        console.log(result);
        if(result.data.message=='User already exists'){
          throw new Error("user exists")

        }
        alert("Registration Completed! Now login.");
      } catch (error) {
        alert("user exists")
        console.error(error);
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };