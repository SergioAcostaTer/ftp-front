import { useEffect } from "react";
import { getFileList } from "../services/fileList";
import React from "react";
import { FileList } from "../types";

import { Folder as FolderComp } from "../components/Folder.tsx";
import { File } from "../components/File";
import { useParams } from "react-router-dom";
import useFileStatus from "../hooks/useFileStatus.ts";
import { Menu } from "../components/Menu.tsx";
import axiosInstance from "../services/axios.ts";
import UploadButton from "../components/uploadButton.tsx";

export default function Folder() {
  const { path } = useParams();
  const [fileList, setFileList] = React.useState<FileList>({} as FileList);
  const [reqStatus, setPath] = useFileStatus((state) => [
    state.reqStatus,
    state.setPath,
  ]);
  console.log(path);

  useEffect(() => {
    const password = localStorage.getItem("password");
    if(password){
      axiosInstance.defaults.headers.common["Authorization"] = `${password}`;
    }

    if (path) {
      setPath(path);
      getFileList(path).then((data) => {
        setFileList(data as unknown as FileList);
      });
    }else{
      setPath("");
      getFileList("").then((data) => {
        setFileList(data as unknown as FileList);
      });
    }
  }, [path, reqStatus]);

  return (
    <Menu>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full p-4 absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll grid-rows-[repeat(auto-fill,minmax(150px,1fr))]">
        {fileList?.data?.dir?.map((folder) => (
          <FolderComp name={folder} path={path ? path + "-" + folder : folder} />
        ))}
      
        {fileList?.data?.files?.map((file) => (
          <File name={file} key={file} path={path ? path + "-" + file : file} />
        ))}
      </div>
      <UploadButton />
    </Menu>
  );
}
