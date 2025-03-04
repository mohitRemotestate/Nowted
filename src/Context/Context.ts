import {createContext} from "react";


interface RerenderType {
    renderRecent: boolean;
    setrenderRecent: React.Dispatch<React.SetStateAction<boolean>>;
    folderName: string;
    setFolderName: React.Dispatch<React.SetStateAction<string>>;
  }

  const Rerender = createContext<RerenderType>({
    renderRecent: false,
    setrenderRecent: () => {},
    folderName:"",
    setFolderName: () => {},
  });

export default Rerender;