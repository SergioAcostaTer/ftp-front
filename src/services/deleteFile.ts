import axiosInstance from "./axios";


const deleteFile = async (path: string): Promise<{message: string, result: string}> => {
  const { data } = await axiosInstance.delete(`/deleteFile/${path}`);
  return data;
};

export default deleteFile;

