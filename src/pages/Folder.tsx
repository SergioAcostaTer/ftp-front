import * as React from "react";
import { FolderRes } from "../types";
import { Folder as FolderComp } from "../components/Folder.tsx";
import { File } from "../components/File";
import { useParams } from "react-router-dom";
import UploadButton from "../components/uploadButton.tsx";
import useFolder from "../hooks/useFolder.ts";
import { Menu } from "../components/Menu.tsx";
import { Link } from "react-router-dom";

export default function Folder() {
  const { path } = useParams();
  const {
    fileList,
    loading,
    navigate,
  }: {
    fileList: FolderRes;
    loading: boolean;
    navigate: (path: string) => void;
  } = useFolder(path || "");

  const [mode, setMode] = React.useState<"grid" | "list">("grid");

  return (
    <>
      <header className="flex items-center justify-between w-full h-[60px] bg-[#F7F9FC] sticky top-0 left-0 right-0 z-10 p-4 shadow-md md:hidden">
        <p
          className={`text-blue-500 cursor-pointer ${
            window.location.pathname === "/" ? "hidden" : ""
          }`}
          onClick={() => {
            if (path) {
              navigate("/" + path.split("$").slice(0, -1).join("$"));
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-[35px] h-[35px] text-black"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </p>

        <h1 className="text-black text-xl">
          {path ? path.split("$").pop() : "Mi Unidad"}
        </h1>

        <p className="text-blue-500 cursor-pointer">{"search"}</p>
      </header>

      <div className="flex items-center justify-center space-x-4 text-black sticky top-[60px] left-0 right-0 z-10 bg-[#F7F9FC] p-4 md:hidden">
        <button
          onClick={() => setMode((prev) => (prev === "grid" ? "list" : "grid"))}
        >
          {mode === "grid" ? "List" : "Grid"}
        </button>
      </div>

      <Menu>
        <div className="flex w-full sticky top-0 hidden md:flex p-4">
          <Link to={`/`}>Mi Unidad</Link>

          {path && (
            <>
              <span className="mx-2">/</span>
            </>
          )}

          {path?.split("$").map((folder, index) => {
            return (
              <>
                <Link
                  to={`/${path
                    .split("$")
                    .slice(0, index + 1)
                    .join("$")}`}
                >
                  {folder}
                </Link>

                {index !== path.split("$").length - 1 && (
                  <span className="mx-2">/</span>
                )}
              </>
            );
          })}
        </div>

        <div
          className={`gap-4 w-full p-4 top-0 left-0 right-0 bottom-0 overflow-y-scroll h-full
          ${
            mode === "grid"
              ? "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-rows-[repeat(auto-fill,minmax(150px,1fr))] h-screen"
              : "flex flex-col"
          }`}
        >
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {fileList?.data?.dir?.map((folder) => (
                <FolderComp
                  mode={mode}
                  name={folder.name}
                  path={path ? path + "$" + folder.name : folder.name}
                  key={folder.name}
                />
              ))}

              {fileList?.data?.files?.map((file) => (
                <File
                  mode={mode}
                  {...file}
                  key={file.name}
                  path={path ? path + "$" + file.name : file.name}
                />
              ))}
            </>
          )}
        </div>
      </Menu>
      <UploadButton />
    </>
  );
}
