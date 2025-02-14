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
            document.documentElement.style.setProperty("--bg-color", "#000000");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.style.setProperty("--bg-color", "#000000");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <style>
                {`
                    @keyframes gradientBG {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>
            <AppBar
                position="fixed"
                sx={{
                    background: "linear-gradient(135deg, #141414, #2c2c2c, #5a4300, #b8860b)",
                    backgroundSize: "300% 300%",
                    animation: "gradientBG 6s ease infinite",
                    color: "#ffffff",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                        {/* Move menu icon to the left */}
                        <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ marginLeft: -30 }}>
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit" }}>
                                <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    alt="Logo"
                                    style={{ height: "40px", marginRight: "10px" }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffff" }}>
                                    Gastos Rastreador
                                </Typography>
                            </Link>
                        </Box>
                            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end", gap: 10 }}>
                            <Button color="inherit" sx={{ color: "#ffffff" }} onClick={() => navigate("/")}>Home</Button>
                            <Button color="inherit" sx={{ color: "#ffffff" }} onClick={() => navigate("/Settings")}>Settings</Button>
                            <Button color="inherit" sx={{ color: "#ffffff" }} onClick={() => navigate("/Categories")}>Categories</Button>
                            <Button color="inherit" sx={{ color: "#ffffff" }}>Log Out</Button>
                        </Box>

                        {/* <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                            {darkMode ? <Sun /> : <Moon />}
                        </IconButton> */}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2, backgroundColor: "#000000", color: "#ffffff" }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#ffffff" }}>
                        Navigation
                    </Typography>
                    <List>
                        <ListItem button onClick={() => navigate("/Dashboard")}>
                            <ListItemText primary="Dashboard" sx={{ color: "#ffffff" }} />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/Expense")}>
                            <ListItemText primary="Expense" sx={{ color: "#ffffff" }} />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/Revenue")}>
                            <ListItemText primary="Revenue" sx={{ color: "#ffffff" }} />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/Report")}>
                            <ListItemText primary="Report" sx={{ color: "#ffffff" }} />
                        </ListItem>
                    </List>
                    <Divider sx={{ my: 2, backgroundColor: "#ffffff" }} />
                    <Typography variant="h6" gutterBottom sx={{ color: "#ffffff" }}>
                        Settings
                    </Typography>
                    <List>
                        <ListItem>
                            <FormControlLabel
                                control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                                label="Dark Mode"
                                sx={{ color: "#ffffff" }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
