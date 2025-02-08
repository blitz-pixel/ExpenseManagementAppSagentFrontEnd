import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Container, Switch, FormControlLabel, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between", ml: -23 }}>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ marginRight: "auto" }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                                <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    alt="Logo"
                                    style={{ height: "40px", marginRight: "10px", marginLeft: "-300px" }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                                    Expense Tracker
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
                            <Button color="inherit" sx={{ marginRight: 2 }} onClick={() => navigate("/")}>Home</Button>
                            <Button color="inherit" sx={{ marginRight: 2 }} onClick={() => navigate("/Settings")}>Settings</Button>
                            <Button color="inherit" sx={{ marginRight: 2 }} onClick={() => navigate("/Categories")}>Categories</Button>
                            <Button color="inherit" sx={{ marginRight: 2 }} >Log Out</Button>
                        </Box>
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
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Settings
                    </Typography>
                    <List>
                        <ListItem>
                            <FormControlLabel
                                control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                                label="Dark Mode"
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
                                label="Notifications"
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
