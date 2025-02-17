import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import {api} from "../Templates/axiosInstance.js";
import { motion } from "framer-motion"
import {TextField, IconButton, InputAdornment, Button, Snackbar, Alert, CircularProgress} from "@mui/material"
import { Visibility, VisibilityOff, PersonAdd, Email, Lock } from "@mui/icons-material"
// import PersonIcon from '@mui/icons-material/Person';
import "../styles/Registration.css"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Contact} from "lucide-react";


const initialState = {
    showPassword : false,
    redirectLogin : false,
    snackbar : {
        open: false, message: "", severity: "",code : 0
    },
    formData : {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
}

const reducer = (state,action) =>{
    switch (action.type){
        case "ADD_USER":
            return {...state, formData: {...state.formData, [action.payload.field] : action.payload.value}}
        case "RESET_USER":
            return {...state,formData: {...initialState.formData}}
        case "SET_SNACKBAR":
            return {...state, snackbar: action.payload}
        case "TOGGLE_PASSWORD":
            return { ...state, showPassword: !state.showPassword }
        case "SET_LOGIN":
            return {...state,redirectLogin: !state.redirectLogin}
        default:
            return state
    }
}
const Registration = () => {
    // const queryClient = useQueryClient();
    const [register, dispatch] = useReducer(reducer, initialState)

    const handleChange = (e) => {
        dispatch({type : "ADD_USER", payload: {field : e.target.name, value: e.target.value}})
        dispatch({type: "SET_SNACKBAR",payload: {open: false, message: "", severity: "",code : 0} })
        // setSnackbar({open: false, message: "", severity: ""})
    }
    const validateForm = () => {
        if (!register.formData.userName) {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message: "Username is required", severity: "error",code: 101}})
            return false
        }

        if (!register.formData.email) {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message: "Email is required", severity: "error",code : 102}})
            return  false
        } else if (!/\S+@\S+\.\S+/.test(register.formData.email)) {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message: "Enter a valid email", severity: "error",code: 102}})
            return  false
        }

        if (!register.formData.password) {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message: "Enter a password", severity: "error",code : 103}})
            return  false
        } else if (register.formData.password.length < 8) {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message: "Password should be minimum 8 characters", severity: "error",code : 103}})
            return false
        }

        if (register.formData.password !== register.formData.confirmPassword) {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message:  "Passwords don't match", severity: "error",code : 104}})

            return false
        }

        return true

    }

    const handleSubmitRequest = useMutation({
        mutationFn: async (formData) => {
            console.log(formData)
            const response = await api.post("/user/registration", formData)
            return response.data
        },
        onSuccess: () => {
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message:  "User registered Successfully", severity: "success"}})
            dispatch({type: "SET_LOGIN"})
        },
        onError: (error) => {
            const errorToDisplay = error.response.data || "Registration failed";
            dispatch({type: "SET_SNACKBAR",payload: { open: true, message:  errorToDisplay, severity: "error"}})
        }
    })
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        handleSubmitRequest.mutate(register.formData);
        dispatch({type : "RESET_USER"})
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") return;

        dispatch({
            type: "SET_SNACKBAR",
            payload: { open: false, message: "", severity: "" }
        });
    };


    if(handleSubmitRequest.isPending){
        return (
            <CircularProgress  sx={{color: "#7c5f13"}}/>
        )
    }
    if (register.redirectLogin){
        return <Navigate  to="/Login" />
    }
    return (
        <>
        <Snackbar
            open={register.snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={register.snackbar.message}
            // anchorOrigin={{vertical: "bottom" , horizontal: "right"}}
        >
            <Alert onClose={handleCloseSnackbar} severity={register.snackbar.severity}>
                {register.snackbar.message}
            </Alert>
        </Snackbar>
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
                    label="userName"
                    type="text"
                    value={register.formData.userName}
                    error={register.snackbar.open && register.snackbar.code === 101}
                    onChange={handleChange}
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
                    value={register.formData.email}
                    onChange={handleChange}
                    error={register.snackbar.open  && register.snackbar.code === 102}
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
                    type={register.showPassword ? "text" : "password"}
                    value={register.password}
                    error={register.snackbar.open  && register.snackbar.code === 103}
                    onChange={handleChange}
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
                                    onClick={() => dispatch({type: "TOGGLE_PASSWORD"})}
                                    edge="end"
                                >
                                    {register.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    type={"password"}
                    value={register.formData.confirmPassword}
                    error={register.snackbar.open && register.snackbar.code === 104}
                    onChange={handleChange}
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

        </motion.div>
        </>
    )
}

export default Registration;