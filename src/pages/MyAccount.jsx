import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { dispatchStorageUpdate, readJson, writeJson } from '../utils/storage';

function MyAccount() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const currentUser = readJson('currentUser', null);
      if (!localStorage.getItem('token') || !currentUser) return navigate('/login');
      setUser(currentUser);
      setFormData({ name: currentUser.name || '', email: currentUser.email || '', password: '' });
    };
    loadUser();
    window.addEventListener('storageUpdated', loadUser);
    return () => window.removeEventListener('storageUpdated', loadUser);
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (!formData.name.trim()) return setError('Name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError('Please enter a valid email address.');
    const users = readJson('users', []);
    const updatedUser = { ...user, name: formData.name.trim(), email: formData.email.trim(), password: formData.password || user.password };
    writeJson('users', users.map((item) => item.id === user.id ? updatedUser : item));
    writeJson('currentUser', updatedUser);
    setUser(updatedUser);
    setFormData((previous) => ({ ...previous, password: '' }));
    dispatchStorageUpdate();
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <main className="pt-28 px-4 md:px-8 max-w-5xl mx-auto w-full flex-grow">
        <div className="text-center mb-10"><h1 className="text-4xl md:text-5xl font-extrabold gradient-text">My Account</h1><p className="text-gray-600 mt-2">Manage your account information.</p></div>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="card text-center"><div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3">{user.name?.charAt(0)?.toUpperCase()}</div><h2 className="text-xl font-semibold">{user.name}</h2><p className="text-gray-600 text-sm">{user.email}</p><p className="text-xs text-gray-500 capitalize mt-1">Role: {user.userType}</p>{user.userType === 'freelancer' && <Link to="/profile" className="btn-primary inline-block mt-5">Edit Profile</Link>}</section>
          <section className="card lg:col-span-2"><h2 className="text-xl font-semibold gradient-text mb-5">Update Account</h2><form onSubmit={handleSubmit} className="space-y-4"><input className="input-field" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required /><input className="input-field" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required /><input className="input-field" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="New password (optional)" /><button className="btn-primary w-full" type="submit">Update Account</button></form></section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyAccount;