export const get = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json();

  return data;
};

export const patch = async (url, values) => {
  const init = {
      method: 'PATCH', // Cập nhật thông tin 
      
      headers: {
      'Content-Type': 'application/json',  // Loại dữ liệu nhận về
      Authorization: 'TOKEN' // Token được server cung cấp để xác thực
      },
  
      body: JSON.stringify(values),
  }
  const response = await fetch(url, init);
  const data = response.json();

  return data;
}
//

export const post = async (url, values) => {
  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
  };
  const response = await fetch(url, options);
  const data = response.json();

  return data;
}

export const deleteItem = async (url) => {
  const deleteMethod = {
    method: "DELETE", // Method itself
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
  };

  const response = await fetch(url, deleteMethod);
  
  const data = response.json();

  return data;
};