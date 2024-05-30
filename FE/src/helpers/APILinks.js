const LOCALHOST_API = "http://localhost:5264"

// API STORE
export const STORES_DTOS = `${LOCALHOST_API}/api/storesDtos`;
export const LIST_STORES = `${LOCALHOST_API}/api/stores`;
export const CREATE_STORE = `${LOCALHOST_API}/api/stores/POST`;
export const DELETE_STORE_ID = `${LOCALHOST_API}/api/stores/delete/`;
export const STORE_DETAIL = `${LOCALHOST_API}/api/stores/`;
export const UPDATE_STORE = `${LOCALHOST_API}/api/stores/PATCH`;

// API ACCOUNTDTOS
export const GET_ACCOUNT_BY_AUTH = `${LOCALHOST_API}/api/AccountDtos/GET`
export const GET_ACCOUNT_BY_TOKEN = `${LOCALHOST_API}/api/AccountDtos/GET`

// API TABLE
export const TABLE = `${LOCALHOST_API}/api/Table`;
export const LIST_ACCOUNT = `${LOCALHOST_API}/api/Account`;
export const LIST_TABLE = `${LOCALHOST_API}/api/Table`;

// API PRODUCT
export const LIST_PRODUCT_DTOS = `${LOCALHOST_API}/api/productDtos`;

// API FeedBack
export const LIST_FEEDBACK = `${LOCALHOST_API}/api/MessengerBox`

// API EMPLOYEE
export const LIST_Employee = `${LOCALHOST_API}/employee`;

// LINK SHOP CLIENT
export const LIST_PRODUCT = `http://localhost:3000/listProduct/`;
