import { useEffect, useMemo, useState } from 'react';
import { dispatchStorageUpdate, readJson, writeJson } from '../utils/storage';

function Messages({ application, onClose }) {
  const [messages, setMessages] = useState(application?.messages || []);
  const [text, setText] = useState('');
  const currentUser = useMemo(() => readJson('currentUser', null), []);

  useEffect(() => {
    setMessages(application?.messages || []);
  }, [application]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = text.trim();
    if (!body || !application?.id || !currentUser) return;

    const message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: body,
      date: new Date().toISOString(),
    };

    const allApplications = readJson('applications', []);
    const updatedApplications = allApplications.map((item) =>
      item.id === application.id
        ? { ...item, messages: [...(item.messages || []), message] }
        : item
    );

    writeJson('applications', updatedApplications);
    setMessages((previous) => [...previous, message]);
    setText('');
    dispatchStorageUpdate();
  };

  if (!application) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 flex items-end md:items-center justify-center p-4" onClick={onClose}>
      <section className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(event) => event.stopPropagation()}>
        <header className="p-5 border-b flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Project Messages</h2>
            <p className="text-sm text-gray-500">{application.jobTitle || 'Untitled Project'}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-2xl" aria-label="Close messages">×</button>
        </header>

        <div className="p-5 space-y-3 overflow-y-auto flex-1 bg-gray-50">
          {messages.length > 0 ? messages.map((message) => {
            const mine = message.senderId === currentUser?.id;
            return (
              <div key={message.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${mine ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'}`}>
                  <p className="text-xs opacity-75 mb-1">{message.senderName || 'User'}</p>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            );
          }) : (
            <p className="text-center text-gray-500 py-12">No messages yet. Start the conversation.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t flex gap-3">
          <input value={text} onChange={(event) => setText(event.target.value)} className="input-field flex-1" placeholder="Write a message..." />
          <button type="submit" className="btn-primary">Send</button>
        </form>
      </section>
    </div>
  );
}

export default Messages;
