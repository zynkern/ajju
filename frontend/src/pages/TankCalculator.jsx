import { useState } from 'react';
import { useStore } from '../store';
import { ShieldAlert, CheckCircle2, AlertTriangle, Waves, Info, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const TANK_SIZES = [
  { label: '10 Gallons (38L)', capacityG: 10, maxInches: 10 },
  { label: '20 Gallons (75L)', capacityG: 20, maxInches: 20 },
  { label: '30 Gallons (113L)', capacityG: 30, maxInches: 30 },
  { label: '55 Gallons (208L)', capacityG: 55, maxInches: 55 },
  { label: '75 Gallons (283L)', capacityG: 75, maxInches: 75 },
];

export default function TankCalculator() {
  const products = useStore(state => state.products);
  const fishList = products.filter(p => p.category === 'Fish');
  const addToCart = useStore(state => state.addToCart);

  const [selectedTank, setSelectedTank] = useState(TANK_SIZES[1]);
  const [selectedFish, setSelectedFish] = useState({}); // { [id]: count }
  const [addedNotice, setAddedNotice] = useState(null);

  const updateFishCount = (id, delta) => {
    setSelectedFish(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // Calculate stocking inches & total fish
  let totalInches = 0;
  let totalCount = 0;
  let temperaments = new Set();

  Object.entries(selectedFish).forEach(([id, count]) => {
    const fish = fishList.find(f => f.id === Number(id));
    if (fish) {
      // Estimate size in inches from size string e.g. "1.5 inches" -> 1.5
      const match = fish.size ? fish.size.match(/[\d.]+/) : null;
      const sizeInch = match ? parseFloat(match[0]) : 2.0;
      totalInches += sizeInch * count;
      totalCount += count;
      if (fish.difficulty) temperaments.add(fish.difficulty);
    }
  });

  const stockingPercentage = Math.round((totalInches / selectedTank.maxInches) * 100);

  const getStockingColor = () => {
    if (stockingPercentage === 0) return 'bg-slate-200 text-slate-700';
    if (stockingPercentage <= 75) return 'bg-emerald-500 text-white';
    if (stockingPercentage <= 100) return 'bg-amber-500 text-white';
    return 'bg-rose-500 text-white';
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-300 border border-teal-500/20">
            <Waves className="w-4 h-4 text-teal-400" /> Interactive Tool
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tank Compatibility Calculator</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Select your aquarium size and choose fish species to calculate bioload capacity, temperature compatibility, and stock safety.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Selection */}
        <div className="md:col-span-2 space-y-6">
          {/* Step 1: Tank Selection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-brand-primary)] text-white text-xs flex items-center justify-center font-bold">1</span>
              Select Your Aquarium Size
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {TANK_SIZES.map(tank => (
                <button
                  key={tank.label}
                  onClick={() => setSelectedTank(tank)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                    selectedTank.label === tank.label
                      ? 'border-[var(--color-brand-primary)] bg-teal-50 text-[var(--color-brand-primary)] ring-2 ring-[var(--color-brand-primary)]/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tank.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Fish Selection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-brand-primary)] text-white text-xs flex items-center justify-center font-bold">2</span>
              Add Fish Species
            </h2>
            <div className="space-y-3">
              {fishList.map(fish => {
                const count = selectedFish[fish.id] || 0;
                return (
                  <div key={fish.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={fish.image} alt={fish.name} className="w-12 h-12 rounded-lg object-cover bg-slate-200" />
                      <div>
                        <div className="font-bold text-sm text-slate-900">{fish.name}</div>
                        <div className="text-xs text-slate-500">Size: {fish.size || '2.0 inches'} | Min Tank: {fish.tankSize || '10G+'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateFishCount(fish.id, -1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-slate-900">{count}</span>
                      <button
                        onClick={() => updateFishCount(fish.id, 1)}
                        className="w-8 h-8 rounded-lg bg-[var(--color-brand-primary)] text-white font-bold text-sm hover:bg-teal-700 flex items-center justify-center shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Live Stocking Analysis */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 sticky top-20">
            <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">Bioload Analysis</h3>

            {/* Capacity Meter */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-600">Stocking Level</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${getStockingColor()}`}>
                  {stockingPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    stockingPercentage <= 75 ? 'bg-emerald-500' : stockingPercentage <= 100 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(stockingPercentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <div className="text-xs text-slate-500">Total Fish</div>
                <div className="text-lg font-extrabold text-slate-900">{totalCount}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Est. Bioload</div>
                <div className="text-lg font-extrabold text-slate-900">{totalInches.toFixed(1)} inches</div>
              </div>
            </div>

            {/* Safety Assessment */}
            <div className="space-y-2 pt-2">
              {stockingPercentage === 0 ? (
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  Select fish species above to calculate your aquarium bioload.
                </div>
              ) : stockingPercentage <= 75 ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium flex items-start gap-2 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Ideal Stocking Level</strong>
                    Your aquarium has healthy filtration margin and good oxygenation space.
                  </div>
                </div>
              ) : stockingPercentage <= 100 ? (
                <div className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-medium flex items-start gap-2 border border-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Fully Stocked</strong>
                    Ensure robust filtration and regular 25% weekly water changes.
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 text-rose-900 rounded-xl text-xs font-medium flex items-start gap-2 border border-rose-200">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Overstocked Warning</strong>
                    Exceeds maximum safe bioload. Upgrade tank size or reduce fish count.
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action */}
            {totalCount > 0 && (
              <button
                onClick={() => {
                  Object.entries(selectedFish).forEach(([id, count]) => {
                    const fish = fishList.find(f => f.id === Number(id));
                    if (fish) addToCart(fish, count);
                  });
                  setAddedNotice('Added all selected fish to your cart!');
                  setTimeout(() => setAddedNotice(null), 3000);
                }}
                className="w-full py-3 bg-[var(--color-brand-primary)] hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" /> Add All Fish to Cart
              </button>
            )}

            {addedNotice && (
              <div className="text-xs text-center text-emerald-700 bg-emerald-50 p-2 rounded-lg font-semibold animate-fade-in">
                {addedNotice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
