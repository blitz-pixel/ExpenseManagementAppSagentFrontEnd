import {useEffect, useState} from "react";
import {Alert, Box, CircularProgress, Snackbar} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { api } from "../Templates/axiosInstance.js";
import TransactionFormModal from "../Templates/TransactionFormModal.jsx";



const id = localStorage.getItem("accountId");

const Revenue = () => {
    const queryClient = useQueryClient();
    const [snackbar, setSnackbar] = useState({ open: true, message: "", severity: "",code : 0 });
    const queries = useQueries({
        queries: [
            {
                queryKey: ["revenues", id],
                queryFn: async () => {
                    const res = await api.get(`/revenue?accountId=${id}`);
                    return res.data || [];
                },
                cacheTime: 10 * 60 * 1000,
            },
            {
                queryKey: ["categories", id],
                queryFn: async () => {
                    const res = await api.get(`/categories/specific?Id=${id}&&type=income`);
                    return Array.isArray(res.data)
                        ? res.data.map((category) => ({
                            id: uuidv4(),
                            ...category,
                        }))
                        : [];
                },
                cacheTime: 10 * 60 * 1000,
            },
        ],
    });

    const revenueQuery = queries[0];
    const categoriesQuery = queries[1];

    const { data: revenues, isLoading: isLoadingRevenues, error: RevenueError } = revenueQuery;
    const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = categoriesQuery;

    const [newRevenue, setNewRevenue] = useState({
        // accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        Description: "",
        isRecurring: false,
        frequency: "NONE",
        amount: "",
        date: "",
    });

    const handleAddRevenue = useMutation({
        mutationFn: async (newRevenue) => {
            const response = await api.post("/revenue/add", newRevenue);
            // return response.data;
        },
        onSuccess: () => {
            setNewRevenue({
                // accountId: id,
                ParentCategoryName: "",
                SubCategoryName: "",
                Description: "",
                isRecurring: false,
                frequency: "NONE",
                amount: "",
                date: "",
            });
            queryClient.invalidateQueries(["revenues", id]);
        },
        onError: (error) => {
            console.error("Error adding new Revenue:", error)
            setSnackbar({ open: true, message: error.response.data, severity: "error",code : 0 });
        },
    });

    const removeRevenue = useMutation({
        mutationFn: async (uuid) => {
            await api.delete(`/revenue/delete?uuid=${uuid}`)
        },
        onSuccess: () => {
            setSnackbar({ open: true, message: "Revenue deleted successfully", severity: "success" });
            setNewRevenue({ParentCategoryName: "",SubCategoryName: "",amount: "",date: ""});
            queryClient.invalidateQueries(["revenues", id]);
            },
        onError: (error) => {console.error("Error deleting revenue:", error)
            setSnackbar({ open: true, message: error.response.data, severity: "error",code : 0 });},
    });

    const handleChange = (field, value) => {
        setNewRevenue({ ...newRevenue, [field]: value });
    };

    const isLoading = isLoadingRevenues || isLoadingCategories || handleAddRevenue.isPending || removeRevenue.isPending;
    const error = RevenueError || categoriesError;
    const isFetching = isLoading || error;

    useEffect(() => {
        if (categories && categories.length === 0) {
            setSnackbar({ open: true, message: "Please add a Income category first", severity: "error",code : 110 });
        }
    }, [categories]);

    if (isFetching) {
        return (
            <Box>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => {setSnackbar(
                            { ...snackbar, open: false });
                    }}
                        severity={error ? "error" : "info"}
                    >
                        {error ? error?.message : "Fetching Revenues..."}
                    </Alert>
                </Snackbar>
                {isLoading && <CircularProgress sx={{color: "#7c5f13"}}/>}
            </Box>
        );
    }


    const addRevenueHandler = () => {
        handleAddRevenue.mutate(newRevenue);
    };
    const removeRevenueHandler = (uuid) => {
        removeRevenue.mutate(uuid);
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            <Snackbar
                open={snackbar.open && snackbar.code !== 0}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {/*{error && <div style={{ color: "red" }}>Error: {error?.message}</div>}*/}
            <TransactionFormModal
                name="Revenue"
                transaction={revenues || []}
                removeTransaction={removeRevenueHandler}
                categories={categories || []}
                newTransaction={newRevenue}
                handleChange={handleChange}
                handleAddTransaction={addRevenueHandler}
                snackBar={snackbar}
                setSnackBar={setSnackbar}
            />
        </div>
    );
};

export default Revenue;
