"use client"

import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Email and password are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/v1/Login", credentials);
      if (response.status === 200) {
        const token = response.headers["X-Account-ID"];
        if (token) localStorage.setItem("accountId", token);
        setRedirect(true);
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Invalid email or password", severity: "error" });
    }
  };

  if (redirect) {
    return <Navigate to="/Account" state={{ email: credentials.email }} />;
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <motion.div className="login-container" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="email"
          label="Email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" className="login-btn">
          Login
        </Button>
        <p className="register-link">
          Don`t have an account? <Link to="/Registration">Register</Link>
        </p>
        <Link to="/" className="forgot-password-link">Forgot Password?</Link>
      </form>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbar.message} severity={snackbar.severity} />
    </motion.div>
  );
};

export default Login;