import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress, Snackbar, Alert
} from "@mui/material";
import LineChartCard from "./LineChart.jsx";

// Mock Data for Transactions based on time frame
const weeklyTransactions = [
    { year: 2025, week: 1, type: "Revenue", totalAmount: 1200 },
    { year: 2025, week: 2, type: "Revenue", totalAmount: 1500 },
    { year: 2025, week: 3, type: "Expense", totalAmount: 800 },
    { year: 2025, week: 4, type: "Revenue", totalAmount: 1400 },
    { year: 2025, week: 5, type: "Expense", totalAmount: 900 },
    { year: 2025, week: 6, type: "Revenue", totalAmount: 1700 },
    { year: 2025, week: 7, type: "Expense", totalAmount: 950 },
    { year: 2025, week: 8, type: "Revenue", totalAmount: 1600 },
];

const monthlyTransactions = [
    { year: 2025, month: 1, type: "Revenue", totalAmount: 5200 },
    { year: 2025, month: 2, type: "Revenue", totalAmount: 5900 },
    { year: 2025, month: 3, type: "Expense", totalAmount: 3100 },
    { year: 2025, month: 4, type: "Revenue", totalAmount: 6100 },
    { year: 2025, month: 5, type: "Expense", totalAmount: 3200 },
    { year: 2025, month: 6, type: "Revenue", totalAmount: 6700 },
    { year: 2025, month: 7, type: "Expense", totalAmount: 3400 },
    { year: 2025, month: 8, type: "Revenue", totalAmount: 6800 },
];

const yearlyTransactions = [
    { year: 2025, type: "Revenue", totalAmount: 72000 },
    { year: 2025, type: "Expense", totalAmount: 42000 },
    { year: 2024, type: "Revenue", totalAmount: 65000 },
    { year: 2024, type: "Expense", totalAmount: 38000 },
];

const ReportTransactions = () => {
    const { timeFrame, transactionType, handleTimeFrameChange, handleTransactionTypeChange } = useOutletContext();
    const [transactionsReport, setTransactionsReport] = useState([]);
    const [open,setOpen] = useState(true);

    useEffect(() => {
        if (timeFrame === "WEEKLY") {
            setTransactionsReport(weeklyTransactions);
        } else if (timeFrame === "MONTHLY") {
            setTransactionsReport(monthlyTransactions);
        } else if (timeFrame === "YEARLY") {
            setTransactionsReport(yearlyTransactions);
        }

    }, [timeFrame]);

// Assuming `fetchData` is returned from `useQueries`
//     const { data: transactionsData, isLoading, isError } = fetchData[0];

    // useEffect(() => {
    //     if (!isLoading && !isError) {
    //         setTransactionsReport(transactionsData || []);
    //     }
    // }, [timeFrame, transactionsData, isLoading, isError]);
    //
    // if (isLoading) {
    //     return (
    //         <CircularProgress  sx={{color: "#7c5f13"}}/>
    //     )
    // }
    //
    // if (isError) {
    //     return (
    //         <>
    //         <Snackbar
    //             open={open}
    //             autoHideDuration={6000}
    //             onClose={() => setOpen(false)}
    //             message="An error occurred while fetching data" >
    //             <Alert severity="error" onClose={() => setOpen(false)}>An error occurred while fetching data</Alert>
    //         </Snackbar>
    //         </>
    //     )
    // }


    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "rgba(255, 255, 255, 0.1)", mb: 4 }}>
                        <Typography variant="h6" color="primary" gutterBottom sx={{ fontSize: "1.2rem" }}>
                            Financial Report
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel>Time Frame</InputLabel>
                                    <Select
                                        variant="filled"
                                        value={timeFrame}
                                        onChange={handleTimeFrameChange}
                                        sx={{ fontSize: "0.875rem", padding: "4px", color: "white", borderColor: "white" }}
                                    >
                                        <MenuItem value="WEEKLY">Week</MenuItem>
                                        <MenuItem value="MONTHLY">Month</MenuItem>
                                        <MenuItem value="YEARLY">Year</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel>Transaction Type</InputLabel>
                                    <Select
                                        variant="filled"
                                        value={transactionType}
                                        onChange={handleTransactionTypeChange}
                                        sx={{ fontSize: "0.875rem", padding: "4px", color: "white", borderColor: "white" }}
                                    >
                                        <MenuItem value="Revenue">Revenue</MenuItem>
                                        <MenuItem value="Expense">Expense</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        {transactionType === "Revenue" && (
                            <LineChartCard
                                title="Revenue Trend"
                                data={transactionsReport.filter((item) => item.type === "Revenue")}
                                color="primary"
                                stroke="#8884d8"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {transactionType === "Expense" && (
                            <LineChartCard
                                title="Expense Trend"
                                data={transactionsReport.filter((item) => item.type === "Expense")}
                                color="secondary"
                                stroke="#82ca9d"
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReportTransactions;
