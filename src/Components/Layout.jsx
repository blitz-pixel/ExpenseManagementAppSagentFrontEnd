import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Container, Box, CssBaseline } from "@mui/material";

function Layout() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <CssBaseline />
            <Navbar />
            <Container component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default Layout;
