import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { CurrencyContext } from '../context/CurrencyProvider';
import { Box, Grid, Typography } from '@mui/material';
import InputAmount from './currency/InputAmount';
import SelectCountry from './currency/SelectCountry';
import SwitchCurrency from './currency/SwitchCurrency';
import axios from 'axios';
import { VITE_CURRENCY_API_KEY, VITE_CURRENCY_API_URL } from '../constant/CurrencyConverter';

export default function ExchangeCurrency() {
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
            axios(VITE_CURRENCY_API_URL, {
                params: {
                    apikey: VITE_CURRENCY_API_KEY,
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
        <div className="container-xxl py-5 mb-3">
            <div className="container">
                <div className="text-center mx-auto animate__animated animate__fadeInUp" style={{ maxWidth: "500px", animationDelay: "0.1s" }}>
                    <h1 className="display-6 fw-bold text-green">Currency Converter</h1>
                    <p className="text-cyan fs-5 mb-4 text-green">Convert currencies to different countries</p>
                </div>

                <div className="animate__animated animate__fadeInUp" style={{ animationDelay: "0.5s" }}>
                    <Container sx={{ maxWidth: "md" }}>
                        <Grid spacing={2} container sx={{ display: 'flex', justifyContent: 'center' }}>
                            <InputAmount />
                            <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
                            <SwitchCurrency />
                            <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
                        </Grid>

                        {firstAmount ? (
                            <Box sx={{ textAlign: "left", marginTop: "1rem", display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    {getCurrencySymbol(fromCurrency)}{" "}
                                    {Number(firstAmount).toLocaleString()}{" "}
                                    {getCurrencyWithoutSymbol(fromCurrency)} = {" "}
                                    {getCurrencySymbol(toCurrency)}{" "}
                                    {(resultCurrency * firstAmount).toLocaleString(undefined, {
                                        minimumFractionDigits: 3,
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
        </div>
    )
}