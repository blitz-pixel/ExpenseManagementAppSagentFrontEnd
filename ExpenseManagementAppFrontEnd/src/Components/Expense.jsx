import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { api } from "../Templates/axiosInstance.js";
import TransactionFormModal from "../Templates/TransactionFormModal.jsx";



const id = localStorage.getItem("accountId");

const Expense = () => {
    const queryClient = useQueryClient();

    const queries = useQueries({
        queries: [
            {
                queryKey: ["expenses", id],
                queryFn: async () => {
                    const res = await api.get(`/expense?accountId=${id}`);
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

    const { data: expenses, isLoading: isLoadingExpenses, error: expensesError } = expensesQuery;
    const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = categoriesQuery;

    const [newExpense, setNewExpense] = useState({
        // accountId: id,
        ParentCategoryName: "",
        SubCategoryName: "",
        amount: "",
        date: "",
    });

    const handleAddExpense = useMutation({
        mutationFn: async (newExpense) => {
            const response = await api.post("/expense/add", newExpense);
            // return response.data;
        },
        onSuccess: () => {
            setNewExpense({
                // accountId: id,
                ParentCategoryName: "",
                SubCategoryName: "",
                amount: "",
                date: "",
            });
            queryClient.invalidateQueries(["expenses", id]);
        },
        onError: (error) => console.error("Error adding new expense:", error),
    });

    const removeExpense = useMutation({
        mutationFn: async (uuid) => {
            await api.delete(`/expense/delete?uuid=${uuid}`)
        },
        onSuccess: () => queryClient.invalidateQueries(["expenses", id]),
        onError: (error) => console.error("Error deleting expense:", error),
    });

    const handleChange = (field, value) => {
        setNewExpense({ ...newExpense, [field]: value });
    };

    const isLoading = isLoadingExpenses || isLoadingCategories;
    const error = expensesError || categoriesError || handleAddExpense.error || removeExpense.error;

    if (isLoading)
        return (
            <Box>
                <CircularProgress />
            </Box>
        );

    const addExpenseHandler = () => {
        handleAddExpense.mutate(newExpense);
    };
    const removeExpenseHandler = (uuid) => {
        removeExpense.mutate(uuid);
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            {error && <div style={{ color: "red" }}>Error: {error?.message}</div>}
            <TransactionFormModal
                name="Expenses"
                transaction={expenses || []}
                removeExpense={removeExpenseHandler}
                categories={categories || []}
                newExpense={newExpense}
                handleChange={handleChange}
                handleAddExpense={addExpenseHandler}
            />
        </div>
    );
};

export default Expense;
