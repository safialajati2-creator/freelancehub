import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', userType: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userType) return setError('Please select if you want to hire or work');
    setLoading(true);
    setError(null);
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some((user) => user.email === formData.email)) {
        setError('Email already exists. Please use a different email.');
        setLoading(false);
        return;
      }
      const newUser = { ...formData, id: Date.now().toString(), applications: [], notifications: [] };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('token', 'fake-token');
      window.dispatchEvent(new Event('storageUpdated'));
      navigate(formData.userType === 'client' ? '/create-project' : '/find-work');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error('Signup error:', err);
    } finally { setLoading(false); }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12"><div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 blur-sm rounded-3xl"></div><div className="relative z-10 text-center py-12"><h1 className="text-4xl font-extrabold text-gray-900 mb-4">Sign Up</h1><p className="text-lg text-gray-600 max-w-2xl mx-auto">Create your FreelanceHub account to start offering or finding services.</p></div></div>
        <div className="max-w-md mx-auto"><div className="bg-white rounded-2xl shadow-xl p-8"><form onSubmit={handleSubmit} className="space-y-6">
          {['name','email','password'].map((field) => <div key={field}><label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{field}</label><input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'} name={field} value={formData[field]} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={`Enter your ${field}`} /></div>)}
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">What would you like to do?</label><div className="flex space-x-4"><label className="flex items-center"><input type="radio" name="userType" value="client" onChange={handleChange} className="mr-2" /><span>Hire for a project</span></label><label className="flex items-center"><input type="radio" name="userType" value="freelancer" onChange={handleChange} className="mr-2" /><span>Work as a freelancer</span></label></div></div>
          {error && <p className="text-red-600">{error}</p>}<button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">{loading ? 'Signing Up...' : 'Sign Up'}</button>
        </form><p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link></p></div></div>
      </div>
    </div>
  );
};

export default SignUp;