import { useState } from 'react';
import { BookOpen, Droplets, Leaf, Shield, HeartHandshake, ChevronRight } from 'lucide-react';

const GUIDES = [
  {
    id: 'cycling',
    icon: Droplets,
    category: 'Water Quality',
    title: 'The Nitrogen Cycle: A Beginner’s Guide to Tank Cycling',
    readTime: '5 min read',
    summary: 'Learn how beneficial bacteria convert toxic ammonia into nitrite and safe nitrate before adding live stock.',
    content: [
      { heading: 'Step 1: Ammonia Spike (Days 1 - 7)', text: 'Add an ammonia source (fish food or liquid ammonia) to trigger bacterial colonization.' },
      { heading: 'Step 2: Nitrite Rise (Days 7 - 21)', text: 'Nitrosomonas bacteria convert ammonia into nitrites. Nitrites are highly toxic to fish.' },
      { heading: 'Step 3: Nitrate & Completion (Days 21 - 30)', text: 'Nitrobacter bacteria convert nitrites into nitrates. Perform a 30% water change once ammonia and nitrites read 0 ppm.' }
    ]
  },
  {
    id: 'plants',
    icon: Leaf,
    category: 'Aquascaping & Flora',
    title: 'Low-Tech Planted Tanks: Anubias & Java Fern Care',
    readTime: '4 min read',
    summary: 'How to thrive easy epiphyte plants without expensive CO2 injection systems.',
    content: [
      { heading: 'Rhizome Mounting', text: 'Never bury Anubias or Java Fern rhizomes in substrate. Glue or tie them to driftwood or Dragon Stone.' },
      { heading: 'Lighting Needs', text: 'Low-tech plants thrive in 6-8 hours of moderate lighting. Excessive light causes algae growth.' },
      { heading: 'Fertilization', text: 'Dose liquid all-in-one fertilizer once weekly to feed plants directly through water column.' }
    ]
  },
  {
    id: 'health',
    icon: Shield,
    category: 'Fish Health',
    title: 'Preventing & Treating Ich (White Spot Disease)',
    readTime: '6 min read',
    summary: 'Identify white spot parasite symptoms early and treat safely in freshwater community tanks.',
    content: [
      { heading: 'Symptoms Identification', text: 'Small sugar-like white spots on fins and body, flashing or scratching against rocks.' },
      { heading: 'Temperature Adjustment', text: 'Slowly raise water temperature to 82-84°F to speed up the parasite lifecycle.' },
      { heading: 'Medication Dosing', text: 'Use copper-safe or aquarium salt treatments as directed for 7-10 days.' }
    ]
  }
];

export default function Guides() {
  const [activeGuide, setActiveGuide] = useState(GUIDES[0]);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-lg">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" /> Aquarium Care & Knowledge Hub
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Aquarium Guides & Care Sheets</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-xl">
          Expert advice on fish care, water chemistry, planted tanks, and aquascaping design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Guides Navigation */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-slate-500 tracking-wider px-1">Available Guides</h2>
          {GUIDES.map(guide => (
            <button
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between group ${
                activeGuide.id === guide.id
                  ? 'border-[var(--color-brand-primary)] bg-teal-50/50 shadow-sm ring-2 ring-[var(--color-brand-primary)]/10'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${activeGuide.id === guide.id ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <guide.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{guide.category}</span>
                  <div className="font-bold text-xs text-slate-900 line-clamp-2 mt-0.5">{guide.title}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 mt-2" />
            </button>
          ))}
        </div>

        {/* Right Col: Active Guide Details */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-teal-50 text-[var(--color-brand-primary)] font-bold px-2.5 py-1 rounded-full">{activeGuide.category}</span>
                <span className="text-slate-400 font-medium">{activeGuide.readTime}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">{activeGuide.title}</h2>
              <p className="text-slate-600 text-sm italic">{activeGuide.summary}</p>
            </div>

            <div className="space-y-6">
              {activeGuide.content.map((sec, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-brand-primary)] text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {sec.heading}
                  </h3>
                  <p className="text-slate-600 text-xs pl-7 leading-relaxed">{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
