import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/login";

const useLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await login(password);

      if (data.success) {
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const pass = localStorage.getItem("password");
    if (pass) {
      login(pass).then((data) => {
        console.log(data);
        if (data.success) {
          navigate("/", { replace: true });
        }
      });
    }
  }, []);

  return {
    password,
    showPassword,
    error,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
  };
};

export default useLogin;
