import { useEffect, useState } from "react";
import { 
    Button, TextField, Modal, Box, Typography, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Card, CardContent 
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./Expense.css";
import PropTypes from "prop-types";

const ExpensePage = ({ accountId }) => {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setNewExpense] = useState({
        ParentCategoryName: "",
        SubCategoryName: "",
        amount: "",
        date: "",
    });
    const [refresh, setRefresh] = useState(false);

    // Fetch Expenses
    useEffect(() => {
        const getExpenses = async () => {
            if (!accountId) return;  // Ensure accountId is available

            try {
                const response = await axios.get(`http://localhost:8080/api/v1/expense?accountId=${accountId}`);

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
    }, [refresh, accountId]);

    // Handle input change inside modal
    const handleChange = (field, value) => {
        setNewExpense({ ...newExpense, [field]: value });
    };

    // Handle adding a new expense
    const handleAddExpense = async () => {
        try {
            const expenseData = { ...newExpense, accountId };

            await axios.post("http://localhost:8080/api/v1/expense/add", expenseData);
            
            const expenseWithId = { id: uuidv4(), ...expenseData };
            setExpenses([...expenses, expenseWithId]);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error adding new expense:", error);
        }

        // Reset the form and close modal
        setNewExpense({ ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" });
        setShowModal(false);
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

                    {/* Expense Table */}
                    {expenses.length > 0 && (
                        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Sub-Category</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Date Added</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expenses.map((expense, index) => (
                                        <TableRow key={expense.id}>
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
                            <Divider sx={{ mb: 2 }} />
                            <TextField
                                label="Category"
                                variant="outlined"
                                fullWidth
                                value={newExpense.ParentCategoryName}
                                onChange={(e) => handleChange("ParentCategoryName", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Sub-Category"
                                variant="outlined"
                                fullWidth
                                value={newExpense.SubCategoryName}
                                onChange={(e) => handleChange("SubCategoryName", e.target.value)}
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
                                value={newExpense.date ? newExpense.date.split("T")[0] : ""}
                                onChange={(e) => handleChange("date", new Date(e.target.value).toISOString())}
                                sx={{ mb: 2 }}
                                InputLabelProps={{ shrink: true }}
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
                </CardContent>
            </Card>
        </div>
    );
};
ExpensePage.propTypes = {
    accountId: PropTypes.string.isRequired,
};

export default ExpensePage;