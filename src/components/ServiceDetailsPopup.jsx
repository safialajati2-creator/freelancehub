function ServiceDetailsPopup({ service, onClose, onContinue }) {
  const isVideoEditing = service.title === 'Viral Instagram Reels Video Editor';
  const details = isVideoEditing
    ? { title: 'Quick Edit Marvel', description: 'Quick editing for 1 Instagram Reel', deliveryTime: '1 day', revisions: 'Unlimited', features: ['Color Grading', 'Sound Design & Mixing', 'Motion Graphics'] }
    : { title: 'Service Package', description: service.description, deliveryTime: service.delivery, revisions: 'Multiple revisions', features: ['Professional delivery', 'Client communication', 'Portfolio-ready workflow'] };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex justify-between items-start gap-4 mb-6"><div><h2 className="text-2xl font-extrabold text-gray-900">{service.title}</h2><p className="text-yellow-500 mt-2 font-semibold">★ {service.rating} ({service.reviews})</p></div><button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">×</button></div>
        <img src={service.image} alt={service.title} className="w-full h-64 object-cover rounded-xl mb-6 shadow-md" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl"><h3 className="text-lg font-semibold mb-3">{details.title}</h3><p className="text-sm text-gray-600 mb-3">{details.description}</p><p className="text-sm"><strong>Delivery:</strong> {details.deliveryTime}</p><p className="text-sm"><strong>Revisions:</strong> {details.revisions}</p><div className="mt-3 space-y-1">{details.features.map((feature) => <p key={feature} className="text-sm text-gray-600">✓ {feature}</p>)}</div></div>
          <div><h3 className="text-lg font-semibold mb-3">Starting price</h3><p className="text-3xl font-bold gradient-text mb-4">{service.price}</p><button onClick={onContinue} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold">Continue</button><p className="text-sm text-gray-500 mt-3">Prototype marketplace flow — no real payment is processed.</p></div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailsPopup;