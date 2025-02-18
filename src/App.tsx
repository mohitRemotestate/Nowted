import React from 'react'
import Left from './Left.tsx'
import Mid from './Mid.tsx'
import Right from './Right.tsx'
import { useState } from 'react';
import { useEffect } from 'react';


const App =()=>{

const [recentRender, setRecentRender] = useState(true);
const [postRender, setPostRender]= useState(false);
// useEffect(()=>{console.log(postRender)},[])

    return (
        <div className="flex flex-row">
                        <div className="flex flex-col w-1/5 h-screen bg-left">
                            <Left Renderlist ={{recentRender:recentRender}}/>
                        </div>
                        <div className="w-1/4 h-screen bg-mid">
                            <Mid />
                        </div>
                        <div className="w-full h-screen bg-left">
                            <Right setPostRender={setPostRender}/>
                    
                        </div>
                    </div>
    )
}

export default App;