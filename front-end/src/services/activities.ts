import { Activity, ActivityInput } from "@/utils";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export function getActivities(): Promise<Activity[]> {
  return axiosInstance
    .get("/activities")
    .then((response: AxiosResponse<Activity[]>) => response.data);
}

export function getLatestActivities(): Promise<Activity[]> {
  return axiosInstance
    .get("/activities/latest")
    .then((response: AxiosResponse<Activity[]>) => response.data);
}

export function getActivity(id: string): Promise<Activity> {
  return axiosInstance
    .get(`/activities/${id}`)
    .then((response: AxiosResponse<Activity>) => response.data);
}

export function createActivity(input: ActivityInput): Promise<Activity> {
  return axiosInstance
    .post("/activities", input)
    .then((response: AxiosResponse<Activity>) => response.data);
}

export function getCities(): Promise<string[]> {
  return axiosInstance
    .get("/activities/listCities")
    .then((response: AxiosResponse<string[]>) => response.data);
}

export function getActivitiesByCity(
  city: string,
  searchParams?: string
): Promise<Activity[]> {
  return axiosInstance
    .get(`/activities/cities/${city}${searchParams ? `?${searchParams}` : ""}`)
    .then((response: AxiosResponse<Activity[]>) => response.data);
}
