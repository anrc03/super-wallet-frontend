import { useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/icon-1.png";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
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
        <h2 className="m-0 text-cyan fw-bold">
          <img
            className="img-fluid me-2 fw"
            src={logo}
            alt=""
            style={{ width: "45px" }}
          />
          Super Wallet
        </h2>
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-4 py-lg-0">
          <a href="/" className="nav-item nav-link active">
            Home
          </a>
          <a href="about.html" className="nav-item nav-link">
            About
          </a>
          <a href="service.html" className="nav-item nav-link">
            Service
          </a>
          <a href="roadmap.html" className="nav-item nav-link">
            Roadmap
          </a>

          <a href="contact.html" className="nav-item nav-link">
            Contact
          </a>

          {token ? (
            <></>
          ) : (
            <Link className="nav-item nav-link button-register" to="/register">
              <a>Register</a>
            </Link>
          )}

          <Link className="nav-item nav-link button-login" to="/login">
            <a onClick={logout}>{token ? "Logout" : "Login"}</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
