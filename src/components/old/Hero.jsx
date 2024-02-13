import React from "react";
import { Link } from "react-router-dom";

function Hero() {
	const usernameLogin = localStorage.getItem("username");
	const roleLogin = localStorage.getItem("role");

	return (
		<section className="hero d-flex align-items-center section-bg">
			<div className="container">
				<div className="row justify-content-between gy-5">
					<div className="col-lg-6 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
						<h2 className="hero-title">Welcome {usernameLogin}</h2>
						{usernameLogin ? (
							<>
								<p>Choose a button according to your preference</p>
								<div>
									{roleLogin === "ROLE_ADMIN" ? (
										<>
											<Link className="btn-book-a-table" to="/store">
												Store
											</Link>
										</>
									) : (
										<></>
									)}
									<Link className="btn-book-a-table ms-2">Product</Link>
								</div>
							</>
						) : (
							<>
								<p>Please log in or register your account first</p>
							</>
						)}
					</div>
					<div className="col-lg-5">
						<img
							src="src/assets/images/hero/Hero.png"
							className="img-fluid"
							alt=""
							data-aos="zoom-out"
							data-aos-delay="300"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
