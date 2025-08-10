import { Link, useParams } from 'react-router-dom';
import { loadLawyers, loadReviews } from '../data';

export function Profile() {
  const { id } = useParams();
  const lawyers = loadLawyers();
  const reviews = loadReviews().filter(r => r.lawyerId === id);
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
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {lawyer.fullName}
            {lawyer.isVerified && <span className="text-xs rounded bg-green-100 text-green-700 px-2 py-0.5">Verified</span>}
          </h1>
          <div className="text-gray-700">{lawyer.specialties?.join(', ') || lawyer.practiceArea} • {lawyer.location}</div>
          <div className="text-sm">Experience: {lawyer.yearsOfExperience} yrs • Rating: {lawyer.rating.toFixed(1)} / 5 ({lawyer.reviewsCount ?? reviews.length})</div>
          <div className="text-sm">Hourly rate: ${lawyer.hourlyRate}</div>
          <div className="text-xs text-gray-600">Languages: {lawyer.languages?.join(', ') || '—'}</div>
          <div className="text-sm mt-1">
            <a className="text-blue-600 hover:underline" href={`mailto:${lawyer.email}`}>{lawyer.email}</a>
            {lawyer.phone && <span className="ml-2">• {lawyer.phone}</span>}
          </div>
          {lawyer.bio && <p className="mt-3 text-gray-800">{lawyer.bio}</p>}
        </div>
      </div>

      {lawyer.education && lawyer.education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Education</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {lawyer.education.map(ed => (
              <li key={ed.id}>{ed.degree}, {ed.school} ({ed.graduationYear})</li>
            ))}
          </ul>
        </div>
      )}

      {lawyer.license && (
        <div className="mt-4 text-sm">
          <div className="font-medium">License</div>
          <div>#{lawyer.license.licenseNumber} — {lawyer.license.jurisdiction}{lawyer.license.verifiedAt ? ' (verified)' : ''}</div>
        </div>
      )}

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

      {lawyer.availability && lawyer.availability.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Availability</h2>
          <ul className="mt-2 text-sm space-y-1">
            {lawyer.availability.map(a => (
              <li key={a.id}>
                {new Date(a.startIso).toLocaleString()} - {new Date(a.endIso).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.length === 0 && <div className="text-sm text-gray-600 mt-2">No reviews yet.</div>}
        <ul className="mt-2 space-y-2">
          {reviews.map(r => (
            <li key={r.id} className="rounded border p-3 text-sm">
              <div className="font-medium">{r.clientName} — {r.rating}/5</div>
              {r.comment && <p className="mt-1">{r.comment}</p>}
              <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()} {r.verified ? '• Verified' : ''}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}