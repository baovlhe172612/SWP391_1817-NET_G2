// nhận những giá trị của Actions và trả về kết quả cho CLIENT + STORE
const LoginReducer = (state = false, { type, payload }) => {
  console.log(state, type)
  switch (type) {
    case "LOGIN":
      return true;

    default:
      return state;
  }
};

export default LoginReducer;