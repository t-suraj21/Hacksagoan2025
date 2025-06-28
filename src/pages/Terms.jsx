import React from 'react';
import { ArrowLeft, Shield, FileText, Users, Lock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using Garur, you accept and agree to be bound by the terms and provision of this agreement. 
      If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: 'Use License',
      icon: Shield,
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Garur's website for personal, 
      non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      • Modify or copy the materials
      • Use the materials for any commercial purpose or for any public display
      • Attempt to reverse engineer any software contained on Garur's website
      • Remove any copyright or other proprietary notations from the materials`
    },
    {
      title: 'User Accounts',
      icon: Users,
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
      You are responsible for safeguarding the password and for all activities that occur under your account. 
      You agree not to disclose your password to any third party.`
    },
    {
      title: 'Privacy Policy',
      icon: Lock,
      content: `Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
      to understand our practices regarding the collection and use of your personal information.`
    },
    {
      title: 'Disclaimers',
      icon: AlertTriangle,
      content: `The materials on Garur's website are provided on an 'as is' basis. Garur makes no warranties, expressed or implied, 
      and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, 
      fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`
    },
    {
      title: 'Limitations',
      icon: AlertTriangle,
      content: `In no event shall Garur or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
      or due to business interruption) arising out of the use or inability to use the materials on Garur's website, 
      even if Garur or a Garur authorized representative has been notified orally or in writing of the possibility of such damage.`
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
              Terms of Service
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Terms of Service
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using our platform. 
              By using Garur, you agree to be bound by these terms.
            </p>
            <div className="mt-8 text-sm text-gray-400">
              <p>Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-3 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="space-y-2">
                <p className="text-purple-300">Email: legal@garur.com</p>
                <p className="text-purple-300">Address: 123 Innovation Drive, Tech City, TC 12345</p>
                <p className="text-purple-300">Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
