import { WalletCards, Receipt, FileText, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"
import { Box, Grid, Paper, Typography, Button } from "@mui/material"

function Dashboard() {
    const cardData = [
        {
            title: "Income Overview",
            description: "Manage and track all your income streams here.",
            link: "/Revenue",
            icon: <WalletCards />,
        },
        {
            title: "Expense Overview",
            description: "Keep track of your expenses and manage your budgets.",
            link: "/Expense",
            icon: <Receipt />,
        },
        { title: "Report", description: "Generate and view financial reports here.", link: "/Report", icon: <FileText /> },
        {
            title: "Recent Transactions",
            description: "View  transactions here.",
            link: "/Transactions",
            icon: <BarChart3 />,
        },
    ]

    return (
        <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#333" }}>
                Financial Dashboard
            </Typography>
            <Grid container spacing={3}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Link to={card.link} style={{ textDecoration: "none" }}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    padding: 3,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                        {card.title}
                                    </Typography>
                                    {card.icon}
                                </Box>
                                <Typography sx={{ flexGrow: 1, marginBottom: 2, color: "#666" }}>{card.description}</Typography>
                                <Button variant="contained" color="primary" sx={{ alignSelf: "flex-start" }}>
                                    View Details
                                </Button>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Dashboard
