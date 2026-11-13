import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
<<<<<<< HEAD

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
=======
import { AuthProvider } from './features/authentication/auth/AuthProvider'
import { ProjectsProvider } from './features/projects/ProjectsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
  </StrictMode>,
)
