import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../lib/constants';

export default function LawyerProfilePage() {
  const { id } = useParams();
  const [data, setData] = React.useState<any>();
  const [slot, setSlot] = React.useState('');

  React.useEffect(()=>{
    (async () => {
      const res = await axios.get(`${API_URL}/lawyers/${id}`);
      setData(res.data);
    })();
  }, [id]);

  const book = async () => {
    await axios.post(`${API_URL}/bookings`, { lawyerId: id, start: slot });
    alert('Requested');
  };

  if(!data) return <p>Loading...</p>;
  return (
    <div style={{ padding: 24 }}>
      <h2>{data.user?.name}</h2>
      <p>{data.bio}</p>
      <p>Specialties: {(data.specialties || []).join(', ')}</p>
      <p>Education: {data.education}</p>
      <p>License: {data.licenseNumber} {data.verified ? '✔️' : '❌'}</p>
      <h3>Book a consultation</h3>
      <input type="datetime-local" value={slot} onChange={(e)=>setSlot(e.target.value)} />
      <button onClick={book}>Book</button>
    </div>
  );
}