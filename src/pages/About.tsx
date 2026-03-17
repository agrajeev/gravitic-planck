import { Link } from 'react-router-dom';
import { MapPin, Users, Award, TrendingUp, Shield, Heart, Briefcase } from 'lucide-react';

export default function About() {
  const milestones = [
    { year: '1993', event: 'CarMax opens its first store in Richmond, VA, revolutionizing the used car industry with no-haggle pricing.' },
    { year: '1997', event: 'CarMax goes public on the NYSE, marking a new era of growth.' },
    { year: '2002', event: 'Spin-off from Circuit City; CarMax becomes an independent public company.' },
    { year: '2010', event: 'CarMax surpasses 100 locations nationwide.' },
    { year: '2018', event: 'Launch of CarMax.com with enhanced digital tools and the Love It or Return It guarantee.' },
    { year: '2022', event: 'CarMax reaches 235+ stores and becomes America\'s #1 used car retailer.' },
    { year: '2024', event: 'Over $30B in revenue; serving 2 million+ customers annually across the US.' },
  ];

  const values = [
    { icon: <Shield className="w-7 h-7" />, title: 'Integrity', desc: 'We do the right thing for our customers, communities, and each other.' },
    { icon: <Heart className="w-7 h-7" />, title: 'Respect', desc: 'Every person — customer and associate — is treated with dignity and care.' },
    { icon: <TrendingUp className="w-7 h-7" />, title: 'Excellence', desc: 'We set high standards and continually strive to improve.' },
    { icon: <Users className="w-7 h-7" />, title: 'Inclusion', desc: 'We foster a workplace where everyone belongs and can thrive.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About CarMax
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Since 1993, CarMax has been changing the way people buy and sell cars.
              We built our business on integrity, transparency, and putting customers first.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <MapPin className="w-8 h-8 text-blue-600" />, value: '235+', label: 'Stores Nationwide' },
              { icon: <Users className="w-8 h-8 text-blue-600" />, value: '30,000+', label: 'Associates' },
              { icon: <Award className="w-8 h-8 text-blue-600" />, value: '#1', label: 'Used Car Retailer in the US' },
              { icon: <TrendingUp className="w-8 h-8 text-blue-600" />, value: '$30B+', label: 'Annual Revenue' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At CarMax, our mission is to drive integrity by being honest and transparent in everything we do.
                We believe buying a car should be an experience you enjoy, not endure.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We've built a business model centered around no-haggle pricing, exceptional customer service,
                and a wide selection of quality used vehicles. Every car we sell undergoes a rigorous 150-point
                inspection to ensure it meets our high standards.
              </p>
              <div className="space-y-3">
                {[
                  'No-haggle, transparent pricing on every vehicle',
                  '150-point inspection on every car',
                  'Free 30-day / 1,500-mile return guarantee',
                  '90-day / 4,000-mile limited warranty included',
                  'Financing options for every credit situation',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">The CarMax Promise</h3>
              <blockquote className="text-gray-700 text-lg italic leading-relaxed border-l-4 border-blue-600 pl-4">
                "We give every customer the information and tools they need to make informed decisions,
                and we stand behind every car we sell. That's not just our promise — it's who we are."
              </blockquote>
              <p className="text-sm text-gray-500 mt-4">— CarMax Leadership Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our History</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-8">
              {milestones.map(m => (
                <div key={m.year} className="flex gap-6 relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs z-10">
                    {m.year}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-4 mt-3">
                    <p className="text-gray-700">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Join the CarMax Team</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our values. Explore thousands of
            career opportunities across our stores, headquarters, and technology teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              View Open Positions
            </a>
            <Link
              to="/"
              className="bg-blue-600 border-2 border-white text-white hover:bg-blue-800 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
