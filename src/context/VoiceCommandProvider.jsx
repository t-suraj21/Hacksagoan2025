import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceCommandContext = createContext();

// Enhanced command patterns with more natural language support
const commandPatterns = [
  // Navigation commands
  { pattern: /(?:go to|open|navigate to|show|take me to) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy)/i, action: 'navigation' },
  { pattern: /(?:open|go to|navigate to|show) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy)/i, action: 'navigation' },
  
  // Note management
  { pattern: /(?:create|make|start|new) (?:a )?(note|notebook entry)/i, action: 'create-note' },
  { pattern: /(?:save|store) (?:the )?(note|notebook entry)/i, action: 'save-note' },
  { pattern: /(?:delete|remove|erase) (?:the )?(note|notebook entry)/i, action: 'delete-note' },
  
  // Book commands
  { pattern: /(?:open|read|show|find) (?:the )?book ([^ ]+)(?: (?:in|for) class (\d+))?(?: (?:subject|for) ([^ ]+))?/i, action: 'open-book-advanced' },
  { pattern: /(?:open|read|show|find) (?:the )?book (.+)/i, action: 'open-book' },
  { pattern: /(?:search for|find) (?:a )?book (.+)/i, action: 'search-book' },
  
  // Test commands
  { pattern: /(?:start|begin|take|create) (?:a )?(test|exam|quiz)(?: for)?(?: class (\d+))?(?: (?:subject|in) ([^ ]+))?(?: chapter (\d+))?/i, action: 'start-test' },
  { pattern: /(?:open|go to) (?:the )?test(?: page)?/i, action: 'open-test' },
  
  // Note dictation
  { pattern: /(?:set|change|update) (?:the )?title (?:to )?(.+)/i, action: 'note-title' },
  { pattern: /(?:set|change|update) (?:the )?content (?:to )?(.+)/i, action: 'note-content' },
  { pattern: /(?:add|write|type) (?:to )?(?:the )?content (.+)/i, action: 'note-content-append' },
  
  // System commands
  { pattern: /(?:stop|end|quit) (?:listening|voice|commands)/i, action: 'stop-listening' },
  { pattern: /(?:start|begin|resume) (?:listening|voice|commands)/i, action: 'start-listening' },
  { pattern: /(?:what can I say|help|commands|voice commands)/i, action: 'show-help' },
  { pattern: /(?:clear|reset|clear all)/i, action: 'clear-all' },
  
  // Quick actions
  { pattern: /(?:go back|back|previous|return)/i, action: 'go-back' },
  { pattern: /(?:refresh|reload)/i, action: 'refresh' },
  { pattern: /(?:close|exit|quit)/i, action: 'close' },
];

