import removeFile from "../services/deleteFile";
import useFileStatus from "../hooks/useFileStatus";
import axiosInstance from "../services/axios";
import React from "react";
import ExtensionSvg from "./ExtensionSvg";
import tinyDate from "../util/tinyDate";
import tinyBytes from "../util/tinyBytes";

const useFile = (path: string) => {
  const [setFinish] = useFileStatus((state) => [state.setReqFinish]);

  const handleDownload = async () => {
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
  };

  const handleDelete = async () => {
    const res = await removeFile(path);
    setFinish(res);
  };

  return { handleDownload, handleDelete };
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
  const { handleDownload, handleDelete } = useFile(path);
  const [popup, setPopup] = React.useState(false);

  return (
    <>
      {mode === "grid" ? (
        <div
          className="relative flex items-center space-x-2 justify-center transition duration-200 ease-in-out cursor-pointer p-2 w-full h-full"
          onClick={() => setPopup(!popup)}
        >
          <div className="h-full w-full flex items-center space-x-2 justify-center flex-col">
            <ExtensionSvg
              extension={path.split(".").pop()!}
              styles="w-[100px] h-[100px] mb-2"
            />

            <div className="flex items-center justify-center w-full relative">
              <p className="text-center text-xl truncate w-full">{name}</p>
            </div>
          </div>

          {popup && (
            <div className="absolute top-0 left-0 right-0 top-[100%] flex items-center justify-center space-x-2 z-[90]">
              <ul>
                <li
                  className="flex items-center space-x-2 justify-center bg-gray-100 rounded-t-md shadow-md hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer p-4 w-full h-full h-[30px] gap-4"
                  onClick={handleDownload}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                    />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                  </svg>
                  <p>Download</p>
                </li>

                <li
                  className="flex items-center space-x-2 bg-gray-100 rounded-t-md shadow-md hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer p-4 w-full h-full h-[30px] gap-4"
                  onClick={handleDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>

                  <p>Delete</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex items-center space-x-2 rounded-md transition duration-200 ease-in-out bg-gray-100 h-[70px] hover:bg-gray-200 md:h-[90px] grid grid-cols-[60%,40%]">
          <div className="flex items-center space-x-2 p-2 rounded-md transition duration-200 ease-in-out">
            <ExtensionSvg
              extension={path.split(".").pop()!}
              styles="w-[30px] h-[30px] md:w-[50px] md:h-[50px] text-blue-500 flex-shrink-0"
            />

            <div className="flex w-full relative md:pl-4 flex-col"> 
              <p className="text-lg truncate">{name}</p>
              <p className="text-sm truncate">Modificado: {tinyDate(date)}</p>
            </div>
          </div>
          <p className="text-end text-lg truncate pr-4">{tinyBytes(size)}</p>
        </div>
      )}
    </>
  );
};
