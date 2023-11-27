import FormData from "form-data";
import axiosInstance from "./axios";


type UploadResponse = {
  message: string;
  result: string;
};

export async function uploadFile(
  remotePath: string,
  fileBuffer: File,
  fileName: string
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", fileBuffer, {
      filename: remotePath.split("/").pop(),
    });
    formData.append("remotePath", remotePath);
    formData.append("fileName", fileName);

    const response = await axiosInstance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
