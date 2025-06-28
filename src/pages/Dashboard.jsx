import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, refreshAccessToken } from '../utils/auth';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Award,
  BarChart2,
  CheckCircle,
  Book,
  ArrowLeft,
  Calendar,
  Users,
  PlayCircle,
  FileText,
  Star,
  Zap,
  Brain,
  Timer,
  Medal,
  Activity,
  ChevronRight,
  Bell,
  Settings,
  User,
  PieChart,
  TrendingDown,
  AlertCircle,
  BookmarkPlus
} from 'lucide-react';

const NUM_PARTICLES = 30;

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [blobPositions, setBlobPositions] = useState({
    blob1: { x: 0, y: 0 },
    blob2: { x: 0, y: 0 },
    blob3: { x: 0, y: 0 }
  });
  const [stats, setStats] = useState({
    chaptersCompleted: 0,
    totalChapters: 0,
    testsCompleted: 0,
    averageScore: 0,
    totalStudyTime: 0,
    rank: 0
  });

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          // Token expired, try to refresh
          const newToken = await refreshAccessToken();
          // Retry the request with new token
          const retryResponse = await fetch('http://localhost:5001/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${newToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (!retryResponse.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await retryResponse.json();
          setUserData(data);
          setStats({
            chaptersCompleted: data.completedChapters || 0,
            totalChapters: data.totalChapters || 0,
            testsCompleted: data.completedTests || 0,
            averageScore: data.averageScore || 0,
            totalStudyTime: data.totalStudyTime || 0,
            rank: data.rank || 0
          });
        } else if (!response.ok) {
          throw new Error('Failed to fetch user data');
        } else {
          const data = await response.json();
          setUserData(data);
          setStats({
            chaptersCompleted: data.completedChapters || 0,
            totalChapters: data.totalChapters || 0,
            testsCompleted: data.completedTests || 0,
            averageScore: data.averageScore || 0,
            totalStudyTime: data.totalStudyTime || 0,
            rank: data.rank || 0
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setLoading(false);
        if (err.message === 'Failed to fetch user data') {
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const progressPercentage = stats.totalChapters > 0 ? (stats.chaptersCompleted / stats.totalChapters) * 100 : 0;

  // Mock data for enhanced features
  const recentCourses = [
    { id: 1, title: "Advanced Mathematics", progress: 75, lastAccessed: "2 hours ago", color: "bg-blue-500" },
    { id: 2, title: "Physics Fundamentals", progress: 60, lastAccessed: "Yesterday", color: "bg-purple-500" },
    { id: 3, title: "Chemistry Basics", progress: 45, lastAccessed: "3 days ago", color: "bg-pink-500" },
    { id: 4, title: "Biology Essentials", progress: 30, lastAccessed: "1 week ago", color: "bg-blue-600" }
  ];

  const upcomingDeadlines = [
    { id: 1, title: "Math Assignment", dueDate: "Tomorrow", priority: "high" },
    { id: 2, title: "Physics Quiz", dueDate: "3 days", priority: "medium" },
    { id: 3, title: "Chemistry Lab Report", dueDate: "1 week", priority: "low" }
  ];

  const achievements = [
    { icon: Trophy, title: "Top Performer", description: "Scored 90%+ in 5 tests", unlocked: true },
    { icon: Medal, title: "Study Streak", description: "7 days consecutive study", unlocked: true },
    { icon: Star, title: "Quick Learner", description: "Complete 10 chapters", unlocked: false },
    { icon: Zap, title: "Speed Demon", description: "Finish test in under 30 min", unlocked: false }
  ];

  const weeklyStats = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.1 },
    { day: "Fri", hours: 2.9 },
    { day: "Sat", hours: 3.5 },
    { day: "Sun", hours: 2.1 }
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

      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Student Dashboard</h1>
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
                <span className="text-white text-sm">{userData?.name || 'Student'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userData?.name || 'Student'}! 👋
          </h2>
          <p className="text-gray-400">Ready to continue your learning journey?</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Progress Overview */}
          <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 group-hover:from-blue-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.chaptersCompleted}</span>
            </div>
            <h3 className="text-blue-300 font-semibold mb-1">Chapters Completed</h3>
            <p className="text-xs text-blue-200/70">out of {stats.totalChapters} total</p>
            <div className="mt-3 w-full bg-blue-900/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Test Performance */}
          <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/30 via-blue-500/30 to-purple-500/30 group-hover:from-green-500/40 group-hover:via-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.averageScore}%</span>
            </div>
            <h3 className="text-green-300 font-semibold mb-1">Average Score</h3>
            <p className="text-xs text-green-200/70">{stats.testsCompleted} tests completed</p>
            <div className="mt-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-300">+5% from last month</span>
            </div>
          </div>

          {/* Study Time */}
          <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 group-hover:from-purple-500/40 group-hover:via-pink-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{Math.floor(stats.totalStudyTime / 60)}h</span>
            </div>
            <h3 className="text-purple-300 font-semibold mb-1">Study Time</h3>
            <p className="text-xs text-purple-200/70">This month</p>
            <div className="mt-3 flex items-center gap-2">
              <Timer className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300">2.5h daily average</span>
            </div>
          </div>

          {/* Ranking */}
          <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-red-500/30 group-hover:from-yellow-500/40 group-hover:via-orange-500/40 group-hover:to-red-500/40 transition-all duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">#{stats.rank}</span>
            </div>
            <h3 className="text-yellow-300 font-semibold mb-1">Class Rank</h3>
            <p className="text-xs text-yellow-200/70">out of 150 students</p>
            <div className="mt-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-yellow-300">Top 10%</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Courses */}
            <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Continue Learning</h3>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="group/course flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center group-hover/course:scale-110 transition-transform duration-300`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{course.title}</h4>
                      <p className="text-gray-400 text-sm">{course.lastAccessed}</p>
                      <div className="mt-2 w-full bg-gray-700/30 rounded-full h-2">
                        <div 
                          className={`${course.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold">{course.progress}%</span>
                      <PlayCircle className="w-8 h-8 text-purple-400 hover:text-purple-300 mt-2 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Weekly Study Activity</h3>
              <div className="flex items-end justify-between h-32 gap-2">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 group/bar">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg w-full transition-all duration-500 hover:from-blue-400 hover:to-purple-400 group-hover/bar:scale-110"
                      style={{ height: `${(stat.hours / 5) * 100}%` }}
                    ></div>
                    <span className="text-gray-400 text-xs mt-2">{stat.day}</span>
                    <span className="text-white text-xs font-semibold">{stat.hours}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white">Completed Chapter 5: Advanced Calculus</span>
                    <p className="text-sm text-gray-400">Mathematics Course</p>
                  </div>
                  <span className="text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white">Scored 92% in Physics Quiz</span>
                    <p className="text-sm text-gray-400">Physics Fundamentals</p>
                  </div>
                  <span className="text-sm">Yesterday</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <BookmarkPlus className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white">Added "Quantum Physics" to watchlist</span>
                    <p className="text-sm text-gray-400">Course Library</p>
                  </div>
                  <span className="text-sm">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{deadline.title}</p>
                      <p className="text-gray-400 text-sm">Due in {deadline.dueDate}</p>
                    </div>
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    achievement.unlocked ? 'bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20' : 'bg-white/5 hover:bg-white/10'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                    }`}>
                      <achievement.icon className={`w-5 h-5 ${
                        achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.title}
                      </p>
                      <p className={`text-sm ${achievement.unlocked ? 'text-yellow-300' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Performance Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white">Improvement Rate</span>
                  </div>
                  <span className="text-green-400 font-semibold">+15%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Learning Streak</span>
                  </div>
                  <span className="text-purple-400 font-semibold">7 days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Study Groups</span>
                  </div>
                  <span className="text-blue-400 font-semibold">3 active</span>
                </div>
              </div>
            </div>
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

export default Dashboard;