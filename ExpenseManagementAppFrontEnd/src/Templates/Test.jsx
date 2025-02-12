
// const fetchData = async (id) => {
//     const [expenseValues, categoryValues] = await Promise.all([
//         api.get(`/expense?accountId=${id}`),
//         api.get(`/categories?Id=${id}`)
//     ]);
//
//     const categoriesWithIds = categoryValues.data.map((category) => ({
//         id: uuidv4(),
//         ...category
//     }));
//
//     return {
//         expenses: expenseValues.data,
//         categories: categoriesWithIds
//     };
// };
// const initialState = {
//     expenses: [],
//     categories: [],
//     loading: false,
//     refresh: false,
//     newExpense: { accountId: id, ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" }
// };
//
// const expenseReducer = (state, action) => {
//     switch (action.type) {
//         case "SET_EXPENSES":
//             return { ...state, expenses: action.payload };
//         case "SET_CATEGORIES":
//             return { ...state, categories: action.payload };
//         case "SET_LOADING":
//             return { ...state, loading: action.payload };
//         case "SET_NEW_EXPENSE":
//             return { ...state, newExpense: { ...state.newExpense, [action.field]: action.value } };
//         case "RESET_EXPENSE":
//             return {
//                 ...state,
//                 newExpense: { accountId: action.accountId, ParentCategoryName: "", SubCategoryName: "", amount: "", date: "" },
//             };
//         case "TRIGGER_REFRESH":
//
//             console.log("Old refresh state:", state.refresh);
//             const newState =  return { ...state, refresh: state.refresh ? false : true };
//             console.log("New refresh state:", newState.refresh);
//             return newState;
//         default:
//             return state;
//     }
// };
// const [state, dispatch] = useReducer(expenseReducer,initialState,(initialState) => ({ ...initialState }))
// const [loading, setLoading] = useState(true);

// const [expenses, setExpenses] = useState([]);
// const [categories, setCategories] = useState([]);

// const [refresh, setRefresh] = useState(false);

// Handle adding a new expense
// const handleAddExpense = async () => {
//     try {
//         console.log(newExpense);
//         await api.post("/expense/add", newExpense);
//
//     } catch (error) {
//         console.error("Error adding new expense:", error);
//     }
//
//
//     // console.log("b" + state.refresh)
//     // dispatch({ type: "TRIGGER_REFRESH" });
//     // console.log("a" + state.refresh)
//     setRefresh(prev => !prev);
//     setNewExpense({ accountId: id, ParentCategoryName: "", SubCategoryName: "", amount: "", date: ""});
// };
// const onModalClose = () => {
//     handleChange("ParentCategoryName", "");
//     handleChange("SubCategoryName", "");
//     setShowModal(false)
// }

// // Fetch Expenses
// useEffect(() => {
//     const fetchData = async () => {
//         setLoading(true);
//
//         try {
//             const [expenseValues, categoryValues] = await Promise.all([
//                 api.get(`/expense?accountId=${id}`),
//                 api.get(`/categories?Id=${id}`)
//             ]);
//
//             const CategoriesWithUnIds = categoryValues.data.map((category) => ({
//                 id: uuidv4(),
//                 ...category
//             }));
//             // console.log(CategoriesWithUnIds)
//
//             setExpenses(expenseValues.data);
//             setCategories(CategoriesWithUnIds);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         } finally {
//             setLoading(false); // Stop loading after all requests finish
//         }
//     };
//
//     fetchData();
//
// }, [refresh, id]);

// const removeExpense = (expense,uuid) => {
//     try {
//         // const response = api.delete(`expense/delete?id=${uuid}`);
//         console.log(uuid);
//         console.log("smtg");
//     } catch (error) {
//         console.error("Error deleting category:", error);
//     }
//     setExpenses(expenses.filter((exp) => exp !== expense));
// };




import {useEffect, useReducer, useState} from "react";


// const initialTodos = [
//     {
//         id: 1,
//         title: "Todo 1",
//         complete: false,
//     },
//     {
//         id: 2,
//         title: "Todo 2",
//         complete: false,
//     },
// ];
//
// const reducer = (state, action) => {
//     switch (action.type) {
//         case "COMPLETE":
//             return state.map((todo) => {
//                 if (todo.id === action.id) {
//                     return { ...todo, complete: !todo.complete };
//                 } else {
//                     return todo;
//                 }
//             });
//         default:
//             return state;
//     }
// };

const initialState =
    {
        categories: []
    }

const reducer = (state,action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
            return {...state, categories: action.payload};
        case "ADD_CATEGORY":
            return {...state, categories: [...state.categories, action.payload]};
        case "REMOVE_CATEGORY":
            return {...state, categories: state.categories.filter((c) => c !== action.payload)};
        default:
            return state;
    }
}

function Todos() {
    const [cat,dispatch] = useReducer(reducer,initialState);




    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: "ADD_CATEGORY", payload: { id: Math.random(), title: "New Category", complete: false } });
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval when component unmounts
    }, []);

    useEffect(() => {
        console.log(cat);
    }, [cat]);


    // const handleComplete = (todo) => {
    //     dispatch({ type: "COMPLETE", id: todo.id });
    // };

    // console.log(cat)
    return (
        <>
            {/*{todos.map((todo) => (*/}

            {/*    <div key={todo.id}>*/}
            {/*        <label>*/}
            {/*            <input*/}
            {/*                type="checkbox"*/}
            {/*                checked={todo.complete}*/}
            {/*                onChange={() => handleComplete(todo)}*/}
            {/*            />*/}

            {/*            {todo.title}*/}
            {/*        </label>*/}
            {/*    </div>*/}
            {/*))}*/}
            <p> Smtg</p>
        </>
    );
}

export default Todos;
