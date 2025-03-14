import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider} from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './service/Authentication.jsx'
import { router } from './router/RouterList.jsx'
import { CacheAPIProvider } from './service/CacheAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID }> {/* Google Authentication Provider */}
      <AuthProvider> {/* Context API Authentication Provider */}
        <CacheAPIProvider>
          <RouterProvider router={router} />
        </CacheAPIProvider>
      </AuthProvider>
  </GoogleOAuthProvider>
  </StrictMode>,
)
