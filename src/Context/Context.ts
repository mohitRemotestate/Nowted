import {createContext} from "react";
import { FolderList } from "../Hooks/useFetchFolder";


interface RerenderType {
    renderRecent: boolean;
    setrenderRecent: React.Dispatch<React.SetStateAction<boolean>>;
    folderName: string;
    setFolderName: React.Dispatch<React.SetStateAction<string>>;
    fetchFolder:()=>void
    folderData:FolderList|null
    isFolderLoading:boolean
  }

  const Rerender = createContext<RerenderType>({
    renderRecent: false,
    setrenderRecent: () => {},
    folderName:"",
    setFolderName: () => {},
    fetchFolder:()=>{},
    folderData:null,
    isFolderLoading:false

  });

export default Rerender;