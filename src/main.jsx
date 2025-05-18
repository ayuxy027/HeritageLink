import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import EnhancedLoadingSpinner from './components/shared/EnhancedLoadingSpinner'

// Lazy load App component
const App = React.lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<EnhancedLoadingSpinner fullScreen color="primary" text="Loading Application..." />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
