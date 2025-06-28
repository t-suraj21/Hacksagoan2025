import React from 'react';
import { BookOpen, ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

  // Example blog posts (static for now)
  const posts = [
    {
      title: 'Welcome to the Garur Blog!',
      date: '2024-06-01',
      summary: 'Discover platform updates, study tips, accessibility news, and more. Stay tuned for regular posts from our team and community.'
    },
    {
      title: "How to Make the Most of Garur's Accessibility Features",
      date: '2024-06-02',
      summary: 'Learn how to use screen readers, keyboard shortcuts, and audio features for a better learning experience.'
    },
    {
      title: 'Study Tip: Set Small Goals',
      date: '2024-06-03',
      summary: 'Break your study sessions into small, achievable goals. Celebrate each milestone to stay motivated!'
    },
    {
      title: 'Community Highlight: June Events',
      date: '2024-06-04',
      summary: 'Join our upcoming live Q&A and study group kickoff. Connect with peers and mentors this month!'
    },
    {
      title: 'Accessibility Update: New Dark Mode',
      date: '2024-06-05',
      summary: "We've launched a new dark mode for easier reading at night. Try it out in your settings!"
    },
    {
      title: 'Quick Guide: Using the Notebook',
      date: '2024-06-06',
      summary: "Take notes, organize your thoughts, and access them anytime from any device with Garur's Notebook."
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
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Blog</h1>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Latest Posts</h2>
          <p className="text-purple-300 mb-6">Insights, tips, and updates from the Garur team and community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 text-sm">{post.summary}</p>
            </div>
          ))}
          {/* Placeholder for future posts */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm flex items-center justify-center text-gray-400 text-sm">
            More blog posts coming soon!
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog; 