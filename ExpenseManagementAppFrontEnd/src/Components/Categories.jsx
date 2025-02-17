import {useEffect, useReducer, useState} from "react";
import {v4 as uuidv4, v4 as uuid4} from "uuid";
import {
    Box,
    TextField,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Paper,
    Snackbar,
    Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Modal, CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {api} from "../Templates/axiosInstance.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";



const accountId = localStorage.getItem("accountId") || "";

const initialState = {
    showModal: false,
    anchorEl: null,
    newCategory: { accountId: accountId, ParentCategoryName: "", SubCategoryName: "", type: "" },
    error: "",
    snackbar : {
        open: false, message: "", severity: "",code : 0
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return { ...state, showModal: !state.showModal };
        // case "SET_REFRESH":
        //     return { ...state, refresh: !state.refresh };
        case "SET_ANCHOR":
            return { ...state, anchorEl: action.payload };
        // case "FETCH_CATEGORIES":
        //     return { ...state, categories: action.payload };
        case "ADD_CATEGORY":
            return { ...state,  newCategory: { ...initialState.newCategory} };
        // case "REMOVE_CATEGORY":
        //     return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
        case "SET_SNACKBAR":
            return { ...state, snackbar: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_NEW_CATEGORY":
            return { ...state, newCategory: { ...state.newCategory, [action.field]: action.value } };
        default:
            return state;
    }
};

const Category = () => {
    const queryClient = useQueryClient();
    const [category, dispatch] = useReducer(reducer, initialState);
    const isDisabled = !category.newCategory.ParentCategoryName || !category.newCategory.type;
    const { data : categories, isLoading : isFetchingCategory }  = useQuery({
        queryKey: ["categories", accountId],
        queryFn: async () => {
            const response = await api.get(`/categories?Id=${accountId}`);
            return (Array.isArray(response.data) ? response.data : []).map(category => ({
                id: uuidv4(),
                ...category
            }));
        }
    })


    const addCategory = useMutation({
        mutationFn: async (newCategory) => {
            const response = await api.post("categories/add", newCategory);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["categories", accountId]);
            dispatch({ type: "ADD_CATEGORY"});
            dispatch({ type: "TOGGLE_MODAL" });
        },
        onError: (error) => {
            console.error("Error adding new category:", error);
            dispatch({ type: "SET_ERROR", payload: error.message});
        }
    });


    const addCategoryHandler = () => {
        dispatch({ type: "SET_ERROR", payload: "" });
        addCategory.mutate(category.newCategory);
    };

    const removeCategory = useMutation({
        mutationFn: async ({accountId,name}) => {
            console.log("name in func " + name)
            const response = await api.delete(`categories/delete?Id=${accountId}&&name=${name}`);
            return response.data
        },
        onSuccess: () =>{
            queryClient.invalidateQueries([categories,accountId])
        },
        onError: (error) => {
            console.error("Error adding new category:", error);
            dispatch({ type: "SET_ERROR", payload: error.response.data});
        }
    })

    const deleteCategoryHandler = (name) => {
        console.log("in handle func: " + name)

        return removeCategory.mutate({ accountId, name })
    }

    const handleChange = (field, value) => {
        dispatch({ type: "SET_NEW_CATEGORY", field, value });
    };

    const handleMenuClose = () => {
        dispatch({ type: "SET_ANCHOR", payload: null });
    };
    const isLoading = isFetchingCategory || addCategory.isPending;
    category.error = category.error || "Error fetching Categories";
    



    if (isLoading)
        return (
            <Box>
                <CircularProgress />
            </Box>
        );
    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            {/*{category.error && <Typography color="error">{category.error}</Typography>}*/}
            <Button variant="contained" color="primary" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>Add Category</Button>

            {categories?.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Parent-Category</TableCell>
                                <TableCell>Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.SubCategoryName || item.ParentCategoryName || "-"}</TableCell>
                                    <TableCell>{item.SubCategoryName ? item.ParentCategoryName : "-"}</TableCell>
                                    <TableCell>{item.type || "-"}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            sx={{ padding: 0, right: "-7px" }}
                                            edge="end"
                                            onClick={() => {
                                                const name = item.SubCategoryName ? item.SubCategoryName : item.ParentCategoryName;
                                                console.log("Name selected:", name);
                                                deleteCategoryHandler(name)
                                                // console.log("SubCategoryName:", item.SubCategoryName);
                                                // console.log("ParentCategoryName:", item.ParentCategoryName);
                                            }
                                        }
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

            <Modal open={category.showModal} onClose={() => dispatch({ type: "TOGGLE_MODAL" })}>
                <Box sx={{ width: 400, bgcolor: "white", p: 3, borderRadius: "8px", boxShadow: 24, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

                    <Typography variant="h6">Add Revenue/Expense</Typography>
                    <TextField label="Category" fullWidth sx={{ mb: 2 }} value={category.newCategory.ParentCategoryName} onChange={(e) => handleChange("ParentCategoryName", e.target.value)} />
                    <TextField label="Sub-Category" fullWidth sx={{ mb: 2 }} value={category.newCategory.SubCategoryName} onChange={(e) => handleChange("SubCategoryName", e.target.value)} />

                    <Button variant="outlined" fullWidth onClick={(e) => dispatch({ type: "SET_ANCHOR", payload: e.currentTarget })}>
                        {category.newCategory.type || "Select Type"}
                    </Button>
                    <Menu anchorEl={category.anchorEl} open={Boolean(category.anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => { handleChange("type", "expense"); handleMenuClose(); }}>Expense</MenuItem>
                        <MenuItem onClick={() => { handleChange("type", "income"); handleMenuClose(); }}>Income</MenuItem>
                    </Menu>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={addCategoryHandler} disabled={isDisabled} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};



export default Category;
