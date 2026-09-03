import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { readJson } from '../utils/storage';

function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = readJson('currentUser', null);
    if (!currentUser || currentUser.userType !== 'freelancer') {
      navigate('/login');
      return;
    }
    const loadEarnings = () => {
      const allEarnings = readJson('earnings', []);
      setEarnings(allEarnings.filter((entry) => entry.freelancerId === currentUser.id));
    };
    loadEarnings();
    window.addEventListener('storageUpdated', loadEarnings);
    return () => window.removeEventListener('storageUpdated', loadEarnings);
  }, [navigate]);

  const total = useMemo(() => earnings.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0), [earnings]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="pt-28 px-4 md:px-8 max-w-5xl mx-auto w-full flex-grow">
        <h1 className="text-4xl font-bold gradient-text">Earnings</h1>
        <p className="text-gray-600 mt-2 mb-8">A client-side record of approved and paid freelance work.</p>
        <div className="card mb-8"><p className="text-sm text-gray-500">Total earnings</p><p className="text-4xl font-bold text-gray-900 mt-1">${total.toFixed(2)}</p></div>
        <div className="overflow-hidden bg-white rounded-xl shadow-md"><div className="divide-y divide-gray-100">{earnings.length > 0 ? earnings.map((entry, index) => <div key={`${entry.title}-${entry.date}-${index}`} className="p-5 flex items-center justify-between gap-4"><div><p className="font-semibold text-gray-900">{entry.title || 'Untitled Project'}</p><p className="text-sm text-gray-500">{entry.date || '—'}</p></div><p className="font-bold text-green-600">+${(Number(entry.amount) || 0).toFixed(2)}</p></div>) : <div className="p-12 text-center text-gray-500">No earnings recorded yet.</div>}</div></div>
      </main>
      <Footer />
    </div>
  );
}

export default Earnings;