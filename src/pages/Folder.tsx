import * as React from "react";
import { FolderRes } from "../types";
import { Folder as FolderComp } from "../components/Folder.tsx";
import { File } from "../components/File";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu.tsx";
import UploadButton from "../components/uploadButton.tsx";
import useFolder from "../hooks/useFolder.ts";

export default function Folder() {
  const { path } = useParams();
  const { fileList, loading }: { fileList: FolderRes; loading: boolean } =
    useFolder(path || "");

    const [mode, setMode] = React.useState<"grid" | "list">("grid");

  return (
    <Menu>

      <div className="flex items-center justify-center space-x-4 text-white">
        <button onClick={() => setMode(prev => prev === "grid" ? "list" : "grid")}>
          {mode === "grid" ? "List" : "Grid"}
          </button>
      </div>

      <div className={`grid gap-4 w-full p-4 absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll ${mode === "grid" ? "grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-rows-[repeat(auto-fill,minmax(150px,1fr))]" : "grid-cols-1 grid-rows-[repeat(auto-fill,minmax(30px,1fr))]"}`}>
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
      <UploadButton />
    </Menu>
  );
}
