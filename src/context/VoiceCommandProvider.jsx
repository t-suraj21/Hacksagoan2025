import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceCommandContext = createContext();

// Enhanced command patterns with better navigation support
const commandPatterns = [
  // Navigation commands - enhanced with more natural language
  { 
    pattern: /(?:go to|open|navigate to|show|take me to|visit|access|bring up|launch|start|switch to) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts|landing|login|register)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:i want to|can you|please) (?:go to|open|show|take me to) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:navigate|go|move|switch) (?:to|on|in) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:let me|allow me to|i need to) (?:go to|open|access) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:show me|display|bring up|launch) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:i want|i would like|i need) (?:to see|to view|to access) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:open up|bring up|start up) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:let's go to|let's open|let's visit) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:main|home|landing) (?:page|screen)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:digital|book) (?:library|collection)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:my|user) (?:profile|account|settings)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:note|notes|notebook|writing) (?:page|section|area)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:test|exam|quiz|assessment) (?:page|section|area)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:help|support|assistance) (?:center|page|section)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:documentation|docs|guide|manual)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:community|forum|discussion|chat)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:blog|news|articles|posts)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:about|information|details)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:contact|reach|get in touch|support)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:terms|conditions|legal|policy)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:keyboard|shortcuts|hotkeys|commands)/i, 
    action: 'navigation' 
  },
  { 
    pattern: /(?:privacy|data protection|security)/i, 
    action: 'navigation' 
  },

  // Note commands
  { pattern: /(?:create|make|start|new) (?:a )?(note|notebook entry|writing)/i, action: 'create-note' },
  { pattern: /(?:open|show|access) (?:my )?(notebook|notes|writing)/i, action: 'open-notebook' },
  { pattern: /(?:edit|modify|change) (?:the )?(note|notebook entry)/i, action: 'edit-note' },
  { pattern: /(?:save|store|keep) (?:the )?(note|notebook entry)/i, action: 'save-note' },
  { pattern: /(?:delete|remove|erase|trash) (?:the )?(note|notebook entry)/i, action: 'delete-note' },

  // Book commands
  { pattern: /(?:open|read|show|find|search for) (?:the )?book (.+)/i, action: 'open-book' },
  { pattern: /(?:read|start reading|begin reading) (.+)/i, action: 'read-book' },
  { pattern: /(?:find|search|look for) (?:a )?book (?:about|on) (.+)/i, action: 'search-book' },
  { pattern: /(?:show|display|filter) (?:books for|books in) class (\d+)(?: (?:subject|in) ([^ ]+))?/i, action: 'filter-library-class' },
  { pattern: /(?:show|display|filter) (?:books for|books in) ([^ ]+)(?: class (\d+))?/i, action: 'filter-library-subject' },
  { pattern: /(?:open|read|show) (?:the )?book (.+) (?:for|in) class (\d+) (?:subject|in) (.+)/i, action: 'open-book-advanced' },

  // Test commands
  { pattern: /(?:generate|create|make) (?:a )?(test|exam|quiz|assessment)(?: for)?(?: class (\d+))?(?: (?:subject|in) ([^ ]+))?(?: chapter (\d+))?/i, action: 'generate-test' },
  // Navigation commands
  { pattern: /(?:go to|open|navigate to|show|take me to) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy)/i, action: 'navigation' },
  { pattern: /(?:open|go to|navigate to|show) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy)/i, action: 'navigation' },
  
  // Note management - Enhanced patterns
  { pattern: /(?:create|make|start|new) (?:a )?(note|notebook entry)/i, action: 'create-note' },
  { pattern: /(?:open|go to) (?:the )?notebook/i, action: 'open-notebook' },
  { pattern: /(?:save|store) (?:the )?(note|notebook entry)/i, action: 'save-note' },
  { pattern: /(?:delete|remove|erase) (?:the )?(note|notebook entry)/i, action: 'delete-note' },
  { pattern: /(?:edit|modify|change) (?:the )?(note|notebook entry)/i, action: 'edit-note' },
  
  // Library commands - Enhanced with class and subject filtering
  { pattern: /(?:show|find|get) (?:books for|books in) class (\d+)(?: (?:subject|for) ([^ ]+))?/i, action: 'filter-library-class' },
  { pattern: /(?:show|find|get) (?:books for|books in) ([^ ]+)(?: class (\d+))?/i, action: 'filter-library-subject' },
  { pattern: /(?:open|read|show|find) (?:the )?book ([^ ]+)(?: (?:in|for) class (\d+))?(?: (?:subject|for) ([^ ]+))?/i, action: 'open-book-advanced' },
  { pattern: /(?:open|read|show|find) (?:the )?book (.+)/i, action: 'open-book' },
  { pattern: /(?:search for|find) (?:a )?book (.+)/i, action: 'search-book' },
  { pattern: /(?:read|start reading|begin reading) (?:the )?book (.+)/i, action: 'read-book' },
  { pattern: /(?:next page|next|continue)/i, action: 'next-page' },
  { pattern: /(?:previous page|previous|back|go back)/i, action: 'previous-page' },
  
  // Test commands - Enhanced with AI generation
  { pattern: /(?:start|begin|take|create) (?:a )?(test|exam|quiz)(?: for)?(?: class (\d+))?(?: (?:subject|in) ([^ ]+))?(?: chapter (\d+))?/i, action: 'start-test' },
  { pattern: /(?:open|go to) (?:the )?test(?: page)?/i, action: 'open-test' },
  { pattern: /(?:generate|create) (?:a )?(test|exam|quiz)(?: for)?(?: class (\d+))?(?: (?:subject|in) ([^ ]+))?(?: chapter (\d+))?/i, action: 'generate-test' },
  { pattern: /(?:answer|select) (.+)/i, action: 'answer-question' },
  { pattern: /(?:submit|finish|end) (?:the )?(test|exam|quiz)/i, action: 'submit-test' },
  { pattern: /(?:next question|next)/i, action: 'next-question' },
  { pattern: /(?:previous question|previous)/i, action: 'previous-question' },
  
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
  const [isEnabled, setIsEnabled] = useState(true); // Start enabled by default
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [testState, setTestState] = useState({ mode: null, currentQuestion: 0, answers: [] });
  const [readingState, setReadingState] = useState({ mode: null, currentPage: 0 });
  const [manuallyStopped, setManuallyStopped] = useState(false);
  const [lastCommandTime, setLastCommandTime] = useState(0);

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
      setFeedback('Voice commands are active. Say "help" for available commands.');
    }
  }, []);

  // Request microphone permission and start automatically
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

  // Start listening automatically on mount
  useEffect(() => {
    const initializeVoiceCommands = async () => {
      const permissionGranted = await requestMicrophonePermission();
      if (permissionGranted) {
        setIsEnabled(true);
        setFeedback('Voice commands are active. Say "help" for available commands.');
        speak('Voice commands are now active. Say help for available commands.');
      }
    };

    initializeVoiceCommands();
    return () => stopListening();
    // eslint-disable-next-line
  }, []);

  // Start listening automatically when enabled
  useEffect(() => {
    if (isEnabled && permissionGranted && !manuallyStopped) {
      startListening();
    }
    return () => stopListening();
    // eslint-disable-next-line
  }, [isEnabled, permissionGranted, manuallyStopped]);

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
      
      // Enhanced configuration for better reliability
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      
      // Add timeout to prevent hanging
      let recognitionTimeout;
      
      recognition.onstart = () => {
        setListening(true);
        setError('');
        setFeedback('🎤 Listening... Say "help" for commands');
        
        // Set a timeout to restart if no speech detected
        recognitionTimeout = setTimeout(() => {
          if (recognition && isEnabled && permissionGranted) {
            recognition.stop();
          }
        }, 10000); // 10 second timeout
      };

      recognition.onresult = (event) => {
        // Clear timeout when speech is detected
        if (recognitionTimeout) {
          clearTimeout(recognitionTimeout);
        }
        
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
        // Clear timeout on error
        if (recognitionTimeout) {
          clearTimeout(recognitionTimeout);
        }
        
        console.error('Speech recognition error:', event.error);
        
        // Handle specific errors with better recovery
        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access in your browser settings.');
            setFeedback('Microphone access denied');
            setIsEnabled(false);
            break;
          case 'no-speech':
            // This is normal - just restart silently
            setFeedback('No speech detected. Listening again...');
            setTimeout(() => {
              if (isEnabled && permissionGranted && !manuallyStopped) {
                startListening();
              }
            }, 1000);
            break;
          case 'aborted':
            // Recognition was stopped - restart if still enabled
            setFeedback('Restarting voice recognition...');
            setTimeout(() => {
              if (isEnabled && permissionGranted && !manuallyStopped) {
                startListening();
              }
            }, 500);
            break;
          case 'audio-capture':
            setError('Audio capture failed. Please check your microphone.');
            setFeedback('Audio capture failed');
            setTimeout(() => {
              if (isEnabled && permissionGranted && !manuallyStopped) {
                startListening();
              }
            }, 2000);
            break;
          case 'network':
            setError('Network error. Please check your connection.');
            setFeedback('Network error');
            setTimeout(() => {
              if (isEnabled && permissionGranted && !manuallyStopped) {
                startListening();
              }
            }, 2000);
            break;
          case 'service-not-allowed':
            setError('Speech recognition service not allowed.');
            setFeedback('Speech recognition service not allowed');
            setIsEnabled(false);
            break;
          default:
            setError(`Voice recognition error: ${event.error}`);
            setFeedback('Voice recognition error');
            setTimeout(() => {
              if (isEnabled && permissionGranted && !manuallyStopped) {
                startListening();
              }
            }, 2000);
        }
        
        setListening(false);
      };

      recognition.onend = () => {
        // Clear timeout when recognition ends
        if (recognitionTimeout) {
          clearTimeout(recognitionTimeout);
        }
        
        setListening(false);
        
        // Auto-restart if still enabled and not manually stopped
        if (isEnabled && permissionGranted && !manuallyStopped) {
          setTimeout(() => {
            if (isEnabled && permissionGranted && !manuallyStopped) {
              startListening();
            }
          }, 1000);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setError(`Failed to start speech recognition: ${err.message}`);
      setFeedback('Failed to start voice commands');
      
      // Retry after a delay
      setTimeout(() => {
        if (isEnabled && permissionGranted && !manuallyStopped) {
          startListening();
        }
      }, 2000);
    }
  };

  // Stop speech recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.log('Recognition already stopped');
      }
      setListening(false);
      setFeedback('Voice commands stopped');
    }
  };

  // Toggle voice commands
  const toggleVoiceCommands = async () => {
    if (isEnabled) {
      setIsEnabled(false);
      setManuallyStopped(true);
      stopListening();
      setFeedback('Voice commands disabled');
    } else {
      // Request permission first
      const permissionGranted = await requestMicrophonePermission();
      if (permissionGranted) {
        setIsEnabled(true);
        setManuallyStopped(false);
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
    
    // Debounce: prevent rapid command execution
    const now = Date.now();
    if (now - lastCommandTime < 1000) { // 1 second debounce
      console.log('Command ignored due to debounce');
      return;
    }
    setLastCommandTime(now);
    
    // Note dictation state machine
    if (noteState.mode === 'dictate') {
      return handleNoteDictation(transcript);
    }

    // Test state machine
    if (testState.mode === 'taking-test') {
      return handleTestCommands(transcript);
    }

    // Reading state machine
    if (readingState.mode === 'reading') {
      return handleReadingCommands(transcript);
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

  // Handle test commands
  const handleTestCommands = (transcript) => {
    if (/submit|finish|end test/i.test(transcript)) {
      const submitBtn = document.querySelector('button[type="submit"], button:contains("Submit"), button:contains("Finish")');
      if (submitBtn) {
        submitBtn.click();
        setFeedback('✅ Test submitted');
        speak('Test submitted successfully');
        setTestState({ mode: null, currentQuestion: 0, answers: [] });
      } else {
        setFeedback('❌ Could not find submit button');
        speak('Could not find submit button');
      }
      return;
    }

    if (/next|next question/i.test(transcript)) {
      const nextBtn = document.querySelector('button:contains("Next"), button[aria-label*="Next"], .next-btn');
      if (nextBtn) {
        nextBtn.click();
        setFeedback('➡️ Next question');
        speak('Next question');
      } else {
        setFeedback('❌ Could not find next button');
        speak('Could not find next button');
      }
      return;
    }

    if (/previous|previous question|back/i.test(transcript)) {
      const prevBtn = document.querySelector('button:contains("Previous"), button[aria-label*="Previous"], .prev-btn');
      if (prevBtn) {
        prevBtn.click();
        setFeedback('⬅️ Previous question');
        speak('Previous question');
      } else {
        setFeedback('❌ Could not find previous button');
        speak('Could not find previous button');
      }
      return;
    }

    // Handle answer selection
    const answerMatch = transcript.match(/answer (.+)/i);
    if (answerMatch) {
      const answer = answerMatch[1].toLowerCase();
      const options = document.querySelectorAll('input[type="radio"], input[type="checkbox"], .option, .answer-option');
      let selected = false;
      
      options.forEach((option, index) => {
        const optionText = option.textContent || option.value || '';
        if (optionText.toLowerCase().includes(answer) || 
            (index === 0 && answer.includes('a')) ||
            (index === 1 && answer.includes('b')) ||
            (index === 2 && answer.includes('c')) ||
            (index === 3 && answer.includes('d'))) {
          option.click();
          selected = true;
        }
      });
      
      if (selected) {
        setFeedback(`✅ Selected answer: ${answer}`);
        speak(`Selected answer ${answer}`);
      } else {
        setFeedback('❌ Could not find that answer option');
        speak('Could not find that answer option');
      }
      return;
    }

    setFeedback('💡 Say "answer [option]", "next", "previous", or "submit test"');
    speak('Say answer, next, previous, or submit test');
  };

  // Handle reading commands
  const handleReadingCommands = (transcript) => {
    if (/next|next page|continue/i.test(transcript)) {
      const nextBtn = document.querySelector('button:contains("Next"), button[aria-label*="Next"], .next-page-btn');
      if (nextBtn) {
        nextBtn.click();
        setFeedback('➡️ Next page');
        speak('Next page');
      } else {
        setFeedback('❌ Could not find next page button');
        speak('Could not find next page button');
      }
      return;
    }

    if (/previous|previous page|back/i.test(transcript)) {
      const prevBtn = document.querySelector('button:contains("Previous"), button[aria-label*="Previous"], .prev-page-btn');
      if (prevBtn) {
        prevBtn.click();
        setFeedback('⬅️ Previous page');
        speak('Previous page');
      } else {
        setFeedback('❌ Could not find previous page button');
        speak('Could not find previous page button');
      }
      return;
    }

    if (/stop reading|close book|exit/i.test(transcript)) {
      setReadingState({ mode: null, currentPage: 0 });
      setFeedback('📖 Stopped reading');
      speak('Stopped reading');
      return;
    }

    setFeedback('💡 Say "next page", "previous page", or "stop reading"');
    speak('Say next page, previous page, or stop reading');
  };

  // Execute commands
  const executeCommand = async (action, match, transcript) => {
    try {
      switch (action) {
        case 'navigation':
          const destination = match[1].toLowerCase();
          
          // Enhanced navigation mapping with more natural language support
          const navMap = {
            // Main pages
            'library': '/library',
            'dashboard': '/dashboard',
            'notebook': '/notebook',
            'test': '/test',
            'test page': '/test',
            'profile': '/profile',
            'home': '/home',
            'landing': '/',
            'main': '/home',
            'main page': '/home',
            'main screen': '/home',
            
            // Information pages
            'documentation': '/documentation',
            'docs': '/documentation',
            'guide': '/documentation',
            'manual': '/documentation',
            'help center': '/help-center',
            'help': '/help-center',
            'support': '/help-center',
            'assistance': '/help-center',
            'community': '/community',
            'forum': '/community',
            'discussion': '/community',
            'chat': '/community',
            'blog': '/blog',
            'news': '/blog',
            'articles': '/blog',
            'posts': '/blog',
            'about': '/about',
            'information': '/about',
            'details': '/about',
            'contact': '/contact',
            'reach': '/contact',
            'get in touch': '/contact',
            'terms': '/terms',
            'conditions': '/terms',
            'legal': '/terms',
            'policy': '/terms',
            'privacy policy': '/privacy-policy',
            'privacy': '/privacy-policy',
            'data protection': '/privacy-policy',
            'security': '/privacy-policy',
            'keyboard shortcuts': '/keyboard-shortcuts',
            'keyboard': '/keyboard-shortcuts',
            'shortcuts': '/keyboard-shortcuts',
            'hotkeys': '/keyboard-shortcuts',
            'commands': '/keyboard-shortcuts',
            
            // Alternative names
            'digital library': '/library',
            'book library': '/library',
            'book collection': '/library',
            'my profile': '/profile',
            'user profile': '/profile',
            'my account': '/profile',
            'user account': '/profile',
            'my settings': '/profile',
            'user settings': '/profile',
            'notes': '/notebook',
            'note': '/notebook',
            'note page': '/notebook',
            'notes page': '/notebook',
            'note section': '/notebook',
            'notes section': '/notebook',
            'note area': '/notebook',
            'notes area': '/notebook',
            'notebook page': '/notebook',
            'notebook section': '/notebook',
            'notebook area': '/notebook',
            'writing': '/notebook',
            'writing page': '/notebook',
            'writing section': '/notebook',
            'writing area': '/notebook',
            'exam': '/test',
            'exam page': '/test',
            'exam section': '/test',
            'exam area': '/test',
            'quiz': '/test',
            'quiz page': '/test',
            'quiz section': '/test',
            'quiz area': '/test',
            'assessment': '/test',
            'assessment page': '/test',
            'assessment section': '/test',
            'assessment area': '/test',
            'test page': '/test',
            'test section': '/test',
            'test area': '/test',
            'help center': '/help-center',
            'help page': '/help-center',
            'help section': '/help-center',
            'support center': '/help-center',
            'support page': '/help-center',
            'support section': '/help-center',
            'assistance center': '/help-center',
            'assistance page': '/help-center',
            'assistance section': '/help-center'
          };
          
          if (navMap[destination]) {
            const route = navMap[destination];
            navigate(route);
            
            // Enhanced feedback with more natural responses
            const feedbackMessages = {
              '/library': '📚 Opening the digital library',
              '/dashboard': '📊 Opening your dashboard',
              '/notebook': '📓 Opening your notebook',
              '/test': '📝 Opening the test section',
              '/profile': '👤 Opening your profile',
              '/home': '🏠 Going to the home page',
              '/': '🏠 Going to the landing page',
              '/documentation': '📖 Opening the documentation',
              '/help-center': '❓ Opening the help center',
              '/community': '👥 Opening the community forum',
              '/blog': '📰 Opening the blog',
              '/about': 'ℹ️ Opening the about page',
              '/contact': '📞 Opening the contact page',
              '/terms': '📋 Opening the terms and conditions',
              '/privacy-policy': '🔒 Opening the privacy policy',
              '/keyboard-shortcuts': '⌨️ Opening keyboard shortcuts'
            };
            
            const feedback = feedbackMessages[route] || `🚀 Navigating to ${destination}`;
            setFeedback(feedback);
            speak(`Opening ${destination}`);
          } else {
            // Handle unknown destinations with helpful suggestions
            setFeedback(`❓ I don't recognize "${destination}". Try saying "help" for available pages.`);
            speak(`I don't recognize ${destination}. Try saying help for available pages.`);
          }
          break;

        case 'create-note':
          navigate('/notebook');
          setTimeout(() => {
            // Look for the add note button with multiple selectors
            const addBtn = document.querySelector('[data-testid="add-note"], button[aria-label*="Add"], button[aria-label*="New"], button:contains("Add"), button:contains("New"), .add-note-btn, #add-note-btn');
            if (addBtn) {
              addBtn.click();
              setFeedback('📝 Creating new note. Say "title [your title]", "content [your content]", then "save note"');
              speak('Creating a new note. You can now dictate the title and content');
              setNoteState({ mode: 'dictate', title: '', content: '' });
            } else {
              // Try to find any button that might be the add button
              const allButtons = document.querySelectorAll('button');
              const addButton = Array.from(allButtons).find(btn => 
                btn.textContent.toLowerCase().includes('add') || 
                btn.textContent.toLowerCase().includes('new') ||
                btn.textContent.toLowerCase().includes('+')
              );
              if (addButton) {
                addButton.click();
                setFeedback('📝 Creating new note. Say "title [your title]", "content [your content]", then "save note"');
                speak('Creating a new note. You can now dictate the title and content');
                setNoteState({ mode: 'dictate', title: '', content: '' });
              } else {
                setFeedback('❌ Could not find add note button. Please click the + button manually');
                speak('Could not find add note button. Please click the plus button manually');
              }
            }
          }, 1000);
          break;

        case 'open-notebook':
          navigate('/notebook');
          setFeedback('📓 Opening notebook');
          speak('Opening notebook');
          break;

        case 'edit-note':
          const editBtn = document.querySelector('button[aria-label*="Edit"], button:contains("Edit"), .edit-btn');
          if (editBtn) {
            editBtn.click();
            setFeedback('📝 Editing note. Say "title [your title]", "content [your content]", then "save note"');
            speak('Editing note. You can now dictate the title and content');
            setNoteState({ mode: 'dictate', title: '', content: '' });
          } else {
            setFeedback('❌ Could not find edit button');
            speak('Could not find edit button');
          }
          break;

        case 'filter-library-class': {
          const classNum = match[1];
          const subject = match[2];
          
          navigate('/library');
          setTimeout(() => {
            // Set class filter
            const classSelect = document.querySelector('select[name="class"], select[data-testid="class-select"], #class-select');
            if (classSelect) {
              classSelect.value = `Class ${classNum}`;
              classSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // Set subject filter if provided
            if (subject) {
              setTimeout(() => {
                const subjectSelect = document.querySelector('select[name="subject"], select[data-testid="subject-select"], #subject-select');
                if (subjectSelect) {
                  subjectSelect.value = subject;
                  subjectSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }, 500);
            }
            
            const response = `📚 Showing books for class ${classNum}${subject ? ` ${subject}` : ''}`;
            setFeedback(response);
            speak(`Showing books for class ${classNum}${subject ? ` ${subject}` : ''}`);
          }, 1000);
          break;
        }

        case 'filter-library-subject': {
          const subject = match[1];
          const classNum = match[2];
          
          navigate('/library');
          setTimeout(() => {
            // Set subject filter
            const subjectSelect = document.querySelector('select[name="subject"], select[data-testid="subject-select"], #subject-select');
            if (subjectSelect) {
              subjectSelect.value = subject;
              subjectSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // Set class filter if provided
            if (classNum) {
              setTimeout(() => {
                const classSelect = document.querySelector('select[name="class"], select[data-testid="class-select"], #class-select');
                if (classSelect) {
                  classSelect.value = `Class ${classNum}`;
                  classSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }, 500);
            }
            
            const response = `📚 Showing ${subject} books${classNum ? ` for class ${classNum}` : ''}`;
            setFeedback(response);
            speak(`Showing ${subject} books${classNum ? ` for class ${classNum}` : ''}`);
          }, 1000);
          break;
        }

        case 'save-note':
          const saveBtn = document.querySelector('button[aria-label*="Save"], button[type="submit"], button:contains("Save"), .save-btn, #save-btn');
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
          const deleteBtn = document.querySelector('button[aria-label*="Delete"], button:contains("Delete"), button:contains("Remove"), .delete-btn, #delete-btn');
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

        case 'read-book':
          navigate('/library');
          setFeedback(`📖 Opening ${match[1]} for reading`);
          speak(`Opening ${match[1]} for reading`);
          
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
              setReadingState({ mode: 'reading', currentPage: 0 });
              setFeedback(`📖 Now reading ${match[1]}. Say "next page", "previous page", or "stop reading"`);
              speak(`Now reading ${match[1]}. Say next page, previous page, or stop reading`);
            } else {
              setFeedback(`❌ Book not found: ${match[1]}`);
              speak(`Book ${match[1]} not found`);
            }
          }, 1500);
          break;

        case 'next-page':
          if (readingState.mode === 'reading') {
            const nextBtn = document.querySelector('button:contains("Next"), button[aria-label*="Next"], .next-page-btn');
            if (nextBtn) {
              nextBtn.click();
              setFeedback('➡️ Next page');
              speak('Next page');
            } else {
              setFeedback('❌ Could not find next page button');
              speak('Could not find next page button');
            }
          }
          break;

        case 'previous-page':
          if (readingState.mode === 'reading') {
            const prevBtn = document.querySelector('button:contains("Previous"), button[aria-label*="Previous"], .prev-page-btn');
            if (prevBtn) {
              prevBtn.click();
              setFeedback('⬅️ Previous page');
              speak('Previous page');
            } else {
              setFeedback('❌ Could not find previous page button');
              speak('Could not find previous page button');
            }
          }
          break;

        case 'start-test':
          const testClass = match[2] || '1';
          const testSubject = match[3] || 'math';
          const testChapter = match[4] || '1';
          navigate(`/test/class${testClass}/${testSubject}/chapter${testChapter}`);
          setFeedback(`📝 Starting test for class ${testClass} ${testSubject} chapter ${testChapter}`);
          speak(`Starting test for class ${testClass} ${testSubject} chapter ${testChapter}`);
          break;

        case 'generate-test':
          const genClass = match[2] || '1';
          const genSubject = match[3] || 'math';
          const genChapter = match[4] || '1';
          
          navigate('/test');
          setFeedback(`🤖 Generating AI test for class ${genClass} ${genSubject} chapter ${genChapter}`);
          speak(`Generating AI test for class ${genClass} ${genSubject} chapter ${genChapter}`);
          
          // Simulate AI test generation
          setTimeout(() => {
            setTestState({ mode: 'taking-test', currentQuestion: 0, answers: [] });
            setFeedback('🤖 AI test generated! Say "answer [option]", "next", or "submit test"');
            speak('AI test generated! You can now answer questions using voice commands');
          }, 2000);
          break;

        case 'open-test':
          navigate('/test');
          setFeedback('📝 Opening test page');
          speak('Opening test page');
          break;

        case 'answer-question':
          const answer = match[1].toLowerCase();
          const options = document.querySelectorAll('input[type="radio"], input[type="checkbox"], .option, .answer-option');
          let selected = false;
          
          options.forEach((option, index) => {
            const optionText = option.textContent || option.value || '';
            if (optionText.toLowerCase().includes(answer) || 
                (index === 0 && answer.includes('a')) ||
                (index === 1 && answer.includes('b')) ||
                (index === 2 && answer.includes('c')) ||
                (index === 3 && answer.includes('d'))) {
              option.click();
              selected = true;
            }
          });
          
          if (selected) {
            setFeedback(`✅ Selected answer: ${answer}`);
            speak(`Selected answer ${answer}`);
          } else {
            setFeedback('❌ Could not find that answer option');
            speak('Could not find that answer option');
          }
          break;

        case 'submit-test':
          const submitBtn = document.querySelector('button[type="submit"], button:contains("Submit"), button:contains("Finish")');
          if (submitBtn) {
            submitBtn.click();
            setFeedback('✅ Test submitted');
            speak('Test submitted successfully');
            setTestState({ mode: null, currentQuestion: 0, answers: [] });
          } else {
            setFeedback('❌ Could not find submit button');
            speak('Could not find submit button');
          }
          break;

        case 'next-question':
          const nextBtn = document.querySelector('button:contains("Next"), button[aria-label*="Next"], .next-btn');
          if (nextBtn) {
            nextBtn.click();
            setFeedback('➡️ Next question');
            speak('Next question');
          } else {
            setFeedback('❌ Could not find next button');
            speak('Could not find next button');
          }
          break;

        case 'previous-question':
          const prevBtn = document.querySelector('button:contains("Previous"), button[aria-label*="Previous"], .prev-btn');
          if (prevBtn) {
            prevBtn.click();
            setFeedback('⬅️ Previous question');
            speak('Previous question');
          } else {
            setFeedback('❌ Could not find previous button');
            speak('Could not find previous button');
          }
          break;

        case 'stop-listening':
          setIsEnabled(false);
          setManuallyStopped(true);
          setFeedback('🔇 Voice commands disabled');
          speak('Voice commands disabled');
          break;

        case 'start-listening':
          setIsEnabled(true);
          setManuallyStopped(false);
          setFeedback('🎤 Voice commands enabled');
          speak('Voice commands enabled');
          break;

        case 'show-help':
          const helpText = `Available voice commands:

📱 **Navigation Commands:**
• "Go to library" or "Open the library"
• "Take me to dashboard" or "Show dashboard"
• "Navigate to notebook" or "Open my notes"
• "Open test page" or "Show tests"
• "Go to profile" or "Open my account"
• "Go home" or "Take me to home page"
• "Open documentation" or "Show help"
• "Go to community" or "Open forum"
• "Show blog" or "Open news"
• "Open about page" or "Show contact"

📝 **Note Commands:**
• "Create a new note"
• "Save note" or "Save the note"
• "Delete note" or "Remove note"
• "Edit note" or "Modify note"

📚 **Book Commands:**
• "Open book mathematics" or "Read book science"
• "Find book about history"
• "Show books for class 8"
• "Filter books by science"

📋 **Test Commands:**
• "Generate test for class 8 science chapter 3"
• "Start test" or "Begin exam"
• "Answer option A" or "Select answer B"
• "Next question" or "Previous question"
• "Submit test" or "Finish exam"

📖 **Reading Commands:**
• "Next page" or "Continue reading"
• "Previous page" or "Go back"
• "Stop reading" or "Close book"

🎤 **System Commands:**
• "Help" or "What can I say"
• "Stop listening" or "Disable voice"
• "Start listening" or "Enable voice"
• "Clear all" or "Reset history"

Try saying any of these commands naturally!`;
          
          setFeedback('💡 ' + helpText.split('\n')[0]);
          speak('Here are the available voice commands. You can navigate to pages like library, dashboard, notebook, test, profile, and home. You can also create notes, open books, and start tests. Say help anytime for this list.');
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

        case 'stop-reading':
          if (readingState.mode === 'reading') {
            setReadingState({ mode: null, currentPage: 0 });
            setFeedback('📖 Stopped reading. You can say "open library" to browse more books.');
            speak('Stopped reading. You can say open library to browse more books.');
          } else {
            setFeedback('❌ Not currently reading a book');
            speak('Not currently reading a book');
          }
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
      noteState,
      testState,
      readingState
    }}>
      {children}
    </VoiceCommandContext.Provider>
  );
};

export const useVoiceCommand = () => useContext(VoiceCommandContext);