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

const NUM_PARTICLES = 50;

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
  // Background UI/UX state (copied from Home.jsx)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [blobPositions, setBlobPositions] = useState({
    blob1: { x: 0, y: 0 },
    blob2: { x: 0, y: 0 },
    blob3: { x: 0, y: 0 }
  });

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      // Calculate blob movement based on mouse position
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) * 0.02;
      const moveY = (clientY - centerY) * 0.02;
      setBlobPositions({
        blob1: { x: moveX * 0.5, y: moveY * 0.5 },
        blob2: { x: -moveX * 0.3, y: -moveY * 0.3 },
        blob3: { x: moveX * 0.7, y: -moveY * 0.7 }
      });
    };
    // Initialize particles
    const initParticles = () => {
      const newParticles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          baseX: Math.random() * window.innerWidth,
          baseY: Math.random() * window.innerHeight,
        });
      }
      setParticles(newParticles);
    };
    // Animate particles with mouse interaction
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          // Add mouse interaction - particles slightly move towards mouse
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance * 0.5;
            newX += dx * force * 0.01;
            newY += dy * force * 0.01;
          }
          // Wrap around screen
          if (newX > window.innerWidth) newX = 0;
          if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    initParticles();
    const particleInterval = setInterval(animateParticles, 50);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
    };
  }, [mousePosition]);

  const interactiveGradientStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1) 30%, transparent 60%)`
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Morphing Blobs Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div 
            className="blob-morph absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
            style={{
              transform: `translate(${blobPositions.blob1.x}px, ${blobPositions.blob1.y}px)`
            }}
          />
          <div 
            className="blob-morph-2 absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
            style={{
              transform: `translate(${blobPositions.blob2.x}px, ${blobPositions.blob2.y}px)`
            }}
          />
          <div 
            className="blob-morph-3 absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
            style={{
              transform: `translate(${blobPositions.blob3.x}px, ${blobPositions.blob3.y}px)`
            }}
          />
        </div>
        {/* Interactive Radial Gradient */}
        <div 
          className="fixed inset-0 opacity-40 transition-all duration-300 ease-out pointer-events-none"
          style={interactiveGradientStyle}
          aria-hidden="true"
        />
        {/* Animated Particles */}
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.3)`,
                transform: `scale(${1 + (particle.size / 10)})`
              }}
            />
          ))}
        </div>
        {/* Neon Glow Elements */}
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div 
            className="neon-glow absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
          <div 
            className="neon-glow absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${-mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`
            }}
          />
          <div 
            className="neon-glow absolute bottom-32 left-1/4 w-2 h-2 bg-pink-500 rounded-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 0.005}px, ${-mousePosition.y * 0.005}px)`
            }}
          />
          <div 
            className="neon-glow absolute bottom-20 right-1/3 w-5 h-5 bg-blue-400 rounded-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${-mousePosition.x * 0.012}px, ${-mousePosition.y * 0.012}px)`
            }}
          />
        </div>
        {/* Animated Grid Background */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
          <div 
            className="absolute inset-0 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
              transform: `translate(${mousePosition.x * 0.001}px, ${mousePosition.y * 0.001}px)`
            }} 
          />
        </div>
        {/* Main Content */}
        <div className="relative z-10">
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
        <style jsx>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          @keyframes blob-morph {
            0% { 
              transform: translate(0px, 0px) scale(1) rotate(0deg);
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            25% { 
              transform: translate(20px, -20px) scale(1.1) rotate(90deg);
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            }
            50% { 
              transform: translate(-10px, 20px) scale(0.9) rotate(180deg);
              border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
            }
            75% { 
              transform: translate(-20px, -10px) scale(1.05) rotate(270deg);
              border-radius: 60% 40% 60% 30% / 70% 40% 60% 30%;
            }
            100% { 
              transform: translate(0px, 0px) scale(1) rotate(360deg);
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
          }
          @keyframes blob-morph-2 {
            0% { 
              transform: translate(0px, 0px) scale(1) rotate(0deg);
              border-radius: 40% 60% 60% 30% / 70% 50% 40% 60%;
            }
            25% { 
              transform: translate(-15px, 25px) scale(0.8) rotate(90deg);
              border-radius: 60% 30% 40% 70% / 40% 70% 60% 30%;
            }
            50% { 
              transform: translate(25px, -15px) scale(1.2) rotate(180deg);
              border-radius: 30% 70% 40% 60% / 60% 40% 30% 70%;
            }
            75% { 
              transform: translate(10px, 15px) scale(0.95) rotate(270deg);
              border-radius: 70% 40% 30% 60% / 30% 60% 70% 40%;
            }
            100% { 
              transform: translate(0px, 0px) scale(1) rotate(360deg);
              border-radius: 40% 60% 60% 30% / 70% 50% 40% 60%;
            }
          }
          @keyframes blob-morph-3 {
            0% { 
              transform: translate(0px, 0px) scale(1) rotate(0deg);
              border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
            }
            25% { 
              transform: translate(30px, 10px) scale(1.1) rotate(90deg);
              border-radius: 40% 70% 60% 30% / 60% 30% 70% 40%;
            }
            50% { 
              transform: translate(-20px, -25px) scale(0.85) rotate(180deg);
              border-radius: 60% 40% 30% 70% / 30% 60% 40% 70%;
            }
            75% { 
              transform: translate(15px, -10px) scale(1.05) rotate(270deg);
              border-radius: 30% 60% 70% 40% / 70% 40% 60% 30%;
            }
            100% { 
              transform: translate(0px, 0px) scale(1) rotate(360deg);
              border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
            }
          }
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px);
            }
            50% { 
              transform: translateY(-10px);
            }
          }
          @keyframes neon-glow {
            0%, 100% {
              box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
            }
            50% {
              box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 35px currentColor;
            }
          }
          .blob-morph {
            animation: blob-morph 15s ease-in-out infinite;
          }
          .blob-morph-2 {
            animation: blob-morph-2 12s ease-in-out infinite;
          }
          .blob-morph-3 {
            animation: blob-morph-3 18s ease-in-out infinite;
          }
          .particle {
            animation: float 3s ease-in-out infinite;
          }
          .neon-glow {
            animation: neon-glow 2s ease-in-out infinite alternate;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Morphing Blobs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div 
          className="blob-morph absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${blobPositions.blob1.x}px, ${blobPositions.blob1.y}px)`
          }}
        />
        <div 
          className="blob-morph-2 absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${blobPositions.blob2.x}px, ${blobPositions.blob2.y}px)`
          }}
        />
        <div 
          className="blob-morph-3 absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${blobPositions.blob3.x}px, ${blobPositions.blob3.y}px)`
          }}
        />
      </div>
      {/* Interactive Radial Gradient */}
      <div 
        className="fixed inset-0 opacity-40 transition-all duration-300 ease-out pointer-events-none"
        style={interactiveGradientStyle}
        aria-hidden="true"
      />
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.3)`,
              transform: `scale(${1 + (particle.size / 10)})`
            }}
          />
        ))}
      </div>
      {/* Neon Glow Elements */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="neon-glow absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="neon-glow absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`
          }}
        />
        <div 
          className="neon-glow absolute bottom-32 left-1/4 w-2 h-2 bg-pink-500 rounded-full transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.005}px, ${-mousePosition.y * 0.005}px)`
          }}
        />
        <div 
          className="neon-glow absolute bottom-20 right-1/3 w-5 h-5 bg-blue-400 rounded-full transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 0.012}px, ${-mousePosition.y * 0.012}px)`
          }}
        />
      </div>
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
            transform: `translate(${mousePosition.x * 0.001}px, ${mousePosition.y * 0.001}px)`
          }} 
        />
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
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
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-purple-300 gap-2 sm:gap-0">
                  <span>Question {questionIndex + 1} of {questions.length}</span>
                  <div className="w-full sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 transition-all"
                      style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

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
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes blob-morph {
          0% { 
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% { 
            transform: translate(20px, -20px) scale(1.1) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% { 
            transform: translate(-10px, 20px) scale(0.9) rotate(180deg);
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% { 
            transform: translate(-20px, -10px) scale(1.05) rotate(270deg);
            border-radius: 60% 40% 60% 30% / 70% 40% 60% 30%;
          }
          100% { 
            transform: translate(0px, 0px) scale(1) rotate(360deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }
        @keyframes blob-morph-2 {
          0% { 
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            border-radius: 40% 60% 60% 30% / 70% 50% 40% 60%;
          }
          25% { 
            transform: translate(-15px, 25px) scale(0.8) rotate(90deg);
            border-radius: 60% 30% 40% 70% / 40% 70% 60% 30%;
          }
          50% { 
            transform: translate(25px, -15px) scale(1.2) rotate(180deg);
            border-radius: 30% 70% 40% 60% / 60% 40% 30% 70%;
          }
          75% { 
            transform: translate(10px, 15px) scale(0.95) rotate(270deg);
            border-radius: 70% 40% 30% 60% / 30% 60% 70% 40%;
          }
          100% { 
            transform: translate(0px, 0px) scale(1) rotate(360deg);
            border-radius: 40% 60% 60% 30% / 70% 50% 40% 60%;
          }
        }
        @keyframes blob-morph-3 {
          0% { 
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
          }
          25% { 
            transform: translate(30px, 10px) scale(1.1) rotate(90deg);
            border-radius: 40% 70% 60% 30% / 60% 30% 70% 40%;
          }
          50% { 
            transform: translate(-20px, -25px) scale(0.85) rotate(180deg);
            border-radius: 60% 40% 30% 70% / 30% 60% 40% 70%;
          }
          75% { 
            transform: translate(15px, -10px) scale(1.05) rotate(270deg);
            border-radius: 30% 60% 70% 40% / 70% 40% 60% 30%;
          }
          100% { 
            transform: translate(0px, 0px) scale(1) rotate(360deg);
            border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
          }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        @keyframes neon-glow {
          0%, 100% {
            box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
          }
          50% {
            box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 35px currentColor;
          }
        }
        .blob-morph {
          animation: blob-morph 15s ease-in-out infinite;
        }
        .blob-morph-2 {
          animation: blob-morph-2 12s ease-in-out infinite;
        }
        .blob-morph-3 {
          animation: blob-morph-3 18s ease-in-out infinite;
        }
        .particle {
          animation: float 3s ease-in-out infinite;
        }
        .neon-glow {
          animation: neon-glow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default TestPage;