import { Link, useParams } from 'react-router-dom';
import { loadLawyers } from '../data';

export function Profile() {
  const { id } = useParams();
  const lawyers = loadLawyers();
  const lawyer = lawyers.find(l => l.id === id);

  if (!lawyer) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p>Lawyer not found.</p>
        <Link className="text-blue-600 underline" to="/search">Back to search</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link className="text-blue-600 underline" to="/search">Back to search</Link>
      <div className="mt-4 flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
          {lawyer.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{lawyer.fullName}</h1>
          <div className="text-gray-700">{lawyer.practiceArea} • {lawyer.location}</div>
          <div className="text-sm">Experience: {lawyer.yearsOfExperience} yrs • Rating: {lawyer.rating.toFixed(1)} / 5</div>
          <div className="text-sm">Hourly rate: ${lawyer.hourlyRate}</div>
          <div className="text-sm mt-1">
            <a className="text-blue-600 hover:underline" href={`mailto:${lawyer.email}`}>{lawyer.email}</a>
            {lawyer.phone && <span className="ml-2">• {lawyer.phone}</span>}
          </div>
          {lawyer.bio && <p className="mt-3 text-gray-800">{lawyer.bio}</p>}
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Experience</h2>
      <ol className="mt-2 space-y-3">
        {lawyer.experience.map(exp => (
          <li key={exp.id} className="rounded border p-3">
            <div className="font-medium">{exp.title} — {exp.organization}</div>
            <div className="text-sm text-gray-600">
              {exp.startYear} - {exp.endYear ?? 'Present'}
            </div>
            {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}