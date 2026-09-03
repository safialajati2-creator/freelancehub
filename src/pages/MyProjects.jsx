import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Messages from '../components/Messages';
import PaymentSidebar from '../components/PaymentSidebar';
import { dispatchStorageUpdate, readJson, writeJson } from '../utils/storage';

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState('');
  const [currentUser] = useState(() => readJson('currentUser', null));
  const navigate = useNavigate();

  const parseBudget = (budget) => {
    if (!budget) return 0;
    if (typeof budget === 'number') return budget;
    return parseFloat(String(budget).replace(/[^0-9.]/g, '')) || 0;
  };

  useEffect(() => {
    if (!currentUser || currentUser.userType !== 'client') {
      navigate('/login');
      return undefined;
    }

    const loadData = () => {
      try {
        const allProjects = readJson('projects', []);
        const allApplications = readJson('applications', []);
        const deletedProjects = readJson('deletedProjects', []);
        const userProjects = allProjects.filter((project) => project.clientId === currentUser.id);
        setProjects(userProjects);
        setApplications(allApplications.filter((application) => userProjects.some((project) => project.id === application.jobId)));

        const approved = allApplications
          .filter((application) => application.clientId === currentUser.id && application.status === 'approved')
          .map((application) => ({
            id: application.jobId,
            title: application.jobTitle || 'Untitled Project',
            budget: parseBudget(application.budget),
            status: 'approved',
            freelancerId: application.freelancerId || '',
            freelancerName: application.freelancerName || 'Unknown Freelancer',
            applicationId: application.id,
            proposal: application.proposal || '',
          }));

        const deleted = deletedProjects
          .filter((project) => project.clientId === currentUser.id)
          .map((project) => ({ ...project, budget: parseBudget(project.budget), title: project.title || 'Untitled Project' }));
        setPastProjects([...approved, ...deleted]);
      } catch (err) {
        setError('Failed to load projects. Please try again.');
        console.error('MyProjects load error:', err);
      }
    };

    loadData();
    window.addEventListener('storageUpdated', loadData);
    return () => window.removeEventListener('storageUpdated', loadData);
  }, [currentUser, navigate]);

  const handleReject = (application) => {
    try {
      const allApplications = readJson('applications', []);
      const users = readJson('users', []);
      const updatedApplications = allApplications.map((item) => item.id === application.id ? { ...item, status: 'rejected' } : item);
      writeJson('applications', updatedApplications);

      const notification = {
        id: `notif-${Date.now()}`,
        message: `Your proposal for ${application.jobTitle || 'a project'} was rejected.`,
        date: new Date().toISOString().split('T')[0],
        read: false,
        jobId: application.jobId,
        jobTitle: application.jobTitle || 'Untitled Project',
        status: 'rejected',
      };
      writeJson('users', users.map((user) => user.id === application.freelancerId ? { ...user, notifications: [...(user.notifications || []), notification] } : user));
      setApplications(updatedApplications.filter((item) => projects.some((project) => project.id === item.jobId)));
      dispatchStorageUpdate();
    } catch (err) {
      setError(`Failed to reject application: ${err.message}`);
    }
  };

  const handleDelete = (projectId) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const allProjects = readJson('projects', []);
      const allApplications = readJson('applications', []);
      const deletedProjects = readJson('deletedProjects', []);
      const project = allProjects.find((item) => item.id === projectId);
      const updatedDeleted = project ? [...deletedProjects, { ...project, status: 'deleted', deletedDate: new Date().toISOString().split('T')[0], budget: parseBudget(project.budget) }] : deletedProjects;
      const updatedProjects = allProjects.filter((item) => item.id !== projectId);
      const updatedApplications = allApplications.filter((item) => item.jobId !== projectId);
      writeJson('projects', updatedProjects);
      writeJson('applications', updatedApplications);
      writeJson('deletedProjects', updatedDeleted);
      setProjects(updatedProjects.filter((item) => item.clientId === currentUser.id));
      setApplications(updatedApplications.filter((item) => updatedProjects.some((candidate) => candidate.id === item.jobId)));
      dispatchStorageUpdate();
    } catch (err) {
      setError(`Failed to delete project: ${err.message}`);
    }
  };

  const handleApprove = (application, project) => {
    const amount = parseBudget(project.budget);
    if (amount <= 0) return setError('Project budget is invalid or missing.');
    setPaymentData({ application, project, amount });
    setIsSidebarOpen(true);
  };

  const handlePaymentComplete = (details) => {
    try {
      if (!details?.application || !details?.project || !Number(details.amount)) throw new Error('Invalid payment details.');
      const allApplications = readJson('applications', []);
      const users = readJson('users', []);
      const allProjects = readJson('projects', []);
      const today = new Date().toISOString().split('T')[0];

      const updatedApplications = allApplications.map((application) => {
        if (application.jobId !== details.application.jobId) return application;
        if (application.id === details.application.id) return { ...application, status: 'approved', budget: details.project.budget, completedDate: today };
        return application.status === 'pending' ? { ...application, status: 'rejected' } : application;
      });
      const updatedProjects = allProjects.filter((project) => project.id !== details.application.jobId);
      writeJson('applications', updatedApplications);
      writeJson('projects', updatedProjects);

      const notification = { id: `notif-${Date.now()}`, message: `Your proposal for ${details.project.title || 'a project'} was approved and paid.`, date: today, read: false, jobId: details.application.jobId, jobTitle: details.project.title || 'Untitled Project', status: 'approved' };
      writeJson('users', users.map((user) => user.id === details.application.freelancerId ? { ...user, notifications: [...(user.notifications || []), notification] } : user));
      writeJson('earnings', [...readJson('earnings', []), { freelancerId: details.application.freelancerId, amount: Number(details.amount), title: details.project.title || 'Untitled Project', date: today }]);
      writeJson('payments', [...readJson('payments', []), { clientId: currentUser.id, freelancerName: details.application.freelancerName || 'Unknown Freelancer', title: details.project.title || 'Untitled Project', amount: Number(details.amount), date: today }]);

      setProjects(updatedProjects.filter((project) => project.clientId === currentUser.id));
      setApplications(updatedApplications.filter((application) => updatedProjects.some((project) => project.id === application.jobId)));
      setPastProjects((previous) => [...previous, { id: details.application.jobId, title: details.project.title || 'Untitled Project', budget: Number(details.amount), status: 'approved', freelancerId: details.application.freelancerId || '', freelancerName: details.application.freelancerName || 'Unknown Freelancer', applicationId: details.application.id, proposal: details.application.proposal || '' }]);
      setIsSidebarOpen(false);
      dispatchStorageUpdate();
    } catch (err) {
      setError(`Payment processing failed: ${err.message}`);
    }
  };

  if (!currentUser || currentUser.userType !== 'client') return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="pt-28 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"><div><h1 className="text-4xl font-bold gradient-text">My Projects</h1><p className="text-gray-600 mt-2">Manage projects, proposals, conversations, and approvals.</p></div><div className="flex gap-2"><button className={`px-4 py-2 rounded-lg ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('active')}>Active</button><button className={`px-4 py-2 rounded-lg ${activeTab === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('past')}>Past</button></div></div>
        {error && <p className="text-red-600 bg-red-50 rounded-xl p-3 mb-5 text-sm">{error}</p>}

        {activeTab === 'active' && (projects.length ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{projects.map((project) => {
          const projectApplications = applications.filter((application) => application.jobId === project.id);
          return <article key={project.id} className="card flex flex-col"><div className="mb-5"><h2 className="text-2xl font-semibold">{project.title || 'Untitled Project'}</h2><p className="text-gray-600 text-sm mt-2 line-clamp-3">{project.description || 'No description'}</p><p className="text-blue-600 font-semibold mt-3">Budget: ${parseBudget(project.budget).toFixed(2)}</p></div><div className="flex-grow"><h3 className="font-semibold mb-3">Applications ({projectApplications.length})</h3>{projectApplications.length ? <div className="space-y-3">{projectApplications.map((application) => <div key={application.id} className="bg-gray-50 rounded-xl p-3"><div className="flex items-center justify-between gap-3"><p className="font-medium">{application.freelancerName || 'Freelancer'}</p><span className="text-xs capitalize text-gray-500">{application.status || 'pending'}</span></div><p className="text-sm text-gray-600 mt-2 line-clamp-3">{application.proposal || 'No proposal'}</p><div className="flex flex-wrap gap-2 mt-3"><button onClick={() => setSelectedApplication(application)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full">Message</button>{application.status === 'pending' && <><button onClick={() => handleApprove(application, project)} className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-full">Approve</button><button onClick={() => handleReject(application)} className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-full">Reject</button></>}</div></div>)}</div> : <p className="text-gray-500 text-sm">No applications yet.</p>}</div><button onClick={() => handleDelete(project.id)} className="mt-5 w-full border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-xl">Delete Project</button></article>;
        })}</div> : <div className="card text-center py-12 text-gray-500">No active projects found.</div>)}

        {activeTab === 'past' && (pastProjects.length ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{pastProjects.map((project, index) => <article key={`${project.id}-${project.status}-${index}`} className="card"><h2 className="text-xl font-semibold">{project.title}</h2><p className="text-sm text-gray-500 capitalize mt-2">Status: {project.status}</p>{project.status === 'deleted' && <p className="text-sm text-gray-500 mt-1">Deleted: {project.deletedDate || '—'}</p>}{project.status === 'approved' && <><p className="text-sm text-gray-600 mt-2">Freelancer: {project.freelancerName}</p><button onClick={() => setSelectedApplication({ id: project.applicationId, freelancerId: project.freelancerId, freelancerName: project.freelancerName, jobId: project.id, jobTitle: project.title, proposal: project.proposal, status: project.status })} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm">Message Freelancer</button></>}</article>)}</div> : <div className="card text-center py-12 text-gray-500">No past projects found.</div>)}
      </main>
      {selectedApplication && <Messages application={selectedApplication} onClose={() => setSelectedApplication(null)} />}
      <PaymentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} paymentData={paymentData} onComplete={handlePaymentComplete} />
      <Footer />
    </div>
  );
}

export default MyProjects;