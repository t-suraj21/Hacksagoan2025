import React from 'react';
import { Book, ArrowLeft, Keyboard, Headphones, Users, Shield, Zap, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  const sections = [
    {
      title: 'Getting Started',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      items: [
        {
          title: 'Introduction',
          content: 'Garur is an accessible learning platform designed specifically for blind and visually impaired learners. Our platform combines digital library access, interactive tests, and note-taking capabilities in an intuitive interface.'
        },
        {
          title: 'Quick Start Guide',
          content: '1. Create an account or log in\n2. Navigate to the Digital Library\n3. Choose your subject and chapter\n4. Use keyboard shortcuts for efficient navigation\n5. Take tests to assess your understanding'
        }
      ]
    },
    {
      title: 'Keyboard Navigation',
      icon: Keyboard,
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          title: 'Essential Shortcuts',
          content: 'Alt + L: Go to Library\nAlt + T: Go to Tests\nAlt + N: Go to Notebook\nAlt + D: Go to Dashboard\nTab: Navigate elements\nEnter: Activate element\nEsc: Close modal/return'
        },
        {
          title: 'Navigation Tips',
          content: 'Use Tab to move between interactive elements\nPress Enter to activate buttons and links\nUse arrow keys to navigate through lists\nPress Esc to close any open modal or return to previous screen'
        }
      ]
    },
    {
      title: 'Accessibility Features',
      icon: Headphones,
      color: 'from-green-500 to-emerald-500',
      items: [
        {
          title: 'Screen Reader Support',
          content: 'Our platform is fully compatible with screen readers. All elements have proper ARIA labels and roles for optimal screen reader navigation.'
        },
        {
          title: 'Audio Features',
          content: 'Text-to-speech functionality for all content\nSpatial audio positioning for better navigation\nAdjustable voice settings and reading speed'
        }
      ]
    },
    {
      title: 'User Guide',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      items: [
        {
          title: 'Digital Library',
          content: 'Access thousands of NCERT books and study materials\nNavigate through chapters using keyboard shortcuts\nUse the search function to find specific content'
        },
        {
          title: 'Interactive Tests',
          content: 'Take comprehensive assessments\nGet immediate feedback on your answers\nTrack your progress over time'
        },
        {
          title: 'Notebook',
          content: 'Create and organize your notes\nUse keyboard shortcuts for quick note-taking\nAccess your notes from any device'
        }
      ]
    },
    {
      title: 'Security & Privacy',
      icon: Shield,
      color: 'from-indigo-500 to-purple-500',
      items: [
        {
          title: 'Data Protection',
          content: 'Your data is encrypted and securely stored\nWe follow strict privacy guidelines\nRegular security audits and updates'
        },
        {
          title: 'Privacy Settings',
          content: 'Control your profile visibility\nManage notification preferences\nCustomize your learning experience'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      icon: HelpCircle,
      color: 'from-pink-500 to-rose-500',
      items: [
        {
          title: 'Common Issues',
          content: 'Audio not working: Check your device settings\nNavigation issues: Ensure keyboard shortcuts are enabled\nLogin problems: Clear browser cache and try again'
        },
        {
          title: 'Support',
          content: 'Contact our support team at support@garur.com\nCheck our FAQ section for quick answers\nJoin our community forum for peer support'
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
                <Book className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Documentation</h1>
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
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Complete Documentation</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to know about using Garur effectively</p>
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
      </main>
    </div>
  );
};

export default Documentation; 