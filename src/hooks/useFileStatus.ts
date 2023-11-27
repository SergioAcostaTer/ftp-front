import create from "zustand";

type FileStatusStore = {
  path: string;
  reqFinish: { message: string; result: string };
  setPath: (path: string) => void;
  setReqFinish: (reqStatus: { message: string; result: string }) => void;
};

const useFileStatus = create<FileStatusStore>((set) => ({
  path: "",
  reqFinish: { message: "", result: "" },
  setPath: (path: string) => set({ path }),
  setReqFinish: (reqFinish: { message: string; result: string }) =>
    set({ reqFinish }),
}));

export default useFileStatus;
