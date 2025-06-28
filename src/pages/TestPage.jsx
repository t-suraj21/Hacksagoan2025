// src/pages/TestPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, ArrowLeft, Bell, Settings, User } from 'lucide-react';

const CLASSES = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const SUBJECTS = [
  'Maths', 'Science', 'English', 'Hindi', 'Social Science', 
  'History', 'Geography', 'Civics', 'Sanskrit', 'Computer', 
  'Biology', 'Physics', 'Chemistry', 'Economics', 
  'Political Science', 'Business Studies', 'Accountancy'
];

const TestPage = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const recognitionRef = useRef(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [userData] = useState({ name: 'Test User' }); // Placeholder, replace with actual user data if available

  // Voice recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setVoiceInput(event.results[i][0].transcript);
          processVoiceInput(event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (interimTranscript) setVoiceInput(interimTranscript);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current = recognition;
  }, []);

  const processVoiceInput = (input) => {
    const inputLower = input.toLowerCase();
    
    // Process class
    const classMatch = inputLower.match(/class (\d+)/);
    if (classMatch) {
      setSelectedClass(`Class ${classMatch[1]}`);
    }

    // Process subject
    const subjectMatch = SUBJECTS.find(subject => 
      inputLower.includes(subject.toLowerCase())
    );
    if (subjectMatch) {
      setSelectedSubject(subjectMatch);
    }

    // Process chapter
    const chapterMatch = inputLower.match(/chapter (\d+)/);
    if (chapterMatch) {
      setSelectedChapter(chapterMatch[1]);
    }
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setVoiceInput('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleStartTest = async () => {
    if (selectedClass && selectedSubject && selectedChapter) {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/api/tests/${selectedClass.split(' ')[1]}/${selectedSubject.toLowerCase()}/${selectedChapter}`);
        const data = await response.json();
        
        if (!data.questions || data.questions.length === 0) {
          const generatedQuestions = generateQuestions(selectedClass.split(' ')[1], selectedSubject, selectedChapter);
          setQuestions(generatedQuestions);
        } else {
          setQuestions(data.questions);
        }
        setTestStarted(true);
      } catch (error) {
        console.error('Error fetching test:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, testCompleted, timeLeft]);

  const generateQuestions = (classId, subject, chapterId) => {
    return [
      {
        type: 'multiple-choice',
        question: `What is the main topic of ${subject} Chapter ${chapterId}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A'
      },
      {
        type: 'true-false',
        question: `Is this statement true about ${subject} Chapter ${chapterId}?`,
        correctAnswer: true
      },
      {
        type: 'short-answer',
        question: `Explain the key concept from ${subject} Chapter ${chapterId}.`,
        correctAnswer: 'Sample answer'
      }
    ];
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { 
      q: questions[questionIndex].question, 
      a: answer,
      timestamp: new Date().toISOString()
    }];
    setAnswers(newAnswers);
    
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
    } else {
      handleTestCompletion();
    }
  };

  const handleTestCompletion = () => {
    setTestCompleted(true);
    
    const correctAnswers = answers.filter((answer, index) => {
      const question = questions[index];
      if (question.type === 'multiple-choice') {
        return answer.a === question.correctAnswer;
      } else if (question.type === 'true-false') {
        return answer.a === question.correctAnswer;
      } else if (question.type === 'short-answer') {
        return answer.a.toLowerCase().includes(question.correctAnswer.toLowerCase());
      }
      return false;
    }).length;

    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
  };

  const handleRetakeTest = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setTestCompleted(false);
    setScore(null);
    setTimeLeft(3600);
    setTestStarted(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestion = () => {
    const currentQuestion = questions[questionIndex];
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
            >
              True
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
            >
              False
            </button>
          </div>
        );

      case 'short-answer':
        return (
          <div className="space-y-4">
            <textarea
              className="w-full p-4 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
              rows={4}
              placeholder="Type your answer here..."
            />
            <button
              onClick={() => handleAnswer(document.querySelector('textarea').value)}
              className="w-full p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white font-semibold"
            >
              Submit Answer
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Add this function for back navigation
  const navigateToHome = () => {
    navigate('/home');
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-2 sm:p-6">
        {/* Enhanced Header (exactly like Dashboard) */}
        <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={navigateToHome}
                  className="text-white hover:text-purple-400 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </button>
                <div className="h-6 w-px bg-purple-500/30"></div>
                <h1 className="text-2xl font-bold text-white">Chapter Test</h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-purple-400 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="text-white hover:text-purple-400 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <User className="w-4 h-4 text-purple-300" />
                  <span className="text-white text-sm">{userData?.name || 'Test User'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-md p-4 sm:p-10 rounded-3xl shadow-2xl border border-white/10 mt-8">
            <header className="text-center mb-8 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create Your Test</h1>
              <p className="text-purple-300">Select your class, subject, and chapter</p>
            </header>

            <div className="space-y-6">
              {/* Voice Input Section */}
              <div className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row">
                <button
                  onClick={handleMicClick}
                  className={`p-3 rounded-full ${
                    isListening 
                      ? 'bg-red-500 animate-pulse' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  } transition-all`}
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </button>
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                    placeholder="Say 'Class 5 Science Chapter 1' or type here..."
                    className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Manual Selection */}
              <div className="space-y-4">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 text-white border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
                >
                  <option value="" className="text-purple-300 bg-gray-900">Select Class</option>
                  {CLASSES.map(cls => (
                    <option key={cls} value={cls} className="text-gray-900">{cls}</option>
                  ))}
                </select>

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 text-white border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
                >
                  <option value="" className="text-purple-300 bg-gray-900">Select Subject</option>
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject} className="text-gray-900">{subject}</option>
                  ))}
                </select>

                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 text-white border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
                >
                  <option value="" className="text-purple-300 bg-gray-900">Select Chapter</option>
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className="text-gray-900">Chapter {i + 1}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStartTest}
                disabled={!selectedClass || !selectedSubject || !selectedChapter || isLoading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                  !selectedClass || !selectedSubject || !selectedChapter || isLoading
                    ? 'bg-purple-600/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg'
                }`}
              >
                {isLoading ? 'Loading...' : 'Start Test'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-2 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Chapter Test</h1>
            <p className="text-purple-300">
              {selectedClass} {selectedSubject} - Chapter {selectedChapter}
            </p>
          </div>
          <div className="text-white text-lg sm:text-base">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Test Content */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 sm:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : testCompleted ? (
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-4">{score}</div>
              <div className="text-xl sm:text-2xl text-purple-300 mb-8">out of 100</div>
              <div className="w-full max-w-md mx-auto h-4 bg-white/10 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-purple-600 transition-all"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <div className="space-x-0 sm:space-x-4 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center">
                <button
                  onClick={handleRetakeTest}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg transition-all text-white font-semibold shadow-lg"
                >
                  Retake Test
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Progress */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-purple-300 gap-2 sm:gap-0">
                <span>Question {questionIndex + 1} of {questions.length}</span>
                <div className="w-full sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 transition-all"
                    style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Question */}
              <div className="p-4 sm:p-6 bg-white/5 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                  {questions[questionIndex]?.question}
                </h2>
                {renderQuestion()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;