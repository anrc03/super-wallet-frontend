import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "./components/redux/UserSlice.js";
import { useEffect, useState } from "react";
import About from "./pages/about/About.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Home from "./pages/home/Home.jsx";
import CurrencyConverter from "./pages/CurrencyConverter.jsx";
import Faq from "./pages/faq/Faq.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AdminList from "./components/AdminList.jsx";
import CustomerList from "./components/CustomerList.jsx";
import ExchangeRateList from "./components/ExchangeRateList.jsx";
import TransactionHistoryList from "./components/TransactionHistoryList.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Transaction from "./components/Transaction.jsx";
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";

function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname == "/login") {
      user.role === "ROLE_CUSTOMER" ? navigate("/home") : navigate("/admin");
    }
  }, [user]);

  const ADMIN_PAGE = (
    <>
      <Route path="/admin" element={<Sidebar component={AdminDashboard} />} />
      <Route path="/admin/admins" element={<Sidebar component={AdminList} />} />
      <Route
        path="/admin/customers"
        element={<Sidebar component={CustomerList} />}
      />
      <Route
        path="/admin/currency"
        element={<Sidebar component={ExchangeRateList} />}
      />
      <Route
        path="/admin/transaction"
        element={<Sidebar component={TransactionHistoryList} />}
      />
      <Route path="/admin" element={<Sidebar component={AdminDashboard} />} />
      <Route path="/admin/admins" element={<Sidebar component={AdminList} />} />
      <Route
        path="/admin/customers"
        element={<Sidebar component={CustomerList} />}
      />
      <Route
        path="/admin/currency"
        element={<Sidebar component={ExchangeRateList} />}
      />
      <Route
        path="/admin/transaction"
        element={<Sidebar component={TransactionHistoryList} />}
      />
    </>
  );

  const CUSTOMER_PAGE = (
    <>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/currency-converter" element={<CurrencyConverter />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
    </>
  );

  const GENERAL_ACCESS = (
    <>
      {/* <Route path='/home' element={<Home/>} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/currency-converter" element={<CurrencyConverter />} />
      <Route path="/faq" element={<Faq />} />
    </>
  );
  

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {user ? (
          user.role === "ROLE_CUSTOMER" ? (
            <>{CUSTOMER_PAGE}</>
          ) : (
            <>{ADMIN_PAGE}</>
          )
        ) : (
          <>{GENERAL_ACCESS}</>
        )}
      </Routes>
    </div>
  );
  
}

export default App;
