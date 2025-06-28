// Voice Command System Test Utility
export const testVoiceCommands = () => {
  const tests = [
    {
      name: 'Browser Support',
      test: () => {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      },
      message: 'Speech recognition is supported in this browser'
    },
    {
      name: 'HTTPS Check',
      test: () => {
        return window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      },
      message: 'Running on HTTPS or localhost (required for voice commands)'
    },
    {
      name: 'Microphone Permission',
      test: async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
          return true;
        } catch (err) {
          return false;
        }
      },
      message: 'Microphone permission is available'
    },
    {
      name: 'Speech Synthesis',
      test: () => {
        return 'speechSynthesis' in window;
      },
      message: 'Speech synthesis is supported'
    }
  ];

  const runTests = async () => {
    const results = [];
    
    for (const test of tests) {
      try {
        const passed = await test.test();
        results.push({
          name: test.name,
          passed,
          message: test.message
        });
      } catch (err) {
        results.push({
          name: test.name,
          passed: false,
          message: `Error: ${err.message}`
        });
      }
    }
    
    return results;
  };

  return { runTests, tests };
};

// Voice Command Pattern Test
export const testCommandPatterns = () => {
  const patterns = [
    // Navigation patterns
    { pattern: /(?:go to|open|navigate to|show|take me to|visit|access|bring up|launch|start|switch to) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts|landing|login|register)/i, action: 'navigation' },
    { pattern: /(?:i want to|can you|please) (?:go to|open|show|take me to) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:navigate|go|move|switch) (?:to|on|in) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:let me|allow me to|i need to) (?:go to|open|access) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:show me|display|bring up|launch) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:i want|i would like|i need) (?:to see|to view|to access) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:open up|bring up|start up) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:let's go to|let's open|let's visit) (?:the )?(library|dashboard|notebook|test(?: page)?|profile|home|documentation|privacy policy|help center|community|blog|about|contact|terms|keyboard shortcuts)/i, action: 'navigation' },
    { pattern: /(?:main|home|landing) (?:page|screen)/i, action: 'navigation' },
    { pattern: /(?:digital|book) (?:library|collection)/i, action: 'navigation' },
    { pattern: /(?:my|user) (?:profile|account|settings)/i, action: 'navigation' },
    { pattern: /(?:note|notes|notebook|writing) (?:page|section|area)/i, action: 'navigation' },
    { pattern: /(?:test|exam|quiz|assessment) (?:page|section|area)/i, action: 'navigation' },
    { pattern: /(?:help|support|assistance) (?:center|page|section)/i, action: 'navigation' },
    { pattern: /(?:documentation|docs|guide|manual)/i, action: 'navigation' },
    { pattern: /(?:community|forum|discussion|chat)/i, action: 'navigation' },
    { pattern: /(?:blog|news|articles|posts)/i, action: 'navigation' },
    { pattern: /(?:about|information|details)/i, action: 'navigation' },
    { pattern: /(?:contact|reach|get in touch|support)/i, action: 'navigation' },
    { pattern: /(?:terms|conditions|legal|policy)/i, action: 'navigation' },
    { pattern: /(?:keyboard|shortcuts|hotkeys|commands)/i, action: 'navigation' },
    { pattern: /(?:privacy|data protection|security)/i, action: 'navigation' },
    
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
    { pattern: /(?:start|begin|take) (?:a )?(test|exam|quiz|assessment)(?: for)?(?: class (\d+))?(?: (?:subject|in) ([^ ]+))?(?: chapter (\d+))?/i, action: 'start-test' },
    { pattern: /(?:open|show|access) (?:the )?(test|exam|quiz|assessment) (?:page|section)/i, action: 'open-test' },
    { pattern: /(?:answer|select|choose) (.+)/i, action: 'answer-question' },
    { pattern: /(?:submit|finish|complete|end) (?:the )?(test|exam|quiz|assessment)/i, action: 'submit-test' },
    { pattern: /(?:next|skip|continue) (?:question|problem)/i, action: 'next-question' },
    { pattern: /(?:previous|back|go back) (?:question|problem)/i, action: 'previous-question' },
    
    // Reading commands
    { pattern: /(?:next page|next|continue|forward)/i, action: 'next-page' },
    { pattern: /(?:previous page|previous|back|go back|backward)/i, action: 'previous-page' },
    { pattern: /(?:stop reading|close book|exit reading)/i, action: 'stop-reading' },
    
    // System commands
    { pattern: /(?:what can I say|help|commands|voice commands|available commands)/i, action: 'show-help' },
    { pattern: /(?:stop listening|disable voice|turn off voice|mute voice)/i, action: 'stop-listening' },
    { pattern: /(?:start listening|enable voice|turn on voice|unmute voice)/i, action: 'start-listening' },
    { pattern: /(?:clear|reset|erase) (?:all|everything|history)/i, action: 'clear-all' },
    { pattern: /(?:go back|back|return|previous page)/i, action: 'go-back' },
    { pattern: /(?:refresh|reload|restart)/i, action: 'refresh' },
    { pattern: /(?:close|exit|quit)/i, action: 'close' }
  ];

  const testCommands = [
    // Navigation test commands
    'go to library',
    'open dashboard',
    'take me to notebook',
    'navigate to test page',
    'show profile',
    'go home',
    'open documentation',
    'visit help center',
    'access community',
    'show blog',
    'open about page',
    'go to contact',
    'open terms',
    'show privacy policy',
    'open keyboard shortcuts',
    'i want to go to library',
    'can you open dashboard',
    'please take me to notebook',
    'let me go to test',
    'i need to access profile',
    'show me the library',
    'display dashboard',
    'bring up notebook',
    'launch test page',
    'i want to see the library',
    'i would like to view dashboard',
    'i need to access notebook',
    'open up library',
    'bring up dashboard',
    'start up notebook',
    "let's go to library",
    "let's open dashboard",
    "let's visit notebook",
    'main page',
    'home screen',
    'digital library',
    'book collection',
    'my profile',
    'user account',
    'my settings',
    'notes page',
    'notebook section',
    'writing area',
    'test section',
    'exam page',
    'quiz area',
    'assessment section',
    'help center',
    'support page',
    'assistance section',
    'documentation',
    'docs',
    'guide',
    'manual',
    'community',
    'forum',
    'discussion',
    'chat',
    'blog',
    'news',
    'articles',
    'posts',
    'about',
    'information',
    'details',
    'contact',
    'reach',
    'get in touch',
    'terms',
    'conditions',
    'legal',
    'policy',
    'privacy',
    'data protection',
    'security',
    'keyboard',
    'shortcuts',
    'hotkeys',
    'commands',
    
    // Other test commands
    'create a new note',
    'open book mathematics',
    'generate test for class 8 science chapter 3',
    'answer option A',
    'next page',
    'previous page',
    'save note',
    'delete note',
    'help',
    'stop listening',
    'start listening'
  ];

  const results = [];
  
  for (const command of testCommands) {
    let matched = false;
    let action = null;
    
    for (const pattern of patterns) {
      const match = command.match(pattern.pattern);
      if (match) {
        matched = true;
        action = pattern.action;
        break;
      }
    }
    
    results.push({
      command,
      matched,
      action
    });
  }
  
  return results;
};

// Voice Command System Status Check
export const getVoiceCommandStatus = () => {
  const status = {
    browserSupport: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
    https: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
    speechSynthesis: 'speechSynthesis' in window,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
  };
  
  return status;
};

export default {
  testVoiceCommands,
  testCommandPatterns,
  getVoiceCommandStatus
}; 