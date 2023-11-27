import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { uploadFile } from "../services/upload";

const FileInput = ({
  path,
  setFileData,
}: {
  path: string;
  setFileData: Dispatch<SetStateAction<{ message: string; result: string }>>;
}) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      for (const file of files) {
        const data = await uploadFile(path, file, file.name);
        setFileData(data);
      }
    }
  };

  return (
    <input
      type="file"
      accept=".jpg, .jpeg, .png, .gif, .pdf, .mp4, .mp3"
      onChange={handleFileChange}
      multiple
    />
  );
};

export default FileInput;
