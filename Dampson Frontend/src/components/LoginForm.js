import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toastShownRef = useRef(false); // Ref to track toast message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role, userId } = data;
        login(username, token, role, userId);
        if (!toastShownRef.current) {
          toast.success("Login successful!");
          toastShownRef.current = true; // Ensure toast is shown only once
        }
        navigate(role === 'ROLE_DOCTOR' ? '/doctordashboard' : '/dashboard');
      } else if (response.status === 401 || response.status === 500) {
        toast.error("Incorrect username or password. Please try again.");
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="modal__header">Login</h2>
      {loading ? (
        <div className="spinner">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <form className="modal__form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button className="btn" type="submit" disabled={loading}>
            Login
          </button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
