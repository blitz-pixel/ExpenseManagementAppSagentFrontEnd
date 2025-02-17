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
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Modal,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {api} from "../Templates/axiosInstance.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";



const accountId = localStorage.getItem("accountId") || "";

const initialState = {
    showModal: false,
    anchorEl: null,
    newCategory: { ParentCategoryName: "", SubCategoryName: "", type: "" },
    error: "",
    snackbar : {
        open: true, message: "", severity: "",code : 0
    },
    dialog : {
        open: false,
        message: "",
        NameToDelete : ""
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return { ...state, showModal: !state.showModal };
        case "SET_ANCHOR":
            return { ...state, anchorEl: action.payload };
        case "ADD_CATEGORY":
            return { ...state,  newCategory: { ...initialState.newCategory} };
        case "SET_SNACKBAR":
            return { ...state, snackbar: action.payload };
        case "SET_DIALOG":
            return {...state, dialog: action.payload};
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
    const { data : categories, isLoading : isFetchingCategory, isError: isCategoryError }  = useQuery({
        queryKey: ["categories", accountId],
        queryFn: async () => {
            try {
            const response = await api.get(`/categories?Id=${accountId}`);
            console.log(response)
            return (Array.isArray(response.data) ? response.data : []).map(category => ({
                id: uuidv4(),
                ...category
            }));
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.response.data });
        }
    }})


    const addCategory = useMutation({
        mutationFn: async (newCategory) => {
            const response = await api.post("categories/add", newCategory);
            return response.data;
        },
        onSuccess: () => {
            dispatch({type: "SET_SNACKBAR", payload: {open: true, message: "Category added successfully", severity: "success", code: 110}})
            queryClient.invalidateQueries(["categories", accountId]);
            dispatch({ type: "ADD_CATEGORY"});
            dispatch({ type: "TOGGLE_MODAL" });
        },
        onError: (error) => {
            console.error("Error adding new category:", error);
            dispatch({ type: "SET_SNACKBAR", payload: {open : true, message: error.response.data, severity: "error", code: 101 }});
        }
    });


    const addCategoryHandler = () => {
        dispatch({ type: "SET_SNACKBAR", payload: {...initialState, open: false}});
        addCategory.mutate(category.newCategory);
    };

    const removeCategory = useMutation({
        mutationFn: async ({accountId,name}) => {
            console.log("name in func " + name)
            const response = await api.delete(`categories/delete?Id=${accountId}&&name=${name}`);
            return response.data
        },
        onSuccess: () =>{
            dispatch({type: "SET_SNACKBAR", payload: {open: true, message: "Category deleted successfully", severity: "success", code: 108}})
            queryClient.invalidateQueries([categories,accountId])
        },
        onError: (error) => {
            console.error("Error adding new category:", error);
            dispatch({ type: "SET_SNACKBAR", payload: {open: true, message: error.response.data, severity: "error", code: 102} });
        }
    })

    const deleteCategoryHandler = (name) => {
        return removeCategory.mutate({ accountId, name })
    }

    const handleChange = (field, value) => {
        dispatch({ type: "SET_NEW_CATEGORY", field, value });
    };

    const handleMenuClose = () => {
        dispatch({ type: "SET_ANCHOR", payload: null });
    };

    const handleSnackbarClose = () => {
        dispatch({ type: "SET_SNACKBAR", payload: {...initialState, open: false}});
    }
    const isLoading = isFetchingCategory || addCategory.isPending || removeCategory.isPending;
    

    if (isLoading || isCategoryError)
        return (
            <Box>
                <Snackbar
                    open={category.snackbar.open}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={() => dispatch({ type: "SET_SNACKBAR", payload: { ...initialState.snackbar, open: false } })}
                >
                    <Alert
                        onClose={() => dispatch({ type: "SET_SNACKBAR", payload: { ...initialState.snackbar, open: false } })}
                        severity={isCategoryError ? "error" : "info"}
                    >
                        {isCategoryError ? "Fetching Categories.." : category.snackbar.message}
                    </Alert>
                </Snackbar>
                {isLoading && <CircularProgress sx={{color: "#7c5f13"}} />}
            </Box>
        );


    // if (isCategoryError){
    //     return (
    //         <>
    //             <Snackbar
    //                 open = {category.snackbar.open}
    //                 autoHideDuration={6000}
    //                 anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //                 onClose={handleSnackbarClose}
    //             >
    //                     <Alert onClose={handleSnackbarClose} severity={category.snackbar.severity}>
    //                         {category.snackbar.message}
    //                     </Alert>
    //             </Snackbar>
    //         </>
    //     )
    // }
    return (
        <>

            <Snackbar
                open = {category.snackbar.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={category.snackbar.severity}>
                    {category.snackbar.message}
                </Alert>
            </Snackbar>

            <Dialog open={category.dialog.open} onClose={() => dispatch({ type: "SET_DIALOG",payload: initialState.dialog})}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    <p>{category.dialog.message}</p>
                </DialogContent>
                <DialogActions>
                    <Button color="red" onClick={() =>
                    {
                        deleteCategoryHandler(category.dialog.NameToDelete)
                        dispatch({ type: "SET_DIALOG" , payload: initialState.dialog})
                    }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Button variant="contained" color="primary" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>Add Category</Button>
            {categories.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 ,
                    background: "rgba(255, 255, 255, 0.9)", // Slight transparency for depth
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Embossed effect
                    borderRadius: "10px", // Smooth corners
                    overflow: "hidden",
                }}>
                    <Table sx={{
                        borderCollapse: "separate", // Avoids default border collapse
                        borderSpacing: "0px", // Removes unwanted gaps
                    }}>
                        <TableHead>
                            <TableRow sx={{ background: "#333" }} >
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Parent-Category</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#fff", padding: "12px", borderBottom: "none" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((item, index) => (
                                <TableRow key={item.id} sx={{
                                    backgroundColor: index % 2 === 0 ? "#534904" : "#b8860b",
                                    "&:hover": {
                                        backgroundColor: "#a67c00",
                                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                                        transform: "scale(1.02)",
                                    },
                                    transition: "background 0.3s, box-shadow 0.3s, transform 0.3s",
                                }}>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{index + 1}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{item.SubCategoryName || item.ParentCategoryName || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{item.SubCategoryName ? item.ParentCategoryName : "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>{item.type || "-"}</TableCell>
                                    <TableCell sx={{ color: "#fff", padding: "12px", border: "none" }}>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                padding: 0,
                                                right: "-7px",
                                                color: "#fff",
                                                "&:hover": { color: "#ff4d4d" },
                                            }}
                                            edge="end"
                                            onClick={() => {
                                                const name = item.SubCategoryName ? item.SubCategoryName : item.ParentCategoryName;
                                                if (name === item.SubCategoryName) {
                                                    dispatch({type: "SET_DIALOG", payload: {open: true, message: `Are you sure you want to delete ${name}? 
                                                    Deleting this will also delete the related transactions.`, NameToDelete : name}})
                                                } else {
                                                    dispatch({type: "SET_DIALOG", payload: {open: true, message: `Are you sure you want to delete ${name}? 
                                                    Deleting this will also delete the related Sub-Categories and transactions.`, NameToDelete : name}})
                                                }
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
                <Box sx={{
                    width: 400,
                    bgcolor: "white",
                    borderRadius: "8px",
                    p: 3,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: 24,
                    zIndex: 1300,
                }}>

                    <Typography variant="h6">Add Revenue/Expense</Typography>
                    <TextField label="Category"  required fullWidth sx={{ mb: 2 }} value={category.newCategory.ParentCategoryName} onChange={(e) => handleChange("ParentCategoryName", e.target.value)} />
                    <TextField label="Sub-Category" fullWidth sx={{ mb: 2 }} value={category.newCategory.SubCategoryName} onChange={(e) => handleChange("SubCategoryName", e.target.value)} />

                    <Button variant="outlined" fullWidth onClick={(e) => dispatch({ type: "SET_ANCHOR", payload: e.currentTarget })}>
                        {category.newCategory.type || "Select Type"}
                    </Button>
                    <Menu anchorEl={category.anchorEl} open={Boolean(category.anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => { handleChange("type", "expense"); handleMenuClose(); }}>Expense</MenuItem>
                        <MenuItem onClick={() => { handleChange("type", "income"); handleMenuClose(); }}>Income</MenuItem>
                    </Menu>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={addCategoryHandler} disabled={!category.newCategory.ParentCategoryName || !category.newCategory.type} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
        </>
    );
};



export default Category;
