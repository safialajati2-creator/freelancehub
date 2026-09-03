export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Failed to read ${key} from localStorage:`, error);
    return fallback;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function dispatchStorageUpdate() {
  window.dispatchEvent(new Event('storageUpdated'));
}

export function submitApplication(job, proposal) {
  const currentUser = readJson('currentUser', null);
  if (!currentUser || currentUser.userType !== 'freelancer') {
    return { ok: false, reason: 'auth' };
  }

  const applications = readJson('applications', []);
  const duplicate = applications.some(
    (application) => application.jobId === job.id && application.freelancerId === currentUser.id
  );
  if (duplicate) return { ok: false, reason: 'duplicate' };

  const appliedDate = new Date().toISOString().split('T')[0];
  const application = {
    id: `app-${Date.now()}`,
    jobId: job.id,
    jobTitle: job.title,
    clientId: job.clientId,
    budget: job.budget,
    freelancerId: currentUser.id,
    freelancerName: currentUser.name,
    proposal: proposal.trim(),
    appliedDate,
    status: 'pending',
    messages: [],
  };

  writeJson('applications', [...applications, application]);
  const projects = readJson('projects', []);
  writeJson('projects', projects.map((project) => project.id === job.id ? { ...project, applications: [...(project.applications || []), application] } : project));

  const users = readJson('users', []);
  const freelancerNotification = { id: `notif-freelancer-${Date.now()}`, message: `You applied for ${job.title}`, date: appliedDate, read: false, jobId: job.id, jobTitle: job.title, status: 'pending' };
  const clientNotification = { id: `notif-client-${Date.now()}`, message: `${currentUser.name} applied for ${job.title}`, date: appliedDate, read: false, jobId: job.id, jobTitle: job.title, freelancerId: currentUser.id, freelancerName: currentUser.name, status: 'pending' };

  const updatedUsers = users.map((user) => {
    if (user.id === currentUser.id) return { ...user, applications: [...(user.applications || []), application], notifications: [...(user.notifications || []), freelancerNotification] };
    if (user.id === job.clientId) return { ...user, notifications: [...(user.notifications || []), clientNotification] };
    return user;
  });
  writeJson('users', updatedUsers);

  const updatedCurrentUser = updatedUsers.find((user) => user.id === currentUser.id) || { ...currentUser, applications: [...(currentUser.applications || []), application], notifications: [...(currentUser.notifications || []), freelancerNotification] };
  writeJson('currentUser', updatedCurrentUser);
  dispatchStorageUpdate();
  return { ok: true, application };
}
