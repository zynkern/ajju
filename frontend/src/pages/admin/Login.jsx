import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';

export default function Login() {
  const login = useStore(state => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const success = await login(fd.get('username'), fd.get('password'));
    if (success) {
      navigate('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
        <h2 className="font-bold text-2xl mb-2 text-slate-900">Admin Login</h2>
        <p className="text-sm text-slate-500 mb-6">Demo: admin / aquatica123</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && <div className="text-sm text-rose-600 bg-rose-50 p-2 rounded text-center">Invalid credentials</div>}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Username</label>
            <input name="username" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <input name="password" type="password" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-400" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
