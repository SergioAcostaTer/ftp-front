import { Link } from "react-router-dom";

export const Folder = ({
  name,
  path,
  mode,
}: {
  name: string;
  path: string;
  mode: "grid" | "list";
}) => {
  return (
    <>
      {mode === "grid" ? (
        <div className="flex items-center space-x-2 flex-col justify-center p-2 rounded-md transition duration-200 ease-in-out h-full">
          <Link to={`/${path}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-[110px] h-[110px] text-yellow-500"
            >
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
            </svg>
          </Link>

          <div className="flex items-center justify-center w-full relative">
            <p className="text-center text-xl">{name}</p>
            <button className="cursor-pointer absolute right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-[25px] h-[25px] text-gray-500"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center space-x-2 p-2 rounded-md transition duration-200 ease-in-out bg-gray-100 h-[70px] hover:bg-gray-200 md:h-[80px]">
          <Link to={`/${path}`} className="w-full">
            <div className="flex items-center space-x-2 justify-center p-2 rounded-md transition duration-200 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-[30px] h-[30px] text-yellow-500 md:w-[50px] md:h-[50px]"
              >
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
              </svg>

              <div className="flex w-full relative md:pl-4">
                <p className="text-xl">{name}</p>
              </div>
            </div>
          </Link>
          <button className="cursor-pointer h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-[25px] h-[25px] text-gray-500"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
