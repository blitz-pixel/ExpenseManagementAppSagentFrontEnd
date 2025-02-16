import {Outlet, useNavigate} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import {Box, Divider, FormControlLabel, List, ListItem, ListItemText, Switch, Typography} from "@mui/material";

function Layout(){
    const navigate = useNavigate();
    const defaultSidebar = (
        <Box sx={{ width: 250, p: 2 }}>
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
                <ListItem button onClick={() => navigate("/Recurring")}>
                    <ListItemText primary="Recurring Transactions"/>
                </ListItem>
            </List>

            <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.2)" }} />

            <Typography variant="h6" gutterBottom>
                Settings
            </Typography>
            <List>
                <ListItem>
                    <FormControlLabel
                        control={<Switch />}
                        label="Dark Mode"
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={<Switch />}
                        label="Notifications"
                    />
                </ListItem>
            </List>
        </Box>
    )
    return (
        <div>
            <Navbar sidebarContent={defaultSidebar}/>
            <main>
            <Outlet />
            </main>
        </div>
    );
}

export default Layout;