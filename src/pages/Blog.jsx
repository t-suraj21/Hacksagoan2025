import React from 'react';
import { BookOpen, ArrowLeft, FileText, Calendar, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  // Example blog posts (static for now)
  const posts = [
    {
      title: 'Welcome to the Garur Blog!',
      date: '2024-06-01',
      author: 'Garur Team',
      summary: 'Discover platform updates, study tips, accessibility news, and more. Stay tuned for regular posts from our team and community.',
      category: 'Platform Updates',
      readTime: '3 min read'
    },
    {
      title: "How to Make the Most of Garur's Accessibility Features",
      date: '2024-06-02',
      author: 'Accessibility Team',
      summary: 'Learn how to use screen readers, keyboard shortcuts, and audio features for a better learning experience.',
      category: 'Accessibility',
      readTime: '5 min read'
    },
    {
      title: 'Study Tip: Set Small Goals',
      date: '2024-06-03',
      author: 'Learning Coach',
      summary: 'Break your study sessions into small, achievable goals. Celebrate each milestone to stay motivated!',
      category: 'Study Tips',
      readTime: '4 min read'
    },
    {
      title: 'Community Highlight: June Events',
      date: '2024-06-04',
      author: 'Community Manager',
      summary: 'Join our upcoming live Q&A and study group kickoff. Connect with peers and mentors this month!',
      category: 'Community',
      readTime: '3 min read'
    },
    {
      title: 'Accessibility Update: New Dark Mode',
      date: '2024-06-05',
      author: 'Development Team',
      summary: "We've launched a new dark mode for easier reading at night. Try it out in your settings!",
      category: 'Platform Updates',
      readTime: '2 min read'
    },
    {
      title: 'Quick Guide: Using the Notebook',
      date: '2024-06-06',
      author: 'Product Team',
      summary: "Take notes, organize your thoughts, and access them anytime from any device with Garur's Notebook.",
      category: 'Tutorials',
      readTime: '4 min read'
    }
  ];

  const categories = ['All', 'Platform Updates', 'Accessibility', 'Study Tips', 'Community', 'Tutorials'];

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
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Blog</h1>
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
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Latest Posts</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Insights, tips, and updates from the Garur team and community</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group magnetic-cursor px-6 py-3 text-gray-300 hover:text-white transition-all duration-500 relative overflow-hidden rounded-xl border border-white/10 hover:border-purple-500/50 backdrop-blur-sm hover:bg-white/5"
            >
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Post Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                    {post.category}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Post Summary */}
                <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {post.summary}
                </p>

                {/* Post Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                    <span className="text-sm font-medium">Read More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Placeholder for future posts */}
          <div className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                More Posts Coming Soon!
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                Stay tuned for more insights, tips, and updates from our team and community.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog; 