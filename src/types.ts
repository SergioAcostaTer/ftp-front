export type FolderRes = {
  status: number;
  data: {
    files: {
      name: string;
      size: number;
      date: string;
    }[];
    dir: {
      name: string;
      date: string;
    }[];
  };
};

export type reqFinish = {
  message: string;
  result: string;
};
