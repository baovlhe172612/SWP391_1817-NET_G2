export const get = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json(); // Sử dụng await để đợi promise được giải quyết

  return data;
};

export const patch = async (url, values) => {
  const init = {
    method: 'PATCH', // Cập nhật thông tin 
    mode: "cors", // Chế độ CORS
    headers: {
      'Content-Type': 'application/json',  // Loại dữ liệu nhận về
      Authorization: 'TOKEN' // Token được server cung cấp để xác thực
    },
  
    body: JSON.stringify(values),
  }
  const response = await fetch(url, init);
  const data = await response.json(); // Sử dụng await để đợi promise được giải quyết

  return data;
}
// export const post = async (url, values) => {
//   console.log("data before post", values);

//   const options = {
//       method: 'POST',
//       mode: "cors",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(values)
//   };

//   const response = await fetch(url, options);
//   const data = await response.json();

//   console.log("data after post", data);

//   return data;
// };

export const post = async (url, values) => {
  console.log("data truoc khi post", values)

  const options = {
    method: 'POST',
    mode: "cors", // Chế độ CORS
    headers: {'Content-Type': 'application/json'},
    
    body: JSON.stringify(values)
  };
  const response = await fetch(url, options);

  const data = await response.json(); // Sử dụng await để đợi promise được giải quyết

  console.log("data sau khi post", data)

  return data;
}
// export const post = async (values) => {
//   const options = {
//     method: "POST",
//     mode: "cors", // Chế độ CORS
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(values),
//   };
//   const response = await fetch("http://localhost:5264/api/MessengerBox", options);
//   const data = response.json();

//   return data;
// };

export const deleteItem = async (url) => {
  const deleteMethod = {
    method: "DELETE", // Method itself
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
  };

  const response = await fetch(url, deleteMethod);
  const data = await response.json(); // Sử dụng await để đợi promise được giải quyết

  return data;
};
