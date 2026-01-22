
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const UserSettings: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setStatus({ type: 'success', message: 'Profile updated successfully!' });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-2">Update your personal information and security preferences.</p>
      </div>

      {status && (
        <div className={`p-4 rounded-xl text-sm font-bold ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
            {status.message}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-50 pb-2">Profile Information</h3>
            <Input 
                label="Full Name" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
            />
            <Input 
                label="Email Address" 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
            />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-50 pb-2">Change Password</h3>
            <Input 
                label="Current Password" 
                type="password" 
                placeholder="••••••••"
                value={formData.currentPassword} 
                onChange={e => setFormData({...formData, currentPassword: e.target.value})} 
            />
            <Input 
                label="New Password" 
                type="password" 
                placeholder="••••••••"
                value={formData.newPassword} 
                onChange={e => setFormData({...formData, newPassword: e.target.value})} 
            />
        </div>

        <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">Discard Changes</Button>
            <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  );
};
