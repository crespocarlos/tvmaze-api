import axios, { AxiosRequestConfig } from "axios";

const defaultAxiosConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
  baseURL: "http://api.tvmaze.com"
};

const tvmazeApi = axios.create(defaultAxiosConfig);
export default tvmazeApi;
