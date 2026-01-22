
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to your SayemZGPT account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@example.com" 
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
            error={error}
          />

          <Button type="submit" size="lg" fullWidth>Sign In</Button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
           <p className="text-center text-slate-600">
            Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Sign up</Link>
          </p>
        </div>

        <div className="mt-6 bg-slate-50 p-4 rounded-xl text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700 mb-1">Demo Credentials:</p>
          <div className="grid grid-cols-1 gap-2">
            <div className="p-2 bg-indigo-50 rounded border border-indigo-100">
              <p className="font-bold text-indigo-700">Super Admin:</p>
              <p>Email: <span className="font-mono">superadmin@sayemzgpt.com</span></p>
              <p>Pass: <span className="font-mono">admin999</span></p>
            </div>
            <div>
              <p className="font-bold text-slate-600">Standard Admin:</p>
              <p><span className="font-mono text-[10px]">admin@gpt.com / admin123</span></p>
            </div>
            <div>
              <p className="font-bold text-slate-600">Customer:</p>
              <p><span className="font-mono text-[10px]">user@gpt.com / user123</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
