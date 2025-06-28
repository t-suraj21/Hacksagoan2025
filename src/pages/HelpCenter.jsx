import React from 'react';
import { HelpCircle, Mail, Users, Book, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpCenter = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Help Center</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* FAQ Section */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Book className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-lg font-medium text-purple-300">{faq.question}</h3>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Support Section */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm flex flex-col gap-8 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Contact & Support</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-300" />
                  <span>Email: <a href="mailto:support@garur.com" className="text-purple-300 hover:underline">support@garur.com</a></span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span>Community Forum: <a href="#" className="text-purple-300 hover:underline">Join our community</a></span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span>FAQ: <a href="#faq" className="text-purple-300 hover:underline">See all FAQs</a></span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Need more help?</h3>
              <p className="text-gray-300 mb-2">If you have a specific question or need further assistance, please reach out to our support team. We are here to help you 24/7.</p>
              <a href="mailto:support@garur.com" className="btn-primary">Contact Support</a>
            </div>
          </div>
        </div>

        {/* Additional Help Center Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Create an account or log in to access all features.</li>
              <li>Explore the Digital Library for books and study materials.</li>
              <li>Take interactive tests to assess your knowledge.</li>
              <li>Use the Notebook to make and organize your notes.</li>
              <li>Visit your Dashboard to track your progress.</li>
            </ul>
          </div>

          {/* Accessibility Features */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Accessibility Features</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Screen reader support for all major elements.</li>
              <li>Keyboard shortcuts for fast navigation (see Documentation for full list).</li>
              <li>Text-to-speech and adjustable audio settings.</li>
              <li>High-contrast and dark mode options for better visibility.</li>
            </ul>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Troubleshooting</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Audio not working? Check your device settings and browser permissions.</li>
              <li>Navigation issues? Ensure keyboard shortcuts are enabled in your settings.</li>
              <li>Login problems? Try clearing your browser cache and cookies.</li>
              <li>Still stuck? Contact support for personalized help.</li>
            </ul>
          </div>

          {/* Account & Security */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Account & Security</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>Change your password in Profile & Settings.</li>
              <li>Manage your privacy and notification preferences.</li>
              <li>All your data is encrypted and securely stored.</li>
              <li>Contact us if you notice any suspicious activity on your account.</li>
            </ul>
          </div>

          {/* Feedback & Suggestions */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Feedback & Suggestions</h2>
            <p className="text-gray-300 text-sm mb-2">We value your feedback! Help us improve by sharing your thoughts or feature requests.</p>
            <a href="mailto:support@garur.com?subject=Feedback" className="text-purple-300 hover:underline text-sm">Send Feedback</a>
          </div>

          {/* Community & Resources */}
          <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Community & Resources</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li><a href="/documentation" className="text-purple-300 hover:underline">Documentation</a> – Full user guide and tips.</li>
              <li><a href="#" className="text-purple-300 hover:underline">Community Forum</a> – Connect with other learners.</li>
              <li><a href="/library" className="text-purple-300 hover:underline">Digital Library</a> – Access study materials.</li>
              <li><a href="/notebook" className="text-purple-300 hover:underline">Notebook</a> – Organize your notes.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter; 