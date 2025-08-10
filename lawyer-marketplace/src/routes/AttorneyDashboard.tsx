import { loadLawyers } from '../data';
import { useAuth } from '../store';

export function AttorneyDashboard() {
  const { name } = useAuth();
  const lawyers = loadLawyers();
  const me = lawyers.find(l => l.fullName === name);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Attorney dashboard</h1>
      <p className="mb-6 text-gray-700">Welcome{ name ? `, ${name}` : '' }.</p>

      {me ? (
        <div className="rounded border p-4">
          <div className="font-semibold text-lg">{me.fullName}</div>
          <div className="text-sm text-gray-700">{me.practiceArea} • {me.location}</div>
          <div className="text-sm">Experience: {me.yearsOfExperience} yrs • Rating: {me.rating.toFixed(1)} / 5</div>
          <div className="text-sm">Hourly rate: ${me.hourlyRate}</div>
          {me.bio && <p className="mt-2 text-sm">{me.bio}</p>}
        </div>
      ) : (
        <div className="rounded border p-4">
          <div className="font-medium">No profile connected to this name yet.</div>
          <p className="text-sm text-gray-700">Search your name in the directory to view your public profile.</p>
        </div>
      )}
    </div>
  );
}