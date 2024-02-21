import Navbar from "../components/navbar/Navbar";
import { Helmet } from 'react-helmet';
import Footer from "../components/Footer";
import ExchangeCurrency from "../components/ExchangeCurrency";
import { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadSpinner";

function CurrencyConverter() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [])

    if (isLoading) return <LoadSpinner />

	return (
		<>
			<Helmet>
                <title>Exchange Rate | Super Wallet</title>
            </Helmet>
            <Navbar />
            <div className="container-fluid header-about header-about animate__animated animate__slideInDown">
                <div className="container py-5">
                    <div className="row g-5 align-items-center d-flex justify-content-center">
                        <div className="col-md-8 text-center">
                            <h1 className="mb-3 animated slideInDown">A converter. Just convert it. It provides you the most accurate currency converter in various countries</h1>
                        </div>
                    </div>
                </div>
            </div>
			<ExchangeCurrency/>
			<Footer/>
		</>
	);
}

export default CurrencyConverter;
