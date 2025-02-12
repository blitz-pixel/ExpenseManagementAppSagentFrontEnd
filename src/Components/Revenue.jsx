import { useEffect, useState } from "react";
import {
    Button, TextField, Modal, Box, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
    Card, CardContent, IconButton, Switch
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/WbSunny';
import "./Revenue.css";

const RevenuePage = () => {
    const id = localStorage.getItem("accountId");
    const [revenues, setRevenues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [newRevenue, setNewRevenue] = useState({
        accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        amount: "",
        date: "",
    });

    const handleChange = (field, value) => {
        setNewRevenue({ ...newRevenue, [field]: value });
    };

    useEffect(() => {
        const getRevenue = async () => {
            try {
                console.log("Fetching revenue for account ID:", id);

                const resp = await axios.get(`http://localhost:8080/api/v1/revenue?accountId=${id}`);
<<<<<<< HEAD
                const RevenueWithIds = resp.data.map((revenue) => ({
=======


                const RevenueWithUnIds = resp.data.map((revenue) => ({
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
                    id: uuidv4(),
                    ...revenue
                }));

                setRevenues(RevenueWithIds);
            } catch (error) {
                console.error("Error fetching revenue:", error);
            } finally {
                setLoading(false);
            }
        };

        getRevenue();
    }, [id]);

    const handleAddRevenue = async () => {
        try {
<<<<<<< HEAD
            await axios.post("http://localhost:8080/api/v1/revenue/add", newRevenue);
            setRevenues([...revenues, { id: uuidv4(), ...newRevenue }]);
        } catch (error) {
            console.error("Error adding new revenue:", error);
        }
        setShowModal(false);
        setNewRevenue({ accountId: id, ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" });
=======
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
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
    };

    return (
        <Box className={`revenue-container ${darkMode ? "dark-mode" : ""}`}>
            <Box className="revenue-header">
                <Typography className="revenue-title">Revenue Tracker</Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <Button className="add-revenue-btn" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                        Add Revenue
                    </Button>
                </Box>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : revenues.length > 0 ? (
                <TableContainer component={Paper} className="revenue-table">
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
<<<<<<< HEAD
                            {revenues.map((revenue, index) => (
                                <TableRow key={revenue.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{revenue.ParentCategoryName}</TableCell>
                                    <TableCell>{revenue.SubCategoryName || "-"}</TableCell>
                                    <TableCell>${revenue.amount}</TableCell>
                                    <TableCell>{new Date(revenue.date).toLocaleDateString() || "-"}</TableCell>
                                </TableRow>
                            ))}
=======
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
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Card className="no-revenue">
                    <CardContent>
                        <Typography>No Revenue Data Found</Typography>
                    </CardContent>
                </Card>
            )}

<<<<<<< HEAD
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box className="revenue-modal">
                    <Box className="modal-header">
                        <Typography variant="h6">Add Revenue</Typography>
                        <IconButton onClick={() => setShowModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <TextField label="Category" fullWidth value={newRevenue.ParentCategoryName} onChange={(e) => handleChange("ParentCategoryName", e.target.value)} className="input-group" />
                    <TextField label="Sub-Category" fullWidth value={newRevenue.SubCategoryName} onChange={(e) => handleChange("SubCategoryName", e.target.value)} className="input-group" />
                    <TextField label="Amount" fullWidth type="number" value={newRevenue.amount} onChange={(e) => handleChange("amount", e.target.value)} className="input-group" />
                    <TextField label="Date" fullWidth type="date" value={newRevenue.date.split("T")[0]} onChange={(e) => handleChange("date", new Date(e.target.value).toISOString())} className="input-group" InputLabelProps={{ shrink: true }} />
                    <Box className="modal-actions">
                        <Button className="save-btn" onClick={handleAddRevenue}>Save</Button>
                        <Button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</Button>
                    </Box>
=======
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
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
                </Box>
            </Modal>
        </Box>
    );
};

export default RevenuePage;
