import {createContext} from "react";


interface RerenderType {
    renderRecent: boolean;
    setrenderRecent: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const Rerender = createContext<RerenderType>({
    renderRecent: false,
    setrenderRecent: () => {},
  });

export default Rerender;