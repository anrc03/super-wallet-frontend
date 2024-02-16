import Services from "../components/Services";
import Navbar from "../components/navbar/Navbar";
import { Helmet } from 'react-helmet';

export default function Service() {
	return (
		<>
		<Helmet>
                <title>Super Wallet | Service</title>
            </Helmet>
            <Navbar />
            <div className="container-fluid header-about">
                <div className="container py-5">
                    <div className="row g-5 align-items-center d-flex justify-content-center">
                        <div className="col-md-8 text-center">
                            <h1 className="mb-3 animated slideInDown">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, est.</h1>
                        </div>
                        {/* <div className="col-lg-6 animate__animated animate_fadeIn">
                            <img
                                className="img-fluid animate__animated animate__pulse animate__infinite"
                                style={{ animationDuration: "3s" }}
                                src=""
                                alt=""
                            />
                        </div> */}
                    </div>
                </div>
            </div>
			<Services />
		</>
	);
}
