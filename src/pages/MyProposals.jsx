import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { readJson } from '../utils/storage';

function MyProposals() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = readJson('currentUser', null);
    if (!currentUser || currentUser.userType !== 'freelancer') {
      navigate('/login');
      return;
    }
    const loadApplications = () => {
      const allApplications = readJson('applications', []);
      setApplications(allApplications.filter((app) => app.freelancerId === currentUser.id));
    };
    loadApplications();
    window.addEventListener('storageUpdated', loadApplications);
    return () => window.removeEventListener('storageUpdated', loadApplications);
  }, [navigate]);

  const summary = useMemo(() => ({ total: applications.length, pending: applications.filter((app) => app.status === 'pending').length, approved: applications.filter((app) => app.status === 'approved').length, rejected: applications.filter((app) => app.status === 'rejected').length }), [applications]);
  const statusClass = (status) => status === 'approved' ? 'bg-green-100 text-green-700' : status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="pt-28 px-4 md:px-8 max-w-6xl mx-auto w-full flex-grow">
        <div className="mb-10"><h1 className="text-4xl font-bold gradient-text">My Proposals</h1><p className="text-gray-600 mt-2">Track your submitted proposals and their current status.</p></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">{Object.entries(summary).map(([label, value]) => <div key={label} className="card text-center"><p className="text-2xl font-bold text-gray-900">{value}</p><p className="text-sm text-gray-500 capitalize">{label}</p></div>)}</div>
        <div className="space-y-4">{applications.length > 0 ? applications.map((application) => <article key={application.id} className="card"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"><div><h2 className="text-xl font-semibold text-gray-900">{application.jobTitle || 'Untitled Project'}</h2><p className="text-sm text-gray-500 mt-1">Applied {application.appliedDate || '—'}</p><p className="text-gray-700 mt-4 whitespace-pre-wrap">{application.proposal || 'No proposal text provided.'}</p></div><span className={`self-start px-3 py-1 rounded-full text-sm font-medium capitalize ${statusClass(application.status)}`}>{application.status || 'pending'}</span></div></article>) : <div className="card text-center py-12"><h2 className="text-xl font-semibold text-gray-800">No proposals yet</h2><p className="text-gray-500 mt-2">Apply to a project from Find Work to see it here.</p></div>}</div>
      </main>
      <Footer />
    </div>
  );
}

export default MyProposals;