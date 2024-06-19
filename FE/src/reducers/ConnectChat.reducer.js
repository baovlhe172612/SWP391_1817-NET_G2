// nhận những giá trị của Actions và trả về kết quả cho CLIENT + STORE
const ConnectionReducer = (state = null, { type, payload }) => {
    // console.log(state, type);
    switch (type) {
      case "CONNECTION":
        return payload;
      default:
        return state;
    }
  };
  
  export default ConnectionReducer;