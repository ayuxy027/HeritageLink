import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EnhancedLoadingSpinner from './components/shared/EnhancedLoadingSpinner';
import ErrorFallback from './components/shared/ErrorFallback';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Events = lazy(() => import('./pages/Events'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Book1 = lazy(() => import('./pages/Book1'));
const Book2 = lazy(() => import('./pages/Book2'));
const Book3 = lazy(() => import('./pages/Book3'));
const Book4 = lazy(() => import('./pages/Book4'));
const Book5 = lazy(() => import('./pages/Book5'));
const QrCodePage = lazy(() => import('./pages/QrCodePage'));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex flex-col min-h-screen App">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<EnhancedLoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<AuthPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/book" element={<Navigate to="/book-1" replace />} />
                  <Route path="/book-1" element={<ProtectedRoute><Book1 /></ProtectedRoute>} />
                  <Route path="/book-2" element={<ProtectedRoute><Book2 /></ProtectedRoute>} />
                  <Route path="/book-3" element={<ProtectedRoute><Book3 /></ProtectedRoute>} />
                  <Route path="/book-4" element={<ProtectedRoute><Book4 /></ProtectedRoute>} />
                  <Route path="/book-5" element={<ProtectedRoute><Book5 /></ProtectedRoute>} />
                  <Route path="/qr-code" element={<ProtectedRoute><QrCodePage /></ProtectedRoute>} />

                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;