import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-xs py-1 px-4 text-center">
        <span>Free 30-Day Returns • No-Haggle Pricing • 150+ Point Inspection on Every Car</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded">
              CarMax
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                Buy a Car <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg p-4 w-48 hidden group-hover:block z-50">
                <Link to="/cars" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Browse Cars</Link>
                <Link to="/cars?bodyStyle=SUV" className="block py-2 text-sm text-gray-700 hover:text-blue-600">SUVs</Link>
                <Link to="/cars?bodyStyle=Sedan" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Sedans</Link>
                <Link to="/cars?bodyStyle=Truck" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Trucks</Link>
                <Link to="/cars?certified=true" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Certified Cars</Link>
              </div>
            </div>
            <Link to="/sell" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Sell / Trade-In</Link>
            <Link to="/finance" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Finance</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium text-sm">About CarMax</Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search make, model..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:1-800-519-1511" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <Phone className="w-4 h-4" />
              <span>1-800-519-1511</span>
            </a>
            <Link to="/favorites" className="text-sm text-blue-600 font-medium hover:underline">
              Saved Cars
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search make, model..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Search
            </button>
          </form>
          <Link to="/cars" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Browse Cars</Link>
          <Link to="/sell" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Sell / Trade-In</Link>
          <Link to="/finance" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Finance</Link>
          <Link to="/about" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>About CarMax</Link>
        </div>
      )}
    </nav>
  );
}
