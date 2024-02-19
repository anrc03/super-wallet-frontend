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
