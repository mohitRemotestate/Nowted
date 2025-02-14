// import React from 'react'
import Left from './Left.tsx'
import Mid from './Mid.tsx'
import Right from './Right.tsx'


const App =()=>{


    return (
        <div className="flex flex-row">
                        <div className="w-1/5 h-screen bg-left">
                            <Left />
                        </div>
                        <div className="w-1/4 h-screen bg-mid">
                            <Mid />
                        </div>
                        <div className="w-full h-screen bg-left">
                            <Right />
                    
                        </div>
                    </div>
    )
}

export default App;