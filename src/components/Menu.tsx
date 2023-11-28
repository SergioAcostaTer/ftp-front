import React from "react";
import useFileStatus from "../hooks/useFileStatus";
import useUploads from "../hooks/useUploads";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [path] = useFileStatus((state) => [state.path]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { handleFileChange } = useUploads(
    inputRef,
    path
  );

  return (
   <>
     <div className="items-center justify-center h-screen bg-[#F7F9FC] hidden md:flex">
    
       <div className="flex justify-center w-full bg-[#F7F9FC] h-full">
         <nav className="flex justify-center w-[400px] h-full h-16 bg-[#F7F9FC] sticky top-24 z-10 flex-col pl-4  hidden md:flex">
           
           <ul className="flex items-center justify-center space-x-4 text-white">
             
           </ul>
         </nav>
    
         <main className="flex flex-col items-center w-full bg-white rounded-md shadow-md p-4 max-h-[100vh] h-full overflow-y-auto">
           {children}
         </main>
       </div>
       <input
         type="file"
         accept="*"
         onChange={handleFileChange}
         multiple
         className="hidden"
         ref={inputRef}
       />
     </div>


    <div className="flex md:hidden">
      {children}
    </div>



   </>


    


  );
};
