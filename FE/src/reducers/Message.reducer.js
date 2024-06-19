// nhận những giá trị của Actions và trả về kết quả cho CLIENT + STORE
const MessageReducer = (state = [], { type, payload }) => {
    // console.log(state, type);
    switch (type) {
      case "GET_ALL_MESSAGE":
        return payload;
      default:
        return state;
    }
  };
  
  export default MessageReducer;