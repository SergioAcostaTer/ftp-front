import { ChangeEvent, SetStateAction } from "react";
import { newFolder } from "../services/newFolder";
import { uploadFile } from "../services/upload";

const useUploads = (
  ref: React.RefObject<HTMLInputElement>,
  path: string,
  setReqStatus: React.Dispatch<SetStateAction<any>>
) => {
  const handleNewFolder = async (path: string) => {
    const folderName = prompt("New Folder Name");
    if (folderName) {
      const res = await newFolder(path + "-" + folderName);
      setReqStatus(res);
    }
  };

  const handleUpload = () => {
    ref.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      for (const file of files) {
        const data = await uploadFile(path, file, file.name);
        setReqStatus(data);
      }
    }
  };

  return { handleNewFolder, handleUpload, handleFileChange };
};

export default useUploads;
