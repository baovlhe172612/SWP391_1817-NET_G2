const LOCALHOST_API = "http://localhost:5264"


// API ACCOUNT


// API CATEGORY



// API MESSENGERBOX

// API POST

// API STORE
export const GET_STORES_STATUS = `${LOCALHOST_API}/api/status`;
export const STORES_DTOS = `${LOCALHOST_API}/api/storesDtos`;
export const LIST_STORES = `${LOCALHOST_API}/api/stores`;
export const CREATE_STORE = `${LOCALHOST_API}/api/stores/POST`;
export const DELETE_STORE_ID = `${LOCALHOST_API}/api/stores/delete/`;
export const STORE_DETAIL = `${LOCALHOST_API}/api/stores/`;
export const UPDATE_STORE = `${LOCALHOST_API}/api/stores/PATCH`;
export const SEARCH_STORE = `${LOCALHOST_API}/api/stores/search`;

// API Category

export const CREATE_CATEGORY = `${LOCALHOST_API}/api/Category/add_new`;


// API ACCOUNTDTOS
export const GET_ACCOUNT_BY_AUTH = `${LOCALHOST_API}/api/AccountDtos/GET`
export const GET_ACCOUNT_BY_TOKEN = `${LOCALHOST_API}/api/AccountDtos/GET`

// API TABLE
export const TABLE = `${LOCALHOST_API}/api/Table`;
export const LIST_ACCOUNT = `${LOCALHOST_API}/api/Account`;
export const LIST_TABLE = `${LOCALHOST_API}/api/Table`;

// API PRODUCT CONTROLLERS
export const LIST_PRODUCT_DTOS = `${LOCALHOST_API}/api/productDtos`;

// API PRODUCTDTOS

// API PRODUCTSIZES

// API TABLE

// API FeedBack <=> messegerbox
export const LIST_FEEDBACK = `${LOCALHOST_API}/api/MessengerBox`

// API EMPLOYEE <=> account
export const LIST_Employee = `${LOCALHOST_API}/employee`;

// LINK SHOP CLIENT
export const LIST_PRODUCT = `http://localhost:3000/listProduct/`;
