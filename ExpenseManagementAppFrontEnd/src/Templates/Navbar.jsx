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
    Divider, Avatar, MenuItem,
    Menu
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu as MenuIcon, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "./axiosInstance.js";
import PropTypes from "prop-types";

const token = localStorage.getItem("accountId");

const Navbar = ({sidebarContent}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);



    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (darkMode) {
    //         document.documentElement.style.setProperty("--bg-color", "#000000");
    //         document.documentElement.style.setProperty("--text-color", "#ffffff");
    //         localStorage.setItem("theme", "dark");
    //     } else {
    //         document.documentElement.style.setProperty("--bg-color", "#ffffff");
    //         document.documentElement.style.setProperty("--text-color", "#000000");
    //         localStorage.setItem("theme", "light");
    //     }
    // }, [darkMode]);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>

            <style>
                {`
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    70% { background-position: 100% 50%; } /* Move fully to the right */
                    100% { background-position: 65% 50%; } /* Settle at 65% */
                }
            `}
            </style>

            <AppBar
                position="fixed"
                sx={{
                    background: "linear-gradient(135deg, #141414, #2c2c2c, #5a4300, #b8860b)",
                    backgroundSize: "300% 300%",
                    animation: "gradientBG 10s ease-in-out forwards",
                    color: "#ffffff",
                }}
            >
                <Container maxWidth="lg" sx={{ width: "100%", px: 2 }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        {/* Menu Button */}
                        <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ marginLeft: "-200px" }}>
                            <MenuIcon />
                        </IconButton>

                        {/* Logo and Title */}
                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit", marginLeft: "100px" }}>
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

                        {/* Navigation Buttons */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                            <Button color="inherit" sx={{ color: "#ffffff" }} onClick={() => navigate("/")}>Home</Button>
                            <Button color="inherit" sx={{ color: "#ffffff" }} onClick={() => navigate("/Category")}>Categories</Button>
                            {token ? (
                                <>
                                    <IconButton onClick={handleMenuClick} sx={{ color: "white" }}>
                                        <Avatar sx={{ bgcolor: "transparent" }}>
                                            <AccountCircleIcon fontSize="large" />
                                        </Avatar>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                                    >
                                        <MenuItem onClick={ () => {navigate("/Account"); handleMenuClose()}}>Profile</MenuItem>
                                        <MenuItem onClick={() => {navigate("/Settings"); handleMenuClose()}}>Change Details</MenuItem>
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button color="inherit" sx={{ color: "#ffffff" }} onClick={() => navigate("/register")}>
                                    Register
                                </Button>
                            )}
                        </Box>

                        {/* Dark Mode Toggle */}
                        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                            {darkMode ? <Sun /> : <Moon />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Drawer for Mobile Navigation */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        marginTop: "64px", 
                        height: "calc(100vh - 64px)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.2)", 
                        color: "#ffffff",
                    }
                }}
            >
                {sidebarContent}
            </Drawer>



        </>
    );
};

Navbar.propTypes = {
    sidebarContent: PropTypes.node,
};

export default Navbar;
