import React, { useState, useEffect } from 'react';
import { useVoiceCommand } from '../context/VoiceCommandProvider';
import { testVoiceCommands, testCommandPatterns, getVoiceCommandStatus } from '../utils/voiceCommandTest';

const VoiceCommandDebug = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [patternResults, setPatternResults] = useState(null);
  const [status, setStatus] = useState(null);
  
  const { 
    listening, 
    isEnabled, 
    error, 
    feedback, 
    confidence, 
    lastTranscript,
    commandHistory,
    toggleVoiceCommands 
  } = useVoiceCommand();

  useEffect(() => {
    setStatus(getVoiceCommandStatus());
  }, []);

  const runTests = async () => {
    const voiceTests = testVoiceCommands();
    const results = await voiceTests.runTests();
    setTestResults(results);
    
    const patternResults = testCommandPatterns();
    setPatternResults(patternResults);
  };

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-20 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
        title="Voice Command Debug"
      >
        🐛
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Voice Command Debug</h2>
          <button
            onClick={() => setShowDebug(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">System Status</h3>
            {status && (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Browser Support:</span>
                  <span className={status.browserSupport ? 'text-green-600' : 'text-red-600'}>
                    {status.browserSupport ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>HTTPS/Localhost:</span>
                  <span className={status.https ? 'text-green-600' : 'text-red-600'}>
                    {status.https ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Speech Synthesis:</span>
                  <span className={status.speechSynthesis ? 'text-green-600' : 'text-red-600'}>
                    {status.speechSynthesis ? '✓' : '✗'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <div>Platform: {status?.platform}</div>
                  <div>Language: {status?.language}</div>
                </div>
              </div>
            )}
          </div>

          {/* Current State */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Current State</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Enabled:</span>
                <span className={isEnabled ? 'text-green-600' : 'text-red-600'}>
                  {isEnabled ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Listening:</span>
                <span className={listening ? 'text-green-600' : 'text-red-600'}>
                  {listening ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Confidence:</span>
                <span>{(confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Controls</h3>
            <div className="space-y-2">
              <button
                onClick={toggleVoiceCommands}
                className="w-full bg-blue-500 text-white p-2 rounded text-sm"
              >
                {isEnabled ? 'Disable' : 'Enable'} Voice Commands
              </button>
              <button
                onClick={runTests}
                className="w-full bg-green-500 text-white p-2 rounded text-sm"
              >
                Run Tests
              </button>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Feedback</h3>
            <div className="text-sm space-y-1">
              <div><strong>Last Transcript:</strong> {lastTranscript || 'None'}</div>
              <div><strong>Current Feedback:</strong> {feedback || 'None'}</div>
              {error && <div className="text-red-600"><strong>Error:</strong> {error}</div>}
            </div>
          </div>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Test Results</h3>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{result.name}:</span>
                  <span className={result.passed ? 'text-green-600' : 'text-red-600'}>
                    {result.passed ? '✓' : '✗'} {result.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pattern Test Results */}
        {patternResults && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Pattern Test Results</h3>
            <div className="space-y-1">
              {patternResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-mono">{result.command}:</span>
                  <span className={result.matched ? 'text-green-600' : 'text-red-600'}>
                    {result.matched ? `✓ ${result.action}` : '✗ No match'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Command History */}
        <div className="mt-4 bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Command History</h3>
          <div className="max-h-32 overflow-y-auto">
            {commandHistory.length === 0 ? (
              <div className="text-gray-500 text-sm">No commands yet</div>
            ) : (
              <div className="space-y-1">
                {commandHistory.slice(-10).reverse().map((cmd, index) => (
                  <div key={index} className="text-sm font-mono bg-white p-1 rounded">
                    {cmd}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandDebug; 