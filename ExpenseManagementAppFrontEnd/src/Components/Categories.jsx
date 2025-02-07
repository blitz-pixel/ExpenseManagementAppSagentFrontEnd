import {useEffect, useState} from "react";
import {v4 as uuidv4, v4 as uuid4} from "uuid";
import {
    Box,
    TextField,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Paper,
    Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Category = () => {
    const id = localStorage.getItem("accountId");
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        type: ""
    });
    const isDisabled = !newCategory.ParentCategoryName || !newCategory.type;
    const [error,setError] = useState("");
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const addCategory = () => {
        try {
            setError("");
            const response = axios.post("http://localhost:8080/api/v1/categories/add", newCategory).
            catch(
                response => {
                    // console.error("Error adding new category:", response.response.data);
                    setError(response.response.data);
                }
            );
            // setNewCategory({...newCategory, id: uuid4()});
            // setCategories([...categories, newCategory]);
            console.log(response)
            setNewCategory({
                accountId: id,
                ParentCategoryName: "",
                SubCategoryName: "",
                type: ""
            });
        } catch (error){
            console.error("Error adding new category:", error);
        }
        setShowModal(false);
        setRefresh(prevState => !prevState);
    };

    const handleChange = (field, value) => {
        setNewCategory({ ...newCategory, [field]: value });
    };


    const removeCategory = (category) => {
        setCategories(categories.filter((c) => c !== category));
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/categories?Id=${id}`);
                console.log(response)
                const CategoriesWithUnIds = response.data.map((revenue) => ({
                    id: uuidv4(),
                    ...revenue
                }));
                setCategories(CategoriesWithUnIds);
            } catch (error) {
                // console.log(response)
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, [refresh,id]);

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add Category</Button>
            {categories.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Parent-Category</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category, index) => {
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        {category.SubCategoryName === "" ? (
                                            <>
                                                <TableCell>{category.ParentCategoryName || "-"}</TableCell>
                                                <TableCell>-</TableCell>
                                            </>
                                        ) :  (
                                            <>
                                                <TableCell>{category.SubCategoryName}</TableCell>
                                                <TableCell>{category.ParentCategoryName}</TableCell>
                                            </>
                                        )}
                                        <TableCell>{category.type || "-"}

                                            <IconButton  size="small" sx={{  padding: 0, right:"-7px" }} edge="end" onClick={() => removeCategory(category)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            )}

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
                    <Typography variant="h6" gutterBottom>Add Revenue/Expense</Typography>


                    {/* Category Input */}
                    <TextField
                        required
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={newCategory.ParentCategoryName}
                        onChange={(e) => handleChange("ParentCategoryName", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Sub-Category Input */}
                    <TextField
                        label="Sub-Category"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={newCategory.SubCategoryName}
                        onChange={(e) => handleChange("SubCategoryName", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        aria-describedby="type-required"
                        variant="outlined"
                        onClick={handleMenuClick}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {newCategory.type ? newCategory.type : "Select Type"}
                        <span style={{ color: "gray", marginLeft: "5px"}}>*</span>
                    </Button>
                    <p id="type-required" style={{ display: "none" }}>
                        Selecting a type is required.
                    </p>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleChange("type", "expense"); handleMenuClose(); }}>Expense</MenuItem>
                        <MenuItem onClick={() => { handleChange("type", "income"); handleMenuClose(); }}>Income</MenuItem>
                    </Menu>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addCategory}
                            disabled={isDisabled}
                            // onClick={() => setShowModal(false)}
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
        </Box>
    );
};

export default Category;