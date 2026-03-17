import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Shield, RefreshCw, Tag, Star, ChevronRight, Car, TrendingUp, Award } from 'lucide-react';
import { CARS, MAKES, BODY_STYLES } from '../data/cars';
import CarCard from '../components/CarCard';

export default function Home() {
  const navigate = useNavigate();
  const [make, setMake] = useState('');
  const [bodyStyle, setBodyStyle] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (bodyStyle) params.set('bodyStyle', bodyStyle);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/cars?${params.toString()}`);
  };

  const featuredCars = CARS.slice(0, 4);

  const testimonials = [
    { name: 'Sarah M.', location: 'Atlanta, GA', rating: 5, text: 'The no-haggle pricing made it so easy! I knew exactly what I was paying with no surprises.' },
    { name: 'James T.', location: 'Charlotte, NC', rating: 5, text: 'Traded in my old car and bought a new one in under 2 hours. The process was seamless.' },
    { name: 'Lisa K.', location: 'Nashville, TN', rating: 5, text: 'Used the 30-day return policy and it gave me so much peace of mind. Best car buying experience!' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              The Better Way<br />to Buy a Car
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              No-haggle pricing. Free 30-day returns. Over 50,000 cars nationwide.
            </p>

            {/* Search Card */}
            <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Find Your Perfect Car</h2>
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Make</label>
                    <select
                      value={make}
                      onChange={e => setMake(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Makes</option>
                      {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Body Style</label>
                    <select
                      value={bodyStyle}
                      onChange={e => setBodyStyle(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Styles</option>
                      {BODY_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Max Price</label>
                    <select
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Any Price</option>
                      <option value="20000">Under $20,000</option>
                      <option value="30000">Under $30,000</option>
                      <option value="40000">Under $40,000</option>
                      <option value="50000">Under $50,000</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Search Cars
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 60C480 60 240 40 0 0L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CarMax?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Tag className="w-8 h-8 text-blue-600" />,
                title: 'No-Haggle Pricing',
                desc: 'Our prices are clear and upfront. What you see is what you pay — no negotiating, no surprises.',
              },
              {
                icon: <RefreshCw className="w-8 h-8 text-blue-600" />,
                title: '30-Day Free Returns',
                desc: "If you're not in love with your car, return it within 30 days for a full refund. No questions asked.",
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: '150-Point Inspection',
                desc: 'Every car on our lot passes a rigorous 150-point inspection to ensure quality and safety.',
              },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Style</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { style: 'SUV', emoji: '🚙', count: CARS.filter(c => c.bodyStyle === 'SUV').length },
              { style: 'Sedan', emoji: '🚗', count: CARS.filter(c => c.bodyStyle === 'Sedan').length },
              { style: 'Truck', emoji: '🛻', count: CARS.filter(c => c.bodyStyle === 'Truck').length },
              { style: 'All Cars', emoji: '🚘', count: CARS.length },
            ].map(item => (
              <Link
                key={item.style}
                to={item.style === 'All Cars' ? '/cars' : `/cars?bodyStyle=${item.style}`}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <span className="text-4xl mb-3">{item.emoji}</span>
                <span className="font-bold text-gray-900 group-hover:text-blue-600">{item.style}</span>
                <span className="text-sm text-gray-500 mt-1">{item.count} available</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
              <p className="text-gray-600 mt-1">Hand-picked vehicles at great prices</p>
            </div>
            <Link
              to="/cars"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Car className="w-8 h-8" />, value: '50,000+', label: 'Cars In Stock' },
              { icon: <Award className="w-8 h-8" />, value: '235+', label: 'Locations' },
              { icon: <TrendingUp className="w-8 h-8" />, value: '2M+', label: 'Happy Customers' },
              { icon: <Star className="w-8 h-8" />, value: '4.8/5', label: 'Customer Rating' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-blue-200 mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Find Your Next Car?</h2>
          <p className="text-gray-600 mb-8 text-lg">Join millions of happy CarMax customers. Shop our inventory or get an offer on your current car.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cars"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              to="/sell"
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Sell My Car
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
