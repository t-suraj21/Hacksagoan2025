import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, FileText, Users, Server, Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      items: [
        {
          title: 'Personal Information',
          content: 'We collect information that you provide directly to us, including:\n• Name and contact information\n• Email address\n• Educational background\n• Learning preferences\n• Usage data and preferences'
        },
        {
          title: 'Usage Information',
          content: 'We automatically collect certain information about your use of our platform:\n• Learning progress and achievements\n• Test results and performance\n• Reading history and preferences\n• Device and browser information\n• Access times and duration'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          title: 'Primary Uses',
          content: 'We use your information to:\n• Provide and improve our educational services\n• Personalize your learning experience\n• Track your progress and achievements\n• Send important updates and notifications\n• Respond to your requests and inquiries'
        },
        {
          title: 'Analytics and Improvement',
          content: 'We analyze usage patterns to:\n• Improve our platform features\n• Enhance accessibility options\n• Optimize learning materials\n• Develop new educational tools\n• Ensure platform security'
        }
      ]
    },
    {
      title: 'Data Protection',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      items: [
        {
          title: 'Security Measures',
          content: 'We implement robust security measures:\n• End-to-end encryption\n• Secure data storage\n• Regular security audits\n• Access controls and authentication\n• Data backup and recovery'
        },
        {
          title: 'Data Retention',
          content: 'We retain your data:\n• For as long as your account is active\n• As required by law\n• To provide our services\n• To maintain platform security\n• To improve our services'
        }
      ]
    },
    {
      title: 'Your Rights',
      icon: Lock,
      color: 'from-orange-500 to-red-500',
      items: [
        {
          title: 'Access and Control',
          content: 'You have the right to:\n• Access your personal data\n• Correct inaccurate data\n• Request data deletion\n• Export your data\n• Opt-out of communications'
        },
        {
          title: 'Privacy Settings',
          content: 'You can control:\n• Profile visibility\n• Notification preferences\n• Data sharing options\n• Learning history\n• Account settings'
        }
      ]
    },
    {
      title: 'Cookies and Tracking',
      icon: Eye,
      color: 'from-indigo-500 to-purple-500',
      items: [
        {
          title: 'Cookie Usage',
          content: 'We use cookies to:\n• Maintain your session\n• Remember your preferences\n• Analyze platform usage\n• Improve performance\n• Enhance security'
        },
        {
          title: 'Third-Party Services',
          content: 'We may use third-party services that collect information through cookies and similar technologies. These services help us:\n• Analyze platform usage\n• Provide support services\n• Deliver educational content\n• Process payments\n• Monitor security'
        }
      ]
    },
    {
      title: 'Updates and Contact',
      icon: Bell,
      color: 'from-pink-500 to-rose-500',
      items: [
        {
          title: 'Policy Updates',
          content: 'We may update this privacy policy periodically. We will notify you of any material changes through:\n• Email notifications\n• Platform announcements\n• Website updates\n• Account notifications'
        },
        {
          title: 'Contact Information',
          content: 'For privacy-related inquiries:\n• Email: privacy@garur.com\n• Phone: +1 (234) 567-890\n• Address: 123 Education Street, Learning City, 12345\n• Support Hours: 24/7'
        }
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
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Privacy Policy</h1>
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
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Privacy Policy</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Your privacy and data security are our top priorities. Learn how we protect your information.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${section.color} p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">{section.title}</h2>
                  </div>
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
                        <h3 className="text-lg font-medium text-purple-300 group-hover:text-purple-200 transition-colors duration-300 flex items-center">
                          <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300 whitespace-pre-line">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Questions About Privacy?</h2>
              </div>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-6">
                If you have any questions about our privacy policy or how we handle your data, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:privacy@garur.com" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Contact Privacy Team
                </a>
                <a 
                  href="mailto:support@garur.com" 
                  className="inline-flex items-center px-6 py-3 border border-white/20 text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  General Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 