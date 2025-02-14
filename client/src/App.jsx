import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();
  // const userData = useSelector((state)=>state.user.userData)
  // console.log("Current user Details",userData);
  



  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
  );
}

export default App;
