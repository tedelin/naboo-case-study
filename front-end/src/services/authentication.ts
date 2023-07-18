import { SignIn, SignInInput, User } from "@/utils";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export function signin(input: SignInInput): Promise<string> {
  return axiosInstance
    .post("/auth/signin", input)
    .then((response: AxiosResponse<SignIn>) => response.data.access_token);
}

export function signup(input: SignInInput): Promise<User> {
  return axiosInstance
    .post("/auth/signup", input)
    .then((response: AxiosResponse<User>) => response.data);
}

export function logout() {
  return axiosInstance.get("/auth/logout");
}

export function getUser(): Promise<User> {
  return axiosInstance
    .get("/me")
    .then((response: AxiosResponse<User>) => response.data);
}
