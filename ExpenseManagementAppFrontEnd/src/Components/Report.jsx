// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import {
//     Container,
//     Grid,
//     Paper,
//     Typography,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
//
// const theme = createTheme({
//     palette: {
//         primary: { main: "#2196f3" },
//         secondary: { main: "#ff4081" },
//         background: { default: "#f5f5f5" },
//     },
// });
//
// const Report = () => {
//     const [timeFrame, setTimeFrame] = useState("MONTHLY");
//     const [transactionType, setTransactionType] = useState("");
//
//     const handleTimeFrameChange = (event) => {
//         setTimeFrame(event.target.value);
//     };
//
//     const handleTransactionTypeChange = (event) => {
//         setTransactionType(event.target.value);
//     };
//
//     return (
//         <ThemeProvider theme={theme}>
//             <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <Paper sx={{ p: 1, textAlign: "center", bgcolor: "background.default" }}>
//                             <Typography variant="h6" color="primary" gutterBottom sx={{ fontSize: '1.2rem' }}>
//                                 Financial Report
//                             </Typography>
//                             <Grid container spacing={2} justifyContent="center">
//                                 <Grid item>
//                                     <FormControl sx={{ minWidth: 120 }} size="small">
//                                         <InputLabel>Time Frame</InputLabel>
//                                         <Select
//                                             variant="filled"
//                                             value={timeFrame}
//                                             onChange={handleTimeFrameChange}
//                                             sx={{ fontSize: '0.875rem', padding: '4px' }}
//                                         >
//                                             <MenuItem value="WEEKLY">Week</MenuItem>
//                                             <MenuItem value="MONTHLY">Month</MenuItem>
//                                             <MenuItem value="YEARLY">Year</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item>
//                                     <FormControl sx={{ minWidth: 120 }} size="small">
//                                         <InputLabel>Transaction Type</InputLabel>
//                                         <Select
//                                             variant="filled"
//                                             value={transactionType}
//                                             onChange={handleTransactionTypeChange}
//                                             sx={{ fontSize: '0.875rem', padding: '4px' }}
//                                         >
//                                             <MenuItem value="Revenue">Revenue</MenuItem>
//                                             <MenuItem value="Expense">Expense</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>
//                         </Paper>
//                     </Grid>
//                     {/* Passing timeFrame and transactionType as context to the nested route */}
//                     <Outlet context={{ timeFrame, transactionType,handleTransactionTypeChange,handleTimeFrameChange }} />
//                 </Grid>
//             </Container>
//         </ThemeProvider>
//     );
// };
//
// export default Report;

import { useState } from "react";
import { Container, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import {useQueries} from "@tanstack/react-query";
import {api} from "../Templates/axiosInstance.js";

const theme = createTheme({
    palette: {
        mode: 'dark', // Enable dark mode
        primary: { main: "#2196f3" }, // Primary color
        secondary: { main: "#ff4081" }, // Secondary color
        background: { default: "#141414" }, // Dark background
        text: {
            primary: "#ffffff", // White text for better contrast
            secondary: "#b0b0b0", // Lighter secondary text
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif', // Poppins font for a modern look
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(135deg, #141414, #2c2c2c, #5a4300, #b8860b)",
                    backgroundSize: "300% 300%",
                    animation: "gradientBG 10s ease-in-out forwards",
                    padding: "20px", // Adjust padding as needed
                    backdropFilter: "blur(8px)", // Apply blur effect
                    minHeight: "100vh",
                    width: "100vw",
                    overflowX: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle translucent background for paper
                    color: "white", // Text color inside Paper component
                    borderRadius: "8px", // Rounded corners for Paper
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight transparency for select dropdown
                    color: "white", // White text in select
                }
            }
        }
    }
});

const Report = () => {
    const id = localStorage.getItem("accountId");
    const [timeFrame, setTimeFrame] = useState("MONTHLY");
    const [transactionType, setTransactionType] = useState("Revenue");

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const handleTransactionTypeChange = (event) => {
        setTransactionType(event.target.value);
    };

    // const fetchData = useQueries({
    //     queries: [
    //         {
    //             queryKey: ["transactionsReport", timeFrame, id],
    //             queryFn: async () => {
    //             //     const res = await api.get(`/report/transactions?period=${timeFrame}&&accountId=${id}`);
    //             //     return res.data || [];
    //             // },
    //             cacheTime: 10 * 60 * 1000,
    //         },
    //         {
    //             queryKey: ["CategoriesReport", timeFrame, id],
    //             queryFn: async () => {
    //                 const res = await api.get(`/report/categories?period=${timeFrame}&&accountId=${id}`);
    //                 return res.data || [];
    //             },
    //             cacheTime: 10 * 60 * 1000,
    //         }
    //     ]
    // });


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    {/* Passing timeFrame and transactionType as context to the nested route */}
                    <Grid item xs={12}>
                        <Outlet
                            context={{
                                timeFrame,
                                transactionType,
                                handleTransactionTypeChange,
                                handleTimeFrameChange,
                                // fetchData
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Report;

//
