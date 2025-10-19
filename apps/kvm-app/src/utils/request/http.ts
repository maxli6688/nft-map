/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { addPending, removePending } from "./cancel";
import { API_BASE_URL } from "@/config/constants/map";
// import { storage } from '../localStorage/index';

// import { LoginInfo } from "@/models/loginInfo";
// const isProduction = process.env.NODE_ENV === "production";
const rq = axios.create({
  baseURL: API_BASE_URL,
  // baseURL: "http://localhost:8000/2016-08-15/proxy/YD_VIP/app",
  timeout: 30000,
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
  // withCredentials: true,
});
rq.interceptors.request.use((config: InternalAxiosRequestConfig) =>
  // let userInfo: Partial<LoginInfo> = {};
  // try {
  //   userInfo = storage.get("userInfo");
  // } catch (error) {
  //   userInfo = {};
  // }
  // config.headers.xs = (userInfo && userInfo.sign) || "";
  // addPending(config);
  {
    console.log("url", config.url);
    return config;
  }
);
rq.interceptors.response.use(
  (res: AxiosResponse) => {
    removePending(res);
    // 统一拿到返回的 status -4 -5
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.data as any;
  },
  (err: any) => {
    if (!axios.isCancel(err)) {
      console.error(err);
    }
  }
);
const http = {
  get(url: string, params?: object) {
    return rq({
      url,
      method: "GET",
      params,
    });
  },
  post(url: string, params = {}) {
    return rq({
      url,
      method: "POST",
      // 将对象序列化成URL的形式，以&进行拼接
      // data: qs.stringify(params),
      data: params,
    });
  },
};
export { http };
