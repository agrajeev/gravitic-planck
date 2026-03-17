import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrowseCars from './pages/BrowseCars';
import CarDetail from './pages/CarDetail';
import Sell from './pages/Sell';
import Finance from './pages/Finance';
import About from './pages/About';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<BrowseCars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                  <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
