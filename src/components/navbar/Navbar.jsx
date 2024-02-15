import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/UserSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) setRole(user.role)
  }, [])

  const isActive = {
    color: "#16d5ff",
  };


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login")
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
        <h2 className="m-0 fw-bold">
          <img
            className="img-fluid me-2 fw"
            src="../src/assets/images/icon-1.png"
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
          {user ? role === "ROLE_CUSTOMER" &&
            <>
              <Link to="/" className="nav-item nav-link" activestyle={isActive}>Home</Link>
              <Link to="/about" className="nav-item nav-link" activestyle={isActive}>About Us</Link>
              <Link to="/service" className="nav-item nav-link" activestyle={isActive}>Service</Link>
              <Link to="/faq" className="nav-item nav-link" activestyle={isActive}>FAQ</Link>
              <p className="nav-line">|</p>
            </>
            :
            <>
              <Link to="/" className="nav-item nav-link" activestyle={isActive}>Home</Link>
              <Link to="/about" className="nav-item nav-link" activestyle={isActive}>About Us</Link>
              <Link to="/service" className="nav-item nav-link" activestyle={isActive}>Service</Link>
              <Link to="/faq" className="nav-item nav-link" activestyle={isActive}>FAQ</Link>
              <p className="nav-line">|</p>
            </>
          }

          {user ? (
            <></>
          ) : (
            <Link className="nav-item nav-link button-register" to="/register">Register</Link>
          )}

          <button className="nav-item nav-link button-login" onClick={user ? (e) => handleLogout(e) : (e) => navigate("/login")}>
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}
