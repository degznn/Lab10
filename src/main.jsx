import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TaskApp from './TaskApp.jsx'
import './task.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskApp />
  </StrictMode>,
)
