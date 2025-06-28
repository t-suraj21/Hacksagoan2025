import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MicOff, BookOpen, Bookmark, Volume2, Globe, Info, History, ArrowRight, ArrowLeft, Bell, Settings, User } from 'lucide-react';

const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const BOARDS = [
  'CBSE',
  'ICSE',
  'Andhra Pradesh Board',
  'Assam Board',
  'Bihar Board',
  'Chhattisgarh Board',
  'Goa Board',
  'Gujarat Board',
  'Haryana Board',
  'Himachal Pradesh Board',
  'Jammu & Kashmir Board',
  'Jharkhand Board',
  'Karnataka Board',
  'Kerala Board',
  'Madhya Pradesh Board',
  'Maharashtra Board',
  'Manipur Board',
  'Meghalaya Board',
  'Mizoram Board',
  'Nagaland Board',
  'Odisha Board',
  'Punjab Board',
  'Rajasthan Board',
  'Sikkim Board',
  'Tamil Nadu Board',
  'Telangana Board',
  'Tripura Board',
  'Uttar Pradesh Board',
  'Uttarakhand Board',
  'West Bengal Board',
  'Delhi Board',
  'Other State Board'
];
const CLASSES = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const SUBJECTS = [
  'Maths', 'Science', 'English', 'Hindi', 'Social Science', 'History', 'Geography', 'Civics', 'Sanskrit', 'Computer', 'Biology', 'Physics', 'Chemistry', 'Economics', 'Political Science', 'Business Studies', 'Accountancy', 'Psychology', 'Sociology', 'Environmental Science'
];
const BOOK_TYPES = ['Textbook', 'Reference Book'];
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' }
];

