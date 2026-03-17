import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Shield, Clock, ChevronRight } from 'lucide-react';

export default function Finance() {
  const [vehiclePrice, setVehiclePrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(3000);
  const [tradeIn, setTradeIn] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [creditScore, setCreditScore] = useState<'excellent' | 'good' | 'fair' | 'building'>('good');

  // Pre-approval form
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    annualIncome: '', employmentStatus: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const rateMap = { excellent: 4.9, good: 7.9, fair: 11.9, building: 15.9 };

  const { monthly, totalInterest, totalCost } = useMemo(() => {
    const principal = Math.max(0, vehiclePrice - downPayment - tradeIn);
    const monthlyRate = rateMap[creditScore] / 100 / 12;
    const monthly = monthlyRate > 0
      ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1))
      : Math.round(principal / loanTerm);
    const totalCost = monthly * loanTerm;
    const totalInterest = totalCost - principal;
    return { monthly, totalInterest, totalCost };
  }, [vehiclePrice, downPayment, tradeIn, loanTerm, creditScore]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Finance Your Car with CarMax</h1>
            <p className="text-xl text-blue-100 mb-6">
              Get pre-approved in minutes with no impact to your credit score.
              Competitive rates, flexible terms.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                'Pre-approval in 2 minutes',
                'No hard credit inquiry',
                'Rates from 4.9% APR',
                '250+ lending partners',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Calculator</h2>
              <p className="text-gray-600 mb-6">Estimate your monthly payment before you shop.</p>

              <div className="space-y-6">
                {/* Vehicle Price */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-gray-700">Vehicle Price</label>
                    <span className="font-bold text-gray-900">{formatPrice(vehiclePrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="80000"
                    step="500"
                    value={vehiclePrice}
                    onChange={e => setVehiclePrice(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>$5,000</span><span>$80,000</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-gray-700">Down Payment</label>
                    <span className="font-bold text-gray-900">{formatPrice(downPayment)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.round(vehiclePrice * 0.5)}
                    step="250"
                    value={downPayment}
                    onChange={e => setDownPayment(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Trade-In */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-gray-700">Trade-In Value</label>
                    <span className="font-bold text-gray-900">{formatPrice(tradeIn)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="500"
                    value={tradeIn}
                    onChange={e => setTradeIn(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Loan Term</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[36, 48, 60, 72].map(term => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                          loanTerm === term
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {term} mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Credit Score */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Credit Score</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'excellent', label: 'Excellent', range: '750+', rate: '4.9%' },
                      { value: 'good', label: 'Good', range: '700-749', rate: '7.9%' },
                      { value: 'fair', label: 'Fair', range: '650-699', rate: '11.9%' },
                      { value: 'building', label: 'Building', range: 'Under 650', rate: '15.9%' },
                    ].map(item => (
                      <button
                        key={item.value}
                        onClick={() => setCreditScore(item.value as typeof creditScore)}
                        className={`p-3 rounded-lg text-left transition-colors border-2 ${
                          creditScore === item.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.range}</div>
                        <div className={`text-xs font-bold mt-1 ${creditScore === item.value ? 'text-blue-600' : 'text-gray-500'}`}>
                          ~{item.rate} APR
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="font-bold text-xl mb-4">Your Estimated Payment</h3>
              <div className="text-5xl font-bold mb-1">{formatPrice(monthly)}</div>
              <div className="text-blue-200 text-sm mb-6">per month</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Vehicle Price', value: formatPrice(vehiclePrice) },
                  { label: 'Down Payment', value: `- ${formatPrice(downPayment)}` },
                  { label: 'Trade-In', value: `- ${formatPrice(tradeIn)}` },
                  { label: 'Amount Financed', value: formatPrice(Math.max(0, vehiclePrice - downPayment - tradeIn)) },
                  { label: 'APR', value: `${rateMap[creditScore]}%` },
                  { label: 'Total Interest', value: formatPrice(Math.max(0, totalInterest)) },
                  { label: 'Total Cost', value: formatPrice(totalCost + downPayment + tradeIn) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between py-1 border-b border-blue-500/30">
                    <span className="text-blue-200">{row.label}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-200 mt-4">
                *Estimate only. Actual rate determined upon credit approval.
              </p>
            </div>
          </div>

          {/* Pre-Approval Form */}
          <div>
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Pre-Approved!</h2>
                <p className="text-gray-600 mb-2">
                  Congratulations, <strong>{formData.firstName}</strong>! You've been pre-approved for financing up to:
                </p>
                <div className="text-4xl font-bold text-blue-600 my-4">
                  {formatPrice(Math.round((Number(formData.annualIncome) * 0.4) || 30000))}
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  A financing specialist will contact you at {formData.email} within 24 hours.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-6">
                  <p>Pre-approval #: <strong>CMF-{Math.floor(Math.random() * 900000) + 100000}</strong></p>
                  <p>Valid for 30 days</p>
                </div>
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Shop Cars <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Pre-Approved</h2>
                <p className="text-gray-600 mb-2">No impact to your credit score. Takes just 2 minutes.</p>
                <div className="flex gap-2 mb-6 text-xs">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">✓ Soft inquiry only</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">✓ SSL Encrypted</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">First Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Annual Gross Income *</label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 75000"
                      value={formData.annualIncome}
                      onChange={e => setFormData({ ...formData, annualIncome: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Employment Status *</label>
                    <select
                      required
                      value={formData.employmentStatus}
                      onChange={e => setFormData({ ...formData, employmentStatus: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Status</option>
                      <option value="employed">Employed Full-Time</option>
                      <option value="part-time">Employed Part-Time</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="retired">Retired</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg transition-colors"
                  >
                    Check Pre-Approval
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our Terms of Use and Privacy Policy.
                    This is a soft inquiry and won't affect your credit score.
                  </p>
                </form>
              </div>
            )}

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-md p-8 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">CarMax Financing Benefits</h3>
              <div className="space-y-4">
                {[
                  { icon: <DollarSign className="w-6 h-6 text-green-500" />, title: 'Competitive Rates', desc: 'We work with 250+ lenders to get you the best available rate.' },
                  { icon: <Shield className="w-6 h-6 text-blue-500" />, title: 'Secure & Private', desc: 'Your financial information is protected with bank-level security.' },
                  { icon: <Clock className="w-6 h-6 text-purple-500" />, title: 'Decision in Minutes', desc: 'Get your financing decision quickly so you can shop with confidence.' },
                  { icon: <CheckCircle className="w-6 h-6 text-orange-500" />, title: 'Flexible Terms', desc: 'Choose from 36 to 72 month terms to fit your budget.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
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
        </div>
      </div>
    </div>
  );
}
