export default function BrandHighlights() {
  return (
    <section className="bg-white py-12 sm:py-16 border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-3xl mb-3">🚚</div>
          <h4 className="font-bold text-lg mb-1 text-gray-900">Fast Delivery</h4>
          <p className="text-sm text-gray-600">Quick and reliable shipping across the country.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-3xl mb-3">✨</div>
          <h4 className="font-bold text-lg mb-1 text-gray-900">Premium Quality</h4>
          <p className="text-sm text-gray-600">High-grade fabrics designed for comfort and elegance.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-3xl mb-3">💬</div>
          <h4 className="font-bold text-lg mb-1 text-gray-900">Easy WhatsApp Orders</h4>
          <p className="text-sm text-gray-600">Place orders instantly via WhatsApp with one click.</p>
        </div>
      </div>
    </section>
  );
}