const NUM_PARTICLES = 30;

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBookType, setSelectedBookType] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [readingHistory, setReadingHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('readingHistory') || '[]');
  });
  const recognitionRef = useRef(null);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
  });
  const [userData, setUserData] = useState({ name: 'Library User' });
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
          setQuery(event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (interimTranscript) setQuery(interimTranscript);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (query.trim() !== '') handleSearch();
    };
    recognitionRef.current = recognition;
    // eslint-disable-next-line
  }, []);

  // Background effects setup
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
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1,
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
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance * 0.3;
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

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setQuery('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Helper to build the search query from filters
  const buildSearchQuery = () => {
    return [selectedBoard, selectedClass, selectedSubject, selectedBookType].filter(Boolean).join(' ');
  };

  // When a filter changes, reset dependent filters and trigger search
  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedBookType('');
  };
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSubject('');
    setSelectedBookType('');
  };
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedBookType('');
  };
  const handleBookTypeChange = (e) => {
    setSelectedBookType(e.target.value);
  };

  // Real-time search on filter change
  useEffect(() => {
    const q = buildSearchQuery();
    setQuery(q);
    if (q.trim() !== '') {
      fetchBooks(q);
    }
  }, [selectedBoard, selectedClass, selectedSubject, selectedBookType]);

  // Manual search (button/mic)
  const handleSearch = () => {
    let searchQ = buildSearchQuery() || query;
    if (searchQ.trim() === '') return;
    fetchBooks(searchQ);
  };

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    try {
      // Add specific filters for educational books
      const educationalQuery = `${searchQuery} (NCERT OR "State Board" OR ICSE)`;
      const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(educationalQuery)}&key=${API_KEY}`);
      const data = await response.json();
      
      if (data.items) {
        // Filter books to ensure they are educational
        const filteredBooks = data.items.filter(book => {
          const title = book.volumeInfo.title.toLowerCase();
          const description = book.volumeInfo.description?.toLowerCase() || '';
          const categories = book.volumeInfo.categories?.map(cat => cat.toLowerCase()) || [];
          
          return (
            title.includes('ncert') ||
            title.includes('icse') ||
            title.includes('state board') ||
            description.includes('ncert') ||
            description.includes('icse') ||
            description.includes('state board') ||
            categories.some(cat => 
              cat.includes('ncert') || 
              cat.includes('icse') || 
              cat.includes('state board') ||
              cat.includes('education') ||
              cat.includes('textbook')
            )
          );
        });
        
        setBooks(filteredBooks);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) => {
    const historyItem = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      timestamp: new Date().toISOString()
    };
    
    const newHistory = [historyItem, ...readingHistory.filter(item => item.id !== book.id)].slice(0, 5);
    setReadingHistory(newHistory);
    localStorage.setItem('readingHistory', JSON.stringify(newHistory));
    
    navigate(`/reader/book/${book.id}`);
  };

  useEffect(() => {
    fetchBooks('ncert class 5');
  }, []);

  useEffect(() => {
    setTrendingBooks(getTrendingBooks(JSON.parse(localStorage.getItem('readingHistory') || '[]')));
  }, [readingHistory]);

  const getTrendingBooks = (history) => {
    // Count accesses for each book id
    const counts = {};
    history.forEach(item => {
      counts[item.id] = (counts[item.id] || 0) + 1;
    });
    // Sort by most accessed
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => history.find(item => item.id === id));
    // Remove duplicates and limit to 6
    const unique = [];
    const seen = new Set();
    for (const book of sorted) {
      if (!seen.has(book.id)) {
        unique.push(book);
        seen.add(book.id);
      }
      if (unique.length >= 6) break;
    }
    return unique;
  };

  const navigateToHome = () => {
    navigate('/home');
  };

  // TTS Read Aloud
  const handleReadAloud = (book) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const text = `${book.volumeInfo.title}. Author: ${(book.volumeInfo.authors || []).join(', ')}`;
      const utter = new window.SpeechSynthesisUtterance(text);
      synth.cancel();
      synth.speak(utter);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  // Bookmark
  const handleBookmark = (book) => {
    const id = book.id;
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(bid => bid !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  // Explain
  const handleExplain = (book) => {
    alert(`Title: ${book.volumeInfo.title}\nAuthor(s): ${(book.volumeInfo.authors || []).join(', ')}\nDescription: ${book.volumeInfo.description || 'No description available.'}`);
  };

  const interactiveGradientStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1) 30%, transparent 60%)`
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Morphing Blobs Background - Now Moveable */}
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

      {/* Interactive Radial Gradient - Follows Mouse */}
      <div 
        className="fixed inset-0 opacity-40 transition-all duration-300 ease-out pointer-events-none"
        style={interactiveGradientStyle}
        aria-hidden="true"
      />

      {/* Animated Particles - Now Interactive */}
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

      {/* Neon Glow Elements - Now Moveable */}
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

      {/* Animated Grid Background - Now Slightly Moveable */}
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

      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateToHome}
              className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">Back to Home</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
            </button>
            <div className="h-6 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Digital Library</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="group relative p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <Bell className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <button className="group relative p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <Settings className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 border border-white/20 backdrop-blur-sm">
              <User className="w-4 h-4 text-blue-300" />
              <span className="text-white text-sm">{userData?.name || 'Library User'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="min-h-screen w-full px-2 sm:px-4 md:px-8 py-6 sm:py-10 flex flex-col items-center justify-start overflow-x-hidden relative z-10">
        {/* Language Filter Bar */}
        <div className="w-full flex justify-center z-10 relative">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="custom-dropdown px-5 py-2 rounded-full border-2 border-purple-600 bg-white/10 text-white font-medium focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200 shadow hover:bg-white/20 appearance-none mt-2 mb-2 backdrop-blur-sm"
            style={{minWidth: '140px', maxWidth: '180px'}}>
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code} className="bg-[#181028] text-white">{lang.name}</option>
            ))}
          </select>
        </div>
        {/* Search Section */}
        <section className="flex flex-col items-center mb-4 sm:mb-6 w-full relative z-10">
          <div className="w-full max-w-2xl group relative p-2 sm:p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20 flex flex-col gap-2 sm:gap-3 items-center">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
              <select
                value={selectedBoard}
                onChange={handleBoardChange}
                className="custom-dropdown w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-400 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all appearance-none text-sm sm:text-base relative pr-8"
              >
                <option value="" className="bg-[#181028] text-white">Board</option>
                {BOARDS.map(board => <option key={board} value={board} className="bg-[#181028] text-white">{board}</option>)}
              </select>
              <select
                value={selectedClass}
                onChange={handleClassChange}
                name="class"
                id="class-select"
                data-testid="class-select"
                className="custom-dropdown w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-400 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all appearance-none text-sm sm:text-base mt-2 sm:mt-0"
              >
                <option value="" className="bg-[#181028] text-white">Class</option>
                {CLASSES.map(cls => <option key={cls} value={cls} className="bg-[#181028] text-white">{cls}</option>)}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
              <select
                value={selectedSubject}
                onChange={handleSubjectChange}
                name="subject"
                id="subject-select"
                data-testid="subject-select"
                className="custom-dropdown w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-400 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all appearance-none text-sm sm:text-base"
              >
                <option value="" className="bg-[#181028] text-white">Subject</option>
                {SUBJECTS.map(sub => <option key={sub} value={sub} className="bg-[#181028] text-white">{sub}</option>)}
              </select>
              <select
                value={selectedBookType}
                onChange={handleBookTypeChange}
                className="custom-dropdown w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-400 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all appearance-none text-sm sm:text-base mt-2 sm:mt-0"
              >
                <option value="" className="bg-[#181028] text-white">Book Type</option>
                {BOOK_TYPES.map(type => <option key={type} value={type} className="bg-[#181028] text-white">{type}</option>)}
              </select>
            </div>
            <div className="flex flex-col xs:flex-row w-full items-stretch xs:items-center gap-2 mt-2">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full flex-1 px-3 sm:px-6 py-2 sm:py-4 rounded-t-xl xs:rounded-l-2xl xs:rounded-t-none border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/10 text-white shadow-lg placeholder:text-gray-400 text-sm sm:text-lg min-w-0 rounded-b-none xs:rounded-b-2xl backdrop-blur-md transition-all duration-300"
                placeholder="Search by board, class, subject, or book type"
                aria-label="Search books"
              />
              <div className="flex flex-row w-full xs:w-auto mt-2 xs:mt-0">
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`group relative w-1/2 xs:w-14 h-[44px] sm:h-[56px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 border-none focus:outline-none transition-all duration-300 hover:scale-105
                    rounded-bl-xl xs:rounded-bl-none xs:rounded-tr-2xl
                    rounded-br-none xs:rounded-br-none
                    rounded-tl-none xs:rounded-tl-none
                    ${isListening ? 'animate-pulse ring-2 ring-purple-400' : ''}`}
                  aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                >
                  <Mic className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
                </button>
                <button
                  onClick={handleSearch}
                  className="group relative w-1/2 xs:w-auto px-4 sm:px-8 h-[44px] sm:h-[56px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/25 border-none
                    rounded-br-xl xs:rounded-br-2xl
                    rounded-bl-none xs:rounded-bl-none
                    rounded-tr-none xs:rounded-tr-none
                    rounded-tl-none xs:rounded-tl-none"
                  aria-label="Search"
                >
                  Search
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 text-center">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-1 rounded-full border border-white/20 text-gray-300 text-xs font-medium shadow backdrop-blur-sm">Alt + S</span> to search
            </p>
          </div>
        </section>

        {/* Trending Now Section */}
        {trendingBooks.length > 0 && (
          <section className="mb-8 sm:mb-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2"></span>
              Trending Now
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-2">
              {trendingBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/reader/book/${book.id}`)}
                  className="group relative bg-white/10 p-4 rounded-xl border border-white/20 hover:border-blue-400 transition-all cursor-pointer shadow-lg hover:scale-[1.03] duration-300 flex items-center gap-4 backdrop-blur-xl hover:bg-white/20"
                  tabIndex={0}
                >
                  {book.thumbnail && (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg shadow"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-1">{book.authors?.join(', ')}</p>
                    <span className="inline-block bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-full font-medium">Trending</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-transparent rounded-full my-4 sm:my-6" />
          </section>
        )}

        {/* Continue Reading Section */}
        {readingHistory.length > 0 && (
          <section className="mb-8 sm:mb-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <History className="w-6 h-6 text-purple-400" />
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {readingHistory.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/reader/book/${book.id}`)}
                  className="group relative bg-white/10 p-4 rounded-xl border border-white/20 hover:border-purple-400 transition-all cursor-pointer shadow hover:scale-[1.03] duration-300 backdrop-blur-xl hover:bg-white/20"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-4">
                    {book.thumbnail && (
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-base line-clamp-2">{book.title}</h3>
                      <p className="text-gray-400 text-xs">{book.authors?.join(', ')}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="h-0.5 bg-gradient-to-r from-purple-500/30 via-purple-500/10 to-transparent rounded-full my-4 sm:my-6" />
          </section>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="text-center text-base sm:text-lg font-medium text-gray-300">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-400 mx-auto mb-4"></div>
            Loading books...
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16">
            <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Results Found</h3>
            <p className="text-gray-400 mb-4">Try changing your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
            {books.map((book) => {
              const viewability = book.accessInfo?.viewability;
              const isAvailable = viewability && (viewability === 'PARTIAL' || viewability === 'ALL_PAGES' || viewability === 'FULL_PUBLIC_DOMAIN');
              return (
              <div
                key={book.id}
                data-book-title={book.volumeInfo.title}
                className="group relative bg-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(58,0,128,0.25)] border border-white/20 hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between h-[370px] w-full hover:scale-[1.03] backdrop-blur-xl hover:bg-white/20"
                onClick={() => handleBookClick(book)}
                tabIndex={0}
              >
                {/* Title and Author at the top */}
                <div className="w-full mb-2">
                  <h3 className="text-xl font-bold text-white text-left mb-1 line-clamp-2">{book.volumeInfo.title}</h3>
                  <p className="text-md text-gray-400 text-left mb-2 line-clamp-1">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                </div>
                {/* Book Cover */}
                <div className="flex flex-col items-center w-full mb-4 flex-1 justify-center">
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-24 h-32 object-contain rounded-xl mb-2 shadow-lg border border-white/20 bg-white"
                    />
                  )}
                </div>
                {/* Availability and Buttons */}
                <div className="flex flex-row items-center justify-center gap-2 mb-2 w-full">
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-1 bg-green-700/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                      ● Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-red-700/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                      ● Unavailable
                    </span>
                  )}
                </div>
                <div className="flex flex-row items-center justify-center gap-3 mt-auto w-full">
                  <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/20 text-gray-300 text-xs font-medium shadow backdrop-blur-sm">Alt + L</span>
                  <button
                      className="group relative p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/25"
                      onClick={e => { e.stopPropagation(); handleReadAloud(book); }}
                      aria-label="TTS Read"
                    >
                      <Volume2 className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
                    </button>
                    <button
                      className="group relative p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/25"
                      onClick={e => { e.stopPropagation(); handleBookmark(book); }}
                      aria-label="Bookmark"
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarks.includes(book.id) ? 'text-yellow-400' : 'text-white'}`} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
                    </button>
                    <button
                      className="group relative p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/25"
                      onClick={e => { e.stopPropagation(); handleExplain(book); }}
                      aria-label="Explain This"
                    >
                      <Info className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
                    </button>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              </div>
              );
            })}
          </div>
        )}
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
        select::-ms-expand { display: none; }
        select { background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"/></svg>'); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1.25em; }
        @media (max-width: 640px) {
          select { font-size: 0.95rem; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 2.5rem; }
        }
        .custom-dropdown {
          background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.25em;
        }
        .custom-dropdown:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 2px #a78bfa44;
          background-color: rgba(59, 130, 246, 0.08);
        }
        .custom-dropdown:hover {
          background-color: rgba(147, 51, 234, 0.08);
        }
        .custom-dropdown option {
          background: #181028;
          color: #fff;
        }
        @media (max-width: 640px) {
          .custom-dropdown { font-size: 0.95rem; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Library;