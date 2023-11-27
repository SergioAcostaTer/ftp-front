import { reqFinish } from "../types";
import axiosInstance from "./axios";


export async function newFolder(path: string): Promise<reqFinish> {
  try {
    const response = await axiosInstance.post(`/mkdir/${path}`);

    return response.data;
  } catch (error) {
    console.error("Error creating new folder:", error);
    throw error;
  }
}
