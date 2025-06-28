import React from 'react';
import { Keyboard, ArrowLeft, Info, Star, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

  const shortcuts = [
    { keys: 'Alt + L', action: 'Go to Library' },
    { keys: 'Alt + T', action: 'Go to Tests' },
    { keys: 'Alt + N', action: 'Go to Notebook' },
    { keys: 'Alt + D', action: 'Go to Dashboard' },
    { keys: 'Alt + S', action: 'Search books (Library)' },
    { keys: 'Tab', action: 'Navigate between elements' },
    { keys: 'Enter', action: 'Activate selected element' },
    { keys: 'Esc', action: 'Close modal or return to previous screen' },
    { keys: 'Arrow Keys', action: 'Navigate through lists or content' },
    { keys: 'Ctrl + S', action: 'Save changes (where applicable)' },
    { keys: 'Ctrl + F', action: 'Search within the page' },
    { keys: 'Alt + R', action: 'Read aloud selected book (Library)' },
    { keys: 'Alt + B', action: 'Bookmark selected book (Library)' },
    { keys: 'Alt + E', action: 'Explain selected book (Library)' },
    { keys: 'Alt + P', action: 'Go to Profile' },
    { keys: 'Alt + C', action: 'Go to Community' },
    { keys: 'Alt + H', action: 'Go to Help Center' },
    { keys: 'Alt + Q', action: 'Quick actions menu (if available)' },
    { keys: 'Shift + Tab', action: 'Navigate backward between elements' },
    { keys: 'Ctrl + Shift + N', action: 'Create new note (Notebook)' },
    { keys: 'Ctrl + Shift + S', action: 'Save all notes (Notebook)' },
    { keys: 'Ctrl + Arrow Up/Down', action: 'Move between chapters or notes' }
  ];

  const tips = [
    'Use Tab and Shift + Tab to quickly move between interactive elements.',
    'Combine keyboard shortcuts for even faster navigation (e.g., Alt + L then Tab to jump to a book).',
    'Press Esc to close any open modal or return to the previous screen.',
    'Use Ctrl + F to search for any content on the current page.'
  ];

  const accessibility = [
    'All interactive elements are accessible via keyboard.',
    'Screen reader support is built-in for all major actions.',
    'High-contrast and dark mode options are available in settings.',
    'Text-to-speech is available for books and notes.'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Keyboard Shortcuts</h1>
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

      {/* Hero Section */}
      

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Shortcuts Table */}
        <div className="bg-white/5 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm max-w-3xl mx-auto mb-10 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><Keyboard className="w-5 h-5 text-purple-300" /> Keyboard Shortcuts</h3>
          <table className="w-full text-left text-gray-300 text-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-purple-800/20">
                <th className="py-2 px-4 font-semibold">Shortcut</th>
                <th className="py-2 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-purple-900/10' : 'bg-transparent'}>
                  <td className="py-2 px-4 font-mono text-purple-200 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" /> {shortcut.keys}
                  </td>
                  <td className="py-2 px-4">{shortcut.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Power User Tips */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-800/30 rounded-xl p-6 mb-6 flex items-center gap-3">
            <Info className="w-6 h-6 text-purple-300" />
            <span className="text-white text-lg font-semibold">Power User Tips</span>
          </div>
          <ul className="list-disc pl-8 text-gray-300 space-y-2 text-base">
            {tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Accessibility Best Practices */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-purple-800/30 rounded-xl p-6 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-blue-300" />
            <span className="text-white text-lg font-semibold">Accessibility Best Practices</span>
          </div>
          <ul className="list-disc pl-8 text-gray-300 space-y-2 text-base">
            {accessibility.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer Callout */}
      <footer className="w-full border-t border-purple-800/30 bg-black/30 py-6 text-center mt-auto">
        <a href="/help-center" className="inline-flex items-center gap-2 text-purple-300 hover:underline text-base font-medium">
          <HelpCircle className="w-5 h-5" />
          Need more help? Visit the Help Center
        </a>
      </footer>
    </div>
  );
};

export default KeyboardShortcuts; 