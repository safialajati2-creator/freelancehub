import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobDetailsPopup from '../components/JobDetailsPopup';
import Footer from '../components/Footer';
import { readJson, submitApplication, writeJson } from '../utils/storage';

function FindWork() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchJobs = () => {
      try { setJobs(readJson('projects', [])); }
      catch (err) { setError('Failed to load projects.'); console.error(err); }
    };
    fetchJobs();
    window.addEventListener('storageUpdated', fetchJobs);
    return () => window.removeEventListener('storageUpdated', fetchJobs);
  }, []);

  useEffect(() => {
    setSearchQuery(new URLSearchParams(location.search).get('q')?.trim() || '');
  }, [location.search]);

  const categories = ['All', 'Development', 'Design', 'Video Editing', 'Writing'];
  const filteredJobs = jobs.filter((job) => {
    if (!job) return false;
    const matchesCategory = filter === 'All' || job.category === filter;
    const query = searchQuery.toLowerCase();
    return matchesCategory && ((job.title?.toLowerCase() || '').includes(query) || (job.description?.toLowerCase() || '').includes(query));
  });

  const handleApply = (job, proposal) => {
    try {
      const result = submitApplication(job, proposal);
      if (!result.ok) {
        if (result.reason === 'auth') navigate('/login');
        return result;
      }
      setSelectedJob(null);
      return result;
    } catch (err) {
      setError('Failed to apply for project.');
      console.error(err);
      return { ok: false, reason: 'storage', message: 'Failed to save application.' };
    }
  };

  const handleSaveJob = (job) => {
    try {
      const savedJobs = readJson('savedJobs', []);
      if (!savedJobs.some((savedJob) => savedJob.id === job.id)) writeJson('savedJobs', [...savedJobs, job]);
    } catch (err) { setError('Failed to save project.'); console.error(err); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto flex-grow footer-spacing">
        <div className="text-center py-12"><h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-3">Find Your Dream Project</h1><p className="text-lg text-gray-600 max-w-md mx-auto">Discover opportunities that match your skills and interests.</p></div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"><input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" /><div className="flex space-x-2 overflow-x-auto">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${filter === category ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{category}</button>)}</div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredJobs.length ? filteredJobs.map((job) => <article key={job.id} className="card relative overflow-hidden group cursor-pointer" onClick={() => setSelectedJob(job)}>{job.image && <img src={job.image} alt={job.title} className="w-full h-40 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500" />}<button onClick={(e) => { e.stopPropagation(); handleSaveJob(job); }} className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">Save</button><div className="p-4"><h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3><p className="text-gray-600 text-sm mb-2">{job.description}</p><p className="text-md font-bold text-blue-600 mb-2">{job.budget}</p><div className="flex flex-wrap gap-1.5">{(job.skills || []).map((skill) => <span key={skill} className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">{skill}</span>)}</div></div></article>) : <p className="text-gray-600 text-center col-span-full">No projects found matching your criteria.</p>}</div>
      </div>
      {selectedJob && <JobDetailsPopup job={selectedJob} onClose={() => setSelectedJob(null)} onApply={handleApply} />}
      <Footer />
    </div>
  );
}

export default FindWork;