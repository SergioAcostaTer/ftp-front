import React from "react";
import useFileStatus from "../hooks/useFileStatus";
import useUploads from "../hooks/useUploads";

const MiniButton = ({
  svg,
  title,
  onClick,
}: {
  svg: React.ReactNode;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <button
        onClick={onClick}
        className="flex items-center justify-center w-[60px] h-[60px] bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-200 ease-in-out text-white"
      >
        {svg}
      </button>
      <p className="text-black">{title}</p>
    </div>
  );
};

const UploadButton = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const [path] = useFileStatus((state) => [state.path]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { handleNewFolder, handleUpload, handleFileChange } = useUploads(
    inputRef,
    path
  );

  return (
    <>
      <div
        className="fixed bottom-[70px] right-5 w-[70px] h-[70px] bg-blue-500 rounded-[30%] shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out md:hidden z-10"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[35px] h-[35px] text-white"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </div>

      <div
        className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center"
        style={{ display: showMenu ? "flex" : "none" }}
        onClick={() => setShowMenu(!showMenu)}
      />

      <div
        className={`fixed bottom-0 w-full h-[30vh] bg-white shadow-md flex items-center justify-around md:hidden z-[100] p-[50px] transition duration-200 ease-in-out ${
          showMenu ? "transform translate-y-0" : "transform translate-y-[100%]"
        }`}
      >
        <MiniButton
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-[30px] h-[30px] text-yellow-500"
            >
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
            </svg>
          }
          title="Folder"
          onClick={() => {
            handleNewFolder(path);
            setShowMenu(false);
          }}
        />

        <MiniButton
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-[30px] h-[30px] text-white"
            >
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          }
          title="Files"
          onClick={handleUpload}
        />
      </div>

      <input
        type="file"
        onChange={(e) => {
          handleFileChange(e);
          setShowMenu(false);
        }}
        multiple
        className="hidden"
        ref={inputRef}
      />
    </>
  );
};

export default UploadButton;
