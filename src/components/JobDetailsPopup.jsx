import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function JobDetailsPopup({ job, onClose, onApply }) {
  const [proposal, setProposal] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!proposal.trim()) return setError('Please provide a proposal.');
    try {
      setSubmitting(true);
      const result = await onApply(job, proposal.trim());
      if (result?.ok === false) {
        if (result.reason === 'duplicate') setError('You have already applied to this project.');
        else if (result.reason === 'auth') setError('Please log in as a freelancer to apply.');
        else setError(result.message || 'Failed to submit application.');
      }
    } catch (err) {
      setError('Failed to submit application.');
      console.error(err);
    } finally { setSubmitting(false); }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}>
          <div className="p-6 border-b border-gray-200"><div className="flex justify-between items-center gap-4"><h2 className="text-2xl font-bold gradient-text">{job.title}</h2><button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">×</button></div><p className="text-gray-500 text-sm mt-2">Posted {job.posted || 'recently'}</p></div>
          <div className="p-6">
            {error && <p className="text-red-600 bg-red-50 rounded-xl px-4 py-3 mb-4 text-sm">{error}</p>}
            {job.image && <img src={job.image} alt={job.title} className="w-full h-48 object-cover rounded-xl shadow-sm mb-6" />}
            <div className="space-y-4"><div><h3 className="text-lg font-semibold">Description</h3><p className="text-gray-600 text-sm mt-1">{job.description}</p></div><div className="grid sm:grid-cols-2 gap-4"><div><h3 className="font-semibold">Budget</h3><p>{job.budget}</p></div><div><h3 className="font-semibold">Category</h3><p>{job.category}</p></div></div><div><h3 className="font-semibold">Skills Required</h3><div className="flex flex-wrap gap-2 mt-2">{(job.skills || []).map((skill) => <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>)}</div></div></div>
            <div className="mt-7"><h3 className="text-lg font-semibold gradient-text mb-4">Apply for This Job</h3><form onSubmit={handleSubmit} className="space-y-4"><textarea value={proposal} onChange={(e) => setProposal(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl h-32 resize-none" placeholder="Explain why you're a good fit for this project..." required /><button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit Application'}</button></form></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default JobDetailsPopup;