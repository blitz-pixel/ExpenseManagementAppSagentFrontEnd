
import {useEffect, useState} from "react";
import { Button, TextField, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setNewExpense] = useState({
        name: "",
        category: "",
        subCategory: "",
        amount: "",
        date: "",
    });

    const handleChange = (field, value) => {
        setNewExpense({ ...newExpense, [field]: value });
    };


    const handleAddExpense = () => {
        setExpenses([...expenses, { id: expenses.length + 1, serialNo: expenses.length + 1, ...newExpense }]);
        console.log(expenses[0]["name"])
        setShowModal(false); // Close modal after adding
        setNewExpense({ name: "", category: "", subCategory: "", amount: "", date: "" }); // Reset form

    };

    // useEffect(async () => {
    //     const response = await axios.get("http://localhost:8080/api/v1/Expense").then(
    //         resp => {
    //             response = response.json();
    //         }
    //     )
    // }, [expenses]);
    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            {/* Header Section with Proper Alignment */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" gutterBottom>Expense Tracker</Typography>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add Expense</Button>
            </div>

            {/* Expense Table */}
            {expenses.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Sub-Category</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date Added</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.serialNo}</TableCell>
                                    <TableCell>{expense.name}</TableCell>
                                    <TableCell>{expense.category}</TableCell>
                                    <TableCell>{expense.subCategory}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Popup Modal */}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="add-expense-modal"
                aria-describedby="form-to-add-new-expense"
            >
                <Box sx={{
                    width: 400,
                    bgcolor: "white",
                    borderRadius: "8px",
                    p: 3,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: 24
                }}>
                    <Typography variant="h6" gutterBottom>Add Expense</Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={newExpense.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={newExpense.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Sub-Category"
                        variant="outlined"
                        fullWidth
                        value={newExpense.subCategory}
                        onChange={(e) => handleChange("subCategory", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddExpense}
                            sx={{ mr: 1 }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ExpensePage;
