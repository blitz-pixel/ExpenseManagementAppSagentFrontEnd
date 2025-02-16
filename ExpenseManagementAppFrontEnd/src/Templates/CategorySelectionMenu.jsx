import {useEffect, useState} from "react"
import PropTypes from "prop-types";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

const CategorySelectionMenu = ({ parentCategories, subCategories, newExpense, handleChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [subcategoryAnchorEl, setSubcategoryAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleSubcategoryOpen = (event) => setSubcategoryAnchorEl(event.currentTarget);
    const handleSubcategoryClose = () => setSubcategoryAnchorEl(null);
   // const


    return (
        <>
            {/* Parent Category Selection */}
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
                <Typography>Set Category</Typography>
                <Button variant="outlined" onClick={handleMenuOpen}>
                    {newExpense.ParentCategoryName || "Select Category"}
                </Button>

                <Menu  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{
                    vertical: "bottom",  // Positions the menu below the button
                    horizontal: "left",   // Aligns it to the left
                }}
                       transformOrigin={{
                           vertical: "top",
                           horizontal: "left",
                       }}>
                    {parentCategories
                        .filter((category) => category.SubCategoryName === "")
                        .map((category) => (
                            <MenuItem
                                key={category.id}
                                onClick={() => {
                                    handleChange("ParentCategoryName", category.ParentCategoryName);
                                    // handleChange("SubCategoryName", "");
                                    handleMenuClose();
                                }}
                            >
                                {category.ParentCategoryName}
                            </MenuItem>
                        ))}
                </Menu>
            </Box>

            {/* Subcategory Selection*/}

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography>Select Subcategory</Typography>
                    <Button variant="outlined" onClick={handleSubcategoryOpen} disabled={subCategories.length === 0}>
                        {newExpense.SubCategoryName || "Select Subcategory"}
                    </Button>

                    <Menu anchorEl={subcategoryAnchorEl} open={Boolean(subcategoryAnchorEl)} onClose={handleSubcategoryClose} >
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
    newExpense: PropTypes.shape({
        ParentCategoryName: PropTypes.string,
        SubCategoryName: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default CategorySelectionMenu;
