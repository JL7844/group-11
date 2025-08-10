import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../lib/constants';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const nav = useNavigate();

  React.useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/lawyers`, { params: Object.fromEntries(params) });
        setResults(res.data.items || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Results</h2>
      {loading && <p>Loading...</p>}
      {results.map((l) => (
        <div key={l.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <img src={l.photoUrl || 'https://placehold.co/80'} width={80} height={80} />
            <div>
              <h3>{l.user?.name || l.name}</h3>
              <p>{(l.specialties || []).join(', ')}</p>
              <p>{l.location} • {l.yearsExperience} yrs • ⭐ {(l.rating ?? 0).toFixed?.(1) || l.rating || 0}</p>
              <button onClick={()=> nav(`/lawyers/${l.id}`)}>View Profile</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}