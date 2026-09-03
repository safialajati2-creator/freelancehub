import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError('Invalid email or password');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', 'fake-token');
      window.dispatchEvent(new Event('storageUpdated'));
      navigate(user.userType === 'freelancer' ? '/find-work' : '/my-projects');
    } catch (err) {
      setError('Failed to log in. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4"><label htmlFor="email" className="block text-gray-700 mb-2">Email</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div className="mb-6"><label htmlFor="password" className="block text-gray-700 mb-2">Password</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg">Login</button>
          </form>
          <p className="text-center text-gray-600 mt-4">Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;