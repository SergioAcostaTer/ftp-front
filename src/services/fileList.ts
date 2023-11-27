import { FolderRes } from "../types";
import axiosInstance from "./axios";

export const getFileList = async (path: string): Promise<FolderRes> => {
  const { data } = await axiosInstance.get(`/to/${path}`);

  console.log(data);

  return data;
};
