import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await register(formData.name, formData.email, formData.password);
      setSuccess(result.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-classic-cream font-sans">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl border border-classic-navy/10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-classic-navy mb-2 font-serif">MACE</h1>
          <h2 className="text-xl text-classic-slate">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
              {success}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-classic-navy/20 placeholder-classic-slate/50 text-classic-charcoal focus:outline-none focus:ring-2 focus:ring-classic-gold focus:border-transparent transition-all"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-classic-navy/20 placeholder-classic-slate/50 text-classic-charcoal focus:outline-none focus:ring-2 focus:ring-classic-gold focus:border-transparent transition-all"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                required
                minLength={8}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-classic-navy/20 placeholder-classic-slate/50 text-classic-charcoal focus:outline-none focus:ring-2 focus:ring-classic-gold focus:border-transparent transition-all"
                placeholder="Password (min 8 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-classic-navy hover:bg-classic-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classic-navy disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
          <div className="text-center">
            <Link to="/login" className="text-classic-navy hover:text-classic-gold font-medium transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;