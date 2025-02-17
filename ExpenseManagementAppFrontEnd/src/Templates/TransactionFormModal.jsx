import {
    Box, Button, Divider, FormControlLabel, IconButton, Menu, MenuItem, Modal, Paper, Radio, RadioGroup, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CategorySelectionMenu from "./CategorySelectionMenu.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const TransactionModal = ({
                              name,transaction, removeTransaction, categories,
                              newTransaction, handleChange,
                              handleAddTransaction
                          }) => {
    const [showModal, setShowModal] = useState(false);
    const [recurringAnchor, setRecurringAnchor] = useState(null);
    const [isRecurring, setIsRecurring] = useState(false);
    const handleRecurringOpen = (event) => {
        console.log("Recurring Menu Opened");
        setRecurringAnchor(event.currentTarget);
    }

    const handleRecurringClose = () => setRecurringAnchor(null)

    let parentCategories = categories.filter(category => category.SubCategoryName === "");
    const subcategories = categories.filter(
        category => category.ParentCategoryName === newTransaction.ParentCategoryName && category.SubCategoryName !== ""
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
            {/* Transaction Table */}
            {transaction.length > 0 && (
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
                            borderCollapse: "separate",
                            borderSpacing: "0px",
                        }}
                    >
                        <TableHead>
                            <TableRow sx={{ background: "#333" }}>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Sub-Category</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Date Added</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transaction.map((transaction, index) => (
                                <TableRow
                                    key={transaction.uuid}
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
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.ParentCategoryName || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.SubCategoryName || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.amount}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{transaction.description || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>
                                        {new Date(transaction.date).toLocaleDateString() || "-"}
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>
                                        { !transaction.isRecurring ? (
                                        <IconButton
                                            size="small"
                                            sx={{
                                                padding: 0,
                                                right: "-7px",
                                                color: "#fff",
                                                "&:hover": { color: "#ff4d4d" },
                                            }}
                                            edge="end"
                                            onClick={() => removeTransaction(transaction.uuid)}
                                        >
                                           <DeleteIcon />
                                        </IconButton> ) : "-"}
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
                    top: 0,             // Ensure the modal appears at the top of the page
                    left: "50%",        // Center the modal horizontally
                    transform: "translateX(-50%)", // Center the modal horizontally
                    boxShadow: 24,
                    zIndex: 1300,       // Ensure the modal is above all other content
                }}>
                    <Typography variant="h6" gutterBottom color="black">Add {name}</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <CategorySelectionMenu
                            parentCategories={parentCategories}
                            subCategories={subcategories || []}
                            newTransaction={newTransaction}
                            handleChange={handleChange}
                            // onModalClose={onModalClose}
                        />
                    </Box>

                    <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={newTransaction.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        type="text"
                        inputProps={
                            {
                                maxLength: 20
                            }
                        }
                        value={newTransaction.Description}
                        onChange={(e) => handleChange("Description", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        type="date"
                        value={newTransaction.date?.split("T")[0] || ""}
                        onChange={(e) => handleChange("date", new Date(e.target.value).toISOString())}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Box display="flex" alignItems="center" gap={2}>
                        {/* Recurring Transaction Selection */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{color: "black"}}>Is this transaction recurring?</Typography>
                            <RadioGroup
                                value={String(isRecurring)}
                                onChange={(e) => {
                                    const Value = e.target.value === "true";
                                    handleChange("isRecurring", Value);
                                    setIsRecurring(Value);

                                    if (!Value) {
                                        handleChange("frequency", "");
                                        setIsRecurring(Value)
                                    }
                                }}
                            >
                                <FormControlLabel value="true" sx={{ color: "black" }} control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" sx={{ color: "black" }} control={<Radio />} label="No" />
                            </RadioGroup>
                        </Box>



                        {/* Recurrence Frequency Menu */}
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={handleRecurringOpen}
                            disabled={!isRecurring}
                        >
                            {newTransaction.frequency ? `Frequency: ${newTransaction.frequency}` : "Select Recurrence Frequency"}
                        </Button>

                        <Menu
                            anchorEl={recurringAnchor}
                            open={Boolean(recurringAnchor)}
                            onClose={handleRecurringClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleChange("frequency", "WEEKLY");
                                    handleRecurringClose();
                                }}
                            >
                                WEEKLY
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleChange("frequency", "MONTHLY");
                                    handleRecurringClose();
                                }}
                            >
                                MONTHLY
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleChange("frequency", "YEARLY");
                                    handleRecurringClose();
                                }}
                            >
                                YEARLY
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                handleAddTransaction();
                                onModalClose();
                            }}

                            disabled={!newTransaction.ParentCategoryName || !newTransaction.amount }

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

TransactionModal.propTypes = {
    transaction: PropTypes.arrayOf(
        PropTypes.shape({
            uuid: PropTypes.string.isRequired,
            ParentCategoryName: PropTypes.string.isRequired,
            SubCategoryName: PropTypes.string,
            amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    removeTransaction: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            ParentCategoryName: PropTypes.string.isRequired,
            SubCategoryName: PropTypes.string,
        })
    ).isRequired,
    newTransaction: PropTypes.shape({
        ParentCategoryName: PropTypes.string.isRequired,
        SubCategoryName: PropTypes.string,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        date: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        isRecurring: PropTypes.bool.isRequired,
        frequency: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleAddTransaction: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default TransactionModal;
