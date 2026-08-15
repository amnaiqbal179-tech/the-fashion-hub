'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">About The Fashion Hub</h1>
          <p className="mt-4 text-lg text-gray-600">Redefining elegance, one outfit at a time.</p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Logo / Image Box - Fixed */}
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-white p-6 flex items-center justify-center">
            <img 
              src="/images/logo/logo.png" 
              alt="About The Fashion Hub" 
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 leading-relaxed">
              At The Fashion Hub, we believe that fashion is more than just clothing; it is a statement of who you are. Started with a vision to make premium clothing accessible to everyone, we have curated a collection that blends tradition with modern trends. From daily wear lawn suits to formal party attire, every piece is chosen with care.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { title: 'Quality First', desc: 'We never compromise on fabric quality.' },
            { title: 'Modern Designs', desc: 'Staying updated with the latest fashion.' },
            { title: 'Customer Focus', desc: 'Your satisfaction is our priority.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h3 className="font-bold text-xl mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}