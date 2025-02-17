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
    DialogContent, DialogActions
} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {api} from "../Templates/axiosInstance.js";

export default function Settings() {
    const [avatar, setAvatar] = useState(null);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const [dialog,setDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error"});
    const updateDetails = useMutation({
        queryFn: async (formData) => {
            await api.put("/user/update",formData);
            // return response;
        },
        onSuccess: (response) => {
            setSnackbar({ open: true, message: response.data.message, severity: "success" });
        },
        onError:  (error) => {
            setSnackbar({ open: true, message: error.response.data.message, severity: "error" });
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
                <DialogContent>
                    <p>
                        Name : {formData.userName !== null ? formData.userName : "Not Provided"}
                        Email : {formData.email ? formData.email : "Not Provided"}
                        Password : {formData.password ? "Provided" : "Not Provided"}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button color="red" onClick={() =>
                    {
                        setDialog(false);

                    }}>
                        Confirm Changes
                    </Button>
                    <Button color="primary" onClick={() => setDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Card style={{ marginTop: "20px" }}>
                <CardContent>
                    <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" />
                    <CardActions>
                        <Button variant="contained" color="primary">Save</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}
