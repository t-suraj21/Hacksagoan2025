import React from 'react';
import { Users, MessageCircle, Star, ArrowLeft, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Community</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Community Guidelines */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Community Guidelines</h2>
            </div>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Be respectful and supportive to all members.</li>
              <li>No spam, advertising, or self-promotion.</li>
              <li>Keep discussions relevant to learning and education.</li>
              <li>Report inappropriate content to moderators.</li>
              <li>Help create a welcoming and inclusive environment.</li>
            </ul>
          </div>

          {/* Join the Forum */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <MessageCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Join the Forum</h2>
            </div>
            <p className="text-gray-300 text-sm mb-4">Connect with other learners, ask questions, and share your experiences in our community forum.</p>
            <a href="#" className="btn-primary">Go to Forum (Coming Soon)</a>
          </div>
        </div>

        {/* New: Upcoming Events & Mentorship */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>June 15: Live Q&A with Top Scorers</li>
              <li>June 22: Study Group Kickoff – Join your class group!</li>
              <li>July 1: Accessibility Tools Workshop</li>
              <li>July 10: Community Feedback Session</li>
            </ul>
          </div>

          {/* Mentorship Opportunities */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Mentorship Opportunities</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Apply to become a peer mentor and help others succeed.</li>
              <li>Request a mentor for personalized study support.</li>
              <li>Mentor Q&A sessions every month.</li>
            </ul>
          </div>
        </div>

        {/* New: Member Recognition & Study Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Member Recognition */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Member Recognition</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Earn badges for participation, helpful answers, and leadership.</li>
              <li>Top contributors are featured on the community leaderboard.</li>
              <li>Monthly "Star Member" awards for outstanding engagement.</li>
            </ul>
          </div>

          {/* Join Study Groups */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Join Study Groups</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Find or create a study group for your class or subject.</li>
              <li>Collaborate on projects and assignments.</li>
              <li>Participate in group discussions and peer learning.</li>
            </ul>
          </div>
        </div>

        {/* Featured Discussions & Connect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Featured Discussions */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Featured Discussions</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>How do you stay motivated while studying?</li>
              <li>Share your favorite study resources.</li>
              <li>Tips for effective note-taking.</li>
              <li>How to prepare for exams with accessibility tools?</li>
              <li>Introduce yourself to the community!</li>
            </ul>
          </div>

          {/* Connect with Learners */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Connect with Other Learners</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Join study groups for your class or subject.</li>
              <li>Participate in live Q&A sessions (coming soon).</li>
              <li>Follow us on social media for updates and events.</li>
              <li>Share your learning journey and inspire others.</li>
            </ul>
          </div>
        </div>

        {/* New: Feedback & Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Feedback & Suggestions */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Feedback & Suggestions</h2>
            <p className="text-gray-300 text-sm mb-2">We value your feedback! Help us improve the community by sharing your thoughts or feature requests.</p>
            <a href="mailto:support@garur.com?subject=Community Feedback" className="text-purple-300 hover:underline text-sm">Send Feedback</a>
          </div>

          {/* Testimonials */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Community Stories</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>"I found my best study group here! We motivate each other every day." – Priya, Class 10</li>
              <li>"The mentorship program helped me improve my grades and confidence." – Rahul, Class 12</li>
              <li>"I love the monthly Q&A sessions. The community is so helpful!" – Aisha, Class 9</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community; 