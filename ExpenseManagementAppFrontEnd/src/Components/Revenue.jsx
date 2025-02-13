import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { api } from "../Templates/axiosInstance.js";
import TransactionFormModal from "../Templates/TransactionFormModal.jsx";



const id = localStorage.getItem("accountId");

const Revenue = () => {
    const queryClient = useQueryClient();

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
                    const res = await api.get(`/categories/specific?Id=${id}&&type=expense`);
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

    const expensesQuery = queries[0];
    const categoriesQuery = queries[1];

    const { data: revenues, isLoading: isLoadingRevenues, error: RevenueError } = expensesQuery;
    const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = categoriesQuery;

    const [newRevenue, setNewRevenue] = useState({
        // accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        amount: "",
        date: "",
    });

    const handleAddExpense = useMutation({
        mutationFn: async (newRevenue) => {
            const response = await api.post("/revenue/add", newRevenue);
            // return response.data;
        },
        onSuccess: () => {
            setNewRevenue({
                // accountId: id,
                ParentCategoryName: "",
                SubCategoryName: "",
                amount: "",
                date: "",
            });
            queryClient.invalidateQueries(["revenues", id]);
        },
        onError: (error) => console.error("Error adding new Revenue:", error),
    });

    const removeExpense = useMutation({
        mutationFn: async (uuid) => {
            await api.delete(`/revenue/delete?uuid=${uuid}`)
        },
        onSuccess: () => queryClient.invalidateQueries(["revenues", id]),
        onError: (error) => console.error("Error deleting expense:", error),
    });

    const handleChange = (field, value) => {
        setNewRevenue({ ...newRevenue, [field]: value });
    };

    const isLoading = isLoadingRevenues || isLoadingCategories;
    const error = RevenueError || categoriesError || handleAddExpense.error || removeExpense.error;

    if (isLoading)
        return (
            <Box>
                <CircularProgress />
            </Box>
        );

    const addRevenueHandler = () => {
        handleAddExpense.mutate(newRevenue);
    };
    const removeRevenueHandler = (uuid) => {
        removeExpense.mutate(uuid);
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            {error && <div style={{ color: "red" }}>Error: {error?.message}</div>}
            <TransactionFormModal
                name="Expenses"
                transaction={revenues || []}
                removeExpense={removeRevenueHandler}
                categories={categories || []}
                newExpense={newRevenue}
                handleChange={handleChange}
                handleAddExpense={addRevenueHandler}
            />
        </div>
    );
};

export default Revenue;
