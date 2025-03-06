import React, { useState } from "react";
import MainSideBar from "./Left";
import Mid from "./Mid";
import Right from "./Right";
import Rerender from "./Context/Context";
import { useParams } from "react-router-dom";
import useFetchFolder from "./Hooks/useFetchFolder";
// import Test from "./test";

const App: React.FC = () => {
  const [renderRecent, setrenderRecent] = useState<boolean>(false);
  const [folderName, setFolderName] = useState("");
  const {
    fetchFolder,
    data: folderData,
    loading: isFolderLoading,
  } = useFetchFolder();

  return (
    <Rerender.Provider
      value={{
        renderRecent,
        setrenderRecent,
        folderName,
        setFolderName,
        fetchFolder,
        folderData,
        isFolderLoading,
      }}
    >
      <div className="flex flex-row h-screen">
        <MainSideBar />
        {/* <div className="flex flex-col w-1/5 ">
        </div> */}
        <div className="w-1/4 h-screen bg-mid">
          <Mid />
        </div>
        <div className="w-11/20 h-screen bg-left">
          <Right />
        </div>
      </div>
      {/* <Test /> */}
    </Rerender.Provider>
  );
};

export default App;
