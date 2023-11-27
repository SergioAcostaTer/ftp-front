import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import removeFile from "../services/deleteFile";
import useFileStatus from "../hooks/useFileStatus";
import axiosInstance from "../services/axios";

export const File = ({ name, path }: { name: string; path: string }) => {
  const [setFinish] = useFileStatus((state) => [state.setReqFinish]);

  const handleDownload = async () => {
    const res = await fetch(axiosInstance.defaults.baseURL + "/download/" + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": String(axiosInstance.defaults.headers.common["Authorization"]) || ""
      },
    });
    

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  const handleDelete = async () => {
    const res = await removeFile(path);
    setFinish(res);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center space-x-2 flex-col justify-center bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer p-4">
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
            <h1 className="text-blue-500">
              {name.length > 20 ? name.slice(0, 20) + "..." : name}
            </h1>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="download" onClick={handleDownload} color="primary">
            Download
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={handleDelete}
          >
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
