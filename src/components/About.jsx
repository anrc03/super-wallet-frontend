import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

export default function About() {
	return (
		<div className="container-xxl py-2">
			<div className="container">
				<div className="row g-5 align-items-center">
					<div className="col-lg-6 ">
						<AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
							<img className="img-fluid" src='./src/assets/images/home/Hero.png' alt="" />
						</AnimationOnScroll>
					</div>
					<div className="col-lg-6">
						<AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
							<div className="h-100">
								<h1 className="fw-bold">About Us</h1>
								<p className="text-cyan fs-5 mb-4">The Most Trusted Cryptocurrency Platform</p>
								<p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
								<p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
								<div className="d-flex align-items-center mb-2">
									<i className="bi bi-check2-all bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
									<span>Tempor erat elitr rebum at clita</span>
								</div>
								<div className="d-flex align-items-center mb-2">
									<i className="bi bi-check2-all bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
									<span>Tempor erat elitr rebum at clita</span>
								</div>
								<div className="d-flex align-items-center mb-4">
									<i className="bi bi-check2-all bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
									<span>Tempor erat elitr rebum at clita</span>
								</div>
								<a className="btn btn-primary py-3 px-4" href="">Read More</a>
							</div>
						</AnimationOnScroll>
					</div>
				</div>
			</div>
		</div>
	);
}