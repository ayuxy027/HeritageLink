import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Events from './pages/Events';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AuthPage from './pages/AuthPage';
import Book1 from './pages/Book1';
import Book2 from './pages/Book2';
import Book3 from './pages/Book3';
import Book4 from './pages/Book4';
import Book5 from './pages/Book5';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/book-1" element={<Book1 />} />
          <Route path="/book-2" element={<Book2 />} />
          <Route path="/book-3" element={<Book3 />} />
          <Route path="/book-4" element={<Book4 />} />
          <Route path="/book-5" element={<Book5 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;