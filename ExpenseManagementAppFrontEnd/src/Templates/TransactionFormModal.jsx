import {
    Box, Button, Divider, IconButton, Modal, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CategorySelectionMenu from "./CategorySelectionMenu.jsx";
import PropTypes from "prop-types";
import {useState} from "react";

const ExpenseModal = ({
                          name,transaction, removeExpense, categories,
                          newExpense, handleChange,
                          handleAddExpense
                      }) => {
    const [showModal, setShowModal] = useState(false);
    let parentCategories = categories.filter(category => category.SubCategoryName === "");
    const subcategories = categories.filter(
        category => category.ParentCategoryName === newExpense.ParentCategoryName && category.SubCategoryName !== ""
    );
    // console.log(parentCategories[0])
    const onModalClose = () => {
        handleChange("ParentCategoryName", "");
        handleChange("SubCategoryName", "");
        setShowModal(false)
    }
    return (
        <div>
            {/* Header Section with Proper Alignment */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" gutterBottom>{name}</Typography>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add {name}</Button>
            </div>
            {/* Expense Table */}
            {transaction.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Sub-Category</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date Added</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transaction.map((expense, index) => (
                                <TableRow key={expense.uuid}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{expense.ParentCategoryName}</TableCell>
                                    <TableCell>{expense.SubCategoryName || "-"}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{new Date(expense.date).toLocaleDateString() || "-"}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            sx={{ padding: 0, right: "-7px" }}
                                            edge="end"
                                            onClick={() => removeExpense(expense.uuid)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Popup Modal */}
            <Modal
                open={showModal}
                onClose={onModalClose}
                aria-labelledby={`add-${name}-modal`}
                aria-describedby={`form-to-add-new-${name}`}
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
                    <Typography variant="h6" gutterBottom>Add {name}</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <CategorySelectionMenu
                            parentCategories={parentCategories}
                            subCategories={subcategories}
                            newExpense={newExpense}
                            handleChange={handleChange}
                            // onModalClose={onModalClose}
                        />
                    </Box>

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
                        value={newExpense.date?.split("T")[0] || ""}
                        onChange={(e) => handleChange("date", new Date(e.target.value).toISOString())}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                handleAddExpense();
                                onModalClose();
                            }}

                            disabled={!newExpense.ParentCategoryName || !newExpense.amount}

                            sx={{ mr: 1 }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onModalClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

ExpenseModal.propTypes = {
    transaction: PropTypes.arrayOf(
        PropTypes.shape({
            uuid: PropTypes.string.isRequired,
            ParentCategoryName: PropTypes.string.isRequired,
            SubCategoryName: PropTypes.string,
            amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    removeExpense: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            ParentCategoryName: PropTypes.string.isRequired,
            SubCategoryName: PropTypes.string,
        })
    ).isRequired,
    newExpense: PropTypes.shape({
        ParentCategoryName: PropTypes.string.isRequired,
        SubCategoryName: PropTypes.string,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleAddExpense: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default ExpenseModal;
