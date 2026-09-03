import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { readJson } from '../utils/storage';

function Payments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = readJson('currentUser', null);
    if (!currentUser || currentUser.userType !== 'client') {
      navigate('/login');
      return;
    }
    const loadPayments = () => {
      const allPayments = readJson('payments', []);
      setPayments(allPayments.filter((entry) => entry.clientId === currentUser.id));
    };
    loadPayments();
    window.addEventListener('storageUpdated', loadPayments);
    return () => window.removeEventListener('storageUpdated', loadPayments);
  }, [navigate]);

  const total = useMemo(() => payments.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0), [payments]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="pt-28 px-4 md:px-8 max-w-5xl mx-auto w-full flex-grow">
        <h1 className="text-4xl font-bold gradient-text">Payments</h1>
        <p className="text-gray-600 mt-2 mb-8">Review payments made for approved projects.</p>
        <div className="card mb-8"><p className="text-sm text-gray-500">Total paid</p><p className="text-4xl font-bold text-gray-900 mt-1">${total.toFixed(2)}</p></div>
        <div className="overflow-hidden bg-white rounded-xl shadow-md"><div className="divide-y divide-gray-100">{payments.length > 0 ? payments.map((entry, index) => <div key={`${entry.title}-${entry.date}-${index}`} className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><p className="font-semibold text-gray-900">{entry.title || 'Untitled Project'}</p><p className="text-sm text-gray-500">Paid to {entry.freelancerName || 'Freelancer'} · {entry.date || '—'}</p></div><p className="font-bold text-gray-900">${(Number(entry.amount) || 0).toFixed(2)}</p></div>) : <div className="p-12 text-center text-gray-500">No payments recorded yet.</div>}</div></div>
      </main>
      <Footer />
    </div>
  );
}

export default Payments;