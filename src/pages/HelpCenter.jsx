import React from 'react';
import { HelpCircle, Mail, Users, Book, ArrowLeft, ChevronRight, MessageCircle, Star, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpCenter = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to your profile settings and click on "Change Password". Follow the instructions to reset your password.'
    },
    {
      question: 'How can I contact support?',
      answer: 'You can email us at support@garur.com or use the contact form below.'
    },
    {
      question: 'Where can I find study resources?',
      answer: 'Visit the Digital Library section from the main menu to access thousands of resources.'
    },
    {
      question: 'How do I report a bug or issue?',
      answer: 'Please email a detailed description to support@garur.com. We appreciate your feedback!'
    }
  ];

  const helpSections = [
    {
      title: 'Getting Started',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Create an account or log in to access all features.',
        'Explore the Digital Library for books and study materials.',
        'Take interactive tests to assess your knowledge.',
        'Use the Notebook to make and organize your notes.',
        'Visit your Dashboard to track your progress.'
      ]
    },
    {
      title: 'Accessibility Features',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      items: [
        'Screen reader support for all major elements.',
        'Keyboard shortcuts for fast navigation (see Documentation for full list).',
        'Text-to-speech and adjustable audio settings.',
        'High-contrast and dark mode options for better visibility.'
      ]
    },
    {
      title: 'Troubleshooting',
      icon: HelpCircle,
      color: 'from-green-500 to-emerald-500',
      items: [
        'Audio not working? Check your device settings and browser permissions.',
        'Navigation issues? Ensure keyboard shortcuts are enabled in your settings.',
        'Login problems? Try clearing your browser cache and cookies.',
        'Still stuck? Contact support for personalized help.'
      ]
    },
    {
      title: 'Account & Security',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      items: [
        'Change your password in Profile & Settings.',
        'Manage your privacy and notification preferences.',
        'All your data is encrypted and securely stored.',
        'Contact us if you notice any suspicious activity on your account.'
      ]
    },
    {
      title: 'Feedback & Suggestions',
      icon: MessageCircle,
      color: 'from-indigo-500 to-purple-500',
      items: [
        'We value your feedback! Help us improve by sharing your thoughts or feature requests.',
        'Send feedback to support@garur.com with subject "Feedback"'
      ]
    },
    {
      title: 'Community & Resources',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
      items: [
        'Documentation – Full user guide and tips.',
        'Community Forum – Connect with other learners.',
        'Digital Library – Access study materials.',
        'Notebook – Organize your notes.'
      ]
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
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Help Center</h1>
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">How Can We Help?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Find answers to common questions and get the support you need</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* FAQ Section */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
                    <h3 className="text-lg font-medium text-purple-300 group-hover:text-purple-200 transition-colors duration-300 flex items-center mb-2">
                      <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Support Section */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Contact & Support</h2>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-purple-300" />
                  <span>Email: <a href="mailto:support@garur.com" className="text-purple-300 hover:text-purple-200 transition-colors duration-300">support@garur.com</a></span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 text-purple-300" />
                  <span>Community Forum: <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors duration-300">Join our community</a></span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-purple-300" />
                  <span>FAQ: <a href="#faq" className="text-purple-300 hover:text-purple-200 transition-colors duration-300">See all FAQs</a></span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">Need more help?</h3>
                <p className="text-gray-300 mb-4 text-sm">If you have a specific question or need further assistance, please reach out to our support team. We are here to help you 24/7.</p>
                <a href="mailto:support@garur.com" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Center Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="card-3d group p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} p-3 group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">{section.title}</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 flex items-start">
                        <ChevronRight className="w-3 h-3 mr-2 mt-1 text-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HelpCenter; 