import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded inline-block mb-4">
              CarMax
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The nation's largest used car retailer. We offer a better way to buy a car with no-haggle pricing and free 30-day returns.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop Cars</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars" className="hover:text-white transition-colors">All Cars</Link></li>
              <li><Link to="/cars?bodyStyle=SUV" className="hover:text-white transition-colors">SUVs & Crossovers</Link></li>
              <li><Link to="/cars?bodyStyle=Sedan" className="hover:text-white transition-colors">Sedans</Link></li>
              <li><Link to="/cars?bodyStyle=Truck" className="hover:text-white transition-colors">Trucks</Link></li>
              <li><Link to="/cars?certified=true" className="hover:text-white transition-colors">Certified Pre-Owned</Link></li>
              <li><Link to="/cars?maxPrice=20000" className="hover:text-white transition-colors">Under $20,000</Link></li>
              <li><Link to="/finance" className="hover:text-white transition-colors">Finance a Car</Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sell or Trade</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sell" className="hover:text-white transition-colors">Get an Offer</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Trade-In Value</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Why CarMax?</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">CarMax Quality</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">7-Day Love It Guarantee</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:1-800-519-1511" className="hover:text-white transition-colors">1-800-519-1511</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:support@carmax.com" className="hover:text-white transition-colors">support@carmax.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>12800 Tuckahoe Creek Pkwy<br />Richmond, VA 23238</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Mon–Fri: 9am–7pm ET</p>
              <p className="text-xs text-gray-500">Sat–Sun: 10am–5pm ET</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2024 CarMax Auto Superstores, Inc. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Use</a>
            <a href="#" className="hover:text-gray-300">Accessibility</a>
            <a href="#" className="hover:text-gray-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
