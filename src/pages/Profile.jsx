import React, { useState, useEffect } from 'react';
import { User, Mail, Book, Award, Calendar, MapPin, Phone, Edit3, Camera, Share2, Heart, MessageCircle, BookOpen, Trophy, Target, Users, TrendingUp, Star, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, refreshAccessToken, logout } from '../utils/auth';
import SettingsModal from '../components/Settings';
import SettingsIcon from '../components/SettingsIcon';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigateToHome = () => {
    navigate('/home');
  };

  const openEditModal = () => {
    setEditFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      location: userData?.location || '',
      class: userData?.class || '',
      bio: userData?.bio || 'Passionate student dedicated to academic excellence and continuous learning.'
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const token = getAccessToken();
      const response = await fetch('http://localhost:5001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with new token
        const retryResponse = await fetch('http://localhost:5001/api/users/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editFormData)
        });

        if (!retryResponse.ok) {
          throw new Error('Failed to update profile');
        }

        const updatedData = await retryResponse.json();
        setUserData(updatedData);
      } else if (!response.ok) {
        throw new Error('Failed to update profile');
      } else {
        const updatedData = await response.json();
        setUserData(updatedData);
      }
      
      closeEditModal();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = getAccessToken();
      await fetch('http://localhost:5001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Use the logout utility function
      logout();
      
    } catch (err) {
      setError('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
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
        } else if (!response.ok) {
          throw new Error('Failed to fetch user data');
        } else {
          const data = await response.json();
          setUserData(data);
        }
        
        setLoading(false);
      } catch (err) {
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

  const achievements = [
    { title: "Top Performer", icon: Trophy, count: userData?.completedTests || 0 },
    { title: "Book Lover", icon: BookOpen, count: userData?.readBooks || 0 },
    { title: "Active Learner", icon: Target, count: Math.floor((userData?.completedTests || 0) * 1.5) },
    { title: "Knowledge Seeker", icon: Star, count: Math.floor((userData?.readBooks || 0) * 2) }
  ];

  const recentActivity = [
    { action: "Completed Math Test", time: "2 hours ago", score: "95%" },
    { action: "Read 'Advanced Physics'", time: "1 day ago", progress: "100%" },
    { action: "Joined Study Group", time: "3 days ago", members: "12 members" },
    { action: "Earned 'Quick Learner' Badge", time: "1 week ago", achievement: "🏆" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <button 
              onClick={navigateToHome}
              className="text-white hover:text-purple-400 transition-all text-sm sm:text-base"
            >
              ← Back to Home
            </button>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
              <button className="text-white hover:text-purple-400 transition-all">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={openEditModal}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base"
              >
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Edit Profile</span>
              </button>
              <div className="flex items-center gap-2 sm:gap-4">
                <SettingsIcon 
                  onClick={openSettings}
                  className="ml-auto"
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6 lg:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                  <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
                </div>
                <button className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-purple-600 hover:bg-purple-700 p-1.5 sm:p-2 rounded-full transition-all shadow-lg">
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{userData?.name || 'Student Name'}</h1>
                <p className="text-base sm:text-lg md:text-xl text-purple-300 mb-3 sm:mb-4">Student • Class {userData?.class || 'X'}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{userData?.completedTests || 0}</div>
                    <div className="text-xs sm:text-sm text-gray-300">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{userData?.readBooks || 0}</div>
                    <div className="text-xs sm:text-sm text-gray-300">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{Math.floor((userData?.completedTests || 0) * 0.8 + (userData?.readBooks || 0) * 1.2)}</div>
                    <div className="text-xs sm:text-sm text-gray-300">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">4.8</div>
                    <div className="text-xs sm:text-sm text-gray-300">Rating</div>
                  </div>
                </div>

                {/* Contact Info Pills */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3 sm:mb-4">
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center space-x-1.5 sm:space-x-2">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-xs sm:text-sm text-gray-300">{userData?.email || 'Not provided'}</span>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center space-x-1.5 sm:space-x-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-xs sm:text-sm text-gray-300">{userData?.location || 'Location'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-all text-sm sm:text-base">
                    Follow
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg border border-purple-500/30 transition-all text-sm sm:text-base">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white/5 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 mb-6 sm:mb-8 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
              {['overview', 'activity', 'achievements', 'connections'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all capitalize text-sm sm:text-base ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
                {/* About Section */}
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center space-x-1.5 sm:space-x-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <span>About</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {userData?.bio || "Passionate student dedicated to academic excellence and continuous learning. Always eager to explore new subjects and challenge myself with advanced concepts."}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    Member since {new Date(userData?.createdAt).toLocaleDateString()}.
                  </p>
                </div>

                {/* Academic Progress */}
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center space-x-1.5 sm:space-x-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <span>Academic Progress</span>
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex justify-between mb-1.5 sm:mb-2">
                        <span className="text-sm sm:text-base text-gray-300">Mathematics</span>
                        <span className="text-sm sm:text-base text-purple-400">92%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2 sm:h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 sm:h-3 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 sm:mb-2">
                        <span className="text-sm sm:text-base text-gray-300">Science</span>
                        <span className="text-sm sm:text-base text-purple-400">88%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2 sm:h-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 sm:h-3 rounded-full" style={{width: '88%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 sm:mb-2">
                        <span className="text-sm sm:text-base text-gray-300">Literature</span>
                        <span className="text-sm sm:text-base text-purple-400">95%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2 sm:h-3">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 sm:h-3 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Quick Stats */}
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Stats</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-gray-300">Account Status</span>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-gray-300">Streak</span>
                      <span className="text-sm sm:text-base text-orange-400 font-semibold">15 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-gray-300">Rank</span>
                      <span className="text-sm sm:text-base text-purple-400 font-semibold">#12</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact Info</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                      <span className="text-xs sm:text-sm text-gray-300">{userData?.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                      <span className="text-xs sm:text-sm text-gray-300">Last Login: {new Date(userData?.lastLogin || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Recent Activity</h2>
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-purple-800/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-white font-medium">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{activity.time}</p>
                    </div>
                    <div className="text-sm sm:text-base text-purple-400 font-semibold">
                      {activity.score || activity.progress || activity.members || activity.achievement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-base text-white font-semibold mb-1.5 sm:mb-2">{achievement.title}</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-400 mb-0.5 sm:mb-1">{achievement.count}</p>
                    <p className="text-xs sm:text-sm text-gray-400">Earned</p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-800/30 backdrop-blur-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center space-x-1.5 sm:space-x-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span>Study Connections</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white/5 rounded-lg border border-purple-800/20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-white font-medium">Student {i}</p>
                      <p className="text-xs sm:text-sm text-gray-400">Class {10 + i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-purple-800/30">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Profile</h2>
              <button 
                onClick={closeEditModal}
                className="text-gray-400 hover:text-white transition-all text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-4 sm:space-y-6">
              {/* Profile Picture Section */}
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <button 
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all flex items-center space-x-1.5 sm:space-x-2 mx-auto text-sm sm:text-base"
                >
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Change Photo</span>
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    value={editFormData.class}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                    required
                  >
                    <option value="" className="bg-slate-800">Select Class</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                      <option key={num} value={num} className="bg-slate-800">Class {num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter your location"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editFormData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1.5 sm:space-x-2 text-sm sm:text-base"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-md border border-red-800/30">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <LogOut className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">Confirm Logout</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                Are you sure you want to logout? You'll need to sign in again to access your profile.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={cancelLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1.5 sm:space-x-2 text-sm sm:text-base"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Yes, Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
};

export default Profile;