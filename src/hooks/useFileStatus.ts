import create from "zustand";

type FileStatusStore = {
  path: string;
  reqStatus: { message: string; result: string };
  setPath: (path: string) => void;
  setReqStatus: (reqStatus: { message: string; result: string }) => void;
};

const useFileStatus = create<FileStatusStore>((set) => ({
  path: "",
  reqStatus: { message: "", result: "" },
  setPath: (path: string) => set({ path }),
  setReqStatus: (reqStatus: { message: string; result: string }) =>
    set({ reqStatus }),
}));

export default useFileStatus;
