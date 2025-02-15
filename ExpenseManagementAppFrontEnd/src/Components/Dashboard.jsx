import { WalletCards, Receipt, FileText, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";

function Dashboard() {
    const cardData = [
        {
            title: "INCOME OVERVIEW",
            description: "Monitor and manage all your revenue sources effectively. Stay updated on earnings and cash flow trends.",
            link: "/Revenue",
            icon: <WalletCards size={64} />,
        },
        {
            title: "EXPENSE OVERVIEW",
            description: "Track all your expenses in one place. Get insights into spending patterns and budget allocations.",
            link: "/Expense",
            icon: <Receipt size={64} />,
        },
        {
            title: "FINANCIAL REPORTS",
            description: "Generate detailed financial reports for analysis. Get a clear view of profits, losses, and balances.",
            link: "/Report",
            icon: <FileText size={64} />,
        },
        {
            title: "RECENT TRANSACTIONS",
            description: "Review the latest transactions and account activities. Keep track of every financial movement with precision.",
            link: "/Transactions",
            icon: <BarChart3 size={64} />,
        },
    ];

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: "50px",
                background: "transparent",
            }}
        >
            <Grid container spacing={4} sx={{ maxWidth: "90vw" }}>
                {cardData.map((card, index) => (
                    <Grid item xs={6} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "500px", // Increased width for a rectangular shape
                                height: "320px",
                                padding: 4,
                                background: "linear-gradient(to bottom, #d4a017, #b8860b)",
                                borderRadius: "20px", // Enhanced rounded corners
                                border: "4px solid #a37412", // Stylish border
                                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)", // Elegant shadow
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.4)",
                                },
                            }}
                        >
                            {card.icon}
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Arial, sans-serif",
                                    color: "#000",
                                    textAlign: "center",
                                    marginTop: 1,
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                }}
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontFamily: "Arial, sans-serif",
                                    color: "#000",
                                    textAlign: "center",
                                    marginBottom: 2,
                                    padding: "0 10px",
                                }}
                            >
                                {card.description}
                            </Typography>
                            <Link to={card.link} style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#6b4f1d",
                                        color: "#fff",
                                        fontFamily: "Arial, sans-serif",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        "&:hover": { backgroundColor: "#5a3f14" },
                                    }}
                                >
                                    View Details
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;
