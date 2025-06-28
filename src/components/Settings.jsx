import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  Mail, 
  Check, 
  BookOpen, 
  Clock, 
  Eye, 
  Lock, 
  Volume2, 
  Languages,
  Download,
  Shield,
  User,
  VolumeX,
  Mic,
  Palette,
  X,
  ArrowLeft,
  Search,
  HelpCircle
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Settings = ({ isOpen, onClose }) => {
  const { theme, setTheme, fontSize, setFontSize } = useSettings();

  // Notification Settings
  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem('notifications') || 'true');
  });
  const [emailUpdates, setEmailUpdates] = useState(() => {
    return JSON.parse(localStorage.getItem('emailUpdates') || 'true');
  });
  const [studyReminders, setStudyReminders] = useState(() => {
    return JSON.parse(localStorage.getItem('studyReminders') || 'true');
  });

  // Study Preferences
  const [readingSpeed, setReadingSpeed] = useState(() => {
    return localStorage.getItem('readingSpeed') || 'normal';
  });
  const [autoSave, setAutoSave] = useState(() => {
    return JSON.parse(localStorage.getItem('autoSave') || 'true');
  });

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState(() => {
    return localStorage.getItem('profileVisibility') || 'public';
  });
  const [activityTracking, setActivityTracking] = useState(() => {
    return JSON.parse(localStorage.getItem('activityTracking') || 'true');
  });

  // Enhanced Voice Settings
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem('voiceEnabled') || 'true');
  });
  const [voiceVolume, setVoiceVolume] = useState(() => {
    return localStorage.getItem('voiceVolume') || '80';
  });
  const [voiceSpeed, setVoiceSpeed] = useState(() => {
    return localStorage.getItem('voiceSpeed') || '1';
  });
  const [selectedVoice, setSelectedVoice] = useState(() => {
    return localStorage.getItem('selectedVoice') || 'default';
  });
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en-US';
  });
  const [voiceGender, setVoiceGender] = useState(() => {
    return localStorage.getItem('voiceGender') || 'any';
  });
  const [voiceAge, setVoiceAge] = useState(() => {
    return localStorage.getItem('voiceAge') || 'adult';
  });
  const [availableVoices, setAvailableVoices] = useState([]);
  const [filteredVoices, setFilteredVoices] = useState([]);

  // UI State
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');

  // Load and filter available voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      filterVoices(voices, selectedLanguage, voiceGender, voiceAge);
    }
  }, [selectedLanguage, voiceGender, voiceAge]);

  const filterVoices = (voices, language, gender, age) => {
    let filtered = [...voices];
    
    // Filter by language
    if (language !== 'any') {
      filtered = filtered.filter(voice => voice.lang.startsWith(language));
    }
    
    // Filter by gender (if available in voice name)
    if (gender !== 'any') {
      filtered = filtered.filter(voice => 
        voice.name.toLowerCase().includes(gender.toLowerCase())
      );
    }
    
    // Filter by age (if available in voice name)
    if (age !== 'any') {
      filtered = filtered.filter(voice => 
        voice.name.toLowerCase().includes(age.toLowerCase())
      );
    }
    
    setFilteredVoices(filtered);
  };

  const handleSettingChange = (setting, value) => {
    switch(setting) {
      case 'theme':
        setTheme(value);
        break;
      case 'fontSize':
        setFontSize(value);
        break;
      case 'notifications':
        setNotifications(value);
        break;
      case 'emailUpdates':
        setEmailUpdates(value);
        break;
      case 'studyReminders':
        setStudyReminders(value);
        break;
      case 'readingSpeed':
        setReadingSpeed(value);
        break;
      case 'autoSave':
        setAutoSave(value);
        break;
      case 'profileVisibility':
        setProfileVisibility(value);
        break;
      case 'activityTracking':
        setActivityTracking(value);
        break;
      case 'voiceEnabled':
        setVoiceEnabled(value);
        break;
      case 'voiceVolume':
        setVoiceVolume(value);
        break;
      case 'voiceSpeed':
        setVoiceSpeed(value);
        break;
      case 'selectedVoice':
        setSelectedVoice(value);
        break;
      case 'selectedLanguage':
        setSelectedLanguage(value);
        break;
      case 'voiceGender':
        setVoiceGender(value);
        break;
      case 'voiceAge':
        setVoiceAge(value);
        break;
    }
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    // Save notification preferences
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('emailUpdates', JSON.stringify(emailUpdates));
    localStorage.setItem('studyReminders', JSON.stringify(studyReminders));
    
    // Save study preferences
    localStorage.setItem('readingSpeed', readingSpeed);
    localStorage.setItem('autoSave', JSON.stringify(autoSave));
    
    // Save privacy settings
    localStorage.setItem('profileVisibility', profileVisibility);
    localStorage.setItem('activityTracking', JSON.stringify(activityTracking));

    // Save enhanced voice settings
    localStorage.setItem('voiceEnabled', JSON.stringify(voiceEnabled));
    localStorage.setItem('voiceVolume', voiceVolume);
    localStorage.setItem('voiceSpeed', voiceSpeed);
    localStorage.setItem('selectedVoice', selectedVoice);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    localStorage.setItem('voiceGender', voiceGender);
    localStorage.setItem('voiceAge', voiceAge);

    // Show save feedback
    setShowSaveFeedback(true);
    setHasUnsavedChanges(false);

    // Hide feedback after 2 seconds
    setTimeout(() => {
      setShowSaveFeedback(false);
    }, 2000);
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'appearance':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                Theme Settings
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <button
                  onClick={() => handleSettingChange('theme', 'light')}
                  className={`p-2 sm:p-4 rounded-lg flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">Light</span>
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'dark')}
                  className={`p-2 sm:p-4 rounded-lg flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">Dark</span>
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'normal')}
                  className={`p-2 sm:p-4 rounded-lg flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
                    theme === 'normal'
                      ? 'bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">System</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
                <button
                  onClick={() => handleSettingChange('theme', 'purple')}
                  className={`p-2 sm:p-4 rounded-lg flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
                    theme === 'purple'
                      ? 'bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">Purple</span>
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'blue')}
                  className={`p-2 sm:p-4 rounded-lg flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
                    theme === 'blue'
                      ? 'bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">Blue</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                Reading Preferences
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    Font Size
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                    className="w-full p-1.5 sm:p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    Reading Speed
                  </label>
                  <select
                    value={readingSpeed}
                    onChange={(e) => handleSettingChange('readingSpeed', e.target.value)}
                    className="w-full p-1.5 sm:p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive instant updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Email Updates</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get weekly summaries</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={emailUpdates}
                      onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Study Reminders</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Daily study schedule alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={studyReminders}
                      onChange={(e) => handleSettingChange('studyReminders', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={profileVisibility}
                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Activity Tracking</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track study progress</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={activityTracking}
                      onChange={(e) => handleSettingChange('activityTracking', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'voice':
        return (
          <div className="h-[calc(100vh-16rem)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2 sticky top-0 bg-white dark:bg-gray-800 py-2 z-10">
                  <Mic className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Voice Assistant Settings
                </h3>
                <div className="space-y-4 sm:space-y-6 pb-4">
                  {/* Voice Enable/Disable */}
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Voice Assistant</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enable or disable voice assistance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={voiceEnabled}
                        onChange={(e) => handleSettingChange('voiceEnabled', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {/* Language Selection */}
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleSettingChange('selectedLanguage', e.target.value)}
                      className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
                      disabled={!voiceEnabled}
                    >
                      <option value="any">Any Language</option>
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es-ES">Spanish</option>
                      <option value="fr-FR">French</option>
                      <option value="de-DE">German</option>
                      <option value="it-IT">Italian</option>
                      <option value="pt-BR">Portuguese</option>
                      <option value="ru-RU">Russian</option>
                      <option value="ja-JP">Japanese</option>
                      <option value="ko-KR">Korean</option>
                      <option value="zh-CN">Chinese</option>
                      <option value="hi-IN">Hindi</option>
                      <option value="ar-SA">Arabic</option>
                    </select>
                  </div>

                  {/* Voice Gender */}
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Voice Gender
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {['any', 'male', 'female', 'neutral'].map((gender) => (
                        <button
                          key={gender}
                          onClick={() => handleSettingChange('voiceGender', gender)}
                          disabled={!voiceEnabled}
                          className={`p-2 sm:p-2.5 rounded-lg text-center transition-all ${
                            voiceGender === gender
                              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 border-2 border-purple-500 dark:border-purple-400'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'
                          } ${!voiceEnabled && 'opacity-50 cursor-not-allowed'}`}
                        >
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Voice Age */}
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Voice Age
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                      {['any', 'child', 'teen', 'adult', 'senior'].map((age) => (
                        <button
                          key={age}
                          onClick={() => handleSettingChange('voiceAge', age)}
                          disabled={!voiceEnabled}
                          className={`p-2 sm:p-2.5 rounded-lg text-center transition-all ${
                            voiceAge === age
                              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 border-2 border-purple-500 dark:border-purple-400'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'
                          } ${!voiceEnabled && 'opacity-50 cursor-not-allowed'}`}
                        >
                          {age.charAt(0).toUpperCase() + age.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Voice Selection */}
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Voice Type
                    </label>
                    <select
                      value={selectedVoice}
                      onChange={(e) => handleSettingChange('selectedVoice', e.target.value)}
                      className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
                      disabled={!voiceEnabled}
                    >
                      {filteredVoices.length > 0 ? (
                        filteredVoices.map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </option>
                        ))
                      ) : (
                        <option value="default">No matching voices found</option>
                      )}
                    </select>
                  </div>

                  {/* Voice Volume */}
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Voice Volume
                      </label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{voiceVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={voiceVolume}
                      onChange={(e) => handleSettingChange('voiceVolume', e.target.value)}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
                      disabled={!voiceEnabled}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Voice Speed */}
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Speaking Speed
                      </label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{voiceSpeed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSpeed}
                      onChange={(e) => handleSettingChange('voiceSpeed', e.target.value)}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
                      disabled={!voiceEnabled}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>0.5x</span>
                      <span>1.25x</span>
                      <span>2x</span>
                    </div>
                  </div>

                  {/* Test Voice Button */}
                  <button
                    onClick={() => {
                      if (voiceEnabled && 'speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance('This is a test of the voice assistant settings.');
                        utterance.voice = filteredVoices.find(v => v.name === selectedVoice) || null;
                        utterance.volume = voiceVolume / 100;
                        utterance.rate = parseFloat(voiceSpeed);
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    disabled={!voiceEnabled}
                    className={`w-full p-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      voiceEnabled
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" />
                    Test Voice Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-[800px] h-[95vh] sm:h-[90vh] md:h-auto shadow-xl transform transition-all duration-300 scale-100 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
            Settings
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 sm:p-2"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* Sidebar Navigation - Hidden on mobile, shown in bottom sheet */}
          <div className="hidden sm:block w-40 md:w-48 border-r border-gray-200 dark:border-gray-700 p-2 sm:p-3 md:p-4">
            <nav className="space-y-1 sm:space-y-2">
              {[
                { id: 'appearance', label: 'Appearance', icon: Eye },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'voice', label: 'Voice', icon: Mic },
                { id: 'privacy', label: 'Privacy', icon: Shield },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation - Bottom Sheet */}
          <div className="sm:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between p-1 sm:p-2">
              {[
                { id: 'appearance', label: 'Appearance', icon: Eye },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'voice', label: 'Voice', icon: Mic },
                { id: 'privacy', label: 'Privacy', icon: Shield },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex flex-col items-center p-1.5 sm:p-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            {renderSection()}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {showSaveFeedback && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Changes saved successfully!</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleClose}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                disabled={!hasUnsavedChanges}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                  hasUnsavedChanges
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your index.css or equivalent
const customScrollbarStyles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.7);
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = customScrollbarStyles;
document.head.appendChild(styleSheet);

export default Settings; 