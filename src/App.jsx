import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EnhancedLoadingSpinner from './components/shared/EnhancedLoadingSpinner';
import ErrorFallback from './components/shared/ErrorFallback';

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
                
                {/* Redirect /book to /book-1 */}
                <Route path="/book" element={<Navigate to="/book-1" replace />} />
                
                {/* Booking routes */}
                <Route path="/book-1" element={<Book1 />} />
                <Route path="/book-2" element={<Book2 />} />
                <Route path="/book-3" element={<Book3 />} />
                <Route path="/book-4" element={<Book4 />} />
                <Route path="/book-5" element={<Book5 />} />

                {/* QR Code Page */}
                <Route path="/qr-code" element={<QrCodePage />} />

                {/* Catch-all route for 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;