'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Get in Touch</h1>
          <p className="mt-2 text-gray-600">Have a question? We are just a message away.</p>
        </div>

        {/* Main Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Info</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <p className="text-gray-600">
                  Fashion Hub Headquarters,<br/>
                  Main Street, Gujrat, Pakistan
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <p className="text-gray-600">support@fashionhub.com</p>
              </div>
              <div className="pt-4">
                <a 
                  href="https://wa.me/923001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-sm"
                >
                  <span>💬</span> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-black outline-none" 
                placeholder="Your Name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-black outline-none" 
                placeholder="Your Email" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                rows={4} 
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-black outline-none resize-none" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-sm"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}