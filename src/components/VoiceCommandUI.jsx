import React, { useState } from 'react';
import { useVoiceCommand } from '../context/VoiceCommandProvider';
import { Mic, MicOff, Volume2, X, History, HelpCircle } from 'lucide-react';

const VoiceCommandUI = () => {
  const { 
    listening, 
    feedback, 
    error, 
    confidence, 
    isEnabled, 
    toggleVoiceCommands, 
    commandHistory,
    lastTranscript,
    noteState,
    testState,
    readingState
  } = useVoiceCommand();
  
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const getStatusColor = () => {
    if (error) return 'text-red-500';
    if (listening) return 'text-green-500';
    if (!isEnabled) return 'text-gray-500';
    return 'text-blue-500';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (listening) return 'Listening';
    if (!isEnabled) return 'Disabled';
    return 'Ready';
  };

  const getModeIndicator = () => {
    if (noteState.mode === 'dictate') return '📝 Note Mode';
    if (testState.mode === 'taking-test') return '📝 Test Mode';
    if (readingState.mode === 'reading') return '📖 Reading Mode';
    return '';
  };

  const helpCommands = [
    { command: 'Go to library', description: 'Navigate to the library page' },
    { command: 'Open dashboard', description: 'Navigate to the dashboard' },
    { command: 'Create a new note', description: 'Create a new notebook entry' },
    { command: 'Open book Science class 5', description: 'Open a specific book' },
    { command: 'Read book Mathematics', description: 'Start reading a book with voice controls' },
    { command: 'Generate test for class 8 Science chapter 3', description: 'Create an AI-generated test' },
    { command: 'Start test for class 8 Science chapter 3', description: 'Start a specific test' },
    { command: 'Answer option A', description: 'Select an answer in test mode' },
    { command: 'Next page', description: 'Go to next page while reading' },
    { command: 'Save note', description: 'Save the current note' },
    { command: 'Delete note', description: 'Delete the current note' },
    { command: 'Help', description: 'Show this help menu' },
    { command: 'Stop listening', description: 'Disable voice commands' },
    { command: 'Go back', description: 'Navigate to previous page' },
    { command: 'Clear all', description: 'Clear command history' }
  ];

  if (!isEnabled && !error) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleVoiceCommands}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all"
          title="Enable Voice Commands"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Main Voice Command Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        {/* Status Indicator */}
        {feedback && (
          <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor().replace('text-', 'bg-')}`}></div>
              <span className="text-sm font-medium">{getStatusText()}</span>
              {confidence > 0 && (
                <span className="text-xs text-gray-300">({Math.round(confidence * 100)}%)</span>
              )}
            </div>
            {getModeIndicator() && (
              <div className="text-xs text-yellow-300 mb-1">{getModeIndicator()}</div>
            )}
            <p className="text-sm">{feedback}</p>
            {lastTranscript && (
              <p className="text-xs text-gray-300 mt-1">"{lastTranscript}"</p>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-sm font-medium">Error</span>
            </div>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-2">
          {/* Help Button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
            title="Voice Commands Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* History Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all"
            title="Command History"
          >
            <History className="w-5 h-5" />
          </button>

          {/* Main Voice Button */}
          <button
            onClick={toggleVoiceCommands}
            className={`p-3 rounded-full shadow-lg transition-all ${
              listening 
                ? 'bg-green-600 hover:bg-green-700 animate-pulse' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white`}
            title={listening ? 'Stop Listening' : 'Start Listening'}
          >
            {listening ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Voice Commands Help</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {helpCommands.map((cmd, index) => (
                  <div key={index} className="border-b border-gray-100 pb-2">
                    <p className="font-medium text-purple-600">{cmd.command}</p>
                    <p className="text-sm text-gray-600">{cmd.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Tip:</strong> Voice commands are now active automatically! Speak clearly and naturally. The system will understand various ways to say the same command.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Command History</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {commandHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No commands yet</p>
              ) : (
                <div className="space-y-2">
                  {commandHistory.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-2">
                      <p className="font-medium">{item.command}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>{Math.round(item.confidence * 100)}% confidence</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceCommandUI; 