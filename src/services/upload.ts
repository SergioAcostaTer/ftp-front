import FormData from "form-data";
import axiosInstance from "./axios";


type UploadResponse = {
  message: string;
  result: string;
};

export async function uploadFile(
  remotePath: string,
  fileBuffer: File,
  fileName: string,
  onProgress?: (progress: number) => void
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
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress?.(progress);
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
