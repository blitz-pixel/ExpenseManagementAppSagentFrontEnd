import { useEffect, useState } from "react";
import { Button, TextField, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Card, CardContent, IconButton } from "@mui/material";
import { AddCircle, Close } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./Expense.css";

const ExpensePage = () => {
    const id = localStorage.getItem("accountId");
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setNewExpense] = useState({
        accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        amount: "",
        date: "",
    });
    const [refresh, setRefresh] = useState(false);

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

    const handleChange = (field, value) => {
        setNewExpense({ ...newExpense, [field]: value });
    };

    const handleAddExpense = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/expense/add", newExpense);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error adding new expense:", error);
        }
        setShowModal(false);
        setNewExpense({ accountId: id, ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" });
    };

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
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ExpensePage;
