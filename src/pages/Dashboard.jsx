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

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
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
    { id: 2, title: "Physics Fundamentals", progress: 60, lastAccessed: "Yesterday", color: "bg-green-500" },
    { id: 3, title: "Chemistry Basics", progress: 45, lastAccessed: "3 days ago", color: "bg-yellow-500" },
    { id: 4, title: "Biology Essentials", progress: 30, lastAccessed: "1 week ago", color: "bg-red-500" }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Header */}
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
              <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
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
                <span className="text-white text-sm">{userData?.name || 'Student'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userData?.name || 'Student'}! 👋
          </h2>
          <p className="text-purple-300">Ready to continue your learning journey?</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Progress Overview */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-6 border border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{stats.chaptersCompleted}</span>
            </div>
            <h3 className="text-blue-300 font-semibold mb-1">Chapters Completed</h3>
            <p className="text-xs text-blue-200/70">out of {stats.totalChapters} total</p>
            <div className="mt-3 w-full bg-blue-900/30 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Test Performance */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-6 border border-green-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-400" />
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
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-400" />
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
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl p-6 border border-yellow-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
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
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Continue Learning</h3>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{course.title}</h4>
                      <p className="text-purple-300 text-sm">{course.lastAccessed}</p>
                      <div className="mt-2 w-full bg-purple-900/30 rounded-full h-2">
                        <div 
                          className={`${course.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold">{course.progress}%</span>
                      <PlayCircle className="w-8 h-8 text-purple-400 hover:text-purple-300 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Weekly Study Activity</h3>
              <div className="flex items-end justify-between h-32 gap-2">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-purple-500 rounded-t-lg w-full transition-all duration-500 hover:bg-purple-400"
                      style={{ height: `${(stat.hours / 5) * 100}%` }}
                    ></div>
                    <span className="text-purple-300 text-xs mt-2">{stat.day}</span>
                    <span className="text-white text-xs font-semibold">{stat.hours}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-purple-300 p-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white">Completed Chapter 5: Advanced Calculus</span>
                    <p className="text-sm text-purple-300">Mathematics Course</p>
                  </div>
                  <span className="text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center gap-4 text-purple-300 p-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white">Scored 92% in Physics Quiz</span>
                    <p className="text-sm text-purple-300">Physics Fundamentals</p>
                  </div>
                  <span className="text-sm">Yesterday</span>
                </div>
                <div className="flex items-center gap-4 text-purple-300 p-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <BookmarkPlus className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white">Added "Quantum Physics" to watchlist</span>
                    <p className="text-sm text-purple-300">Course Library</p>
                  </div>
                  <span className="text-sm">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{deadline.title}</p>
                      <p className="text-purple-300 text-sm">Due in {deadline.dueDate}</p>
                    </div>
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5'
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
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Performance Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white">Improvement Rate</span>
                  </div>
                  <span className="text-green-400 font-semibold">+15%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Learning Streak</span>
                  </div>
                  <span className="text-purple-400 font-semibold">7 days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
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
    </div>
  );
};

export default Dashboard;