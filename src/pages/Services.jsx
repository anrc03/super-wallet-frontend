import PageHeader from "../components/utils/PageHeader";
import ServiceItem from "../components/utils/ServiceItem";

import walletIcon from "../assets/images/icon-7.png";
import transactionIcon from "../assets/images/icon-3.png";
import bitcoinIcon from "../assets/images/icon-9.png";
import currencyIcon from "../assets/images/icon-5.png";
import bitEscrowIcon from "../assets/images/icon-2.png";
import tokenIcon from "../assets/images/icon-8.png";

export default function Services() {
	return (
		<>
			<PageHeader title="Services" />

			<div className="container-xxl py-5">
				<div className="container">
					<div
						className="text-center mx-auto animate__animated animate__fadeInUp"
						style={{ maxWidth: "500px", animationDelay: "0.1s" }}
					>
						<h1 className="display-6">Services</h1>
						<p className="text-cyan fs-5 mb-5">
							Buy, Sell And Exchange Cryptocurrency
						</p>
					</div>
					<div className="row g-4">
						<div className="col-lg-4 col-md-6">
							<ServiceItem
								animate="animate__fadeInUp"
								delay={100}
								img={walletIcon}
								title="Currency Walet"
								desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
							/>
						</div>
						<div className="col-lg-4 col-md-6">
							<ServiceItem
								animate="animate__fadeInUp"
								delay={300}
								img={transactionIcon}
								title="Currency Transaction"
								desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
							/>
						</div>
						<div className="col-lg-4 col-md-6">
							<ServiceItem
								animate="animate__fadeInUp"
								delay={500}
								img={bitcoinIcon}
								title="Bitcoin Investment"
								desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
							/>
						</div>
						<div className="col-lg-4 col-md-6">
							<ServiceItem
								animate="animate__fadeInUp"
								delay={100}
								img={currencyIcon}
								title="Currency Exchange"
								desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
							/>
						</div>
						<div className="col-lg-4 col-md-6">
							<ServiceItem
								animate="animate__fadeInUp"
								delay={300}
								img={bitEscrowIcon}
								title="Bitcoin Escrow"
								desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
							/>
						</div>
						<div className="col-lg-4 col-md-6">
							<ServiceItem
								animate="animate__fadeInUp"
								delay={500}
								img={tokenIcon}
								title="Token Sale"
								desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
