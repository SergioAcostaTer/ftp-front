import { BrowserRouter, Route, Routes } from "react-router-dom";
import Folder from "./pages/Folder";
import { NextUIProvider } from "@nextui-org/system";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
          <Routes>
            <Route path="/" element={<Folder />} />
            <Route path="/:path" element={<Folder />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
