import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Heart, Share2, CheckCircle, MapPin,
  Fuel, Gauge, Settings, Calendar, Phone, MessageSquare, Calculator
} from 'lucide-react';
import { CARS } from '../data/cars';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const car = CARS.find(c => c.id === id);

  const [imgIndex, setImgIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'finance'>('overview');

  // Finance calculator
  const [downPayment, setDownPayment] = useState(3000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [creditScore, setCreditScore] = useState<'excellent' | 'good' | 'fair'>('good');

  const rateMap = { excellent: 5.9, good: 8.9, fair: 12.9 };

  const monthlyPayment = useMemo(() => {
    if (!car) return 0;
    const principal = car.price - downPayment - tradeInValue;
    if (principal <= 0) return 0;
    const monthlyRate = rateMap[creditScore] / 100 / 12;
    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1)
    );
  }, [car, downPayment, tradeInValue, loanTerm, creditScore]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  const formatMileage = (m: number) => new Intl.NumberFormat('en-US').format(m);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car Not Found</h2>
          <Link to="/cars" className="text-blue-600 hover:underline">Back to Browse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/cars" className="hover:text-blue-600">Browse Cars</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{car.year} {car.make} {car.model}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
              <div className="relative h-72 md:h-96">
                <img
                  src={car.images[imgIndex]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${car.year}+${car.make}`;
                  }}
                />
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIndex(prev => (prev - 1 + car.images.length) % car.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setImgIndex(prev => (prev + 1) % car.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {imgIndex + 1} / {car.images.length}
                    </div>
                  </>
                )}
                {car.certified && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> CarMax Certified
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex gap-2 p-3">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        i === imgIndex ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/80x56/e2e8f0/94a3b8?text=${i+1}`;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + Actions */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                    <span>•</span>
                    <span>Stock #{car.stockNumber}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-2 rounded-lg border transition-colors ${
                      saved ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex border-b border-gray-200">
                {(['overview', 'features', 'finance'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'finance' ? 'Finance Calculator' : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { icon: <Calendar className="w-5 h-5 text-blue-500" />, label: 'Year', value: car.year },
                        { icon: <Gauge className="w-5 h-5 text-blue-500" />, label: 'Mileage', value: `${formatMileage(car.mileage)} mi` },
                        { icon: <Settings className="w-5 h-5 text-blue-500" />, label: 'Transmission', value: car.transmission },
                        { icon: <Fuel className="w-5 h-5 text-blue-500" />, label: 'MPG', value: `${car.mpgCity}/${car.mpgHighway}` },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {item.icon}
                          <div>
                            <div className="text-xs text-gray-500">{item.label}</div>
                            <div className="font-semibold text-gray-900 text-sm">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-3">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      {[
                        ['Body Style', car.bodyStyle],
                        ['Drive Train', car.drivetrain],
                        ['Engine', car.engine],
                        ['Color', car.color],
                        ['VIN', car.vin],
                        ['Condition', car.condition],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">{label}</span>
                          <span className="font-medium text-gray-900 text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {car.features.map(f => (
                        <div key={f} className="flex items-center gap-2 py-2 border-b border-gray-50">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'finance' && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Calculator className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-gray-900">Payment Calculator</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Down Payment: {formatPrice(downPayment)}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max={Math.round(car.price * 0.5)}
                            step="500"
                            value={downPayment}
                            onChange={e => setDownPayment(Number(e.target.value))}
                            className="w-full accent-blue-600"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Trade-In Value: {formatPrice(tradeInValue)}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="20000"
                            step="500"
                            value={tradeInValue}
                            onChange={e => setTradeInValue(Number(e.target.value))}
                            className="w-full accent-blue-600"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Loan Term</label>
                          <div className="flex gap-2">
                            {[36, 48, 60, 72].map(term => (
                              <button
                                key={term}
                                onClick={() => setLoanTerm(term)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  loanTerm === term
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {term} mo
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Credit Score</label>
                          <div className="flex gap-2">
                            {(['excellent', 'good', 'fair'] as const).map(score => (
                              <button
                                key={score}
                                onClick={() => setCreditScore(score)}
                                className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                                  creditScore === score
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {score}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-center text-center">
                        <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
                        <div className="text-4xl font-bold text-blue-700 mb-1">
                          {formatPrice(monthlyPayment)}
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                          {rateMap[creditScore]}% APR · {loanTerm} months
                        </p>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Vehicle Price</span>
                            <span className="font-medium">{formatPrice(car.price)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Down Payment</span>
                            <span className="font-medium text-green-600">-{formatPrice(downPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trade-In</span>
                            <span className="font-medium text-green-600">-{formatPrice(tradeInValue)}</span>
                          </div>
                          <div className="flex justify-between border-t border-blue-200 pt-1 mt-1">
                            <span className="font-semibold">Amount Financed</span>
                            <span className="font-bold">{formatPrice(Math.max(0, car.price - downPayment - tradeInValue))}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-3">
                          *Estimated. Actual rates may vary. Apply for pre-approval below.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Pricing + Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
              {car.certified && (
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3 pb-3 border-b border-gray-100">
                  <CheckCircle className="w-4 h-4" />
                  CarMax Certified Vehicle
                </div>
              )}

              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900">{formatPrice(car.price)}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Est. {formatPrice(Math.round(car.price * 0.015))}/mo · Great Price
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                  Start the Buying Process
                </button>
                <Link
                  to="/finance"
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-colors block text-center"
                >
                  Get Pre-Approved
                </Link>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <button className="w-full flex items-center gap-2 py-3 px-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Call 1-800-519-1511
                </button>
                <button className="w-full flex items-center gap-2 py-3 px-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  Chat with Us
                </button>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                {[
                  { icon: '✅', text: 'Free 30-Day Returns' },
                  { icon: '🔍', text: '150-Point Inspection' },
                  { icon: '💰', text: 'No-Haggle Pricing' },
                  { icon: '🛡️', text: '90-Day/4,000 Mi Warranty' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-gray-600">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
