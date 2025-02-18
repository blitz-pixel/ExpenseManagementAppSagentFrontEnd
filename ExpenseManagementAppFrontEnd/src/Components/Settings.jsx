import { useState } from "react";
import {
    Avatar,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent, DialogActions, Alert, Snackbar, CircularProgress
} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {api} from "../Templates/axiosInstance.js";

const token = localStorage.getItem("accountId");

export default function Settings() {
    console.log(token)
    const [avatar, setAvatar] = useState(null);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const [dialog,setDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error"});
    const updateDetails = useMutation({
        mutationFn: async (formData) => {
            const response = await api.put(`/user/update?accountId=${token}`,formData);
            return response;
        },
        onSuccess: (response) => {
            console.log(response)
            setSnackbar({ open: true, message: response.data, severity: "success" });
        },
        onError:  (error) => {
            setSnackbar({ open: true, message: error.response.data.message || "Some error occurred", severity: "error" });
        }
    })
    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const removeAvatar = () => setAvatar(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isLoading = updateDetails.isPending;

    if (isLoading){
        return (<>
        <CircularProgress sx={{ color: "#7c5f13" }} />
        </>)
    }

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <Avatar src={avatar || "https://via.placeholder.com/150"} style={{ width: 100, height: 100 }} />
                <div style={{ display: "flex", gap: "10px" }}>
                    <input type="file" onChange={handleAvatarUpload} style={{ display: "none" }} id="avatar-upload" />
                    <label htmlFor="avatar-upload">
                        <Button variant="outlined" component="span">Add Avatar</Button>
                    </label>
                    <Button variant="contained" color="error" onClick={removeAvatar}>Remove</Button>
                </div>
            </div>
            <Dialog
                open={dialog}>
                <DialogTitle>Details to change</DialogTitle>
                <DialogContent sx={{width: "300px", height: "200px"}}>
                    <p>
                        Name : {formData.userName !== null ? formData.userName : "Not Provided"}<br></br>
                        Email : {formData.email ? formData.email : "Not Provided"}<br></br>
                        Password : {formData.password ? "Provided" : "Not Provided"}<br></br>
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: "red"}} onClick={() =>
                    {
                        setDialog(false);
                        updateDetails.mutate(formData);


                    }}>
                        Confirm Changes
                    </Button>
                    <Button color="primary" onClick={() => setDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open = {snackbar.open}
                autoHideDuration = {6000}
                onClose = {() => setSnackbar({open: false})}
            >
                <Alert severity={snackbar.severity} onError={() => setSnackbar({open: false})}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Card style={{ marginTop: "20px" }}>
                <CardContent>
                    <TextField fullWidth label="userName" name="username" value={formData.userName} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" />
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => setDialog(true)}>Save</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}
