import axios from "axios";
import { apiUrl } from "./apiConfig";

let options = {
  method: "",
  url: apiUrl,
  headers: {
    Authorization: "",
    contentType: "",
  },
  data: {},
};

//Userın offerına teklif veren ustaları görüntüler
export const gettodo = async (id) => {
  // const apiUrl = 'YOUR_API_URL'; // Your API URL here
  options.method = "GET";
  options.headers.contentType = "application/json";
  options.url = `${apiUrl}products`;
  try {
    const response = await axios(options);
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    // console.error('An error occurred:', error);
    throw error; // Re-throw the error to handle it further if needed
  }
};

export const addtodoo = (value) => {
  options.method = "POST";
  options.headers.contentType = "application/json";
  options.url = `${apiUrl}products`;
  options.data = {
    name: value,
    ustbaslik: "merhabalar",
    aciklama: "css ler düzenlenecek",
    isCompleted: false,
  };
  const promise = axios.request(options);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

export const puttodoo = (id, value) => {
  options.method = "PUT";
  options.headers.contentType = "application/json";
  options.url = `${apiUrl}products/${id}`;
  options.data = {
    name: value,
    ustbaslik: "merhabalar",
    aciklama: "css ler düzenlenecek",
  };
  const promise = axios.request(options);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

export const putiscompleted = (id, value,task) => {
  options.method = "PUT";
  options.headers.contentType = "application/json";
  options.url = `${apiUrl}products/${id}`;
  options.data = {
    name:task.name,
    isCompleted: value,
  };
  const promise = axios.request(options);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

export const deletetodoo = (id) => {
  options.method = "DELETE";
  options.headers.contentType = "application/json";
  options.url = `${apiUrl}products/${id}`;
  const promise = axios.request(options);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};
