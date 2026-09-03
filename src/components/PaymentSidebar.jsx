import { useEffect, useState } from 'react';

function PaymentSidebar({ isOpen, onClose, paymentData, onComplete }) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (isOpen) setConfirmed(false);
  }, [isOpen, paymentData]);

  if (!isOpen || !paymentData) return null;

  const amount = Number(paymentData.amount) || 0;
  const handlePayment = () => {
    if (!confirmed) return;
    onComplete?.({ ...paymentData, amount });
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/30" onClick={onClose}>
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 overflow-y-auto" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <div><h2 className="text-2xl font-bold text-gray-900">Approve & Pay</h2><p className="text-sm text-gray-500">Prototype payment confirmation</p></div>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-900" aria-label="Close payment panel">×</button>
        </div>
        <div className="space-y-5">
          <div className="card"><p className="text-sm text-gray-500">Project</p><p className="font-semibold text-gray-900 mt-1">{paymentData.project?.title || 'Untitled Project'}</p></div>
          <div className="card"><p className="text-sm text-gray-500">Freelancer</p><p className="font-semibold text-gray-900 mt-1">{paymentData.application?.freelancerName || 'Freelancer'}</p></div>
          <div className="card"><p className="text-sm text-gray-500">Amount</p><p className="text-3xl font-bold text-gray-900 mt-1">${amount.toFixed(2)}</p></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">This portfolio prototype does not process real payments. Confirming this action only updates browser localStorage and project status.</div>
          <label className="flex items-start gap-3 text-sm text-gray-700"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1" /><span>I understand this is a simulated payment flow and want to approve the project.</span></label>
          <button type="button" onClick={handlePayment} disabled={!confirmed} className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 transition">Confirm simulated payment</button>
        </div>
      </aside>
    </div>
  );
}

export default PaymentSidebar;
