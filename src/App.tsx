import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorFallback from './components/shared/ErrorFallback';
import EnhancedLoadingSpinner from './components/shared/EnhancedLoadingSpinner';
import BookingLayout from './components/layout/BookingLayout';

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

const PageLoader = (): React.JSX.Element => (
  <div className="flex-grow">
    <EnhancedLoadingSpinner fullScreen={false} color="indigo" text="Loading content..." />
  </div>
);

function App(): React.JSX.Element {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="flex flex-col min-h-screen App">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/events" element={<Events />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/book" element={<Navigate to="/book-1" replace />} />
                <Route element={<BookingLayout />}>
                  <Route path="/book-1" element={<Book1 />} />
                  <Route path="/book-2" element={<Book2 />} />
                  <Route path="/book-3" element={<Book3 />} />
                  <Route path="/book-4" element={<Book4 />} />
                  <Route path="/book-5" element={<Book5 />} />
                </Route>
                <Route path="/qr-code" element={<QrCodePage />} />
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
