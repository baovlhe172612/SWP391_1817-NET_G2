import { message } from "antd";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  return response.json();
};

const request = async (url, options) => {
  const response = await fetch(url, options);
  return handleResponse(response);
};

export const get = async (url) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return request(url, options);
};

export const post = async (url, values) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };
  return request(url, options);
};

export const put = async (url, values) => {
  const options = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };
  return request(url, options);
};

export const patch = async (url, values) => {
  const options = {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "TOKEN",
    },
    body: JSON.stringify(values),
  };
  return request(url, options);
};

export const deleteItem = async (url) => {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  return request(url, options);
};
