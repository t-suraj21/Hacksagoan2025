import React, { useState, useEffect } from 'react';
import { Keyboard, ArrowLeft, Info, Star, HelpCircle, ArrowRight, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NUM_PARTICLES = 30;

const KeyboardShortcuts = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [blobPositions, setBlobPositions] = useState({
    blob1: { x: 0, y: 0 },
    blob2: { x: 0, y: 0 },
    blob3: { x: 0, y: 0 }
  });
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');
  const navigateToHelpCenter = () => navigate('/help-center');

  const shortcuts = [
    { keys: 'Alt + L', action: 'Go to Library', category: 'Navigation' },
    { keys: 'Alt + T', action: 'Go to Tests', category: 'Navigation' },
    { keys: 'Alt + N', action: 'Go to Notebook', category: 'Navigation' },
    { keys: 'Alt + D', action: 'Go to Dashboard', category: 'Navigation' },
    { keys: 'Alt + P', action: 'Go to Profile', category: 'Navigation' },
    { keys: 'Alt + C', action: 'Go to Community', category: 'Navigation' },
    { keys: 'Alt + H', action: 'Go to Help Center', category: 'Navigation' },
    { keys: 'Tab', action: 'Navigate between elements', category: 'Accessibility' },
    { keys: 'Shift + Tab', action: 'Navigate backward between elements', category: 'Accessibility' },
    { keys: 'Enter', action: 'Activate selected element', category: 'Accessibility' },
    { keys: 'Esc', action: 'Close modal or return to previous screen', category: 'Accessibility' },
    { keys: 'Arrow Keys', action: 'Navigate through lists or content', category: 'Accessibility' },
    { keys: 'Alt + S', action: 'Search books (Library)', category: 'Library' },
    { keys: 'Alt + R', action: 'Read aloud selected book (Library)', category: 'Library' },
    { keys: 'Alt + B', action: 'Bookmark selected book (Library)', category: 'Library' },
    { keys: 'Alt + E', action: 'Explain selected book (Library)', category: 'Library' },
    { keys: 'Ctrl + S', action: 'Save changes (where applicable)', category: 'Actions' },
    { keys: 'Ctrl + F', action: 'Search within the page', category: 'Actions' },
    { keys: 'Ctrl + Shift + N', action: 'Create new note (Notebook)', category: 'Notebook' },
    { keys: 'Ctrl + Shift + S', action: 'Save all notes (Notebook)', category: 'Notebook' },
    { keys: 'Ctrl + Arrow Up/Down', action: 'Move between chapters or notes', category: 'Notebook' },
    { keys: 'Alt + Q', action: 'Quick actions menu (if available)', category: 'Actions' }
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

  useEffect(() => {
    setIsLoaded(true);

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
          opacity: Math.random() * 0.3 + 0.1,
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

  const interactiveGradientStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1) 30%, transparent 60%)`
  };

  // Group shortcuts by category
  const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Morphing Blobs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div 
          className="blob-morph absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
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
            className="particle absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(147, 51, 234, 0.3)`,
              transform: `scale(${1 + (particle.size / 10)})`
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
            transform: `translate(${mousePosition.x * 0.001}px, ${mousePosition.y * 0.001}px)`
          }} 
        />
      </div>

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg z-50 transform transition-all duration-300 hover:scale-105"
      >
        Skip to main content
      </a>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Keyboard Shortcuts
              </h1>
            </div>

            <button
              onClick={navigateToHome}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm transition-all duration-1000 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            >
              <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">Back to Home</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-6 py-12 relative z-10">
        {/* Shortcuts by Category */}
        <div className="space-y-12 mb-16">
          {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts], categoryIndex) => (
            <div
              key={category}
              className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${400 + categoryIndex * 100}ms` }}
            >
              <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                <h3 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryShortcuts.map((shortcut, index) => (
                    <button
                      key={index}
                      className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400/50 active:scale-95"
                      onClick={() => {
                        // Simulate the shortcut action
                        const event = new KeyboardEvent('keydown', {
                          key: shortcut.keys.includes('Alt + L') ? 'l' : 
                               shortcut.keys.includes('Alt + T') ? 't' :
                               shortcut.keys.includes('Alt + N') ? 'n' :
                               shortcut.keys.includes('Alt + D') ? 'd' :
                               shortcut.keys.includes('Alt + P') ? 'p' :
                               shortcut.keys.includes('Alt + C') ? 'c' :
                               shortcut.keys.includes('Alt + H') ? 'h' :
                               shortcut.keys.includes('Alt + S') ? 's' :
                               shortcut.keys.includes('Alt + R') ? 'r' :
                               shortcut.keys.includes('Alt + B') ? 'b' :
                               shortcut.keys.includes('Alt + E') ? 'e' :
                               shortcut.keys.includes('Alt + Q') ? 'q' :
                               shortcut.keys.includes('Tab') ? 'Tab' :
                               shortcut.keys.includes('Enter') ? 'Enter' :
                               shortcut.keys.includes('Esc') ? 'Escape' :
                               shortcut.keys.includes('Ctrl + S') ? 's' :
                               shortcut.keys.includes('Ctrl + F') ? 'f' :
                               shortcut.keys.includes('Ctrl + Shift + N') ? 'n' :
                               shortcut.keys.includes('Ctrl + Shift + S') ? 's' :
                               shortcut.keys.includes('Ctrl + Arrow') ? 'ArrowUp' : 'Enter',
                          altKey: shortcut.keys.includes('Alt'),
                          ctrlKey: shortcut.keys.includes('Ctrl'),
                          shiftKey: shortcut.keys.includes('Shift'),
                          metaKey: false
                        });
                        document.dispatchEvent(event);
                      }}
                      aria-label={`${shortcut.action}. Press ${shortcut.keys} to activate.`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 group-hover:from-purple-500/40 group-hover:via-pink-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                            <Keyboard className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300 group-hover:text-white transition-colors text-left">
                            {shortcut.action}
                          </span>
                        </div>
                        <kbd className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 rounded-lg text-sm font-mono text-purple-200 backdrop-blur-sm group-hover:from-purple-600/40 group-hover:to-pink-600/40 transition-all duration-300 group-hover:scale-105">
                          {shortcut.keys}
                        </kbd>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips and Accessibility Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Power User Tips */}
          <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Power User Tips</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Accessibility Best Practices */}
          <div className={`transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Accessibility Features</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                {accessibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Help Center Callout */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Need More Help?</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Visit our comprehensive Help Center for detailed guides, tutorials, and support resources.
            </p>
            <button
              onClick={navigateToHelpCenter}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
            >
              <span>Visit Help Center</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

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
      `}</style>
    </div>
  );
};

export default KeyboardShortcuts;