// import React, { Children, useState } from 'react'
// import RenderContext from './RenderContext'

// const RenderContextProvider = ({Children})=>{
//     const [folderName, setFolderName] = useState('')
//     const [renderRecent, setrenderRecent] = useState(false)
    
//     return (
//         <RenderContext.Provider value={{
//             folderName,
//             setFolderName,
//             renderRecent,
//             setrenderRecent,
//         }}>
//             {Children}
//         </RenderContext.Provider>
//     )
// }