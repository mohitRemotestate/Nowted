import React, { useState } from "react";
import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";
import Rerender from "./Context/Context";



const App: React.FC = () => {
  const [renderRecent, setrenderRecent] = useState<boolean>(false);

  return (
    <Rerender.Provider value={{ renderRecent, setrenderRecent }}>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/5 h-screen bg-left">
          <Left />
        </div>
        <div className="w-1/4 h-screen bg-mid">
          <Mid />
        </div>
        <div className="w-full h-screen bg-left">
          <Right />
        </div>
      </div>
    </Rerender.Provider>
  );
};

export default App;
