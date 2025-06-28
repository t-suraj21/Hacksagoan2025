import React from 'react';
import { Users, MessageCircle, Star, ArrowLeft, Book, Calendar, Award, Heart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  const communitySections = [
    {
      title: 'Community Guidelines',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Be respectful and supportive to all members.',
        'No spam, advertising, or self-promotion.',
        'Keep discussions relevant to learning and education.',
        'Report inappropriate content to moderators.',
        'Help create a welcoming and inclusive environment.'
      ]
    },
    {
      title: 'Join the Forum',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      items: [
        'Connect with other learners, ask questions, and share your experiences in our community forum.',
        'Participate in discussions and help others succeed.'
      ]
    },
    {
      title: 'Upcoming Events',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      items: [
        'June 15: Live Q&A with Top Scorers',
        'June 22: Study Group Kickoff – Join your class group!',
        'July 1: Accessibility Tools Workshop',
        'July 10: Community Feedback Session'
      ]
    },
    {
      title: 'Mentorship Opportunities',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      items: [
        'Apply to become a peer mentor and help others succeed.',
        'Request a mentor for personalized study support.',
        'Mentor Q&A sessions every month.'
      ]
    },
    {
      title: 'Member Recognition',
      icon: Heart,
      color: 'from-indigo-500 to-purple-500',
      items: [
        'Earn badges for participation, helpful answers, and leadership.',
        'Top contributors are featured on the community leaderboard.',
        'Monthly "Star Member" awards for outstanding engagement.'
      ]
    },
    {
      title: 'Join Study Groups',
      icon: Book,
      color: 'from-pink-500 to-rose-500',
      items: [
        'Find or create a study group for your class or subject.',
        'Collaborate on projects and assignments.',
        'Participate in group discussions and peer learning.'
      ]
    }
  ];

  const featuredDiscussions = [
    'How do you stay motivated while studying?',
    'Share your favorite study resources.',
    'Tips for effective note-taking.',
    'How to prepare for exams with accessibility tools?',
    'Introduce yourself to the community!'
  ];

  const testimonials = [
    {
      quote: "I found my best study group here! We motivate each other every day.",
      author: "Priya",
      class: "Class 10"
    },
    {
      quote: "The mentorship program helped me improve my grades and confidence.",
      author: "Rahul",
      class: "Class 12"
    },
    {
      quote: "I love the monthly Q&A sessions. The community is so helpful!",
      author: "Aisha",
      class: "Class 9"
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
                <Users className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Community</h1>
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
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Join Our Community</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Connect with learners, share experiences, and grow together in an inclusive environment</p>
        </div>

        {/* Community Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {communitySections.map((section, index) => {
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
                  {section.title === 'Join the Forum' && (
                    <div className="mt-4">
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                        Go to Forum (Coming Soon)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Discussions & Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Featured Discussions */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Featured Discussions</h2>
              </div>
              <ul className="space-y-3">
                {featuredDiscussions.map((discussion, index) => (
                  <li key={index} className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">{discussion}</span>
                      <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Community Stories */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Community Stories</h2>
              </div>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm mb-2 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 group-hover:text-purple-200 transition-colors duration-300 font-medium text-sm">
                        {testimonial.author}
                      </span>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-xs">
                        {testimonial.class}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connect & Feedback Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connect with Learners */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Connect with Other Learners</h2>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 flex items-start">
                  <ChevronRight className="w-3 h-3 mr-2 mt-1 text-purple-400 flex-shrink-0" />
                  <span>Join study groups for your class or subject.</span>
                </li>
                <li className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 flex items-start">
                  <ChevronRight className="w-3 h-3 mr-2 mt-1 text-purple-400 flex-shrink-0" />
                  <span>Participate in live Q&A sessions (coming soon).</span>
                </li>
                <li className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 flex items-start">
                  <ChevronRight className="w-3 h-3 mr-2 mt-1 text-purple-400 flex-shrink-0" />
                  <span>Follow us on social media for updates and events.</span>
                </li>
                <li className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 flex items-start">
                  <ChevronRight className="w-3 h-3 mr-2 mt-1 text-purple-400 flex-shrink-0" />
                  <span>Share your learning journey and inspire others.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feedback & Suggestions */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Feedback & Suggestions</h2>
              </div>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4 text-sm">
                We value your feedback! Help us improve the community by sharing your thoughts or feature requests.
              </p>
              <a 
                href="mailto:support@garur.com?subject=Community Feedback" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Send Feedback
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community; 