// Import necessary components and modules from React and React Router
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* <Route path='/folder/:folderId/note/newnote' element={<App />} /> */}
        <Route path='/folder/:folderId/note/:noteId' element={<App />} />
        <Route path='/folder/:folderId' element={<App />} />
        
        <Route path='*' element={<App />} />
        <Route path='/' element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
)