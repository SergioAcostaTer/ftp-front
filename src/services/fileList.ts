import axiosInstance from "./axios";

export const getFileList = async (path: string): Promise<FileList> => {
  const { data } = await axiosInstance.get(`/to/${path}`);

  console.log(data);

  return data;
};
