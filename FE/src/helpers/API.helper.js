export const get = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const patch = async (url, values) => {
  const init = {
    method: "PATCH", // Cập nhật thông tin
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-Type": "application/json", // Loại dữ liệu nhận về
      Authorization: "TOKEN", // Token được server cung cấp để xác thực
    },

    body: JSON.stringify(values),
  };
  const response = await fetch(url, init);
  const data = await response.json();

  return data;
};
//

export const post = async (url, values) => {
  console.log("data truoc khi post", values)

  const options = {
    method: "POST",
    mode: "cors", // Chế độ CORS
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const deleteItem = async (url) => {
  const deleteMethod = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetch(url, deleteMethod);

  const data = await response.json();

    if (!response.ok) {
      // If the response status is not OK (2xx), throw an error
      throw new Error(`Failed to delete. Status: ${response.status}`);
    }

    // Try to parse the response as JSON if there is content
    const data = await response.json().catch(() => {
      return null; // Return null if response is empty
    });

    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Re-throw the error after logging it
  }
};

