import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PieChartCard from "./PieChart.jsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../Templates/axiosInstance.js";

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

const ReportCategories = () => {
    const id = localStorage.getItem("accountId")
    const { timeFrame } = useOutletContext();
    const [transactionsReport, setTransactionsReport] = useState([]);
    const fetchDataTransactions = useQuery({
        queryKey: ["transactionsReport", timeFrame,id],
        queryFn : async (timeFrame,id) => {
            await api.get(`/transactions?timeFrame=${timeFrame}&&accountId=${id}`)
        }

    })

    useEffect(() => {
        if (timeFrame === "WEEKLY") {
            setTransactionsReport(weeklyTransactions);
        } else if (timeFrame === "MONTHLY") {
            setTransactionsReport(monthlyTransactions);
        } else if (timeFrame === "YEARLY") {
            setTransactionsReport(yearlyTransactions);
        }
    }, [timeFrame]);

//     const Data = fetchDataTransactions.data;
//     if (timeFrame === "WEEKLY") {
//         setTransactionsReport(Data);
//     } else if (timeFrame === "MONTHLY") {
//         setTransactionsReport(Data);
//     } else if (timeFrame === "YEARLY") {
//         setTransactionsReport(Data);
//     }
//     query.invalidateQueries(["transactionsReport",timeFrame,id])
// }, [timeFrame]);

    // Separate Revenue and Expense data for the pie charts
    const revenueData = transactionsReport.filter(item => item.type === "Revenue");
    const expenseData = transactionsReport.filter(item => item.type === "Expense");

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={4} direction="row">
                {/* Pie Charts for Revenue and Expense */}
                <Grid item xs={12} md={6}>
                    <PieChartCard title="Revenue" data={revenueData} color="primary" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PieChartCard title="Expenses" data={expenseData} color="secondary" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReportCategories;
