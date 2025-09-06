import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    countryCode: '+1',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+39', country: 'IT' },
    { code: '+34', country: 'ES' },
    { code: '+31', country: 'NL' },
    { code: '+41', country: 'CH' },
    { code: '+43', country: 'AT' },
    { code: '+32', country: 'BE' },
    { code: '+61', country: 'AU' },
    { code: '+64', country: 'NZ' },
    { code: '+81', country: 'JP' },
    { code: '+82', country: 'KR' },
    { code: '+86', country: 'CN' },
    { code: '+91', country: 'IN' },
    { code: '+55', country: 'BR' },
    { code: '+52', country: 'MX' },
    { code: '+27', country: 'ZA' },
    { code: '+971', country: 'AE' }
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://hook.eu2.make.com/97gy5mnt901kn624ohcfrwqqrduwd5vn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          ...formData,
          fullPhone: `${formData.countryCode}${formData.phone}`,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          countryCode: '+1',
          message: ''
        });
      } else {
        if (response.status === 410) {
          console.error('Webhook endpoint is no longer available (410 Gone). Please update the webhook URL.');
        } else {
          console.error('Response not ok:', response.status, response.statusText);
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="book-demo" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Scale with <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI</span>?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join hundreds of businesses already using AI automation to 
              generate more leads, engage customers better, and scale faster.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                'Free consultation and strategy session',
                'Custom AI solution designed for your business',
                'Implementation support and training',
                'Ongoing optimization and scaling'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Get Started Today</h3>
              <p className="text-gray-400 text-sm">
               Book a consultation with zero cost, obligation, or pressure. <br />
We focus only on solutions that make a real difference.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Book Your Free Consultation
            </h3>

            {submitStatus === 'success' && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                <p className="text-green-400 text-center">
                  Thank you! We'll contact you shortly to schedule your consultation.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <p className="text-red-400 text-center">
                  Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Business Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code} className="bg-gray-800">
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your automation needs..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-4">
              Expect an instant call from our AI agent to confirm your needs and book your consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;