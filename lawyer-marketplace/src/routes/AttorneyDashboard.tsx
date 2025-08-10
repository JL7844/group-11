import { loadConsultations, loadLawyers, saveLawyers } from '../data';
import { useAuth } from '../store';
import { useMemo, useState } from 'react';

export function AttorneyDashboard() {
  const { name } = useAuth();
  const [lawyers, setLawyers] = useState(loadLawyers());
  const me = lawyers.find(l => l.fullName === name);
  const consultations = useMemo(() => loadConsultations().filter(c => c.lawyerId === (me?.id ?? '')), [me?.id]);

  function addAvailability() {
    if (!me) return;
    const start = new Date(Date.now() + 24 * 3600 * 1000);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const updated = lawyers.map(l => l.id === me.id ? {
      ...l,
      availability: [...(l.availability ?? []), { id: crypto.randomUUID(), startIso: start.toISOString(), endIso: end.toISOString() }]
    } : l);
    setLawyers(updated);
    saveLawyers(updated);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Attorney dashboard</h1>
      <p className="mb-6 text-gray-700">Welcome{ name ? `, ${name}` : '' }.</p>

      {me ? (
        <div className="rounded border p-4 mb-6">
          <div className="font-semibold text-lg">{me.fullName}</div>
          <div className="text-sm text-gray-700">{me.specialties?.join(', ') || me.practiceArea} • {me.location}</div>
          <div className="text-sm">Experience: {me.yearsOfExperience} yrs • Rating: {me.rating.toFixed(1)} / 5</div>
          <div className="text-sm">Hourly rate: ${me.hourlyRate}</div>
          <button onClick={addAvailability} className="mt-3 rounded bg-black text-white px-3 py-1 text-sm">Add availability slot</button>
        </div>
      ) : (
        <div className="rounded border p-4 mb-6">
          <div className="font-medium">No profile connected to this name yet.</div>
        </div>
      )}

      <div className="rounded border p-4">
        <div className="font-semibold">Consultations</div>
        {consultations.length === 0 && <div className="text-sm text-gray-600 mt-2">No consultations yet.</div>}
        <ul className="mt-2 space-y-2">
          {consultations.map(c => (
            <li key={c.id} className="text-sm">
              {new Date(c.startsAt).toLocaleString()} • {c.type.replace('_', ' ')} • {c.clientName} • {c.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}