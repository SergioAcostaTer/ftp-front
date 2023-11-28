import { Link } from "react-router-dom";

export const Folder = ({ name, path, mode }: { name: string; path: string, mode: "grid" | "list" }) => {
  return (
    <Link to={`/${path}`}>
      <div className="flex items-center space-x-2 flex-col justify-center p-4 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-200 ease-in-out h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="w-16 h-16 text-yellow-500"
        >
          <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
        </svg>
        <p className="text-center text-xl">{name}</p>
      </div>

      <p className="hidden">
        {mode}
      </p>

    </Link>
  );
};
