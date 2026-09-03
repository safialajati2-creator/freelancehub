import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dispatchStorageUpdate, readJson, writeJson } from '../utils/storage';

const emptyProfile = {
  title: '',
  overview: '',
  hourlyRate: '',
  location: '',
  hoursPerWeek: '',
  skills: [],
  languages: [],
  education: [],
  profilePicture: '',
};

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(emptyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = readJson('currentUser', null);
    if (!currentUser || currentUser.userType !== 'freelancer') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setFormData({ ...emptyProfile, ...currentUser, skills: currentUser.skills || [], languages: currentUser.languages || [], education: currentUser.education || [] });
  }, [navigate]);

  const updateField = (event) => setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please choose a valid image file.');
    const reader = new FileReader();
    reader.onloadend = () => setFormData((previous) => ({ ...previous, profilePicture: reader.result }));
    reader.onerror = () => setError('Failed to read image file.');
    reader.readAsDataURL(file);
  };

  const addTag = (field, value, clear) => {
    const clean = value.trim();
    if (!clean) return;
    setFormData((previous) => ({ ...previous, [field]: previous[field].includes(clean) ? previous[field] : [...previous[field], clean] }));
    clear('');
  };

  const removeTag = (field, value) => setFormData((previous) => ({ ...previous, [field]: previous[field].filter((item) => item !== value) }));

  const handleSave = () => {
    setError('');
    if (formData.hourlyRate && !/^\d+(\.\d{1,2})?$/.test(formData.hourlyRate)) return setError('Enter a valid hourly rate.');
    const updatedUser = { ...user, ...formData };
    writeJson('users', readJson('users', []).map((item) => item.id === user.id ? updatedUser : item));
    writeJson('currentUser', updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
    setSuccess('Profile updated successfully.');
    dispatchStorageUpdate();
    window.setTimeout(() => setSuccess(''), 2500);
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <main className="max-w-5xl mx-auto">
        <Link to="/my-account" className="text-blue-600 hover:underline font-semibold">← Back to My Account</Link>
        {success && <p className="bg-green-100 text-green-800 p-3 rounded-xl mt-5 text-center">{success}</p>}
        {error && <p className="bg-red-100 text-red-800 p-3 rounded-xl mt-5 text-center">{error}</p>}

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-7 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-3xl font-bold text-gray-600">
                {formData.profilePicture ? <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" /> : user.name?.charAt(0)?.toUpperCase()}
                {isEditing && <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" title="Change profile picture" />}
              </div>
              <div><h1 className="text-3xl font-bold text-gray-900">{user.name}</h1><p className="text-gray-500">{formData.title || 'Freelancer profile'}</p><p className="text-sm text-gray-400 mt-1">{formData.location || 'Location not specified'}</p></div>
            </div>
            <button onClick={() => setIsEditing((value) => !value)} className="btn-primary">{isEditing ? 'Cancel Editing' : 'Edit Profile'}</button>
          </div>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <section className="card md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Professional Overview</h2>
            {isEditing ? <div className="space-y-4"><input className="input-field" name="title" value={formData.title} onChange={updateField} placeholder="Professional title" /><textarea className="input-field h-36" name="overview" value={formData.overview} onChange={updateField} placeholder="Describe your experience and the value you provide." /><div className="grid sm:grid-cols-2 gap-4"><input className="input-field" name="hourlyRate" value={formData.hourlyRate} onChange={updateField} placeholder="Hourly rate (USD)" /><input className="input-field" name="location" value={formData.location} onChange={updateField} placeholder="Location" /></div></div> : <><p className="text-gray-600 whitespace-pre-wrap">{formData.overview || 'Add a short professional overview to introduce your freelance experience.'}</p><div className="grid sm:grid-cols-2 gap-4 mt-6"><div className="bg-gray-50 rounded-xl p-4"><p className="text-sm text-gray-500">Hourly Rate</p><p className="font-semibold">{formData.hourlyRate ? `$${formData.hourlyRate}/hr` : 'Not specified'}</p></div><div className="bg-gray-50 rounded-xl p-4"><p className="text-sm text-gray-500">Availability</p><p className="font-semibold">{formData.hoursPerWeek || 'Not specified'}</p></div></div></>}
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            {isEditing ? <select className="input-field" name="hoursPerWeek" value={formData.hoursPerWeek} onChange={updateField}><option value="">Select availability</option><option>Less than 30 hrs/week</option><option>More than 30 hrs/week</option><option>As needed</option></select> : <p className="text-gray-600">{formData.hoursPerWeek || 'Not specified'}</p>}
          </section>

          <section className="card md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">{formData.skills.length ? formData.skills.map((skill) => <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{skill}{isEditing && <button onClick={() => removeTag('skills', skill)} className="ml-2">×</button>}</span>) : <p className="text-gray-500">No skills added yet.</p>}</div>
            {isEditing && <div className="flex gap-2 mt-4"><input className="input-field" value={skillInput} onChange={(event) => setSkillInput(event.target.value)} placeholder="Add a skill" /><button type="button" onClick={() => addTag('skills', skillInput, setSkillInput)} className="btn-secondary">Add</button></div>}
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <div className="space-y-2">{formData.languages.length ? formData.languages.map((language) => <div key={language} className="flex justify-between gap-3 text-gray-600"><span>{language}</span>{isEditing && <button onClick={() => removeTag('languages', language)} className="text-red-500">×</button>}</div>) : <p className="text-gray-500">No languages added.</p>}</div>
            {isEditing && <div className="flex gap-2 mt-4"><input className="input-field" value={languageInput} onChange={(event) => setLanguageInput(event.target.value)} placeholder="Add language" /><button type="button" onClick={() => addTag('languages', languageInput, setLanguageInput)} className="btn-secondary">Add</button></div>}
          </section>
        </div>

        {isEditing && <div className="flex justify-end mt-6"><button onClick={handleSave} className="btn-primary px-10">Save Profile</button></div>}
      </main>
    </div>
  );
}

export default Profile;