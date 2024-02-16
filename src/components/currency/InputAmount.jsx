import { Grid, InputAdornment, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { CurrencyContext } from "../../context/CurrencyProvider";

function InputAmount() {
  const { firstAmount, setFirstAmount, fromCurrency } =
    useContext(CurrencyContext);

  const fromCurrencyCountryCode = fromCurrency.split(" ")[1];

  return (
    <Grid item xs={12} md>
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
        onChange={(e) => setFirstAmount(e.target.value)}
        fullWidth
      />
    </Grid>
  );
}

export default InputAmount;
