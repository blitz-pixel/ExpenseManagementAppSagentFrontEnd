import {Navigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api, logout, saveAuthToken} from "../Templates/axiosInstance.js";
import {v4 as uuidv4} from "uuid";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    Box,
    DialogActions,
    Dialog,
    Button,
    TextField,
    Select,
    DialogTitle,
    DialogContent,
    MenuItem,
    Snackbar,
    Alert,
    InputLabel,
    FormControl
} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";



function Account () {
    const token = localStorage.getItem("accountId");
    const queryClient = useQueryClient();
    const [accountData, setAccountData] = useState({
        accountName : "",
        accountType : "",
    })
    const [redirect,setRedirect] = useState(false)
    const [snackbar,setSnackbar] = useState({
            open: true, message: "", severity: "",code : 0
    })
    const [open,setOpen] = useState(false)
    const { data: Accounts = [], isLoading,isError } = useQuery({
        queryKey: ["accounts", token],
        queryFn: async () => {
            try {
                const response = await api.get(`/account/profiles?accountId=${token}`);
                return Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                setSnackbar({ open: true, message: error.response?.data || "An error occurred", severity: "error", code: 101});
                throw error;
            }
        },
    });



    const SwitchAccounts= (accountId) => {
        if (token) localStorage.removeItem("accountId");
        saveAuthToken(accountId);
        queryClient.invalidateQueries(["accounts"])
        setRedirect(true);
    }

    const handleClose = () => {
        setOpen(false)
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

    const addAccountHandler = () => {
        addAccount.mutate(accountData);
    }


    const handleChange = (field, value) => {
        setAccountData((prev) => ({ ...prev, [field]: value }));
    };


    if (isLoading) {
        return (
            <Box>
                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="info">
                    {"Loading..."}
                </Alert>
            </Snackbar>
                <CircularProgress />
            </Box>
        );
    }

    if (isError){
        return(
        <Box>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {"Error fetching data"}
                </Alert>
            </Snackbar>
        </Box>
        )
    }



    if (redirect){
        return <Navigate to="/Dashboard"/>
    }


    // } else {
    //     return
    // }

    function handleCloseSnackbar() {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }

    return (
        <div style={{
            textAlign: "center",
            padding: "3rem",
            height: "100vh",
            width: "90%",
            maxWidth: "1400px",
            margin: "0 auto",
            color: "white",
            overflow : "hidden"
        }}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    { snackbar.message}
                </Alert>
            </Snackbar>


            <Grid container spacing={3} justifyContent="center">

                {(Accounts || []).map((account) => (
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

                <Grid item sx={{ display: "flex", justifyContent: "center" , padding: "10px",marginTop: "210px"}} >
                    <AddCircleOutline
                        sx={{ fontSize: 60, color: "#FFD700", cursor: "pointer" }}
                        onClick={() => setOpen(true)}
                    />
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    sx={{
                        "& .MuiDialog-paper": {
                            background: "rgba(20, 20, 20, 0.95)", // Dark background with slight transparency
                            border: "2px solid #b8860b", // Golden border
                            borderRadius: "12px",
                            color: "white",
                            boxShadow: "0px 4px 10px rgba(184, 134, 11, 0.5)",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1.5rem",
                            color: "#FFD700",
                        }}
                    >
                        Add New Profile
                    </DialogTitle>

                    <DialogContent>
                        <TextField
                            label="Account Name"
                            fullWidth
                            margin="dense"
                            value={accountData.accountName}
                            onChange={(e) => handleChange("accountName", e.target.value)}
                            InputLabelProps={{
                                sx: {
                                    color: "black", // Default color
                                    "&.Mui-focused": {
                                        color: "#FFD700", // Gold color when focused
                                    },
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "black",
                                    "& fieldset": { borderColor: "#b8860b" }, // Gold outline
                                    "&:hover fieldset": { borderColor: "#FFD700" },
                                    "&.Mui-focused fieldset": { borderColor: "#FFD700" }, // Gold outline when focused
                                },
                                "& .MuiInputBase-input": {
                                    color: "black",
                                },
                            }}
                        />

                        <FormControl fullWidth sx={{ marginTop: "15px" }}>
                            <Select
                                value={accountData.accountType || ""}
                                onChange={(e) => handleChange("accountType", e.target.value)}
                                displayEmpty
                                fullWidth
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        color: "black",
                                        "& fieldset": { borderColor: "#b8860b" }, // Gold outline
                                        "&:hover fieldset": { borderColor: "#FFD700" },
                                        "&.Mui-focused fieldset": { borderColor: "#FFD700" }, // Gold outline when focused
                                    },
                                    "& .MuiInputBase-input": { color: "black" }, // Input text color
                                }}>
                                <MenuItem value="" disabled>
                                    <Typography sx={{ color: "black" }}>Select Account Type</Typography> {/* Ensure text is white */}
                                </MenuItem>
                                <MenuItem value="personal">
                                    <Typography sx={{ color: "black" }}>Personal</Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={handleClose}
                            sx={{
                                color: "#FFD700",
                                fontWeight: "bold",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {addAccountHandler(); handleClose();}}
                            disabled={!accountData.accountName || !accountData.accountType}
                            sx={{
                                background: "#b8860b",
                                color: "black",
                                fontWeight: "bold",
                                fontFamily: "Poppins, sans-serif",
                                "&:hover": {
                                    background: "#FFD700",
                                },
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        </div>

    );
}

export default Account;