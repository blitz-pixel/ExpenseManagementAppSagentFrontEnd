import { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const addCategory = () => {
        if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory("");
        }
    };

    const removeCategory = (category) => {
        setCategories(categories.filter((c) => c !== category));
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Manage Categories
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                        label="New Category"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={addCategory}>
                        Add
                    </Button>
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