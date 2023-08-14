import axiosClient from "./index";
import { AxiosResponse } from "axios";

export const getProducts = (): Promise<AxiosResponse> => {
  return axiosClient.get("/json/products.json");
};
