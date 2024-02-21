export const API_BASE_URL = 'http://localhost:8088/api';

//auth
export const LOGIN = API_BASE_URL + '/auth/login';

//customer
export const REGISTER_CUSTOMER = API_BASE_URL + '/auth/register';
export const BASE_CUSTOMER = API_BASE_URL + '/customer';
export const updateCustomer = (id, firstName, lastName, phoneNumber, birthDate, gender, address) => {
    return BASE_CUSTOMER + `?id=${id}&firstName=${firstName}&lastName=${lastName}&phoneNumber=${phoneNumber}&birthDate=${birthDate}&gender=${gender}&address=${address}`
}

//admin
export const REGISTER_ADMIN = API_BASE_URL + '/auth/admins';
export const BASE_ADMIN = API_BASE_URL + '/admins';

//currency
export const BASE_CURRENCY = API_BASE_URL + "/currency"
export const getBaseCurrencyUrl = (baseCurrency, date) => API_BASE_URL + `?baseCurrency=${baseCurrency}&date=${date}`;
export const getCurrencyWithTimeSeriesUrl = (fromDate, toDate, baseCurrency) => BASE_CURRENCY + `?fromDate=${fromDate}&toDate=${toDate}&baseCurrency=${baseCurrency}`
export const getTodaysCurrencyUrl = (baseCurrency) => BASE_CURRENCY + `/today?baseCurrency=${baseCurrency}`;

//transaction
export const BASE_TRANSACTION =  API_BASE_URL +  "/transactions";
export const getTransactionByPage = (page) => `${BASE_TRANSACTION}?page=${page}`
export const WITHDRAW = BASE_TRANSACTION + "/withdrawal"
export const TRANSFER = BASE_TRANSACTION + "/send"

//account
export const BASE_ACCOUNT = API_BASE_URL + "/account"

//dummy-bank
export const BASE_DUMMY_BANK = API_BASE_URL + "/dummy-bank"

//change password
export const CHANGE_PASSWORD = API_BASE_URL + "/auth/change-password"

//pin
export const CREATE_PIN = API_BASE_URL + "/auth/pin"
