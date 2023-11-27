import { ChangeEvent } from "react";
import { newFolder } from "../services/newFolder";
import { uploadFile } from "../services/upload";
import useFileStatus from "./useFileStatus";

const useUploads = (ref: React.RefObject<HTMLInputElement>, path: string) => {
  const setReqFinish = useFileStatus((state) => state.setReqFinish);

  const handleNewFolder = async (path: string) => {
    const folderName = prompt("New Folder Name");
    if (folderName) {
      await newFolder(path + "-" + folderName).then((data) => {
        setReqFinish(data);
      });
    }
  };

  const handleUpload = () => {
    ref.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      for (const file of files) {
        await uploadFile(path, file, file.name).then((data) => {
          setReqFinish(data);
        });
      }
    }
  };

  return { handleNewFolder, handleUpload, handleFileChange };
};

export default useUploads;
