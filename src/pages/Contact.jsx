import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigateToHome = () => navigate('/home');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions, feedback, or need support? We're here to help you on your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                    <Mail className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-gray-400">support@garur.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                    <Phone className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                    <MapPin className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="text-white font-semibold">Address</h4>
                      <p className="text-gray-400">123 Innovation Drive<br />Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4">Business Hours</h4>
                  <p className="text-gray-400 mb-2">Monday - Friday: 9AM - 6PM EST</p>
                  <p className="text-gray-400">Saturday: 10AM - 4PM EST</p>
                  <p className="text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
