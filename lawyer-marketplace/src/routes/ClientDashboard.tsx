import { useMemo, useState } from 'react';
import { loadCases, saveCases } from '../data';
import type { ClientCase } from '../types';
import { useAuth } from '../store';

export function ClientDashboard() {
  const { name } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [practiceArea, setPracticeArea] = useState('');

  const cases = useMemo(() => loadCases(), []);
  const [items, setItems] = useState<ClientCase[]>(cases);

  function submitCase(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim() || !practiceArea.trim()) return;
    const newCase: ClientCase = {
      id: crypto.randomUUID(),
      clientName: name ?? 'Anonymous',
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      practiceArea: practiceArea.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newCase, ...items];
    setItems(updated);
    saveCases(updated);
    setTitle('');
    setDescription('');
    setLocation('');
    setPracticeArea('');
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Client dashboard</h1>
      <form onSubmit={submitCase} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <input className="rounded border px-3 py-2" placeholder="Case title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Practice area (e.g., Family Law)" value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Location (City, State)" value={location} onChange={(e) => setLocation(e.target.value)} />
        <textarea className="rounded border px-3 py-2 md:col-span-2" placeholder="Describe your case" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="md:col-span-2">
          <button className="rounded bg-black text-white px-4 py-2">Post case</button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your cases</h2>
      <div className="space-y-3">
        {items.map(c => (
          <div key={c.id} className="rounded border p-3">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-gray-600">{c.practiceArea} • {c.location}</div>
            <p className="mt-1 text-sm">{c.description}</p>
            <div className="text-xs text-gray-500 mt-1">Posted {new Date(c.createdAt).toLocaleString()}</div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm text-gray-600">No cases yet.</div>}
      </div>
    </div>
  );
}