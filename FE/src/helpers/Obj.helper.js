const objAccount = {
  accountId: 10,
  address: "FASDF",
  cccd: "013232142142",
  email: "tranvukien124@gmail.com",
  fullName: "Kien Tran Vu A",
  isDelete: 0,
  passWord: "Khongcopass@23",
  phone: "0398347223",
  roleId: 2,
  status: 1,
  storeId: 9,
  userName: "kien",
};

export const updateAccountObj = (accountNew) => {
  for (let key in objAccount) {
    if (accountNew.hasOwnProperty(key)) {
      objAccount[key] = accountNew[key];
    }
  }

  return objAccount;
};
