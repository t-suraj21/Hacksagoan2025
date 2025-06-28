import React, { useState } from 'react';
import { useVoiceCommand } from '../context/VoiceCommandProvider';

const VoiceCommandDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const { isEnabled, toggleVoiceCommands } = useVoiceCommand();

  const navigationExamples = [
    {
      category: '📱 Basic Navigation',
      commands: [
        'Go to library',
        'Open dashboard',
        'Take me to notebook',
        'Show test page',
        'Navigate to profile',
        'Go home'
      ]
    },
    {
      category: '🎯 Natural Language',
      commands: [
        'I want to go to library',
        'Can you open dashboard',
        'Please take me to notebook',
        'Let me access profile',
        'Show me the library',
        'I need to see my notes'
      ]
    },
    {
      category: '🔄 Alternative Phrases',
      commands: [
        'Visit library',
        'Access dashboard',
        'Bring up notebook',
        'Launch test page',
        'Switch to profile',
        'Display home page'
      ]
    },
    {
      category: '📚 Information Pages',
      commands: [
        'Open documentation',
        'Show help center',
        'Go to community',
        'Visit blog',
        'Open about page',
        'Show contact'
      ]
    },
    {
      category: '⚙️ System Pages',
      commands: [
        'Open terms',
        'Show privacy policy',
        'Go to keyboard shortcuts',
        'Open settings',
        'Show my account'
      ]
    }
  ];

  if (!showDemo) {
    return (
      <button
        onClick={() => setShowDemo(true)}
        className="fixed bottom-32 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg z-50"
        title="Voice Command Examples"
      >
        🎤
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Voice Command Examples</h2>
          <button
            onClick={() => setShowDemo(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🎤 How to Use Voice Commands</h3>
          <p className="text-sm text-blue-700">
            Voice commands are <span className="font-semibold">{isEnabled ? 'enabled' : 'disabled'}</span>. 
            {isEnabled ? ' Just speak naturally!' : ' Click the button below to enable them.'}
          </p>
          <button
            onClick={toggleVoiceCommands}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            {isEnabled ? 'Disable' : 'Enable'} Voice Commands
          </button>
        </div>

        <div className="space-y-6">
          {navigationExamples.map((section, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">{section.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {section.commands.map((command, cmdIndex) => (
                  <div
                    key={cmdIndex}
                    className="bg-gray-50 p-3 rounded border-l-4 border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => {
                      // Simulate voice command feedback
                      const event = new CustomEvent('voiceCommandDemo', {
                        detail: { command }
                      });
                      window.dispatchEvent(event);
                    }}
                    title="Click to see what this command does"
                  >
                    <div className="text-sm font-mono text-gray-700">"{command}"</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Click to see response
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">💡 Tips for Better Recognition</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Speak clearly and at a normal pace</li>
            <li>• Use natural language - don't worry about exact phrases</li>
            <li>• Say "help" anytime to see all available commands</li>
            <li>• The system learns from your speaking patterns</li>
            <li>• You can combine words: "go to" + "library" = "go to library"</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowDemo(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Close Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandDemo; 