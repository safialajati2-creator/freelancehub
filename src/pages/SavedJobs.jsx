import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobDetailsPopup from '../components/JobDetailsPopup';
import Footer from '../components/Footer';
import { readJson, submitApplication, writeJson } from '../utils/storage';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { setSavedJobs(readJson('savedJobs', [])); }, []);
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
      console.error('SavedJobs apply error:', err);
      return { ok: false, reason: 'storage', message: 'Failed to save application.' };
    }
  };
  const handleRemoveJob = (jobId) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedJobs);
    writeJson('savedJobs', updatedJobs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto flex-grow footer-spacing">
        <div className="text-center py-12"><h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-3 animate-fade-in">Saved Jobs</h1><p className="text-lg text-gray-600 max-w-md mx-auto">Review the jobs you’ve saved for later.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{savedJobs.length > 0 ? savedJobs.map((job) => <div key={job.id} className="card w-card h-card relative overflow-hidden group cursor-pointer" onClick={() => setSelectedJob(job)}>{job.image && <img src={job.image} alt={job.title} className="w-full h-40 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500" />}<div className="absolute top-3 right-3"><button onClick={(e) => { e.stopPropagation(); handleRemoveJob(job.id); }} className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">Remove</button></div><div className="p-4"><h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3><p className="text-gray-600 text-sm mb-2">{job.description}</p><p className="text-md font-bold text-blue-600 mb-2">{job.budget}</p><div className="flex flex-wrap gap-1.5">{(job.skills || []).map((skill) => <span key={skill} className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">{skill}</span>)}</div></div></div>) : <p className="text-gray-600 text-center col-span-full">You haven’t saved any jobs yet.</p>}</div>
      </div>
      {selectedJob && <JobDetailsPopup job={selectedJob} onClose={() => setSelectedJob(null)} onApply={handleApply} />}
      <Footer />
    </div>
  );
}

export default SavedJobs;