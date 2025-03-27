import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './index.css'
const App = lazy(()=> import('./App.jsx'))

createRoot(document.getElementById('root')).render(
    <Suspense >
      <App />
    </Suspense>
    )
