export const API_BASE_URL = 'http://localhost:8088/api';

//customer
export const LOGIN_CUSTOMER = API_BASE_URL + '/auth/login';
export const REGISTER_CUSTOMER = API_BASE_URL + '/auth/register';
export const GET_ALL_CUSTOMER = API_BASE_URL + '/customer';
export const DELETE_CUSTOMER = API_BASE_URL + '/customer/';

//admin
export const LOGIN_ADMIN = API_BASE_URL + '/auth/login/admins';
export const REGISTER_ADMIN = API_BASE_URL + '/auth/admins';
export const GET_ALL_ADMIN = API_BASE_URL + '/admins';
export const DELETE_ADMIN = API_BASE_URL + '/admins/';
