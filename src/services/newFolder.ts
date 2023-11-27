import axiosInstance from "./axios";


export type NewFolderResponse = {
  message: string;
  path: string;
};

export async function newFolder(path: string): Promise<NewFolderResponse> {
  try {
    const response = await axiosInstance.post(`/mkdir/${path}`);

    return response.data;
  } catch (error) {
    console.error("Error creating new folder:", error);
    throw error;
  }
}
