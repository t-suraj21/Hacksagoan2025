import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
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

  const navigateToHome = () => navigate('/');

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

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@garur.com',
      description: 'Get in touch with our support team',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call us during business hours',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Innovation Drive, Tech City, TC 12345',
      description: 'Visit our headquarters',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <style jsx>{`
        @keyframes blob-morph {
          0%, 100% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
          }
          25% { 
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: rotate(90deg) scale(1.1);
          }
          50% { 
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
            transform: rotate(180deg) scale(0.9);
          }
          75% { 
            border-radius: 60% 40% 60% 30% / 70% 30% 60% 40%;
            transform: rotate(270deg) scale(1.05);
          }
        }

        @keyframes neon-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5),
                        0 0 40px rgba(147, 51, 234, 0.3),
                        0 0 60px rgba(147, 51, 234, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.8),
                        0 0 60px rgba(147, 51, 234, 0.5),
                        0 0 90px rgba(147, 51, 234, 0.3);
          }
        }

        .blob-morph {
          animation: blob-morph 8s ease-in-out infinite;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .card-3d:hover {
          transform: rotateY(12deg) rotateX(8deg) translateZ(20px);
        }

        .neon-glow {
          animation: neon-glow 2s ease-in-out infinite alternate;
          transition: all 0.3s ease;
        }

        .magnetic-cursor {
          transition: transform 0.2s ease;
        }

        .magnetic-cursor:hover {
          transform: scale(1.05) translateZ(10px);
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          transform: translateY(-2px);
        }
      `}</style>

      {/* Blob Morph Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blob-morph"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blob-morph" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/5 to-blue-500/5 blob-morph" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/25 neon-glow">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Contact Us</h1>
            </div>
            <button
              onClick={navigateToHome}
              className="group magnetic-cursor px-6 py-3 text-gray-300 hover:text-white transition-all duration-500 relative overflow-hidden rounded-xl border border-white/10 hover:border-purple-500/50 backdrop-blur-sm hover:bg-white/5 neon-glow"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
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

      {/* Contact Methods */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${method.color} p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-purple-300 font-medium mb-2 group-hover:text-purple-200 transition-colors duration-300">
                      {method.value}
                    </p>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {method.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Send Us a Message</h3>
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
                        className="form-input w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                        className="form-input w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                        className="form-input w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                        className="form-input w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed magnetic-cursor"
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
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Business Hours</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <Clock className="w-8 h-8 text-purple-400" />
                        <div>
                          <h4 className="text-white font-semibold">Monday - Friday</h4>
                          <p className="text-gray-400">9AM - 6PM EST</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <Clock className="w-8 h-8 text-purple-400" />
                        <div>
                          <h4 className="text-white font-semibold">Saturday</h4>
                          <p className="text-gray-400">10AM - 4PM EST</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <Clock className="w-8 h-8 text-purple-400" />
                        <div>
                          <h4 className="text-white font-semibold">Sunday</h4>
                          <p className="text-gray-400">Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-3d group p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Global Support</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <Globe className="w-8 h-8 text-purple-400" />
                      <div>
                        <h4 className="text-white font-semibold">24/7 Support</h4>
                        <p className="text-gray-400">Available worldwide</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Our support team is available around the clock to help you with any questions or issues you may have with the Garur platform.
                    </p>
                  </div>
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
