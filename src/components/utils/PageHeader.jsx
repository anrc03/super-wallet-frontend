import heroImage from "../../assets/images/hero-2.png";

export default function PageHeader({ title }) {
	return (
		<div className="container-fluid hero-header bg-cyan py-5 mb-5">
			<div className="container py-5">
				<div className="row g-5 align-items-center">
					<div className="col-lg-6">
						<h1 className="display-4 mb-3 animated slideInDown">{title}</h1>
						<nav aria-label="breadcrumb animated slideInDown">
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/">Home</a>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									{title}
								</li>
							</ol>
						</nav>
					</div>
					<div className="col-lg-6 animate__animated animate_fadeIn">
						<img
							className="img-fluid animate__animated animate__pulse animate__infinite"
							style={{ animationDuration: "3s" }}
							src={heroImage}
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
