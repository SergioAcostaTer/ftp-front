export type FolderRes = {
    status: number;
    data: {
        files: string[];
        dir: string[];
    };
};

export type reqFinish = {
    message: string;
    result: string;
};