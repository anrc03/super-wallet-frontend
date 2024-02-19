import { useContext, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { CurrencyContext } from "../context/CurrencyProvider";
import PageHeader from "../components/utils/PageHeader";
import InputAmount from "../components/currency/InputAmount";
import SelectCountry from "../components/currency/SelectCountry";
import SwitchCurrency from "../components/currency/SwitchCurrency";

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

  const getCurrencyWithoutSymbol = (currency) => {
    return currency.split(" ").slice(0, -1).join(" ");
  };

  const getCurrencySymbol = (currency) => {
    return currency.split(" ").pop().replace(/[()]/g, "");
  };

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
      <PageHeader title="Currency Converter" />

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
                  {getCurrencySymbol(fromCurrency)}{" "}
                  {Number(firstAmount).toLocaleString()}{" "}
                  {getCurrencyWithoutSymbol(fromCurrency)} ={" "}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ marginTop: "5px", fontWeight: "bold" }}
                >
                  {getCurrencySymbol(toCurrency)}{" "}
                  {(resultCurrency * firstAmount).toLocaleString(undefined, {
                    minimumFractionDigits: 5,
                  })}{" "}
                  {getCurrencyWithoutSymbol(toCurrency)}
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
