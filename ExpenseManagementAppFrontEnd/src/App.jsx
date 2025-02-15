// import React, { useState } from "react";
import Registration from "./Components/Registration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Components/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./styles/App.css";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";

import Account from "./Components/Account.jsx";
import Expense from "./Components/Expense.jsx";
import Revenue from "./Components/Revenue.jsx";
import Categories from "./Components/Categories.jsx";
import Navbar from "./Templates/Navbar.jsx";
import Layout from "./Templates/Layout.jsx";
import Settings from "./Components/Settings.jsx";
import ProtectedRoute from "./Templates/Protected.jsx";
import Report from "./Components/Report.jsx";
// import Todos from "./Templates/Test.jsx";

const App = () => {
    const queryClient = new QueryClient();
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>

                        <Route path="/Registration" element={<Registration />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Report" element={<Report />} />

                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/Dashboard" element={<Dashboard />} />
                                <Route path="/Account" element={<Account />} />
                                <Route path="/Expense" element={<Expense />} />
                                <Route path="/Revenue" element={<Revenue />} />
                                <Route path="/Category" element={<Categories />} />
                                <Route path="/Settings" element={<Settings />} />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    );
};

export default App;
