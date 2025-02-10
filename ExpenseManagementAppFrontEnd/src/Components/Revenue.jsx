"use client";

import { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#2196f3" },
        secondary: { main: "#ff4081" },
        background: { default: "#f5f5f5" },
    },
});

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const ReportPage = () => {
    const [timeFrame, setTimeFrame] = useState("month");
    const [revenueData, setRevenueData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [revenueLineData, setRevenueLineData] = useState([]);
    const [expenseLineData, setExpenseLineData] = useState([]);

    useEffect(() => {
        fetchData(timeFrame);
    }, [timeFrame]);

    const fetchData = (period) => {
        setTimeout(() => {
            setRevenueData([
                { name: "Salary", value: 5000 },
                { name: "Investments", value: 2000 },
                { name: "Side Hustle", value: 1000 },
            ]);
            setExpenseData([
                { name: "Rent", value: 1500 },
                { name: "Food", value: 800 },
                { name: "Utilities", value: 400 },
                { name: "Entertainment", value: 300 },
            ]);
            setRevenueLineData([
                { name: "Jan", value: 4000 },
                { name: "Feb", value: 4500 },
                { name: "Mar", value: 5000 },
                { name: "Apr", value: 4800 },
                { name: "May", value: 5200 },
                { name: "Jun", value: 5500 },
            ]);
            setExpenseLineData([
                { name: "Jan", value: 2800 },
                { name: "Feb", value: 2900 },
                { name: "Mar", value: 3100 },
                { name: "Apr", value: 2950 },
                { name: "May", value: 3000 },
                { name: "Jun", value: 3200 },
            ]);
        }, 1000);
    };

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
    const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, textAlign: "center", bgcolor: "background.default" }}>
                            <Typography variant="h4" color="primary" gutterBottom>
                                Financial Report
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>Time Frame</InputLabel>
                                <Select value={timeFrame} onChange={handleTimeFrameChange}>
                                    <MenuItem value="week">Week</MenuItem>
                                    <MenuItem value="month">Month</MenuItem>
                                    <MenuItem value="year">Year</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                    {[{ title: "Revenue", data: revenueData, total: totalRevenue, color: "primary" },
                        { title: "Expense", data: expenseData, total: totalExpense, color: "secondary" }]
                        .map(({ title, data, total, color }, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card raised sx={{ bgcolor: `${color}.light`, color: `${color}.contrastText` }}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            Total {title}: ${total}
                                        </Typography>
                                        <Divider sx={{ my: 1, bgcolor: `${color}.contrastText` }} />
                                        <List dense>
                                            {data.map((item, i) => (
                                                <ListItem key={i}>
                                                    <ListItemText primary={item.name} secondary={`$${item.value}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    {[{ title: "Revenue Trend", data: revenueLineData, color: "primary", stroke: "#8884d8" },
                        { title: "Expense Trend", data: expenseLineData, color: "secondary", stroke: "#82ca9d" }]
                        .map(({ title, data, color, stroke }, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Paper sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}>
                                    <Typography variant="h6" color={color} gutterBottom>
                                        {title}
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="value" stroke={stroke} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ReportPage;
