import {useEffect, useState} from "react";
import { Button, TextField, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import "./Navbar.jsx";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const RevenuePage = () => {
    const id =  localStorage.getItem("accountId");
    const [revenues, setRevenues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newRevenue, setNewRevenue] = useState({
        accountId : id,
        ParentCategoryName: "",
        SubCategoryName: "",
        amount: "",
        date: "",
    });
    const [refresh, setRefresh] = useState(false);

    // Handle input change inside modal
    const handleChange = (field, value) => {
        setNewRevenue({ ...newRevenue, [field]: value });
    };

    useEffect(() => {
        const getRevenue = async () => {
            try {
                console.log("Fetching revenue for account ID:", id);

                const resp = await axios.get(`http://localhost:8080/api/v1/revenue?accountId=${id}`);


                const RevenueWithUnIds = resp.data.map((revenue) => ({
                    id: uuidv4(),
                    ...revenue
                }));

                setRevenues(RevenueWithUnIds);

                console.log("Fetched Revenues:", RevenueWithUnIds);
            } catch (error) {
                console.error("Error fetching revenue:", error);
            }
        };

        getRevenue();
    }, [refresh,id]);

    // Handle adding the new revenue
    const handleAddRevenue = async () => {

        const NewRevenue = newRevenue;
        try {
            const response = await axios.post("http://localhost:8080/api/v1/revenue/add", newRevenue);
            console.log(response)

            const addedRevenue = { id: uuidv4(), ...newRevenue };
            setRevenues([...revenues, addedRevenue]);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error adding new revenue:", error);
        }

        setShowModal(false);
        setNewRevenue({ accountId : id,ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" });
    };

    return (
        // <Navbar/>
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            {/* Header Section with Proper Alignment */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" gutterBottom>Revenue Tracker</Typography>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add Revenue</Button>
            </div>

            {/* Revenue Table */}
            {revenues.length > 0 && (
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
                            {revenues.map((revenue, index) => {

                                return (
                                    <TableRow key={revenue.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{revenue.ParentCategoryName}</TableCell>
                                        <TableCell>{revenue.SubCategoryName || "-"}</TableCell>
                                        <TableCell>{revenue.amount}</TableCell>
                                        <TableCell>{new Date(revenue.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Popup Modal */}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="add-revenue-modal"
                aria-describedby="form-to-add-new-revenue"
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
                    <Typography variant="h6" gutterBottom>Add Revenue</Typography>
                    <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={newRevenue.ParentCategoryName}
                        onChange={(e) => handleChange("ParentCategoryName", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Sub-Category"
                        variant="outlined"
                        fullWidth
                        value={newRevenue.SubCategoryName}
                        onChange={(e) => handleChange("SubCategoryName", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={newRevenue.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        type="date"
                        value={newRevenue.date}
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
                            onClick={handleAddRevenue}
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

export default RevenuePage;