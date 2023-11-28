import { useEffect, useState } from "react";
import { getFileList } from "../services/fileList";
import useFileStatus from "./useFileStatus";
import { useNavigate } from "react-router-dom";
import { FolderRes } from "../types";
import axiosInstance from "../services/axios";

const useFolder = (path: string) => {
  const [fileList, setFileList] = useState<FolderRes>({} as FolderRes);
  const [loading, setLoading] = useState<boolean>(true);
  const [reqFinish, setPath] = useFileStatus((state) => [
    state.reqFinish,
    state.setPath,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const password = localStorage.getItem("password");
    if (password) {
      axiosInstance.defaults.headers.common["Authorization"] = password;
    } else {
      navigate("/login");
    }
  }, [path]);

  useEffect(() => {
    if (path) {
      setLoading(true);
      setPath(path);
      getFileList(path)
        .then((data) => {
          setFileList(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setPath("");
      getFileList("")
        .then((data) => {
          setFileList(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [path, reqFinish, setPath]);

  return { fileList, loading };
};

export default useFolder;
