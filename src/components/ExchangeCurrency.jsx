import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { CurrencyContext } from '../context/CurrencyProvider';
import { Box, Grid, Typography } from '@mui/material';
import InputAmount from './currency/InputAmount';
import SelectCountry from './currency/SelectCountry';
import SwitchCurrency from './currency/SwitchCurrency';
import axios from 'axios';

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
    const formattedFirstAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: fromCurrencyCountryCode
    }).format(firstAmount);

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
        <div className="container-xxl py-5 mb-3">
            <div className="container">
                <div className="text-center mx-auto animate__animated animate__fadeInUp" style={{ maxWidth: "500px", animationDelay: "0.1s" }}>
                    <h1 className="display-6 fw-bold text-green">Currency Converter</h1>
                    <p className="text-cyan fs-5 mb-4 text-green">Convert currencies to different countries</p>
                </div>

                <Container sx={{ maxWidth: "md" }}>
                    <Grid spacing={2} container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <InputAmount />
                        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
                        <SwitchCurrency />
                        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
                    </Grid>

                    {firstAmount ? (
                        <Box sx={{ textAlign: "left", marginTop: "1rem", display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h5" sx={{ marginTop: "5px", fontWeight: "bold", color: ' #3a5a40' }}>
                                {formattedFirstAmount} {fromCurrency} = {" "}
                                {(resultCurrency * firstAmount).toLocaleString(undefined, {
                                    minimumFractionDigits: 3,
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
    )
}