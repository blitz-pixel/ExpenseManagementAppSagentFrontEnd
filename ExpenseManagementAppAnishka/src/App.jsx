"use client";

import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Account from "./Components/Account.jsx";
import Expense from "./Components/Expense.jsx";
import Revenue from "./Components/Revenue.jsx";
import Navbar from "./Components/Navbar.jsx";
import Layout from "./Components/Layout.jsx";
import Settings from "./Components/Settings.jsx";
import Report from "./Components/Report";
import "./App.css";

const App = () => {
    const [data, setData] = useState({
        revenue: [],
        expenses: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/financial-data");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching financial data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Expense" element={<Expense />} />
                        <Route path="/Revenue" element={<Revenue />} />
                        <Route path="/Account" element={<Account />} />
                        <Route path="/Settings" element={<Settings />} />
                    </Route>
                    <Route path="/Registration" element={<Registration />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
                <Report data={data} />
            </Router>
        </div>
    );
};

export default App;
