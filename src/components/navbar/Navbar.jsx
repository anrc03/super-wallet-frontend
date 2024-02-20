import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import * as React from 'react';
import AvatarProfile from "../AvatarProfile";

export default function Navbar() {
  const user = useSelector(selectUser);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) setRole(user.role)
  }, [user]);

  const isActive = {
    color: "#16d5ff",
  };

  useEffect(() => {
    const toggleNavbar = () => {
      const navbar = document.querySelector(".sticky-top");
      if (window.scrollY > 300) {
        navbar.classList.add("shadow-sm");
        navbar.style.top = "0px";
      } else {
        navbar.classList.remove("shadow-sm");
        navbar.style.top = "-100px";
      }
    };

    window.addEventListener("scroll", toggleNavbar);

    return () => window.removeEventListener("scroll", toggleNavbar);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 px-4 px-lg-5">
      <a href="/" className="navbar-brand d-flex align-items-center">
        <img className="img-fluid" src="../src/assets/images/home/Logo-Super-Wallet.png" alt="Logo Supper Wallet" />
        <h2 className="m-0 fw-bold">Super Wallet</h2>
      </a>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-4 py-lg-0">
          {user ? role === "ROLE_CUSTOMER" &&
            <>
              <Link to="/" className="nav-item nav-link" activestyle={isActive}>Home</Link>
              <Link to="/about" className="nav-item nav-link" activestyle={isActive}>About Us</Link>
              <Link to="/currency-converter" className="nav-item nav-link" activestyle={isActive}>Currency Converter</Link>
              <Link to="/faq" className="nav-item nav-link" activestyle={isActive}>FAQ</Link>
              <Link to="/transaction" className="nav-item nav-link" activestyle={isActive}>Transaction</Link>
              <p className="nav-line">|</p>
            </>
            :
            <>
              <Link to="/" className="nav-item nav-link" activestyle={isActive}>Home</Link>
              <Link to="/about" className="nav-item nav-link" activestyle={isActive}>About Us</Link>
              <Link to="/currency-converter" className="nav-item nav-link" activestyle={isActive}>Currency Converter</Link>
              <Link to="/faq" className="nav-item nav-link" activestyle={isActive}>FAQ</Link>
              <p className="nav-line">|</p>
            </>
          }
          {user ? (
            <><AvatarProfile/></>
          ) : (
            <>
              <Link className="nav-item nav-link button-register" to="/register">Register</Link>
              <Link className="nav-item nav-link button-login" to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}