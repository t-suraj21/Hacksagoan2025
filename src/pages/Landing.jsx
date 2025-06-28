import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Book, FileText, Headphones, Keyboard, ArrowRight, Star, Users, Award, Zap, ChevronLeft, ChevronRight, X, ExternalLink, Menu, X as CloseIcon } from 'lucide-react';
import { isAuthenticated, logout } from '../utils/auth';

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrambledText, setScrambledText] = useState('Learn Without Limits');
  const [particles, setParticles] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedWork, setSelectedWork] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  const isLoggedIn = isAuthenticated();

  // Text scramble animation
  useEffect(() => {
    const text = 'Learn Without Limits';
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScrambledText(prev => 
          text.split('').map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Particles initialization
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100
      })));
    };

    const particleTimer = setInterval(animateParticles, 100);
    return () => clearInterval(particleTimer);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle navigation functions
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/register');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleDemoClick = () => {
    // Scroll to work showcase section
    const showcaseSection = document.getElementById('work-showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Book,
      title: 'Digital Library',
      description: 'Access thousands of NCERT books and study materials',
      color: 'from-blue-500 to-cyan-500',
      link: '/library'
    },
    {
      icon: FileText,
      title: 'Interactive Tests',
      description: 'Take comprehensive assessments with real-time feedback',
      color: 'from-purple-500 to-pink-500',
      link: '/dashboard'
    },
    {
      icon: Headphones,
      title: 'Immersive Audio',
      description: 'Spatial audio positioning for better content navigation',
      color: 'from-green-500 to-emerald-500',
      link: '/documentation'
    },
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      description: 'Comprehensive keyboard shortcuts for power users',
      color: 'from-orange-500 to-red-500',
      link: '/keyboard-shortcuts'
    }
  ];

  const testimonials = [
    {
      content: 'Garur transformed my learning experience. The navigation is incredibly intuitive.',
      author: 'Sarah Johnson',
      role: 'Student',
      rating: 5
    },
    {
      content: 'The most accessible learning platform I have ever used. Everything is well-organized.',
      author: 'Michael Chen',
      role: 'Teacher',
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: '0(Counting)', label: 'Active Learners' },
    { icon: Book, value: '5,000+', label: 'Resources' },
    { icon: Award, value: '98%', label: 'Satisfaction Rate' },
    { icon: Zap, value: '24/7', label: 'Support' }
  ];

 const workShowcase = [
  {
    id: 1,
    title: 'AI Voice Book Reader',
    category: 'Accessible Learning',
    description: 'An intelligent audio-based book reader that allows blind students to access NCERT and state board books through voice commands. It supports multiple languages and provides AI-powered explanations and real-world examples for each topic.',
    image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    technologies: ['React', 'Web Speech API', 'Google TTS', 'OpenAI'],
    link: '#demo-reader',
  },
  {
    id: 2,
    title: 'Voice-Controlled Chapter Navigation',
    category: 'Voice Interaction',
    description: 'A seamless voice command system that allows students to explore classes, subjects, and chapters simply by speaking. Example: "Read Class 9 Science Chapter 2". Fully integrated with screen readers and designed for hands-free use.',
    image: 'https://images.pexels.com/photos/7709179/pexels-photo-7709179.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    technologies: ['Speech Recognition', 'React Router', 'ARIA Accessibility'],
    link: '#demo-navigation',
  },
  {
    id: 3,
    title: 'Interactive Voice Mock Tests',
    category: 'Voice Assessment',
    description: 'Chapter-wise mock test system where questions are read aloud and answers are captured via voice. Real-time feedback is given through audio, enhancing confidence and learning for visually impaired students.',
    image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    technologies: ['Voice Input', 'TTS Feedback', 'Quiz Engine'],
    link: '#demo-quiz',
  },
  {
    id: 4,
    title: 'Multilingual AI Explainer',
    category: 'Smart Content Understanding',
    description: 'AI-driven explanation system that breaks down complex textbook content into simple spoken language, offering relatable real-world examples. Students can switch languages and ask for re-explanations using natural voice.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    technologies: ['OpenAI GPT', 'Google Translate API', 'Speech Synthesis'],
    link: '#demo-explainer',
  },
];

  const faqs = [
    {
      id: 1,
      question: "How does Garur support screen readers?",
      answer: "Garur is built with ARIA labels, semantic HTML, and comprehensive keyboard navigation. We support all major screen readers including NVDA, JAWS, and VoiceOver with optimized audio cues and spatial navigation."
    },
    {
      id: 2,
      question: "Can I access NCERT books in audio format?",
      answer: "Yes! Our digital library includes high-quality audio versions of all NCERT textbooks with natural voice synthesis, chapter navigation, and bookmarking features for seamless learning."
    },
    {
      id: 3,
      question: "What keyboard shortcuts are available?",
      answer: "We offer extensive keyboard shortcuts: Tab for navigation, Space/Enter for activation, Arrow keys for menu navigation, Alt+H for help, Ctrl+/ for search, and many more. Press Alt+K anywhere to see the full list."
    },
    {
      id: 4,
      question: "Is Garur free to use?",
      answer: "Garur offers a comprehensive free tier with access to basic features and select content. Premium features include advanced assessments, personalized learning paths, and expanded library access."
    },
    {
      id: 5,
      question: "How do I navigate through different subjects?",
      answer: "Use Tab to navigate between subjects, Enter to select, and Arrow keys within subject menus. Each subject has audio previews and structured navigation with clear headings and landmarks."
    },
    {
      id: 6,
      question: "Can I take tests without visual elements?",
      answer: "Absolutely! Our interactive tests are designed with audio-first approach, featuring spoken questions, timed audio cues, and comprehensive feedback through speech synthesis and haptic patterns."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % workShowcase.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [workShowcase.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % workShowcase.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + workShowcase.length) % workShowcase.length);
  };

  const handleWorkClick = (work) => {
    setSelectedWork(work);
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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

        @keyframes text-reveal {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0%); }
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

        .text-reveal-mask {
          overflow: hidden;
        }

        .text-reveal {
          animation: text-reveal 1s ease-out forwards;
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

        .neon-glow:hover {
          animation-duration: 0.5s;
        }

        .magnetic-cursor {
          transition: transform 0.2s ease;
        }

        .magnetic-cursor:hover {
          transform: scale(1.05) translateZ(10px);
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        .scramble-text {
          font-family: 'Courier New', monospace;
          letter-spacing: 0.1em;
        }

        .mobile-menu {
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }
      `}</style>

      {/* Blob Morph Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blob-morph"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blob-morph" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/5 to-blue-500/5 blob-morph" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Interactive Gradient Background */}
      <div 
        className="fixed inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.1) 35%, rgba(236, 72, 153, 0.1) 70%, transparent 100%)`
        }}
      />

      {/* Particles Background in Hero */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" ref={heroRef}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Sticky Header with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className={`flex items-center space-x-3 group transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 neon-glow">
                <Book className="w-7 h-7 text-white" />
              </div>
              <div className="text-reveal-mask">
                <h1 className={`text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-reveal`} style={{animationDelay: '500ms'}}>Garur</h1>
              </div>
            </Link>
            {/* Login button for desktop */}
            <div className="hidden md:block">
              <Link
                to="/login"
                className="group magnetic-cursor px-6 py-3 text-gray-300 hover:text-white transition-all duration-500 relative overflow-hidden rounded-xl border border-white/10 hover:border-purple-500/50 backdrop-blur-sm hover:bg-white/5 neon-glow"
              >
                <span className="relative z-10">Login</span>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 left-0 w-64 h-full bg-black/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Garur</h1>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="border-t border-white/10 pt-4 mt-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/home"
                    className="block px-4 py-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 rounded-xl transition-all duration-300 mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 rounded-xl transition-all duration-300 mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className={`inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/20 hover:border-purple-500/50 transition-all duration-1000 magnetic-cursor ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '300ms'}}>
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-gray-300 font-medium">Accessible Learning Platform</span>
            </div>

            <div className="text-reveal-mask mb-8">
              <h2 className={`text-6xl md:text-8xl font-bold leading-tight scramble-text transition-all duration-1000 delay-500 ${isLoaded ? 'text-reveal' : ''}`}>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {scrambledText}
                </span>
              </h2>
            </div>

            <div className="text-reveal-mask">
              <p className={`text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-700 text-reveal ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                Experience education through intuitive navigation designed specifically for blind and visually impaired learners. 
                <span className="text-purple-300 font-medium"> Press Tab to navigate.</span>
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <button
                onClick={handleGetStarted}
                className="group magnetic-cursor relative px-12 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 flex items-center space-x-2 neon-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 font-semibold">{isLoggedIn ? 'Go to Dashboard' : 'Get Started'}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </button>
              <button 
                onClick={handleDemoClick}
                className="group magnetic-cursor px-12 py-5 border-2 border-white/20 text-gray-300 hover:text-white rounded-xl hover:bg-white/5 hover:border-purple-400/50 transition-all duration-500 backdrop-blur-xl relative overflow-hidden neon-glow"
              >
                <span className="relative z-10">Watch Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>

            {/* Stats Section with Glassmorphism */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="group text-center hover:scale-110 transition-all duration-500 cursor-pointer magnetic-cursor">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-purple-400/50 group-hover:bg-white/10 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/25 card-3d">
                      <IconComponent className="w-8 h-8 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300">{stat.value}</div>
                    <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Card Tilt */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-reveal-mask">
              <h3 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent text-reveal">Powerful Features</h3>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need for an exceptional learning experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer relative overflow-hidden magnetic-cursor"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-lg neon-glow`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">{feature.title}</h4>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Showcase Carousel Section */}
      <section id="work-showcase" className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-reveal-mask">
              <h3 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent text-reveal">Our Work Showcase</h3>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Explore innovative learning solutions designed specifically for accessibility and engagement</p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {workShowcase.map((work, index) => (
                  <div
                    key={work.id}
                    className="w-full flex-shrink-0 relative group cursor-pointer"
                    style={{ minWidth: '100%' }}
                  >
                    <button
                      type="button"
                      className="w-full bg-transparent border-0 p-0 text-left"
                      onClick={() => handleWorkClick(work)}
                      tabIndex={0}
                      aria-label={work.title}
                    >
                      <div className="relative h-96 overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <img 
                          src={work.image} 
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-block px-3 py-1 bg-purple-500/80 text-purple-100 text-sm font-medium rounded-full mb-3 backdrop-blur-sm">
                              {work.category}
                            </span>
                            <h4 className="text-2xl font-bold text-white mb-2">{work.title}</h4>
                            <p className="text-gray-200 text-sm line-clamp-2 mb-4">{work.description}</p>
                            <div className="flex items-center text-purple-300 font-medium">
                              <span>{isLoggedIn ? 'Explore Now' : 'Get Started'}</span>
                              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10 magnetic-cursor neon-glow"
              aria-label="Previous work"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10 magnetic-cursor neon-glow"
              aria-label="Next work"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {workShowcase.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 magnetic-cursor ${
                    index === currentSlide 
                      ? 'bg-purple-500 shadow-lg shadow-purple-500/50 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Details Modal */}
      {selectedWork && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedWork(null)}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedWork.image} 
                alt={selectedWork.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button 
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full mb-4 border border-purple-500/30">
                  {selectedWork.category}
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedWork.title}</h2>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                {selectedWork.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-reveal-mask">
              <h3 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-reveal">What Our Users Say</h3>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real stories from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-3d group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-700 transform hover:scale-105 cursor-pointer relative overflow-hidden magnetic-cursor"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{transitionDelay: `${i * 100}ms`}} />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300 neon-glow">
                      <span className="text-white font-semibold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold group-hover:text-purple-200 transition-colors duration-300">{testimonial.author}</p>
                      <p className="text-purple-300 text-sm group-hover:text-purple-200 transition-colors duration-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-900/10 via-purple-900/15 to-pink-900/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-reveal-mask">
              <h3 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent text-reveal">Frequently Asked Questions</h3>
            </div>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">Everything you need to know about Garur's accessibility features</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="mb-4 md:mb-6 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 group magnetic-cursor"
                  aria-expanded={openFAQ === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-purple-200 transition-colors duration-300 pr-4">
                      {faq.question}
                    </h4>
                    <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 neon-glow ${openFAQ === faq.id ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 text-white transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id 
                      ? 'max-h-96 opacity-100 mt-3 md:mt-4' 
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl ml-2 md:ml-4 relative">
                    {/* Animated connection line */}
                    <div className={`absolute -top-3 md:-top-4 left-4 md:left-6 w-0.5 h-3 md:h-4 bg-gradient-to-b from-purple-500 to-transparent transition-all duration-500 ${openFAQ === faq.id ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}></div>
                    
                    {/* Floating particles animation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl md:rounded-2xl">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400/30 rounded-full transition-all duration-1000 ${
                            openFAQ === faq.id 
                              ? 'animate-bounce opacity-100' 
                              : 'opacity-0'
                          }`}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${10 + i * 20}%`,
                            animationDelay: `${i * 200}ms`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>

                    <p className={`text-sm md:text-base text-gray-300 leading-relaxed transform transition-all duration-700 ${
                      openFAQ === faq.id 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-4 opacity-0'
                    }`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                Features
              </h4>
              <ul className="space-y-3">
                {['Digital Library', 'Interactive Tests', 'Keyboard Navigation', 'Screen Reader Support'].map((item, i) => (
                  <li key={i} className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 magnetic-cursor">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/documentation" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Documentation</Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Help Center</Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Community</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full mr-3"></span>
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-purple-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Contact</Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 inline-block magnetic-cursor">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></span>
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://twitter.com/garur_platform" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 magnetic-cursor">Twitter</a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/garur-platform" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 magnetic-cursor">LinkedIn</a>
                </li>
                <li>
                  <a href="https://github.com/garur-platform" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 magnetic-cursor">GitHub</a>
                </li>
                <li>
                  <a href="https://discord.gg/garur-community" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer hover:translate-x-2 magnetic-cursor">Discord</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500">&copy; 2025 Garur. All rights reserved. Built with heart for accessibility.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;