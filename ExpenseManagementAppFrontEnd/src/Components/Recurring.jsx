import {useEffect, useState} from "react";
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Snackbar,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../Templates/axiosInstance.js";

const id = localStorage.getItem("accountId");

const Recurring = () => {
    const queryClient = useQueryClient();

    // Fetch recurring transactions
    const { data: RecurringTransaction, isLoading, isError, error } = useQuery({
        queryKey: ["recurring", id],
        queryFn: async () => {
            const res = await api.get(`/recurring?accountId=${id}`);
            console.log(res.data);
            return res.data || [];
        },
    });


    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
        code: 0
    });

    useEffect(() => {
        if (RecurringTransaction) {
            const today = new Date().setHours(0, 0, 0, 0);
            const shouldInvalidate = RecurringTransaction.some(transaction => {
                if (!transaction.nextDate) return false;
                const transactionDate = new Date(transaction.nextDate).setHours(0, 0, 0, 0);
                return transactionDate <= today;
            });

            if (shouldInvalidate) {
                console.log("Invalidating transactions query...");
                queryClient.invalidateQueries(["revenues",id]);
                queryClient.invalidateQueries(["expenses",id])
                queryClient.invalidateQuries(["recurring",id])
            }
        }
    }, [RecurringTransaction, queryClient]);

    const isFetching = isLoading || isError;

    // Handle loading & error states
    if (isFetching) {
        return (
            <Box>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={isError ? "error" : "info"}
                    >
                        {isError ? error?.message : "Fetching Expenses..."}
                    </Alert>
                </Snackbar>
                {isLoading && <CircularProgress  sx={{color: "#7c5f13"}}/>}
            </Box>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            <Box sx={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
                <TableContainer
                    component={Paper}
                    sx={{
                        background: "rgba(255, 255, 255, 0.9)", // Slight transparency for depth
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Embossed effect
                        borderRadius: "10px", // Smooth corners
                        overflow: "hidden",
                    }}
                >
                    <Table
                        sx={{
                            borderCollapse: "separate", // Avoids default border collapse
                            borderSpacing: "0px", // Removes unwanted gaps
                        }}
                    >
                        <TableHead>
                            <TableRow sx={{ background: "#333" }}>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        padding: "12px",
                                        borderBottom: "none", // Removes bottom border
                                    }}
                                >
                                    S.no
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>
                                    Description
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>
                                    Category Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>
                                    Parent Category Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>
                                    Type
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>
                                    Amount
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>
                                    Next Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(RecurringTransaction || []).map((transaction, index) => (
                                <TableRow
                                    key={transaction.uuid || index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? "#534904" : "#b8860b",
                                        "&:hover": {
                                            backgroundColor: "#a67c00",
                                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                                            transform: "scale(1.02)",
                                        },
                                        transition: "background 0.3s, box-shadow 0.3s, transform 0.3s",
                                    }}
                                >
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{index + 1}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.Description || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>
                                        {transaction.SubCategoryName || transaction.ParentCategoryName || "-"}
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>
                                        {transaction.SubCategoryName ? transaction.ParentCategoryName : "-"}
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.type || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.amount || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>
                                        {transaction.nextDate ? new Date(transaction.nextDate).toLocaleDateString() : "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    );
};

export default Recurring;
