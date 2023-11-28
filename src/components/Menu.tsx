import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import useFileStatus from "../hooks/useFileStatus";
import useUploads from "../hooks/useUploads";
import { Link } from "react-router-dom";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [path] = useFileStatus((state) => [state.path]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { handleNewFolder, handleUpload, handleFileChange } = useUploads(
    inputRef,
    path
  );

  return (
    <div className="items-center justify-center h-screen bg-[#F7F9FC]">
      <header className="flex items-center justify-center w-full h-[60px] bg-[#F7F9FC]">
        <h1 className="text-4xl font-bold text-white">File Manager</h1>
      </header>

      <div className="flex justify-center w-full bg-[#F7F9FC]">
        <nav className="flex justify-center w-[400px] h-full h-16 bg-[#F7F9FC] sticky top-24 z-10 flex-col pl-4  hidden md:flex">
          <Dropdown>
            <DropdownTrigger>
              <button className="flex items-center justify-center w-24 h-10 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out text-white">
                Nuevo
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" variant="solid">
              <DropdownItem key="files" color="primary" onClick={handleUpload}>
                New Files
              </DropdownItem>
              <DropdownItem
                key="folders"
                color="primary"
                onClick={() => {
                  handleNewFolder(path);
                }}
              >
                New Folder
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <ul className="flex items-center justify-center space-x-4 text-white">
            <li>Home</li>
            <li>Files</li>
            <li>Upload</li>
          </ul>
        </nav>

        <main className="flex flex-col items-center justify-center w-full bg-white shadow-md h-[calc(100vh-60px)] rounded-tl-3xl rounded-tr-3xl md:mr-10 relative z-0 m-0">
          <div className="flex h-[150px] w-full sticky top-0">
            <Link to={`/`}>Mi Unidad</Link>

            {path && (
              <>
                <span className="mx-2">/</span>
              </>
            )}

            {path.split("$").map((folder, index) => {
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
          <div className="relative z-10 w-full h-full p-4">{children}</div>
        </main>
      </div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .pdf, .mp4, .mp3"
        onChange={handleFileChange}
        multiple
        className="hidden"
        ref={inputRef}
      />
    </div>
  );
};
