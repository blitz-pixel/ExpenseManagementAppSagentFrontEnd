import { useState, useReducer } from "react";
import { api, saveAuthToken } from "../Templates/axiosInstance";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    TextField,
    IconButton,
    InputAdornment,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import "../styles/Login.css";
import { useMutation } from "@tanstack/react-query";

const initialState = {
    credentials: { email: "", password: "" },
    error: "",
    redirect: false,
    snackbar: { open: false, message: "", severity: "success" },
    showPassword: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CREDENTIALS":
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    [action.payload.field]: action.payload.value,
                },
            };

        case "SET_REDIRECT":
            return { ...state, redirect: true };

        case "SET_SNACKBAR":
            return { ...state, snackbar: action.payload };

        case "TOGGLE_PASSWORD":
            return { ...state, showPassword: !state.showPassword };

        default:
            return state;
    }
};

const Login = () => {
    const [login, dispatch] = useReducer(reducer, initialState);

    const handleSubmitQuery = useMutation({
        mutationFn: async (credentialsToPass) => {
            console.log(credentialsToPass);
            const response = await api.post("/Login", credentialsToPass);
            return response;
        },
        onSuccess: (response) => {
            const token = response.headers.get("X-Account-ID");
            console.log(token);
            if (token) {
                saveAuthToken(token);
                dispatch({ type: "SET_REDIRECT" });
            } else {
                console.warn("Token error");
            }
        },
        onError: (error) => {
            console.log(error);
            dispatch({
                type: "SET_SNACKBAR",
                payload: {
                    open: true,
                    message: error.response.data,
                    severity: "error",
                },
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(login.credentials)
        if (!validateForm()){
            return
        }

        handleSubmitQuery.mutate(login.credentials);
    };

    if (login.redirect) {
        return <Navigate to="/Dashboard" state={{ email: login.credentials.email }} />;
    }

    const handleCloseSnackbar = () => {
        dispatch({ type: "SET_SNACKBAR", payload: { ...initialState.snackbar } });
    };

    const handleChange = (e) => {
        dispatch({
            type: "SET_CREDENTIALS",
            payload: { field: e.target.name, value: e.target.value },
        });
    };

    const validateForm = () => {
        if (!login.credentials.email) {
            dispatch({
                type: "SET_SNACKBAR",
                payload: {open: true, message: "Email is required", severity: "error", code: 102}
            })
            return false
        } else if (!/\S+@\S+\.\S+/.test(login.credentials.email)) {
            dispatch({
                type: "SET_SNACKBAR",
                payload: {open: true, message: "Enter a valid email", severity: "error", code: 102}
            })
            return false
        }

        if (!login.credentials.password) {
            dispatch({
                type: "SET_SNACKBAR",
                payload: {open: true, message: "Enter a password", severity: "error", code: 103}
            })
            return false
            // } else if (login.credentials.password.length < 8) {
            //     // dispatch({
            //     //     type: "SET_SNACKBAR",
            //     //     payload: {open: true, message: "Password should be minimum 8 characters", severity: "error", code: 103}
            //     // })
            //     return true
            // }
        }
        return true
    }

    return (
        <>
            <Snackbar
                open={login.snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={login.snackbar.severity}>
                    {login.snackbar.message}
                </Alert>
            </Snackbar>
        <motion.div
            className="login-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit} className="login-form">

                <h2>Login</h2>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="email"
                    label="Email"
                    type="email"
                    value={login.credentials.email}
                    onChange={handleChange}
                    error={login.snackbar.open && login.snackbar.code === 102}
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
                    type={login.showPassword ? "text" : "password"}
                    value={login.credentials.password}
                    onChange={handleChange}
                    // error={login.snackbar.open && login.snackbar.code === 103}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => dispatch({ type: "TOGGLE_PASSWORD" })}
                                    edge="end"
                                >
                                    {login.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="login-btn"
                >
                    Login
                </Button>
                <p className="register-link">
                    Don`t have an account? <Link to="/Registration">Register</Link>
                </p>
                <Link to="/" className="forgot-password-link">
                    Forgot Password?
                </Link>
            </form>
        </motion.div>
    </>
    );
};

export default Login;