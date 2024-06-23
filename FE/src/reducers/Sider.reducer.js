// nhận những giá trị của Actions và trả về kết quả cho CLIENT + STORE
const SiderReducer = (
  state = {
    selectedKey: ["DashBoard1"],
    openKey: ["dashBoard"],
  },
  { type, payload }
) => {
  // console.log(payload);
  switch (type) {
    case "NEW_SELECT_SIDER":
      return payload;
    default:
      return state;
  }
};

export default SiderReducer;
