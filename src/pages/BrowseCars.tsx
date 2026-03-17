import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Grid3X3, List } from 'lucide-react';
import { CARS, MAKES, BODY_STYLES } from '../data/cars';
import CarCard from '../components/CarCard';

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'newest';

export default function BrowseCars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Filter state
  const [selectedMakes, setSelectedMakes] = useState<string[]>(
    searchParams.get('make') ? [searchParams.get('make')!] : []
  );
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    searchParams.get('bodyStyle') ? [searchParams.get('bodyStyle')!] : []
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 100000
  );
  const [maxMileage, setMaxMileage] = useState<number>(100000);
  const [minYear, setMinYear] = useState<number>(2015);
  const [certifiedOnly, setCertifiedOnly] = useState(searchParams.get('certified') === 'true');
  const [searchText] = useState(searchParams.get('search') || '');

  const toggleMake = (m: string) => {
    setSelectedMakes(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const toggleStyle = (s: string) => {
    setSelectedStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const clearFilters = () => {
    setSelectedMakes([]);
    setSelectedStyles([]);
    setMaxPrice(100000);
    setMaxMileage(100000);
    setMinYear(2015);
    setCertifiedOnly(false);
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let result = CARS.filter(car => {
      if (selectedMakes.length && !selectedMakes.includes(car.make)) return false;
      if (selectedStyles.length && !selectedStyles.includes(car.bodyStyle)) return false;
      if (car.price > maxPrice) return false;
      if (car.mileage > maxMileage) return false;
      if (car.year < minYear) return false;
      if (certifiedOnly && !car.certified) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        const text = `${car.make} ${car.model} ${car.year} ${car.bodyStyle}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'year-desc': return b.year - a.year;
        case 'mileage-asc': return a.mileage - b.mileage;
        case 'newest': return a.daysOnLot - b.daysOnLot;
        default: return 0;
      }
    });

    return result;
  }, [selectedMakes, selectedStyles, maxPrice, maxMileage, minYear, certifiedOnly, searchText, sortBy]);

  const activeFilterCount = selectedMakes.length + selectedStyles.length +
    (maxPrice < 100000 ? 1 : 0) + (maxMileage < 100000 ? 1 : 0) +
    (minYear > 2015 ? 1 : 0) + (certifiedOnly ? 1 : 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {searchText ? `Results for "${searchText}"` : 'Browse Cars'}
            </h1>
            <p className="text-sm text-gray-500">{filtered.length} cars available</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                filtersOpen || activeFilterCount > 0
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="mileage-asc">Lowest Mileage</option>
            </select>
            <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {filtersOpen && (
          <div className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Make */}
                <FilterGroup title="Make" defaultOpen>
                  <div className="space-y-2">
                    {MAKES.map(m => (
                      <label key={m} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMakes.includes(m)}
                          onChange={() => toggleMake(m)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{m}</span>
                        <span className="text-xs text-gray-400 ml-auto">
                          {CARS.filter(c => c.make === m).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterGroup>

                {/* Body Style */}
                <FilterGroup title="Body Style" defaultOpen>
                  <div className="space-y-2">
                    {BODY_STYLES.map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStyles.includes(s)}
                          onChange={() => toggleStyle(s)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{s}</span>
                        <span className="text-xs text-gray-400 ml-auto">
                          {CARS.filter(c => c.bodyStyle === s).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterGroup>

                {/* Price */}
                <FilterGroup title="Max Price" defaultOpen>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Up to</span>
                      <span className="font-semibold text-gray-900">{formatPrice(maxPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="1000"
                      value={maxPrice}
                      onChange={e => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$10,000</span>
                      <span>$100,000+</span>
                    </div>
                  </div>
                </FilterGroup>

                {/* Other Filters */}
                <FilterGroup title="More Options" defaultOpen>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Min Year: {minYear}
                      </label>
                      <input
                        type="range"
                        min="2010"
                        max="2024"
                        value={minYear}
                        onChange={e => setMinYear(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Max Miles: {maxMileage >= 100000 ? 'Any' : `${(maxMileage / 1000).toFixed(0)}k`}
                      </label>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="5000"
                        value={maxMileage}
                        onChange={e => setMaxMileage(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={certifiedOnly}
                        onChange={e => setCertifiedOnly(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Certified Only</span>
                    </label>
                  </div>
                </FilterGroup>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2">
          {selectedMakes.map(m => (
            <span key={m} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              {m}
              <button onClick={() => toggleMake(m)}><X className="w-3 h-3" /></button>
            </span>
          ))}
          {selectedStyles.map(s => (
            <span key={s} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              {s}
              <button onClick={() => toggleStyle(s)}><X className="w-3 h-3" /></button>
            </span>
          ))}
          {certifiedOnly && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              Certified Only
              <button onClick={() => setCertifiedOnly(false)}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No cars match your filters</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
            <button onClick={clearFilters} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filtered.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children, defaultOpen }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="font-semibold text-gray-900 text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && children}
    </div>
  );
}
