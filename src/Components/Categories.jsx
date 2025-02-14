import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
=======
import { useState } from "react";
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Paper,
    Typography,
<<<<<<< HEAD
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Modal
=======
>>>>>>> 9dfe1cb0d18003fad444df92f8c97f1ea4a9555d
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        type: ""
    });
    const [error, setError] = useState("");
    
    const isDisabled = !newCategory.ParentCategoryName || !newCategory.type;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/categories?Id=${id}`);
                const categoriesWithIds = response.data.map((category) => ({ id: uuidv4(), ...category }));
                setCategories(categoriesWithIds);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [refresh, id]);

    const addCategory = async () => {
        try {
            setError("");
            await axios.post("http://localhost:8080/api/v1/categories/add", newCategory);
            setNewCategory({ accountId: id, ParentCategoryName: "", SubCategoryName: "", type: "" });
            setShowModal(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            setError(error.response?.data || "Error adding category");
        }
    };

    const removeCategory = (categoryId) => {
        setCategories(categories.filter((c) => c.id !== categoryId));
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, textAlign: "center" }}>
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add Category</Button>
            {categories.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Parent-Category</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category, index) => (
                                <TableRow key={category.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{category.SubCategoryName || category.ParentCategoryName || "-"}</TableCell>
                                    <TableCell>{category.SubCategoryName ? category.ParentCategoryName : "-"}</TableCell>
                                    <TableCell>{category.type || "-"}</TableCell>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => removeCategory(category.id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box sx={{
                    width: 400,
                    bgcolor: "white",
                    borderRadius: 2,
                    p: 3,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: 24
                }}>
                    <Typography variant="h6" gutterBottom>Add Category</Typography>
                    <TextField
                        required
                        label="Category"
                        fullWidth
                        value={newCategory.ParentCategoryName}
                        onChange={(e) => setNewCategory({ ...newCategory, ParentCategoryName: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Sub-Category"
                        fullWidth
                        value={newCategory.SubCategoryName}
                        onChange={(e) => setNewCategory({ ...newCategory, SubCategoryName: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="outlined" onClick={(e) => setAnchorEl(e.currentTarget)} fullWidth>
                        {newCategory.type || "Select Type"}
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                        <MenuItem onClick={() => setNewCategory({ ...newCategory, type: "expense" })}>Expense</MenuItem>
                        <MenuItem onClick={() => setNewCategory({ ...newCategory, type: "income" })}>Income</MenuItem>
                    </Menu>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={addCategory} disabled={isDisabled} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    </Box>
                </Box>
                <List sx={{ mt: 2 }}>
                    {categories.map((category, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => removeCategory(category)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={category} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Category;
