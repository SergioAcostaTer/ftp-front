import React from "react";
import useFileStatus from "../hooks/useFileStatus";
import useUploads from "../hooks/useUploads";

const UploadButton = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const [path, setReqStatus] = useFileStatus((state) => [
    state.path,
    state.setReqStatus,
  ]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { handleNewFolder, handleUpload, handleFileChange } = useUploads(
    inputRef,
    path,
    setReqStatus
  );

  return (
    <>
      <div
        className="fixed bottom-10 right-10 w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out md:hidden z-10"
        onClick={() => setShowMenu(!showMenu)}
      >
        +
      </div>

      {showMenu && (
        <div className="absolute w-full h-full top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center space-x-4 p-4 z-10">
          <div
            onClick={() => {
              setShowMenu(false);
              handleNewFolder(path);
            }}
          >
            <p>New Folder</p>
          </div>

          <div
            onClick={() => {
              setShowMenu(false);
              handleUpload();
            }}
          >
            <p>New File</p>
          </div>
        </div>
      )}

      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .pdf, .mp4, .mp3"
        onChange={handleFileChange}
        multiple
        className="hidden"
        ref={inputRef}
      />
    </>
  );
};

export default UploadButton;
