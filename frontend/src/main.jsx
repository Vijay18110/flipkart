import React from "react";
import ReactDOM from "react-dom/client";
import Categoryshop from "./CategoryShop";
import Subcategory from "./Subcategory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Product";
import Customer from "./Customer";
import Customersubcategory from "./Customersubcategory";
import './index.css'


import Adminlog from "./Adminlog";
import Register from "./pages/Register";
import Customerlogin from "./components/Customerlogin";
import CustomerRegister from "./components/CustomerRegister";
import CartDetail from "./components/CartDetail";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/category" element={<Categoryshop />}></Route>
        <Route exact path="/carddetail/:id" element={<CartDetail />}></Route>
        <Route exact path="/adminlog" element={< Adminlog></Adminlog>}></Route>
        <Route exact path="/register" element={< Register></Register>}></Route>
        <Route exact path="/customer/register/:id" element={<CustomerRegister></CustomerRegister>}></Route>
        <Route exact path="/customer/login/:id" element={<Customerlogin></Customerlogin>}></Route>
        <Route exact path="/subcategory" element={<Subcategory />}></Route>
        <Route exact path="/product" element={<Product />}></Route>
        <Route exact path="/" element={<Customer></Customer>}></Route>
        <Route exact path="/subcategory/:id" element={<Customersubcategory></Customersubcategory>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


