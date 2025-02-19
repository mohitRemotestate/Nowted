import React, { useState } from "react";
import MainSideBar from "./Left";
import Mid from "./Mid";
import Right from "./Right";
import Rerender from "./Context/Context";
// import Test from "./test";

const App: React.FC = () => {
  const [renderRecent, setrenderRecent] = useState<boolean>(false);

  return (
    <Rerender.Provider value={{ renderRecent, setrenderRecent }}>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/5 h-screen bg-left">
          <MainSideBar />
        </div>
        <div className="w-1/4 h-screen bg-mid">
          <Mid />
        </div>
        <div className="w-full h-screen bg-left">
          <Right />
        </div>
      </div>
      {/* <Test /> */}
    </Rerender.Provider>
  );
};

export default App;
