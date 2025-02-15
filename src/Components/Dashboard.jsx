import { WalletCards, Receipt, FileText, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import { Box, Grid, Paper, Typography, LinearProgress } from "@mui/material"

function Dashboard() {
    const cardData = [
        {
            title: "Total Income",
            value: "$24,500",
            change: "+12%",
            icon: <WalletCards />,
            color: "#4caf50",
            link: "/Revenue",
        },
        {
            title: "Total Expenses",
            value: "$18,300",
            change: "-5%",
            icon: <Receipt />,
            color: "#f44336",
            link: "/Expense",
        },
        {
            title: "Net Profit",
            value: "$6,200",
            change: "+8%",
            icon: <TrendingUp />,
            color: "#2196f3",
            link: "/Report",
        },
        {
            title: "Pending Invoices",
            value: "$3,500",
            change: "5 invoices",
            icon: <FileText />,
            color: "#ff9800",
            link: "/Invoices",
        },
    ]

    const recentTransactions = [
        { id: 1, description: "Office Supplies", amount: "-$250", date: "2023-06-15" },
        { id: 2, description: "Client Payment", amount: "+$1,500", date: "2023-06-14" },
        { id: 3, description: "Utility Bill", amount: "-$180", date: "2023-06-13" },
    ]

    const budgetCategories = [
        { category: "Marketing", spent: 4000, total: 5000 },
        { category: "Operations", spent: 3000, total: 4000 },
        { category: "Development", spent: 6000, total: 8000 },
    ]

    return (
        <Box sx={{ padding: 3, backgroundColor: "#f0e68c", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#333" }}>
                Financial Dashboard
            </Typography>
            <Grid container spacing={3}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Link to={card.link} style={{ textDecoration: "none" }}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    padding: 2,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    backgroundColor: "#fff8dc",
                                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: card.color }}>
                                        {card.title}
                                    </Typography>
                                    {card.icon}
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", marginBottom: 1 }}>
                                    {card.value}
                                </Typography>
                                <Typography sx={{ color: card.color, fontWeight: "bold" }}>{card.change}</Typography>
                            </Paper>
                        </Link>
                    </Grid>
                ))}

                {/* Recent Transactions */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, backgroundColor: "#fff8dc" }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}>
                            Recent Transactions
                        </Typography>
                        {recentTransactions.map((transaction) => (
                            <Box key={transaction.id} sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                                <Typography>{transaction.description}</Typography>
                                <Typography
                                    sx={{ fontWeight: "bold", color: transaction.amount.startsWith("+") ? "#4caf50" : "#f44336" }}
                                >
                                    {transaction.amount}
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Budget Overview */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, backgroundColor: "#fff8dc" }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}>
                            Budget Overview
                        </Typography>
                        {budgetCategories.map((category, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                    {category.category} ({Math.round((category.spent / category.total) * 100)}%)
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(category.spent / category.total) * 100}
                                    sx={{ height: 8, borderRadius: 5 }}
                                />
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard

