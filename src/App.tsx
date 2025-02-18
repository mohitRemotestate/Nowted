import React from 'react'
import Left from './Left.tsx'
import Mid from './Mid.tsx'
import Right from './Right.tsx'
import { useState } from 'react';
import { useEffect } from 'react';
import Rerender from './Context/Context.ts';


const App =()=>{
const [renderRecent, setrenderRecent] = useState(false)


    return (
        <Rerender.Provider value={{renderRecent,setrenderRecent}}>
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
    )
}

export default App;