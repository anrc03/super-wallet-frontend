import { useContext, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { CurrencyContext } from "../context/CurrencyProvider";
import InputAmount from "../components/currency/InputAmount";
import SelectCountry from "../components/currency/SelectCountry";
import SwitchCurrency from "../components/currency/SwitchCurrency";
import Navbar from "../components/navbar/Navbar";
import { Helmet } from 'react-helmet';

function CurrencyConverter() {
	const {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		firstAmount,
		setFirstAmount,
	} = useContext(CurrencyContext);

	const [resultCurrency, setResultCurrency] = useState(0);

	const fromCurrencyCountryCode = fromCurrency.split(" ")[1];
	const toCurrencyCountryCode = toCurrency.split(" ")[1];

	useEffect(() => {
		if (firstAmount) {
			axios(import.meta.env.VITE_CURRENCY_API_URL, {
				params: {
					apikey: import.meta.env.VITE_CURRENCY_API_KEY,
					base_currency: fromCurrencyCountryCode,
					currencies: toCurrencyCountryCode,
				},
			})
				.then((response) =>
					setResultCurrency(response.data.data[toCurrencyCountryCode])
				)
				.catch((error) => console.log(error));
		}
	}, [firstAmount, fromCurrency, toCurrency]);

	return (
		<>
			<Helmet>
                <title>Exchange Rate | Super Wallet</title>
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

			<div className="container-xxl py-5">
				<div className="container">
					<div
						className="text-center mx-auto animate__animated animate__fadeInUp"
						style={{ maxWidth: "500px", animationDelay: "0.1s" }}
					>
						<h1 className="display-6">Currency Converter</h1>
						<p className="text-cyan fs-5 mb-5">
							Convert any currency world wide
						</p>
					</div>

					<Container maxWidth="md">
						<Grid spacing={2} container>
							<InputAmount />
							<SelectCountry
								value={fromCurrency}
								setValue={setFromCurrency}
								label="From"
							/>
							<SwitchCurrency />
							<SelectCountry
								value={toCurrency}
								setValue={setToCurrency}
								label="To"
							/>
						</Grid>

						{firstAmount ? (
							<Box sx={{ textAlign: "left", marginTop: "1rem" }}>
								<Typography>
									{firstAmount} {fromCurrency} = {" "}
								</Typography>
								<Typography
									variant="h5"
									sx={{ marginTop: "5px", fontWeight: "bold" }}
								>
									{(resultCurrency * firstAmount).toLocaleString(undefined, {
										minimumFractionDigits: 5,
									})}{" "}
									{toCurrency}
								</Typography>
							</Box>
						) : (
							""
						)}
					</Container>
				</div>
			</div>
		</>
	);
}

export default CurrencyConverter;
