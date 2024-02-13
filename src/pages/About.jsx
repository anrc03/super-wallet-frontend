import PageHeader from "../components/utils/PageHeader";

import aboutImage from "../assets/images/about.png";

export default function About() {
	return (
		<>
			<PageHeader title="About Us" />

			<div className="container-xxl py-5">
				<div className="container">
					<div className="row g-5 align-items-center">
						<div
							className="col-lg-6 animate__animated animate__fadeInUp"
							style={{ animationDelay: "0.1s" }}
						>
							<img className="img-fluid" src={aboutImage} alt="" />
						</div>
						<div
							className="col-lg-6 animate__animated animate__fadeInUp"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="h-100">
								<h1 className="display-6 fw-bold">About Us</h1>
								<p className="text-cyan fs-5 mb-4">
									The Most Trusted Cryptocurrency Platform
								</p>
								<p>
									Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
									Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
									sed stet lorem sit clita duo justo magna dolore erat amet
								</p>
								<p className="mb-4">
									Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
									Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
								</p>
								<div className="d-flex align-items-center mb-2">
									<i className="fa fa-check bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
									<span>Tempor erat elitr rebum at clita</span>
								</div>
								<div className="d-flex align-items-center mb-2">
									<i className="fa fa-check bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
									<span>Tempor erat elitr rebum at clita</span>
								</div>
								<div className="d-flex align-items-center mb-4">
									<i className="fa fa-check bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
									<span>Tempor erat elitr rebum at clita</span>
								</div>
								<a className="btn btn-primary py-3 px-4" href="">
									Read More
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
