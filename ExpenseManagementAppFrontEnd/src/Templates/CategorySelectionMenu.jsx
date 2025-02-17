import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {Box, Button, FormControlLabel, Menu, MenuItem, RadioGroup, Typography,Radio} from "@mui/material";

const CategorySelectionMenu = ({ parentCategories, subCategories,  newTransaction, handleChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [subcategoryAnchorEl, setSubcategoryAnchorEl] = useState(null);
    const [error, setError] = useState(false);

    const handleMenuOpen = (event) => {
        console.log("Menu Opened");
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => setAnchorEl(null);

    const handleSubcategoryOpen = (event) => {
        console.log("Subcategory Menu Opened");
        setSubcategoryAnchorEl(event.currentTarget);
    };
    const handleSubcategoryClose = () => setSubcategoryAnchorEl(null);

   ;

    useEffect(() => {
        if (subCategories.length === 0 && newTransaction.ParentCategoryName) {
            setError(true);
        }
    }, [subCategories]);

    return (
        <>
            {/* Parent Category Selection */}
            <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
                    <Typography color="black" sx={{padding: "10px"}}>Set Category</Typography>
                    <Button variant="outlined" onClick={handleMenuOpen}>
                        {newTransaction.ParentCategoryName || "Select Category"}
                    </Button>
                    {error && (

                        <Typography color="error" variant="body2" sx={{padding: "10px", marginTop: "70px",position: "absolute"}}>
                            Please add a subcategory first
                        </Typography>
                    )}

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        // sx={{
                        //     maxHeight: "300px",
                        //     overflowY: "auto", // Make the menu scrollable if content exceeds maxHeight
                        //     zIndex: 1301, // Ensure it appears on top
                        // }}
                    >
                        {parentCategories
                            .filter((category) => category.SubCategoryName === "")
                            .map((category) => (
                                <MenuItem
                                    key={category.id}
                                    onClick={() => {
                                        setError(false);
                                        handleChange("ParentCategoryName", category.ParentCategoryName);
                                        handleMenuClose();
                                    }}
                                >
                                    {category.ParentCategoryName}
                                </MenuItem>
                            ))}
                    </Menu>
                </Box>

                {/* Subcategory Selection */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography color="black" >Select Subcategory</Typography>
                    <Button
                        variant="outlined"
                        onClick={handleSubcategoryOpen}
                        disabled={subCategories.length === 0}
                    >
                        {newTransaction.SubCategoryName || "Select Subcategory"}
                    </Button>

                    <Menu
                        anchorEl={subcategoryAnchorEl}
                        open={Boolean(subcategoryAnchorEl)}
                        onClose={handleSubcategoryClose}
                        // sx={{
                        //     maxHeight: "300px", // Limit the height of the subcategory menu
                        //     overflowY: "auto", // Make it scrollable if content exceeds maxHeight
                        //     zIndex: 1301, // Ensure it appears on top
                        // }}
                    >
                        {subCategories.length > 0 &&
                            subCategories.map((subcategory) => (
                                <MenuItem
                                    key={subcategory.id}
                                    onClick={() => {
                                        handleChange("SubCategoryName", subcategory.SubCategoryName);
                                        handleSubcategoryClose();
                                    }}
                                >
                                    {subcategory.SubCategoryName}
                                </MenuItem>
                            ))}
                    </Menu>
                </Box>
            </Box>
        </>
    );
};

CategorySelectionMenu.propTypes = {
    parentCategories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            ParentCategoryName: PropTypes.string.isRequired,
            SubCategoryName: PropTypes.string,
        })
    ).isRequired,
    subCategories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            ParentCategoryName: PropTypes.string.isRequired,
            SubCategoryName: PropTypes.string.isRequired,
        })
    ).isRequired,
    newTransaction: PropTypes.shape({
        ParentCategoryName: PropTypes.string,
        SubCategoryName: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default CategorySelectionMenu;
