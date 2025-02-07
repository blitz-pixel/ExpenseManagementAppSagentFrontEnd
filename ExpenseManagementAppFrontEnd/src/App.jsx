// import React, { useState } from "react";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";

import Account from "./Components/Account.jsx";
import Expense from "./Components/Expense.jsx";
import Revenue from "./Components/Revenue.jsx";
import Categories from "./Components/Categories.jsx";
import Navbar from "./Components/Navbar.jsx";
import Layout from "./Components/Layout.jsx";
import Settings from "./Components/Settings.jsx";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home />} />
                        <Route path="/Account" element={<Account />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Expense" element={<Expense/>}/>
                        <Route path="/Revenue" element={<Revenue/>}/>
                        <Route path="/Category" element={<Categories />} />

                        <Route path="/Settings" element={<Settings />} />


                    </Route>
                    <Route path="/Registration" element={ <Registration/>} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
