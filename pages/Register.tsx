
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Join SayemZGPT</h1>
          <p className="text-slate-500 mt-2">Create your account for premium shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            required 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button type="submit" size="lg" fullWidth>Create Account</Button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-600">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
