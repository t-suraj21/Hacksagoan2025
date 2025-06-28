import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, FileText, Users, Server, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
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

export default PrivacyPolicy; 