const initialState = {};

const AccountReducer = (state = initialState, { type, payload }) => {
  console.log("AccountReducer",state,payload)
  switch (type) {
    case "NEW_ACCOUNT":
      return { ...payload };     
    default:
      return state;
  }
};

export default AccountReducer