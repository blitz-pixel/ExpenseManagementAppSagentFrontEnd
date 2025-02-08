import { useState } from "react";
import { Avatar, Button, TextField, Card, CardContent } from "@mui/material";

export default function Settings() {
    const [avatar, setAvatar] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

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
            <Card style={{ marginTop: "20px" }}>
                <CardContent>
                    <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" />
                </CardContent>
            </Card>
        </div>
    );
}
