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

  return (
    <Menu>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full p-4 absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll grid-rows-[repeat(auto-fill,minmax(150px,1fr))]">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {fileList?.data?.dir?.map((folder) => (
              <FolderComp
                name={folder}
                path={path ? path + "-" + folder : folder}
                key={folder}
              />
            ))}

            {fileList?.data?.files?.map((file) => (
              <File
                name={file}
                key={file}
                path={path ? path + "-" + file : file}
              />
            ))}
          </>
        )}
      </div>
      <UploadButton />
    </Menu>
  );
}
