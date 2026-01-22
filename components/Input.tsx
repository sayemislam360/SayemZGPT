
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={`
          w-full px-3 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
