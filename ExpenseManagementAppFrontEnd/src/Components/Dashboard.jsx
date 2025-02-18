import { WalletCards, Receipt, FileText, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Box,
    Grid,
    Typography,
    Button,
    TableHead,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Table, CircularProgress
} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {api} from "../Templates/axiosInstance.js";


function Dashboard() {
    const accountId = localStorage.getItem("accountId");

    const {data: transactions, isLoading,isError} = useQuery({
        queryKey: ["transactions", accountId],
        queryFn: async () => {

            const res = await api.get(`/transactions/all?accountId=${accountId}`);
            console.log(res)
            return res.data || [];
        },
    })
    const cardData = [
        {
            title: "INCOME OVERVIEW",
            description: "Monitor and manage all your revenue sources effectively. Stay updated on earnings and cash flow trends.",
            link: "/Revenue",
            icon: <WalletCards size={52} />, // Increased icon size
        },
        {
            title: "EXPENSE OVERVIEW",
            description: "Track all your expenses in one place. Get insights into spending patterns and budget allocations.",
            link: "/Expense",
            icon: <Receipt size={52} />,
        },
        {
            title: "FINANCIAL REPORTS",
            description: "Generate detailed financial reports for analysis. Get a clear view of profits, losses, and balances.",
            link: "/Report",
            icon: <FileText size={52} />,
        }
    ];
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
            }}
        >
            <Grid
                container
                spacing={4}
                sx={{
                    maxWidth: "900px",
                    justifyContent: "center",
                }}
            >{cardData.map((card, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6} // 2 cards per row on small+ screens
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "350px", // Increased width
                                height: "220px", // Increased height
                                padding: 3,
                                background: "linear-gradient(to bottom, #d4a017, #b8860b)",
                                borderRadius: "15px",
                                border: "3px solid #a37412",
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.4)",
                                },
                            }}
                        >
                            {card.icon}
                            <Typography
                                variant="h5" // Increased text size
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Arial, sans-serif",
                                    color: "#000",
                                    textAlign: "center",
                                    marginTop: 1,
                                    textTransform: "uppercase",
                                    fontSize: "1rem",
                                    letterSpacing: "1px",
                                }}
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "0.9rem", // Slightly larger text for readability
                                    fontFamily: "Arial, sans-serif",
                                    color: "#000",
                                    textAlign: "center",
                                    padding: "0 10px",
                                    marginBottom: 2,
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
                                        fontSize: "0.9rem",
                                        padding: "8px 14px",
                                        "&:hover": { backgroundColor: "#5a3f14" },
                                    }}
                                >
                                    View Details
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                ))}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "800px",
                            background: "linear-gradient(to bottom, #d4a017, #b8860b)",
                            borderRadius: "15px",
                            border: "3px solid #a37412",
                            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                            padding: 3,
                            marginLeft: "150px"
                        }}
                    >{isLoading || isError ? (
                        <CircularProgress sx={{
                            position: "absolute",
                            justifyContent : "center",
                            marginTop: "80px",
                            marginLeft: "-20px",
                            color: "#7c5f13",
                        }} />
                    ) : (
                        <>
                            <Typography
                                variant="h6" // Fixed incorrect variant
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Arial, sans-serif",
                                    color: "#000",
                                    textAlign: "center",
                                    marginBottom: 2,
                                    textTransform: "uppercase",
                                }}
                            >
                                Recent Transactions
                            </Typography>
                            {transactions.length > 0 ?  (
                            <TableContainer component={Paper} sx={{height: "200px", width: "500px", background: "transparent", boxShadow: "none"}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Date</TableCell>
                                            <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Amount</TableCell>
                                            <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(transactions || []).map((transaction, index) => (
                                            <TableRow
                                                key={transaction.uuid}
                                                sx={{
                                                    backgroundColor: index % 2 === 0 ? "#534904" : "#b8860b", // Alternating row colors
                                                }}
                                            >
                                                <TableCell sx={{ color: "#000" }}>
                                                    {new Date(transaction.date).toLocaleDateString()} {/* Fix date formatting */}
                                                </TableCell>
                                                <TableCell sx={{ color: "#000" }}>
                                                    {transaction.amount}
                                                </TableCell>
                                                <TableCell sx={{ color: "#000" }}>
                                                    {transaction.type}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> ) : (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#000",
                                        textAlign: "center",
                                        padding: 2,
                                    }}> No Recent Transactions Found
                        </Typography>
                                )}
                        </>
                    )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
