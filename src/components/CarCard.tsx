import { Link } from 'react-router-dom';
import { Heart, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import type { Car } from '../data/cars';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [saved, setSaved] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatMileage = (miles: number) =>
    new Intl.NumberFormat('en-US').format(miles);

  const monthlyPayment = Math.round((car.price * 0.015));

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${car.year}+${car.make}`;
          }}
        />
        <button
          onClick={e => { e.preventDefault(); setSaved(!saved); }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
            saved ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
        {car.certified && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Certified
          </div>
        )}
        {car.daysOnLot <= 3 && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Just Arrived!
          </div>
        )}
      </div>

      {/* Content */}
      <Link to={`/cars/${car.id}`} className="block p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {car.year} {car.make} {car.model}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span>{formatMileage(car.mileage)} mi</span>
          <span>•</span>
          <span>{car.color}</span>
          <span>•</span>
          <span>{car.transmission}</span>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-gray-900">{formatPrice(car.price)}</div>
            <div className="text-xs text-gray-500">Est. {formatPrice(monthlyPayment)}/mo</div>
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
            car.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
            car.condition === 'Good' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {car.condition}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          <span>{car.location}</span>
        </div>
      </Link>
    </div>
  );
}
