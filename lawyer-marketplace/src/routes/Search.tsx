import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadLawyers } from '../data';
import type { LawyerProfile } from '../types';

function LawyerCard({ lawyer }: { lawyer: LawyerProfile }) {
  return (
    <div className="rounded border p-4 flex items-start gap-4">
      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
        {lawyer.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            <Link to={`/lawyers/${lawyer.id}`} className="hover:underline">
              {lawyer.fullName}
            </Link>
          </h3>
          <div className="text-sm text-gray-600">{lawyer.location}</div>
        </div>
        <div className="text-sm text-gray-700">{lawyer.specialties?.join(', ') || lawyer.practiceArea} • {lawyer.yearsOfExperience} yrs</div>
        <div className="mt-1 text-sm">Rating: {lawyer.rating.toFixed(1)} / 5 • Fee: ${lawyer.hourlyRate}/hr</div>
        <div className="text-xs text-gray-600">Languages: {lawyer.languages?.join(', ') || '—'}</div>
        {lawyer.bio && <p className="mt-2 text-sm text-gray-700 line-clamp-2">{lawyer.bio}</p>}
      </div>
    </div>
  );
}

export function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [practiceArea, setPracticeArea] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [minYears, setMinYears] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [language, setLanguage] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  const lawyers = loadLawyers();

  const practiceAreas = useMemo(() => Array.from(new Set(lawyers.map(l => l.practiceArea))).sort(), [lawyers]);
  const locations = useMemo(() => Array.from(new Set(lawyers.map(l => l.location))).sort(), [lawyers]);
  const specialties = useMemo(() => Array.from(new Set(lawyers.flatMap(l => l.specialties ?? [l.practiceArea]))).sort(), [lawyers]);
  const languages = useMemo(() => Array.from(new Set(lawyers.flatMap(l => l.languages ?? []))).sort(), [lawyers]);

  const results = useMemo(() => {
    return lawyers.filter(l => {
      const hay = [l.fullName, l.practiceArea, l.location, l.bio, ...(l.specialties ?? [])].join(' ').toLowerCase();
      const matchesQuery = !query || hay.includes(query.toLowerCase());
      const matchesLoc = !location || l.location === location;
      const matchesPA = !practiceArea || l.practiceArea === practiceArea;
      const matchesSpec = !specialty || (l.specialties?.includes(specialty) || l.practiceArea === specialty);
      const matchesYears = minYears === '' || l.yearsOfExperience >= (minYears as number);
      const matchesRating = minRating === '' || l.rating >= (minRating as number);
      const matchesLang = !language || (l.languages?.includes(language));
      const matchesAvail = !availableOnly || (l.availability && l.availability.length > 0);
      return matchesQuery && matchesLoc && matchesPA && matchesSpec && matchesYears && matchesRating && matchesLang && matchesAvail;
    });
  }, [lawyers, query, location, practiceArea, specialty, minYears, minRating, language, availableOnly]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find an attorney</h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Search by name, area, location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="rounded border px-3 py-2" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select className="rounded border px-3 py-2" value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)}>
          <option value="">All practice areas</option>
          {practiceAreas.map(pa => <option key={pa} value={pa}>{pa}</option>)}
        </select>
        <select className="rounded border px-3 py-2" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">All specialties</option>
          {specialties.map(sp => <option key={sp} value={sp}>{sp}</option>)}
        </select>
        <select className="rounded border px-3 py-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Any language</option>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <input
          type="number"
          min={0}
          className="rounded border px-3 py-2"
          placeholder="Min years"
          value={minYears}
          onChange={(e) => setMinYears(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <input
          type="number"
          min={0}
          max={5}
          step="0.1"
          className="rounded border px-3 py-2"
          placeholder="Min rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <label className="inline-flex items-center gap-2 md:col-span-2">
          <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} />
          Show only available this week
        </label>
      </div>

      <div className="space-y-3">
        {results.map(lawyer => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
        {results.length === 0 && (
          <div className="text-sm text-gray-600">No lawyers found. Try adjusting your filters.</div>
        )}
      </div>
    </div>
  );
}