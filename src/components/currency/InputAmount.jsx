import { Grid, InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import { CurrencyContext } from "../../context/CurrencyProvider";

function InputAmount() {
  const { firstAmount, setFirstAmount, fromCurrency } =
    useContext(CurrencyContext);

  const fromCurrencyCountryCode = fromCurrency.split(" ")[1];

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 15) {
      setFirstAmount(inputValue);
    }
  };

  return (
    <Grid item xs={12} md={3}>
      <TextField
        label="Amount"
        InputProps={{
          type: "number",
          startAdornment: (
            <InputAdornment position="start">
              {fromCurrencyCountryCode}
            </InputAdornment>
          ),
        }}
        value={firstAmount}
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );
}

export default InputAmount;
