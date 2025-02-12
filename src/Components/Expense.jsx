<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Button, TextField, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Card, CardContent, IconButton } from "@mui/material";
import { AddCircle, Close } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
=======

import {useEffect, useState} from "react";
import { Button, TextField, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
import axios from "axios";
import "./Expense.css";

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

<<<<<<< HEAD
    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/expense?accountId=${id}`);
                const expensesWithIds = response.data.map((expense) => ({
                    id: uuidv4(),
                    ...expense
                }));
                setExpenses(expensesWithIds);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };
        getExpenses();
    }, [refresh, id]);

=======
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
    const handleChange = (field, value) => {
        setNewExpense({ ...newExpense, [field]: value });
    };

<<<<<<< HEAD
    const handleAddExpense = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/expense/add", newExpense);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error adding new expense:", error);
        }
        setShowModal(false);
        setNewExpense({ accountId: id, ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" });
=======

    const handleAddExpense = () => {
        setExpenses([...expenses, { id: expenses.length + 1, serialNo: expenses.length + 1, ...newExpense }]);
        console.log(expenses[0]["name"])
        setShowModal(false); // Close modal after adding
        setNewExpense({ name: "", category: "", subCategory: "", amount: "", date: "" }); // Reset form

>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
    };

    // useEffect(async () => {
    //     const response = await axios.get("http://localhost:8080/api/v1/Expense").then(
    //         resp => {
    //             response = response.json();
    //         }
    //     )
    // }, [expenses]);
    return (
        <div className="expense-container">
            <Card className="expense-card">
                <CardContent>
                    <div className="expense-header">
                        <Typography variant="h4" className="expense-title">Expense Tracker</Typography>
                        <Button className="add-expense-btn" variant="contained" onClick={() => setShowModal(true)}>
                            <AddCircle style={{ marginRight: 8 }} /> Add Expense
                        </Button>
                    </div>

<<<<<<< HEAD
                    {expenses.length > 0 ? (
                        <TableContainer component={Paper} className="expense-table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Sub-Category</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Date Added</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expenses.map((expense, index) => (
                                        <TableRow key={expense.id} hover>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{expense.ParentCategoryName}</TableCell>
                                            <TableCell>{expense.SubCategoryName || "-"}</TableCell>
                                            <TableCell>{expense.amount}</TableCell>
                                            <TableCell>{new Date(expense.date).toLocaleDateString() || "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography className="no-expense">No expenses recorded yet.</Typography>
                    )}
                </CardContent>
            </Card>

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box className="expense-modal">
                    <div className="modal-header">
                        <Typography variant="h6">Add Expense</Typography>
                        <IconButton onClick={() => setShowModal(false)}>
                            <Close />
                        </IconButton>
                    </div>
                    <Divider sx={{ mb: 2 }} />
                    <TextField label="Category" fullWidth variant="outlined" value={newExpense.ParentCategoryName} onChange={(e) => handleChange("ParentCategoryName", e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Sub-Category" fullWidth variant="outlined" value={newExpense.SubCategoryName} onChange={(e) => handleChange("SubCategoryName", e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Amount" fullWidth type="number" variant="outlined" value={newExpense.amount} onChange={(e) => handleChange("amount", e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Date" fullWidth type="date" variant="outlined" value={newExpense.date.split("T")[0]} onChange={(e) => handleChange("date", new Date(e.target.value).toISOString())} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    <div className="modal-actions">
                        <Button className="save-btn" variant="contained" onClick={handleAddExpense}>Save</Button>
                        <Button className="cancel-btn" variant="outlined" onClick={() => setShowModal(false)}>Cancel</Button>
=======
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
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ExpensePage;
