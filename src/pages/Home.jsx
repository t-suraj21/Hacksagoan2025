import React, { useState, useEffect } from 'react';
import {
  Book,
  FileText,
  Headphones,
  Keyboard,
  ArrowRight,
  User,
  NotebookPen,
  HelpCircle,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NUM_PARTICLES = 50;

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [blobPositions, setBlobPositions] = useState({
    blob1: { x: 0, y: 0 },
    blob2: { x: 0, y: 0 },
    blob3: { x: 0, y: 0 }
  });
  const navigate = useNavigate();

  // Navigation functions
  const navigateToLibrary = () => navigate('/library');
  const navigateToTests = () => navigate('/test/class1/math/chapter1');
  const navigateToProfile = () => navigate('/profile');
  const navigateToNotebook = () => navigate('/notebook');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToCommunity = () => navigate('/community');
  const navigateToBlog = () => navigate('/blog');
  const navigateToHelpCenter = () => navigate('/help-center');
  const navigateToDocs = () => navigate('/documentation');
  const navigateToShortcuts = () => navigate('/keyboard-shortcuts');

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

  const quickActions = [
    {
      id: 'library',
      title: 'Digital Library',
      description: 'Access thousands of audiobooks and study materials',
      icon: Book,
      action: navigateToLibrary,
      shortcut: 'Alt + L'
    },
    {
      id: 'tests',
      title: 'Tests',
      description: 'Take interactive tests',
      icon: FileText,
      action: navigateToTests,
      shortcut: 'Alt + T'
    },
    {
      id: 'notes',
      title: 'Notes',
      description: 'Make Your Notes',
      icon: NotebookPen,
      action: navigateToNotebook,
      shortcut: 'Alt + N'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View Your Progress',
      icon: FileText,
      action: navigateToDashboard,
      shortcut: 'Alt + D'
    }
  ];

  const features = [
    {
      icon: Headphones,
      title: 'Immersive Audio',
      description: 'Spatial audio positioning for better content navigation'
    },
    {
      icon: Keyboard,
      title: 'Keyboard Shortcuts',
      description: 'Comprehensive keyboard navigation for power users'
    }
  ];

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
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),\n                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
            transform: `translate(${mousePosition.x * 0.001}px, ${mousePosition.y * 0.001}px)`
          }} 
        />
      </div>

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg z-50 transform transition-all duration-300 hover:scale-105"
      >
        Skip to main content
      </a>

      {/* Sticky Header with Enhanced Glassmorphism */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Branding */}
            <div className={`flex items-center space-x-3 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Garur
              </h1>
            </div>

            {/* Top Navigation */}
            <nav className={`flex items-center space-x-6 text-sm font-medium transition-all duration-1000 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <button 
                onClick={navigateToProfile} 
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <User className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">Profile</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
            <span className="text-gray-300 text-sm font-medium">Next-Gen Accessible Learning Platform</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Learn Without
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Limits
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience education through intuitive navigation designed specifically for blind and visually impaired learners.
          </p>

          {/* Enhanced Glowing CTA Button */}
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-400/50">
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </button>
        </div>

        {/* Quick Actions with Enhanced Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div
                key={action.id}
                className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <button
                  className="group relative w-full p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-purple-400/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                  onClick={action.action}
                  aria-label={`${action.title}. ${action.description}. Keyboard shortcut: ${action.shortcut}`}
                >
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 group-hover:from-blue-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-xl transition-all duration-300" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {action.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                        {action.description}
                      </p>
                      <div className="inline-flex items-center text-xs text-purple-400 bg-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
                        <Keyboard className="w-3 h-3 mr-2" />
                        {action.shortcut}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-purple-400" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Designed for Accessibility
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 focus-within:ring-2 focus-within:ring-purple-400 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
                  tabIndex="0"
                >
                  <div className="flex items-start space-x-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 group-hover:from-blue-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                      {feature.title === 'Keyboard Shortcuts' && (
                        <button 
                          onClick={navigateToShortcuts}
                          className="inline-flex items-center mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium group-hover:underline"
                        >
                          View All Keyboard Shortcuts
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accessibility Instructions */}
        <div className={`relative p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl" />
          <div className="relative">
            <h3 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Navigation Help
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Use Tab to navigate through the interface. Press Enter to activate buttons and links.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-purple-400" />
                  Keyboard Shortcuts
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex justify-between">
                    <span>Go to Library</span>
                    <code className="px-2 py-1 bg-gray-800 rounded text-xs">Alt + L</code>
                  </li>
                  <li className="flex justify-between">
                    <span>Go to Tests</span>
                    <code className="px-2 py-1 bg-gray-800 rounded text-xs">Alt + T</code>
                  </li>
                  <li className="flex justify-between">
                    <span>Navigate elements</span>
                    <code className="px-2 py-1 bg-gray-800 rounded text-xs">Tab</code>
                  </li>
                  <li className="flex justify-between">
                    <span>Activate element</span>
                    <code className="px-2 py-1 bg-gray-800 rounded text-xs">Enter</code>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-purple-400" />
                  Features
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li>✨ Keyboard Navigation</li>
                  <li>🔊 Screen Reader Support</li>
                  <li>🎨 High Contrast Mode</li>
                  <li>⚡ Fast Performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/20 backdrop-blur-xl bg-black/30 mt-20">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Garur
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering education through accessible learning solutions for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={navigateToLibrary} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Digital Library
                  </button>
                </li>
                <li>
                  <button onClick={navigateToTests} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Tests
                  </button>
                </li>
                <li>
                  <button onClick={navigateToNotebook} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Notebook
                  </button>
                </li>
                <li>
                  <button onClick={navigateToDashboard} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={navigateToDocs} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Documentation
                  </button>
                </li>
                <li>
                  <button onClick={navigateToHelpCenter} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={navigateToCommunity} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Community
                  </button>
                </li>
                <li>
                  <button onClick={navigateToBlog} className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:support@garur.com" className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    support@garur.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                ©️ {new Date().getFullYear()} Garur. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm hover:underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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

export default Home;