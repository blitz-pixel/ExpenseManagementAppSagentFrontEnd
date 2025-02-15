import {Navigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api, logout, saveAuthToken} from "../Templates/axiosInstance.js";
import {v4 as uuidv4} from "uuid";
import {Avatar, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography,Box} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";


const token = localStorage.getItem("accountId");
function Account () {
    const queryClient = useQueryClient();

    const [accountData, setAccountData] = useState({
        accountName : "",
        accountType : "",
    })
    const [redirect,setRedirect] = useState(false)
    const [snackbar,setSnackbar] = useState({
            open: false, message: "", severity: ""
    })
    const { data : Accounts, isLoading, error } = useQuery({
        queryKey: ["accounts", token],
        queryFn: async () => {
            const response = await api.get(`/account/profiles?accountId=${token}`);
            return (Array.isArray(response.data) ? response.data : [])
        },
    });

    const SwitchAccounts= (accountId) => {
        if (token) localStorage.removeItem("accountId");
        saveAuthToken(accountId);
        queryClient.invalidateQueries(["accounts"])
        setRedirect(true);
    }

    const addAccount = useMutation({
        mutationFn : async (accountData) => {
            const response = await api.post(`/account/add?accountId=${token}`,accountData);
            return response
        },
        onSuccess : () => {
            setSnackbar({open: true, message: "Account Added Successfully", severity: "success"})
        },
        onError : (error) => {
            setSnackbar({open: true, message: error.response.data, severity: "error"})
        }
    })

    if (isLoading){
        return (
            <Box>
                <CircularProgress/>
            </Box>
        )
    }
    if (redirect){
        return <Navigate to="/Dashboard"/>
    }


    // } else {
    //     return
    // }

    return (
        <div style={{
            textAlign: "center",
            padding: "3rem",
            minHeight: "100vh",
            width: "90%",
            maxWidth: "1400px",
            margin: "0 auto",
            color: "white",
        }}>

            <Grid container spacing={3} justifyContent="center">

                {Accounts.map((account) => (
                    <Grid item key={account.accountId} sx={{ display: "flex", justifyContent: "center" , padding: "10px",marginTop: "150px"}}>
                        <Card
                            sx={{
                                width: 180,
                                textAlign: "center",
                                background: "rgba(255, 255, 255, 0.05)",
                                color: "white",
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.3)",
                                backdropFilter: "blur(20px)",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 6px 25px rgba(255, 215, 0, 0.5)",
                                }
                            }}
                            onClick={() => SwitchAccounts(account.accountId)}
                        >
                            <CardActionArea>
                                <Avatar
                                    src={account.avatarUrl || "/default-avatar.png"}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        margin: "15px auto",
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "white", fontWeight: "bold" }}
                                    >
                                        {account.accountName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

                <Grid item  sx={{ display: "flex", justifyContent: "center" , padding: "10px",marginTop: "150px"}}>
                    <Card
                        sx={{
                            width: 150,
                            textAlign: "center",
                            background: "rgba(255, 255, 255, 0.1)", // Optional glass effect
                            backdropFilter: "blur(10px)", // Optional glass effect
                            cursor: "pointer"
                        }}
                        // onClick={handleAddProfile} // Define this function for adding new profiles
                    >
                        <CardActionArea sx={{ padding: "20px" }}>
                            <AddCircleOutline sx={{ fontSize: 60, color: "#FFD700" }} />
                            <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "bold" }}>
                                Add Profile
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>

    );
}

export default Account;