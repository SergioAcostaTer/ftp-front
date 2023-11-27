import React, { useEffect } from "react";
import { getFileList } from "../services/fileList";
import useFileStatus from "./useFileStatus";
import { FolderRes } from "../types";

const useFolder = (path: string) => {
  const [fileList, setFileList] = React.useState<FolderRes>({} as FolderRes);
  const [reqFinish, setPath] = useFileStatus((state) => [
    state.reqFinish,
    state.setPath,
  ]);

  useEffect(() => {
    if (path) {
      setPath(path);
      getFileList(path).then((data) => {
        setFileList(data);
      });
    } else {
      setPath("");
      getFileList("").then((data) => {
        setFileList(data);
      });
    }
  }, [path, reqFinish, setPath]);

  return fileList;
};

export default useFolder;
