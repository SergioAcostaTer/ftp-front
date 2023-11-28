import removeFile from "../services/deleteFile";
import useFileStatus from "../hooks/useFileStatus";
import axiosInstance from "../services/axios";
import React, { useEffect } from "react";

const useFile = (path: string, size: number) => {
  const [file, setFile] = React.useState<string | null>(null);
  const imageExtensions = ["png", "jpg", "jpeg", "gif", "svg", "webp"];
  const [setFinish] = useFileStatus((state) => [state.setReqFinish]);
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    if (size < 10000000 && imageExtensions.includes(path.split(".").pop()!.toLowerCase())) {

      const fetchImage = async () => {
        const res = await fetch(
          axiosInstance.defaults.baseURL + "/download/" + path,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/octet-stream",
              Authorization:
                String(
                  axiosInstance.defaults.headers.common["Authorization"]
                ) || "",
            },
          }
        );

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        setFile(url);
        setLoading(false);
      };

      fetchImage();
    } else {
      setFile(null);
    }
  }, [path]);

  const handleDownload = async () => {
    if (file) {
      const a = document.createElement("a");
      a.href = file;
      a.download = path.split("$").pop()!;
      a.click();
    } else {
      const res = await fetch(
        axiosInstance.defaults.baseURL + "/download/" + path,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
            Authorization:
              String(axiosInstance.defaults.headers.common["Authorization"]) ||
              "",
          },
        }
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = path.split("$").pop()!;
      a.click();
    }
  };

  const handleDelete = async () => {
    const res = await removeFile(path);
    setFinish(res);
  };

  const isImage = imageExtensions.includes(path.split(".").pop()!) && size < 10000000;

  return { file, handleDownload, handleDelete, loading, isImage };
};

export const File = ({
  name,
  path,
  mode,
  size,
  date,
}: {
  name: string;
  path: string;
  mode: string;
  size: number;
  date: string;
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { file: image, handleDownload, handleDelete, loading, isImage } = useFile(
    path,
    size
  );

  return (
    <>
      {mode === "grid" ? (
        <div className="relative flex items-center space-x-2 justify-center bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer p-4 w-full h-full">
          <div
            className="h-full w-full flex items-center space-x-2 justify-center flex-col"
            onClick={() => setShowMenu(!showMenu)}
            style={{ display: showMenu ? "none" : "flex" }}
          >
            {isImage ? (

              loading ? (
                <p>Loading...</p>
              ) : (
                <img src={image || ""} alt={name} className="w-16 h-16" />
              )
              
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-16 h-16 text-blue-500"
              >
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>
            )}

            <h1 className="text-blue-500">
              {name.length > 20 ? name.slice(0, 20) + "..." : name}
            </h1>
          </div>

          <div
            className="flex items-center h-full w-full justify-center absolute z-[200] left-0 top-0 bottom-0 right-0"
            style={{ display: showMenu ? "flex" : "none" }}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div
              className="bg-green-500 h-full w-[50%] rounded-l-md"
              onClick={handleDownload}
            ></div>

            <div
              className="bg-red-500 w-[50%] h-full rounded-r-md"
              onClick={handleDelete}
            ></div>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center space-x-2 justify-center bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer p-4 w-full h-full h-[30px] grid grid-cols-[40%,30%,30%] gap-4">
          <h1 className="text-blue-500">
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </h1>

          <p>{size} bytes</p>

          <p>{date}</p>
        </div>
      )}
    </>
  );
};
