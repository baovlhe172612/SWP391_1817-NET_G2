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