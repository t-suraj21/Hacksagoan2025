import React from 'react';
import { Book, ArrowLeft, Keyboard, Headphones, Users, Shield, Zap, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

  const sections = [
    {
      title: 'Getting Started',
      icon: Book,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Documentation</h1>
            </div>
            <button
              onClick={navigateToHome}
              className="text-white hover:text-purple-400 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <h3 className="text-lg font-medium text-purple-300">{item.title}</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-line">{item.content}</p>
                    </div>
                  ))}
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