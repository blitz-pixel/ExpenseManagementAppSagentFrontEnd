"use client"

import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { TextField, IconButton, InputAdornment, Button, Snackbar } from "@mui/material"
import { Visibility, VisibilityOff, PersonAdd, Email, Lock } from "@mui/icons-material"
import "./Registration.css"

const Registration = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8080/api/v1/Registration", formData)
        console.log(response)
        setSnackbar({ open: true, message: "User registered successfully", severity: "success" })
      } catch (error) {
        console.error("Error during registration:", error)
        setSnackbar({ open: true, message: "Registration failed", severity: "error" })
      }
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="userName"
          label="Username"
          value={formData.userName}
          onChange={handleChange}
          error={!!errors.userName}
          helperText={errors.userName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonAdd />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
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
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" className="submit-btn">
          Register
        </Button>
        <p className="login-link" style={{ color: "#2c2c2c" }}>
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </motion.div>
  )
}

export default Registration

