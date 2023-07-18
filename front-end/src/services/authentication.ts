import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export function signin(email: string, password: string): Promise<string> {
  return axiosInstance
    .post("/auth/signin", { email, password })
    .then((response: AxiosResponse) => {
      const { acess_token } = response.data;
      return acess_token as string;
    });
}

export function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  return axiosInstance
    .post("/auth/signup", { email, password, firstName, lastName })
    .then((response: AxiosResponse) => response.data as {});
}

export function logout() {
  return axiosInstance.get("/auth/logout");
}

export function getUser() {
  return axiosInstance.get("/me");
}
