import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Clock, Truck, ChevronRight } from 'lucide-react';
import { MAKES } from '../data/cars';

type Step = 1 | 2 | 3;

interface CarInfo {
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  zip: string;
}

export default function Sell() {
  const [step, setStep] = useState<Step>(1);
  const [carInfo, setCarInfo] = useState<CarInfo>({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    zip: '',
  });
  const [offerAmount, setOfferAmount] = useState<number | null>(null);

  const handleGetOffer = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate offer calculation
    const base = 15000;
    const yearBonus = (parseInt(carInfo.year) - 2015) * 1200;
    const mileagePenalty = Math.min(parseInt(carInfo.mileage) / 1000, 20) * 300;
    const conditionMultiplier = { excellent: 1.1, good: 1.0, fair: 0.85, poor: 0.7 }[carInfo.condition] || 1;
    const offer = Math.round((base + yearBonus - mileagePenalty) * conditionMultiplier / 100) * 100;
    setOfferAmount(Math.max(offer, 3000));
    setStep(2);
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sell or Trade In Your Car
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Get an instant offer in minutes. We'll buy your car even if you don't buy from us.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {['Free offer in 2 minutes', 'Offer valid for 7 days', 'We come to you', 'No obligation'].map(item => (
                <div key={item} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {[
              { num: 1, label: 'Your Car' },
              { num: 2, label: 'Your Offer' },
              { num: 3, label: 'Get Paid' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  step > s.num ? 'bg-green-500 text-white' :
                  step === s.num ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-sm font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < 2 && <div className={`flex-1 h-0.5 ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Car</h2>
            <p className="text-gray-600 mb-8">Enter your car's details to get an instant offer.</p>

            <form onSubmit={handleGetOffer} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Make *</label>
                  <select
                    required
                    value={carInfo.make}
                    onChange={e => setCarInfo({ ...carInfo, make: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Make</option>
                    {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Model *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Camry, F-150"
                    value={carInfo.model}
                    onChange={e => setCarInfo({ ...carInfo, model: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Year *</label>
                  <select
                    required
                    value={carInfo.year}
                    onChange={e => setCarInfo({ ...carInfo, year: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 20 }, (_, i) => 2024 - i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mileage *</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g. 45000"
                    value={carInfo.mileage}
                    onChange={e => setCarInfo({ ...carInfo, mileage: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Overall Condition *</label>
                  <select
                    required
                    value={carInfo.condition}
                    onChange={e => setCarInfo({ ...carInfo, condition: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent – Like New</option>
                    <option value="good">Good – Minor Wear</option>
                    <option value="fair">Fair – Noticeable Wear</option>
                    <option value="poor">Poor – Major Issues</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">ZIP Code *</label>
                  <input
                    required
                    type="text"
                    maxLength={5}
                    placeholder="e.g. 30309"
                    value={carInfo.zip}
                    onChange={e => setCarInfo({ ...carInfo, zip: e.target.value.replace(/\D/g, '') })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
              >
                Get My Offer
                <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-center text-gray-500">
                No obligation. Free, valid for 7 days. We respect your privacy.
              </p>
            </form>
          </div>
        )}

        {step === 2 && offerAmount && (
          <div className="space-y-6">
            {/* Offer Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Your CarMax Offer</h2>
              <p className="text-gray-600 mb-4">
                {carInfo.year} {carInfo.make} {carInfo.model}
              </p>
              <div className="text-5xl font-bold text-green-600 mb-2">{formatPrice(offerAmount)}</div>
              <p className="text-sm text-gray-500 mb-6">
                This offer is valid for <strong>7 days</strong> or 250 additional miles.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Accept Offer
                </button>
                <Link
                  to="/cars"
                  className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-colors text-center block"
                >
                  Trade It In
                </Link>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle className="w-6 h-6 text-blue-500" />, title: 'Accept your offer', desc: 'Review and accept online or at your nearest CarMax location.' },
                  { icon: <Clock className="w-6 h-6 text-blue-500" />, title: 'Schedule an appointment', desc: 'Bring your car in at a time that works for you. Takes ~30 minutes.' },
                  { icon: <Truck className="w-6 h-6 text-blue-500" />, title: 'Or we come to you', desc: 'Select home pickup and we\'ll come collect your vehicle at your convenience.' },
                  { icon: <DollarSign className="w-6 h-6 text-blue-500" />, title: 'Get paid', desc: 'Receive payment via check or ACH transfer. Fast and secure.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Offer Accepted!</h2>
            <p className="text-gray-600 mb-2">
              Your {carInfo.year} {carInfo.make} {carInfo.model} offer of <strong>{offerAmount && formatPrice(offerAmount)}</strong> is confirmed.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              A CarMax representative will contact you at the email/phone on file within 24 hours to schedule pickup or drop-off.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-gray-700">
              <p className="font-semibold mb-1">Confirmation #: CMX-{Math.floor(Math.random() * 900000) + 100000}</p>
              <p>Valid through {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
            <Link
              to="/cars"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Cars to Trade Into
            </Link>
          </div>
        )}
      </div>

      {/* Why Sell to CarMax */}
      {step === 1 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Sell to CarMax?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Competitive Offers',
                  desc: 'Our offers are based on real market data so you always get a fair price for your vehicle.',
                },
                {
                  icon: '⚡',
                  title: 'Fast & Easy',
                  desc: 'The entire process takes about 30 minutes at a store, or we come to you for free.',
                },
                {
                  icon: '🤝',
                  title: 'No Pressure',
                  desc: "You're never obligated to accept. We'll buy your car even if you don't buy from us.",
                },
              ].map(item => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
