export const API_BASE_URL = 'http://localhost:8088/api';

//auth
export const LOGIN = API_BASE_URL + '/auth/login';

//customer
export const REGISTER_CUSTOMER = API_BASE_URL + '/auth/register';
export const BASE_CUSTOMER = API_BASE_URL + '/customer';

//admin
export const REGISTER_ADMIN = API_BASE_URL + '/auth/admins';
export const BASE_ADMIN = API_BASE_URL + '/admins';

//currency
export const getBaseCurrencyUrl = (baseCurrency, date) => API_BASE_URL + `/currency?baseCurrency=${baseCurrency}&date=${date}`;

//transaction
export const BASE_TRANSACTION =  API_BASE_URL +  "/transactions";
export const getTransactionByPage = (page) => `${BASE_TRANSACTION}?page=${page}`

//converter
export const VITE_REST_COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all';
export const VITE_CURRENCY_API_URL = 'https://api.freecurrencyapi.com/v1/latest';
export const VITE_CURRENCY_API_KEY = 'fca_live_mzQXl3N9qwkEpAPU6J7UoeRpEvvB5rcVy7b2WEQxz';