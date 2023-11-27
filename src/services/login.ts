import axiosInstance from "./axios";

const login = async (password: string): Promise<{ success: boolean }> => {
  try {
    const { data } = await axiosInstance.post(
      `/login`,
      {},
      {
        headers: {
          Authorization: password,
        },
      }
    );

    if (data.success) {
      localStorage.setItem("password", password);
      axiosInstance.defaults.headers.common["Authorization"] = password;
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    localStorage.removeItem("password");
    throw error;
  }
};

export default login;
