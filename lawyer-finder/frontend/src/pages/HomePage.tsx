import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  const [q, setQ] = React.useState('');
  return (
    <div style={{ padding: 24 }}>
      <h1>Find a Lawyer</h1>
      <input placeholder="Name, location, specialty" value={q} onChange={(e)=>setQ(e.target.value)} />
      <button onClick={()=> nav(`/search?q=${encodeURIComponent(q)}`)}>Search</button>
      <div style={{ marginTop: 16 }}>
        <button onClick={()=> nav('/search?emergency=1')}>Emergency Lawyer</button>
      </div>
    </div>
  );
}