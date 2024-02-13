import React from "react";
import PageHeader from "../components/utils/PageHeader";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Contact() {
	return (
		<>
			<PageHeader title="Contact" />

			<div className="container-xxl py-5 contact">
				<div className="container">
					<div
						className="row g-5 mb-5 animate__animated animate__fadeInUp"
						style={{ animationDelay: "0.1s" }}
					>
						<div className="col-lg-6">
							<h1 className="display-6 fw-bold">Contact Us</h1>
							<p className="text-cyan fs-5 mb-0">
								If You Have Any Query, Please Contact Us
							</p>
						</div>
						<div className="col-lg-6 text-lg-end">
							<a className="btn btn-primary py-3 px-4" href="#">
								Say Hello
							</a>
						</div>
					</div>
					<div className="row g-5">
						<AnimationOnScroll
							animateIn="animate__fadeInUp"
							delay={100}
							className="col-lg-5 col-md-6"
						>
							<p className="mb-2">Our office:</p>
							<h4>123 Street, New York, USA</h4>
							<hr className="w-100" />
							<p className="mb-2">Call us:</p>
							<h4>+012 345 6789</h4>
							<hr className="w-100" />
							<p className="mb-2">Mail us:</p>
							<h4>info@example.com</h4>
							<hr className="w-100" />
							<p className="mb-2">Follow us:</p>
							<div className="d-flex pt-2">
								<a
									className="btn btn-square btn-primary rounded-circle me-2"
									href=""
								>
									<i className="fab fa-twitter"></i>
								</a>
								<a
									className="btn btn-square btn-primary rounded-circle me-2"
									href=""
								>
									<i className="fab fa-facebook-f"></i>
								</a>
								<a
									className="btn btn-square btn-primary rounded-circle me-2"
									href=""
								>
									<i className="fab fa-youtube"></i>
								</a>
								<a
									className="btn btn-square btn-primary rounded-circle me-2"
									href=""
								>
									<i className="fab fa-linkedin-in"></i>
								</a>
							</div>
						</AnimationOnScroll>

						<AnimationOnScroll
							animateIn="animate__fadeInUp"
							delay={500}
							className="col-lg-7 col-md-6"
						>
							<p className="mb-4">
								The contact form is currently inactive. Get a functional and
								working contact form with Ajax & PHP in a few minutes. Just copy
								and paste the files, add a little code and you're done.{" "}
								<a href="https://htmlcodex.com/contact-form">Download Now</a>.
							</p>
							<form>
								<div className="row g-3">
									<div className="col-md-6">
										<div className="form-floating">
											<input
												type="text"
												className="form-control"
												id="name"
												placeholder="Your Name"
											/>
											<label htmlFor="name">Your Name</label>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-floating">
											<input
												type="email"
												className="form-control"
												id="email"
												placeholder="Your Email"
											/>
											<label htmlFor="email">Your Email</label>
										</div>
									</div>
									<div className="col-12">
										<div className="form-floating">
											<input
												type="text"
												className="form-control"
												id="subject"
												placeholder="Subject"
											/>
											<label htmlFor="subject">Subject</label>
										</div>
									</div>
									<div className="col-12">
										<div className="form-floating">
											<textarea
												className="form-control"
												placeholder="Leave a message here"
												id="message"
												style={{ height: "100px" }}
											></textarea>
											<label htmlFor="message">Message</label>
										</div>
									</div>
									<div className="col-12">
										<button className="btn btn-primary py-3 px-4" type="submit">
											Send Message
										</button>
									</div>
								</div>
							</form>
						</AnimationOnScroll>
					</div>
				</div>
			</div>

			<div
				className="container-xxl py-5 px-0 wow fadeInUp"
				data-wow-delay="0.1s"
			>
				<iframe
					className="w-100 mb-n2"
					style={{ height: "450px" }}
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
					frameBorder="0"
					allowFullScreen=""
					aria-hidden="false"
					tabIndex="0"
				></iframe>
			</div>
		</>
	);
}
