import { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Container,
    Switch,
    FormControlLabel,
    Divider,
} from "@mui/material";
import { Menu as MenuIcon, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const navigate = useNavigate();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.style.setProperty("--bg-color", "#121212");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.style.setProperty("--bg-color", "#ffffff");
            document.documentElement.style.setProperty("--text-color", "#000000");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="fixed" color="primary" sx={{ backgroundColor: darkMode ? "#333" : "primary" }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton color="inherit" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit" }}>
                                <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    alt="Logo"
                                    style={{ height: "40px", marginRight: "10px" }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Expense Tracker
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                            <Button color="inherit" onClick={() => navigate("/Settings")}>Settings</Button>
                            <Button color="inherit" onClick={() => navigate("/Category")}>Categories</Button>
                            <Button color="inherit">Log Out</Button>
                        </Box>
                        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                            {darkMode ? <Sun /> : <Moon />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Navigation
                    </Typography>
                    <List>
                        <ListItem button onClick={() => navigate("/Dashboard")}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/Expense")}>
                            <ListItemText primary="Expense" />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/Revenue")}>
                            <ListItemText primary="Revenue" />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/Report")}>
                            <ListItemText primary="Report" />
                        </ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Settings
                    </Typography>
                    <List>
                        <ListItem>
                            <FormControlLabel
                                control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                                label="Dark Mode"
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
