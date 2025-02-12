import { useState } from "react";
import { Avatar, Button, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                padding: 3,
            }}
        >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card sx={{ padding: 4, borderRadius: 3, boxShadow: 5, maxWidth: 500, textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                        Settings
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <Avatar src={avatar || "https://via.placeholder.com/150"} sx={{ width: 120, height: 120, boxShadow: 3 }} />
                        <Box display="flex" gap={2}>
                            <input type="file" onChange={handleAvatarUpload} style={{ display: "none" }} id="avatar-upload" />
                            <label htmlFor="avatar-upload">
                                <Button variant="contained" component="span">Upload Avatar</Button>
                            </label>
                            <Button variant="outlined" color="error" onClick={removeAvatar}>Remove</Button>
                        </Box>
                    </Box>
                    <CardContent>
                        <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" variant="outlined" />
                        <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" variant="outlined" />
                        <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" variant="outlined" />
                        <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" variant="outlined" />
                        <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Save Changes</Button>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
}