export const VoiceCommandProvider = ({ children }) => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [noteState, setNoteState] = useState({ mode: null, title: '', content: '' });
  const [isEnabled, setIsEnabled] = useState(false); // Start disabled by default
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Check for HTTPS and browser support
  useEffect(() => {
    const checkBrowserSupport = () => {
      // Check if running on HTTPS or localhost
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      
      if (!isSecure) {
        setError('Voice commands require HTTPS. Please use a secure connection.');
        setFeedback('Voice commands require HTTPS');
        return false;
      }

      // Check for speech recognition support
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        setError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
        setFeedback('Speech recognition not supported');
        return false;
      }

      return true;
    };

    const browserSupported = checkBrowserSupport();
    if (browserSupported) {
      setFeedback('Click the microphone to enable voice commands');
    }
  }, []);

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
        setPermissionGranted(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Microphone permission denied:', err);
      setError('Microphone permission denied. Please allow microphone access.');
      setFeedback('Microphone permission denied');
      return false;
    }
  };

  // Start listening automatically on mount (only if enabled)
  useEffect(() => {
    if (isEnabled && permissionGranted) {
      startListening();
    }
    return () => stopListening();
    // eslint-disable-next-line
  }, [isEnabled, permissionGranted]);

  // Start speech recognition with enhanced configuration
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser.');
      setFeedback('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }

    if (!permissionGranted) {
      setError('Microphone permission required');
      setFeedback('Microphone permission required');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Enhanced configuration
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      
      recognition.onstart = () => {
        setListening(true);
        setError('');
        setFeedback('🎤 Listening... Say "help" for commands');
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        let maxConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            maxConfidence = Math.max(maxConfidence, confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        setConfidence(maxConfidence);
        
        if (finalTranscript) {
          const cleanTranscript = finalTranscript.trim();
          setLastTranscript(cleanTranscript);
          addToHistory(cleanTranscript);
          handleCommand(cleanTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        // Handle specific errors
        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access in your browser settings.');
            setFeedback('Microphone access denied');
            setIsEnabled(false);
            break;
          case 'no-speech':
            setError('No speech detected. Please try again.');
            setFeedback('No speech detected');
            break;
          case 'audio-capture':
            setError('Audio capture failed. Please check your microphone.');
            setFeedback('Audio capture failed');
            break;
          case 'network':
            setError('Network error. Please check your connection.');
            setFeedback('Network error');
            break;
          default:
            setError(`Voice recognition error: ${event.error}`);
            setFeedback('Voice recognition error');
        }
        
        setListening(false);
        
        // Auto-restart on certain errors
        if (['no-speech', 'audio-capture', 'network'].includes(event.error)) {
          setTimeout(() => {
            if (isEnabled && permissionGranted) startListening();
          }, 2000);
        }
      };

      recognition.onend = () => {
        setListening(false);
        // Auto-restart if still enabled
        if (isEnabled && permissionGranted) {
          setTimeout(() => startListening(), 1000);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setError(`Failed to start speech recognition: ${err.message}`);
      setFeedback('Failed to start voice commands');
    }
  };

  // Stop speech recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      setFeedback('Voice commands stopped');
    }
  };

  // Toggle voice commands
  const toggleVoiceCommands = async () => {
    if (isEnabled) {
      setIsEnabled(false);
      stopListening();
      setFeedback('Voice commands disabled');
    } else {
      // Request permission first
      const permissionGranted = await requestMicrophonePermission();
      if (permissionGranted) {
        setIsEnabled(true);
        setFeedback('Voice commands enabled');
      }
    }
  };

  // Add command to history
  const addToHistory = (command) => {
    setCommandHistory(prev => [
      { command, timestamp: new Date().toISOString(), confidence },
      ...prev.slice(0, 9) // Keep last 10 commands
    ]);
  };

  // Enhanced speech synthesis
  const speak = (text, priority = 'normal') => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Use a more natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Natural')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Enhanced library filter helper
  const setLibraryFilters = (cls, subject) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Set class filter
          if (cls) {
            const classSelects = document.querySelectorAll('select');
            classSelects.forEach(select => {
              const classOption = Array.from(select.options).find(opt => 
                opt.text.toLowerCase().includes(`class ${cls}`.toLowerCase())
              );
              if (classOption) {
                select.value = classOption.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
              }
            });
          }

          // Set subject filter
          if (subject) {
            const subjectSelects = document.querySelectorAll('select');
            subjectSelects.forEach(select => {
              const subjectOption = Array.from(select.options).find(opt => 
                opt.value.toLowerCase() === subject.toLowerCase() ||
                opt.text.toLowerCase().includes(subject.toLowerCase())
              );
              if (subjectOption) {
                select.value = subjectOption.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
              }
            });
          }
          
          resolve(true);
        } catch (err) {
          console.error('Error setting filters:', err);
          resolve(false);
        }
      }, 1000);
    });
  };

  // Enhanced command handler
  const handleCommand = async (transcript) => {
    console.log('Processing command:', transcript);
    
    // Note dictation state machine
    if (noteState.mode === 'dictate') {
      return handleNoteDictation(transcript);
    }

    let matched = false;
    for (const cmd of commandPatterns) {
      const match = transcript.match(cmd.pattern);
      if (match) {
        matched = true;
        await executeCommand(cmd.action, match, transcript);
        break;
      }
    }

    if (!matched) {
      const response = 'Sorry, I did not understand that command. Say "help" for available commands.';
      setFeedback(response);
      speak(response);
    }
  };

  // Handle note dictation commands
  const handleNoteDictation = (transcript) => {
    if (/save note|save|done|finish/i.test(transcript)) {
      const saveBtn = document.querySelector('button[aria-label="Save Note"], button[type="submit"], button:contains("Save")');
      if (saveBtn) {
        saveBtn.click();
        setFeedback('✅ Note saved successfully');
        speak('Note saved successfully');
        setNoteState({ mode: null, title: '', content: '' });
      } else {
        setFeedback('❌ Could not find save button');
        speak('Could not find save button');
      }
      return;
    }

    if (/title (.+)/i.test(transcript)) {
      const titleMatch = transcript.match(/title (.+)/i);
      const title = titleMatch[1];
      setNoteState(ns => ({ ...ns, title }));
      
      const titleInput = document.querySelector('input[placeholder*="title"], input[name="title"], input[type="text"]');
      if (titleInput) {
        titleInput.value = title;
        titleInput.dispatchEvent(new Event('input', { bubbles: true }));
        setFeedback(`📝 Title set: ${title}`);
        speak(`Title set to ${title}`);
      } else {
        setFeedback('❌ Could not find title input');
        speak('Could not find title input');
      }
      return;
    }

    if (/content (.+)/i.test(transcript)) {
      const contentMatch = transcript.match(/content (.+)/i);
      const content = contentMatch[1];
      setNoteState(ns => ({ ...ns, content }));
      
      const contentInput = document.querySelector('textarea[placeholder*="content"], textarea, div[contenteditable]');
      if (contentInput) {
        if (contentInput.tagName === 'TEXTAREA' || contentInput.tagName === 'INPUT') {
          contentInput.value = content;
        } else {
          contentInput.textContent = content;
        }
        contentInput.dispatchEvent(new Event('input', { bubbles: true }));
        setFeedback(`📝 Content updated`);
        speak('Content updated');
      } else {
        setFeedback('❌ Could not find content input');
        speak('Could not find content input');
      }
      return;
    }

    setFeedback('💡 Say "title [your title]", "content [your content]", or "save note"');
    speak('Say title, content, or save note');
  };

  // Execute commands
  const executeCommand = async (action, match, transcript) => {
    try {
      switch (action) {
        case 'navigation':
          const destination = match[1].toLowerCase();
          const navMap = {
            'library': '/library',
            'dashboard': '/dashboard',
            'notebook': '/notebook',
            'test': '/test',
            'test page': '/test',
            'profile': '/profile',
            'home': '/home',
            'documentation': '/documentation',
            'privacy policy': '/privacy-policy'
          };
          
          if (navMap[destination]) {
            navigate(navMap[destination]);
            setFeedback(`🚀 Navigating to ${destination}`);
            speak(`Opening ${destination}`);
          }
          break;

        case 'create-note':
          navigate('/notebook');
          setTimeout(() => {
            const addBtn = document.querySelector('button[aria-label="Add Note"], button:contains("Add"), button:contains("New")');
            if (addBtn) {
              addBtn.click();
              setFeedback('📝 Creating new note. Say "title [your title]", "content [your content]", then "save note"');
              speak('Creating a new note. You can now dictate the title and content');
              setNoteState({ mode: 'dictate', title: '', content: '' });
            } else {
              setFeedback('❌ Could not find add note button');
              speak('Could not find add note button');
            }
          }, 1000);
          break;

        case 'save-note':
          const saveBtn = document.querySelector('button[aria-label="Save Note"], button[type="submit"], button:contains("Save")');
          if (saveBtn) {
            saveBtn.click();
            setFeedback('✅ Note saved');
            speak('Note saved');
          } else {
            setFeedback('❌ Could not find save button');
            speak('Could not find save button');
          }
          break;

        case 'delete-note':
          const deleteBtn = document.querySelector('button[aria-label="Delete Note"], button:contains("Delete"), button:contains("Remove")');
          if (deleteBtn) {
            deleteBtn.click();
            setFeedback('🗑️ Note deleted');
            speak('Note deleted');
          } else {
            setFeedback('❌ Could not find delete button');
            speak('Could not find delete button');
          }
          break;

        case 'open-book-advanced': {
          const bookName = match[1];
          const cls = match[2];
          const subject = match[3];
          
          navigate('/library');
          const filtersSet = await setLibraryFilters(cls, subject);
          
          setTimeout(() => {
            const bookCards = document.querySelectorAll('[data-book-title], .book-card, .card');
            let found = false;
            bookCards.forEach(card => {
              const title = card.getAttribute('data-book-title') || card.textContent || '';
              if (title.toLowerCase().includes(bookName.toLowerCase())) {
                card.click();
                found = true;
              }
            });
            
            if (found) {
              const response = `📖 Opening ${bookName}${cls ? ` for class ${cls}` : ''}${subject ? ` in ${subject}` : ''}`;
              setFeedback(response);
              speak(`Opening ${bookName}`);
            } else {
              setFeedback(`❌ Book not found: ${bookName}`);
              speak(`Book ${bookName} not found`);
            }
          }, 2000);
          break;
        }

        case 'open-book':
        case 'search-book':
          navigate('/library');
          setFeedback(`🔍 Searching for: ${match[1]}`);
          speak(`Searching for ${match[1]}`);
          
          setTimeout(() => {
            const bookCards = document.querySelectorAll('[data-book-title], .book-card, .card');
            let found = false;
            bookCards.forEach(card => {
              const title = card.getAttribute('data-book-title') || card.textContent || '';
              if (title.toLowerCase().includes(match[1].toLowerCase())) {
                card.click();
                found = true;
              }
            });
            
            if (found) {
              setFeedback(`📖 Opening ${match[1]}`);
              speak(`Opening ${match[1]}`);
            } else {
              setFeedback(`❌ Book not found: ${match[1]}`);
              speak(`Book ${match[1]} not found`);
            }
          }, 1500);
          break;

        case 'start-test':
          const testClass = match[2] || '1';
          const testSubject = match[3] || 'math';
          const testChapter = match[4] || '1';
          navigate(`/test/class${testClass}/${testSubject}/chapter${testChapter}`);
          setFeedback(`📝 Starting test for class ${testClass} ${testSubject} chapter ${testChapter}`);
          speak(`Starting test for class ${testClass} ${testSubject} chapter ${testChapter}`);
          break;

        case 'open-test':
          navigate('/test');
          setFeedback('📝 Opening test page');
          speak('Opening test page');
          break;

        case 'stop-listening':
          setIsEnabled(false);
          setFeedback('🔇 Voice commands disabled');
          speak('Voice commands disabled');
          break;

        case 'start-listening':
          setIsEnabled(true);
          setFeedback('🎤 Voice commands enabled');
          speak('Voice commands enabled');
          break;

        case 'show-help':
          const helpText = `Available commands: Navigate to pages like library, dashboard, notebook, test, profile, home. Create notes, open books, start tests, and more. Say "help" anytime for this list.`;
          setFeedback('💡 ' + helpText);
          speak('Here are the available commands. You can navigate to pages like library, dashboard, notebook, test, profile, and home. You can also create notes, open books, and start tests. Say help anytime for this list.');
          break;

        case 'clear-all':
          setCommandHistory([]);
          setFeedback('🧹 Command history cleared');
          speak('Command history cleared');
          break;

        case 'go-back':
          window.history.back();
          setFeedback('⬅️ Going back');
          speak('Going back');
          break;

        case 'refresh':
          window.location.reload();
          setFeedback('🔄 Refreshing page');
          speak('Refreshing page');
          break;

        case 'close':
          window.close();
          setFeedback('❌ Closing window');
          speak('Closing window');
          break;

        default:
          setFeedback('❓ Command recognized but not implemented');
          speak('Command recognized but not implemented');
      }
    } catch (err) {
      console.error('Error executing command:', err);
      setFeedback('❌ Error executing command');
      speak('Error executing command');
    }
  };

  return (
    <VoiceCommandContext.Provider value={{ 
      listening, 
      startListening, 
      stopListening, 
      lastTranscript, 
      feedback, 
      error,
      confidence,
      isEnabled,
      toggleVoiceCommands,
      commandHistory,
      noteState
    }}>
      {children}
    </VoiceCommandContext.Provider>
  );
};

export const useVoiceCommand = () => useContext(VoiceCommandContext); 