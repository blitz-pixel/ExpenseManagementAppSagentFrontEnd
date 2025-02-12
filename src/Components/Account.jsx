import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Box, CircularProgress, Typography, Paper, Alert } from "@mui/material";

function Account() {
    const location = useLocation();
    const key = localStorage.getItem("token");
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!key) return;

            try {
                const response = await axios.get("http://localhost:8080/api/v1/account", {
                    headers: {
                        Authorization: `Bearer ${key}`
                    }
                });

                setAccount(response.data);
            } catch (err) {
                setError("Failed to load account details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [key]);

    // Redirect if the user is not logged in
    if (!key || key === "undefined") {
        return <Navigate to="/Login" />;
    }

    // Decode token to get user info
    let user = {};
    try {
        user = jwtDecode(key);
    } catch (error) {
        console.error("Invalid Token:", error);
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Paper elevation={6} sx={{ padding: 4, textAlign: "center", maxWidth: 400, borderRadius: 3 }}>
                    <Typography variant="h5" gutterBottom>Welcome, {user.email || "User"}!</Typography>
                    <Typography variant="body1">Your Account Details:</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {JSON.stringify(account, null, 2)}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}

export default Account;
