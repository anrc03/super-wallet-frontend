import { useContext } from "react";
import { Button, Grid } from "@mui/material";

import { CurrencyContext } from "../../context/CurrencyProvider";

function SwitchCurrency() {
	const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
		useContext(CurrencyContext);

	const handleSwitch = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	};

	return (
		<Grid item xs={12} md="auto">
			<Button variant="text btn-currency" className="my-2" onClick={handleSwitch}>
				<i className="bi bi-arrow-left-right fs-5"></i>
			</Button>
		</Grid>
	);
}

export default SwitchCurrency;
