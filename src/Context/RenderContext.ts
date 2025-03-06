import {createContext} from "react";
// import RenderContext from './RenderContext';



// interface RerenderType {
//     renderRecent: boolean;
//     setrenderRecent: React.Dispatch<React.SetStateAction<boolean>>;
//     folderName: string;
//     setFolderName: React.Dispatch<React.SetStateAction<string>>
//   }



  // const RenderContext = createContext<RerenderType>({
  //   renderRecent,
  //   setrenderRecent,
  //   folderName,
  //   setFolderName,
  // });
  const RenderContext = createContext({})

export default RenderContext;