import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store';
import type { UserRole } from '../types';
import { useState } from 'react';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('client');
  const [name, setName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    login(role, name.trim());
    navigate(role === 'client' ? '/client' : '/attorney');
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === 'client'}
                onChange={() => setRole('client')}
              />
              Client
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="attorney"
                checked={role === 'attorney'}
                onChange={() => setRole('attorney')}
              />
              Attorney
            </label>
          </div>
        </div>
        <button type="submit" className="w-full rounded bg-black text-white py-2">
          Continue
        </button>
      </form>
    </div>
  );
}