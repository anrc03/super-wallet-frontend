import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/images/icon-1.png";

export default function Navbar() {
	const isActive = {
		color: "#16d5ff",
	};

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
					CryptoCoin
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
					<NavLink to="/" className="nav-item nav-link" activestyle={isActive}>
						Home
					</NavLink>

					<NavLink
						to="/about"
						className="nav-item nav-link"
						activestyle={isActive}
					>
						About
					</NavLink>

					<NavLink
						to="/services"
						className="nav-item nav-link"
						activestyle={isActive}
					>
						Services
					</NavLink>

					<NavLink
						to="/contact"
						className="nav-item nav-link"
						activestyle={isActive}
					>
						Contact
					</NavLink>

					<NavLink
						to="/currency-converter"
						className="nav-item nav-link"
						activestyle={isActive}
					>
						Currency Converter
					</NavLink>

					{token ? (
						<></>
					) : (
						<Link className="nav-item nav-link button-register" to="/register">
							Register
						</Link>
					)}

					<Link
						className="nav-item nav-link button-login"
						to="/login"
						onClick={logout}
					>
						{token ? "Logout" : "Login"}
					</Link>
				</div>
				{/* <div className="h-100 d-lg-inline-flex align-items-center d-none">
					<a
						className="btn btn-square rounded-circle bg-light text-cyan me-2"
						href=""
					>
						<i className="fab fa-facebook-f"></i>
					</a>
					<a
						className="btn btn-square rounded-circle bg-light text-cyan me-2"
						href=""
					>
						<i className="fab fa-twitter"></i>
					</a>
					<a
						className="btn btn-square rounded-circle bg-light text-cyan me-0"
						href=""
					>
						<i className="fab fa-linkedin-in"></i>
					</a>
				</div> */}
			</div>
		</nav>
	);
}
