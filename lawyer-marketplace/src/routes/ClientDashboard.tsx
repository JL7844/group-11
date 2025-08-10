import { useMemo, useState } from 'react';
import { loadCases, saveCases, loadLawyers, loadConsultations, saveConsultations, loadThreads, saveThreads, loadReviews, saveReviews } from '../data';
import type { ClientCase, Consultation, MessageThread, Review } from '../types';
import { useAuth } from '../store';

export function ClientDashboard() {
  const { name } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [practiceArea, setPracticeArea] = useState('');

  const cases = useMemo(() => loadCases(), []);
  const [items, setItems] = useState<ClientCase[]>(cases);
  const lawyers = loadLawyers();
  const [lawyerId, setLawyerId] = useState(lawyers[0]?.id ?? '');
  const [slotIso, setSlotIso] = useState('');

  const [threads, setThreads] = useState<MessageThread[]>(loadThreads());
  const [messageText, setMessageText] = useState('');

  const [reviews, setReviews] = useState<Review[]>(loadReviews());
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

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

  function bookConsultation(e: React.FormEvent) {
    e.preventDefault();
    if (!lawyerId || !slotIso) return;
    const lawyer = lawyers.find(l => l.id === lawyerId);
    if (!lawyer) return;
    const start = new Date(slotIso);
    const end = new Date(start.getTime() + 60*60*1000);
    const consultation: Consultation = {
      id: crypto.randomUUID(),
      lawyerId,
      clientName: name ?? 'Anonymous',
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
      type: 'virtual',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };
    const list = loadConsultations();
    const updated = [consultation, ...list];
    saveConsultations(updated);
    alert(`Booked consultation with ${lawyer.fullName} at ${start.toLocaleString()}`);
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!lawyerId || !messageText.trim()) return;
    const thread = threads.find(t => t.lawyerId === lawyerId && t.clientName === (name ?? 'Anonymous'));
    const message = { id: crypto.randomUUID(), threadId: '', sender: 'client' as const, text: messageText.trim(), sentAt: new Date().toISOString() };
    let updatedThreads: MessageThread[];
    if (!thread) {
      const newThread: MessageThread = { id: crypto.randomUUID(), lawyerId, clientName: name ?? 'Anonymous', createdAt: new Date().toISOString(), messages: [] };
      message.threadId = newThread.id;
      newThread.messages.push(message);
      updatedThreads = [newThread, ...threads];
    } else {
      message.threadId = thread.id;
      updatedThreads = threads.map(t => t.id === thread.id ? { ...t, messages: [...t.messages, message] } : t);
    }
    setThreads(updatedThreads);
    saveThreads(updatedThreads);
    setMessageText('');
  }

  function leaveReview(e: React.FormEvent) {
    e.preventDefault();
    if (!lawyerId) return;
    const review: Review = {
      id: crypto.randomUUID(),
      lawyerId,
      clientName: name ?? 'Anonymous',
      rating: reviewRating,
      comment: reviewText.trim() || undefined,
      createdAt: new Date().toISOString(),
      verified: true,
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    saveReviews(updated);
    setReviewText('');
    setReviewRating(5);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <section>
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
      </section>

      <section className="rounded border p-4">
        <h2 className="text-lg font-semibold mb-3">Book a consultation</h2>
        <form onSubmit={bookConsultation} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select className="rounded border px-3 py-2" value={lawyerId} onChange={(e) => setLawyerId(e.target.value)}>
            {lawyers.map(l => <option key={l.id} value={l.id}>{l.fullName} — {l.location}</option>)}
          </select>
          <input className="rounded border px-3 py-2" type="datetime-local" value={slotIso} onChange={(e) => setSlotIso(e.target.value)} />
          <button className="rounded bg-black text-white px-4 py-2">Book</button>
        </form>
        <p className="text-xs text-gray-600 mt-2">Default duration is 60 minutes. Select virtual or in-person in a future update.</p>
      </section>

      <section className="rounded border p-4">
        <h2 className="text-lg font-semibold mb-3">Secure message</h2>
        <form onSubmit={sendMessage} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select className="rounded border px-3 py-2" value={lawyerId} onChange={(e) => setLawyerId(e.target.value)}>
            {lawyers.map(l => <option key={l.id} value={l.id}>{l.fullName}</option>)}
          </select>
          <input className="rounded border px-3 py-2 md:col-span-2" placeholder="Write a message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
          <div className="md:col-span-3">
            <button className="rounded bg-black text-white px-4 py-2">Send</button>
          </div>
        </form>
        <div className="mt-3 text-sm text-gray-600">Your contact details are hidden. Replies will appear in this thread.</div>
      </section>

      <section className="rounded border p-4">
        <h2 className="text-lg font-semibold mb-3">Leave a review</h2>
        <form onSubmit={leaveReview} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select className="rounded border px-3 py-2" value={lawyerId} onChange={(e) => setLawyerId(e.target.value)}>
            {lawyers.map(l => <option key={l.id} value={l.id}>{l.fullName}</option>)}
          </select>
          <input type="number" min={1} max={5} className="rounded border px-3 py-2" value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} />
          <input className="rounded border px-3 py-2 md:col-span-2" placeholder="Write feedback (optional)" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          <div className="md:col-span-3">
            <button className="rounded bg-black text-white px-4 py-2">Submit review</button>
          </div>
        </form>
      </section>

      <section>
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
      </section>
    </div>
  );
}