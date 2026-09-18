/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/utils/storage.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DEFAULT_SETTINGS = {
    isEnabled: true,
    isPro: true,
    blocklistPatterns: [],
    blockCookiePopups: false,
    blockGmailEmails: false,
    blockAmazonEbayAISummaries: false,
    blockNewsAIContent: false,
    blockSearchAIOverview: true,
    blockXAITweets: true,
    blockYouTubeAI: true,
    blockThreadsAIPosts: true,
    blockFacebookAIPosts: true,
    blockRedditAIPosts: true,
    blockInstagramAIPosts: true,
    blockSpotifyYoutubeMusicArtists: true,
    blockLinkedinFacebookAIContent: false,
    blockGeneralAIPosts: true
};
function getSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.sync.get('settings');
        let settings = result.settings ? Object.assign(Object.assign({}, DEFAULT_SETTINGS), result.settings) : Object.assign({}, DEFAULT_SETTINGS);
        return settings;
    });
}
function saveSettings(settings) {
    return __awaiter(this, void 0, void 0, function* () {
        yield chrome.storage.sync.set({ settings });
    });
}
function getBlocklistPatterns() {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield getSettings();
        // Ensure blocklistPatterns is always an array
        return Array.isArray(settings.blocklistPatterns) ? settings.blocklistPatterns : [];
    });
}
function saveBlocklistPatterns(patterns) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield getSettings();
        settings.blocklistPatterns = patterns;
        yield saveSettings(settings);
    });
}
function updateSettings(updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield getSettings();
        const updatedSettings = Object.assign(Object.assign({}, settings), updates);
        yield saveSettings(updatedSettings);
    });
}

;// ./src/settings.js


/**
 * Get localized message with fallback
 * @param {string} key - Message key
 * @param {string} fallback - Fallback text if key not found
 * @returns {string} Localized message
 */
function getMessage(key, fallback = '') {
  try {
    if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
      const message = chrome.i18n.getMessage(key);
      return message || fallback;
    }
  } catch (error) {
    // Silent error handling
  }
  return fallback;
}



/**
 * Check if user has Silver Level or above (5+ referrals) for Dark Mode access
 * Includes: Silver (5+), Gold (10+), Diamond (25+)
 */
function hasSilverLevelOrAbove() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['referralStats'], (result) => {
      if (chrome.runtime.lastError) {
        resolve(false);
        return;
      }
      
      if (result.referralStats && result.referralStats.stats) {
        const installCount = result.referralStats.stats.totalInstalls || 0;
        const hasSilverOrAbove = installCount >= 5; // Silver (5+), Gold (10+), Diamond (25+)
        
        // Determine user level for better logging
        let levelName = 'None';
        if (installCount >= 25) levelName = 'Diamond';
        else if (installCount >= 10) levelName = 'Gold';
        else if (installCount >= 5) levelName = 'Silver';
        
        resolve(hasSilverOrAbove);
      } else {
        resolve(false);
      }
    });
  });
}

function isOperaBrowser() {
  return /OPR\/|Opera/i.test(navigator.userAgent);
}

// Define which toggles are PRO-only (global scope)
const proOnlyToggles = [
  'blockGmailEmails',
  'blockAmazonEbayAISummaries',
  'blockNewsAIContent',
  'enableDarkMode',
  'blockYouTubeAIVoiceVideos',
  'blockLinkedinFacebookAIContent',
  'enableCustomKeywords',
  'enableScheduleBlocking'
];

// Store previous PRO toggle states (global scope)
let previousProToggleStates = {};

/**
 * Update the visibility of the custom keywords button
 * @param {boolean} isEnabled - Whether custom keywords are enabled
 * @param {boolean} isPro - Whether user has PRO subscription
 */
function updateCustomKeywordsButton(isEnabled, isPro = null) {
  const buttonContainer = document.getElementById('custom-keywords-button-container');
  if (buttonContainer) {
    // Only show button if user is PRO and toggle is enabled
    if (isPro === null) {
      // Get PRO status if not provided
      getSettings().then(settings => {
              const shouldShow = settings.isPro && isEnabled;
      buttonContainer.style.display = shouldShow ? 'block' : 'none';
      });
    } else {
      const shouldShow = isPro && isEnabled;
      buttonContainer.style.display = shouldShow ? 'block' : 'none';
    }
  }
}

/**
 * Initialize custom keywords functionality
 */
async function initializeCustomKeywords() {
  try {
    // Initialize the custom keywords manager
    await customKeywordsManager.init();
    
    // Set up the edit keywords button
    const editButton = document.getElementById('edit-keywords-btn');
    if (editButton) {
      editButton.addEventListener('click', () => {
        customKeywordsManager.showModal();
      });
    }
    
  } catch (error) {
    // Silent error handling
  }
}

/**
 * Update the visibility of the schedule blocking button
 * @param {boolean} isEnabled - Whether schedule blocking is enabled
 * @param {boolean} isPro - Whether user has PRO subscription
 */
function updateScheduleBlockingButton(isEnabled, isPro = null) {
  const buttonContainer = document.getElementById('schedule-blocking-button-container');
  if (buttonContainer) {
    // Only show button if user is PRO and toggle is enabled
    if (isPro === null) {
      // Get PRO status if not provided
      getSettings().then(settings => {
        const shouldShow = settings.isPro && isEnabled;
        buttonContainer.style.display = shouldShow ? 'block' : 'none';
      });
    } else {
      const shouldShow = isPro && isEnabled;
      buttonContainer.style.display = shouldShow ? 'block' : 'none';
    }
  }
}

/**
 * Initialize schedule blocking functionality
 */
async function initializeScheduleBlocking() {
  try {
    // Initialize the schedule blocking manager
    await scheduleBlockingManager.init();
    
    // Set up the choose time button
    const chooseTimeButton = document.getElementById('choose-time-btn');
    if (chooseTimeButton) {
      chooseTimeButton.addEventListener('click', () => {
        scheduleBlockingManager.showModal();
      });
    }
    
  } catch (error) {
    // Silent error handling
  }
}

// Check subscription status immediately on page load (no caching)
async function checkAndUpdateSubscriptionStatus() {
  return true;
  /*
  try {
    if (typeof window !== 'undefined' && window.SubscriptionChecker) {
      const isPro = await window.SubscriptionChecker.performSubscriptionCheck(true);
      
      // Get current settings and update if needed  
      const currentSettings = await getSettings();
      if (currentSettings.isPro !== isPro) {
        
        // If PRO is being activated for the first time, enable all PRO toggles
        if (!currentSettings.isPro && isPro) {
          const result = await chrome.storage.local.get(['proTogglesAutoEnabled']);
          const hasBeenAutoEnabled = result.proTogglesAutoEnabled || false;
          
          if (!hasBeenAutoEnabled) {
            
            const proTogglesUpdates = {
              blockYouTubeAIVoiceVideos: true,
              blockLinkedinFacebookAIContent: true, 
              blockGmailEmails: true,
              blockNewsAIContent: true,
              blockAmazonEbayAISummaries: true,
              isPro: isPro // Include the PRO status
            };
            
            // Update settings with PRO status and auto-enabled toggles
            await updateSettings(proTogglesUpdates);
            
            // Update local storage for content scripts
            await chrome.storage.local.set({
              ...proTogglesUpdates,
              proTogglesAutoEnabled: true
            });
          } else {
            await updateSettings({ isPro });
          }
        } else {
          await updateSettings({ isPro });
        }
        
        // Always reload the page to reflect all changes (toggles, button text, etc.)
        setTimeout(() => {
          location.reload();
        }, 500); // Small delay to ensure storage update completes
      }
      
      return isPro;
    }
  } catch (error) {
    // Silent error handling
  }
  return false;
  */
}

/**
 * Initialize sticky button visibility based on midProButton scroll position
 */
function initializeStickyButtonVisibility() {
  const midProButton = document.getElementById('midProButton');
  const stickyCta = document.getElementById('stickyCta');
  
  if (!midProButton || !stickyCta) return;
  
  // Create an Intersection Observer to watch the midProButton
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Show sticky button when midProButton is out of view
      if (entry.isIntersecting) {
        stickyCta.style.display = 'none';
      } else {
        stickyCta.style.display = 'flex';
      }
    });
  }, {
    threshold: 0,
    rootMargin: '-80px 0px 0px 0px' // Trigger 80px before button fully scrolls out
  });
  
  // Start observing the midProButton
  observer.observe(midProButton);
}

document.addEventListener('DOMContentLoaded', async () => {
  
  // Process i18n attributes immediately to prevent flash of raw HTML tags
  processI18nAttributes();
  
  // Fallback: make all i18n elements visible after 500ms in case processing fails
  setTimeout(() => {
    document.querySelectorAll('[data-i18n]:not(.i18n-processed)').forEach(element => {
      element.classList.add('i18n-processed');
    });
  }, 500);
  
  // Set app version in footer with Edge compatibility - always display
  const setVersionDisplay = () => {
    try {
      const versionElement = document.getElementById('app-version');
      if (versionElement) {
        // Try both chrome and browser APIs for Edge compatibility
        const browserAPI = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
        
        if (browserAPI && browserAPI.runtime && browserAPI.runtime.getManifest) {
          const manifest = browserAPI.runtime.getManifest();
          if (manifest && manifest.version) {
            // Use translated version word with actual version number
            const versionText = getMessage('version', 'ver.');
            versionElement.textContent = `${versionText} ${manifest.version}`;
          }
        }
      }
    } catch (error) {
      // Fallback: Keep the default version from HTML
    }
  };

  // Set version immediately
  setVersionDisplay();

  // Also set version after any i18n translations are applied
  setTimeout(() => {
    setVersionDisplay();
  }, 100);
  
  // Initialize stats functionality
  initializeStatsFeature();
  
  
  // Wait for theme manager to be available and fully initialized
  let attempts = 0;
  while ((!window.themeManager || !window.themeManager.initialized) && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  
  if (!window.themeManager) {
    return;
  }
  
  // Get current theme from storage directly (more reliable than theme manager state)
  const storageResult = await new Promise(resolve => {
    chrome.storage.local.get(['theme', 'darkMode'], resolve);
  });
  
  // Determine current theme (with migration support)
  let currentTheme = storageResult.theme;
  if (!currentTheme && storageResult.darkMode !== undefined) {
    currentTheme = storageResult.darkMode ? 'dark' : 'light';
    chrome.storage.local.set({ theme: currentTheme });
  }
  currentTheme = currentTheme || 'light';
  
  // Apply theme immediately to ensure it's applied
  window.themeManager.applyTheme(currentTheme);
  window.themeManager.currentTheme = currentTheme;
  
  const settings = await getSettings();
  
  // Check subscription status and update if needed
  await checkAndUpdateSubscriptionStatus();
  
  // Initialize toggles (add dark mode toggle)
  const toggles = {
    isEnabled: document.getElementById('isEnabled'),
    blockSearchAIOverview: document.getElementById('blockSearchAIOverview'),
    blockXAITweets: document.getElementById('blockXAITweets'),
    blockYouTubeAI: document.getElementById('blockYouTubeAI'),
    blockGmailEmails: document.getElementById('blockGmailEmails'),
    blockAmazonEbayAISummaries: document.getElementById('blockAmazonEbayAISummaries'),
    blockNewsAIContent: document.getElementById('blockNewsAIContent'),
    blockRedditAIPosts: document.getElementById('blockRedditAIPosts'),
    blockInstagramAIPosts: document.getElementById('blockInstagramAIPosts'),
    blockSpotifyYoutubeMusicArtists: document.getElementById('blockSpotifyYoutubeMusicArtists'),
    blockPinterestAIPosts: document.getElementById('blockPinterestAIPosts'),
    blockGeneralAIPosts: document.getElementById('blockGeneralAIPosts'),
    enableDarkMode: document.getElementById('enableDarkMode'),
    // Add missing PRO toggles
    blockYouTubeAIVoiceVideos: document.getElementById('blockYouTubeAIVoiceVideos'),
    blockLinkedinFacebookAIContent: document.getElementById('blockLinkedinFacebookAIContent'),
    enableCustomKeywords: document.getElementById('enableCustomKeywords'),
    enableScheduleBlocking: document.getElementById('enableScheduleBlocking')
  };

  // Set initial states
  for (const [key, element] of Object.entries(toggles)) {
    if (element) {
      // Special handling for dark mode - enable for PRO users or Silver Level (5+ referrals)
      if (key === 'enableDarkMode') {
        const hasSilverOrAbove = await hasSilverLevelOrAbove();
        const hasAccess = settings.isPro || hasSilverOrAbove;
        
        if (hasAccess) {
          element.disabled = false;
          // Use settings.darkMode like other toggles, with fallback to theme storage
          element.checked = settings.darkMode !== undefined ? settings.darkMode : (currentTheme === 'dark');
          
          // Force sync the theme manager state with the toggle state
          const shouldBeDark = element.checked;
          window.themeManager.currentTheme = shouldBeDark ? 'dark' : 'light';
          window.themeManager.applyTheme(window.themeManager.currentTheme);
          

        } else {
          element.disabled = true;
          element.checked = false;
          
          // Store reference to the redirect handler so we can remove it later if needed
          const redirectHandler = (e) => {
            e.preventDefault();
          };
          element.addEventListener('click', redirectHandler);
          
          // Store the handler reference on the element for potential removal
          element._redirectHandler = redirectHandler;
          

        }
      }
              // Handle other PRO-only toggles
        else if (proOnlyToggles.includes(key)) {
          if (settings.isPro) {
            // Only enable PRO toggles if extension is globally enabled
            // Exception: Always allow schedule blocking toggle to be enabled
            if (settings.isEnabled !== false || key === 'enableScheduleBlocking') {
              element.disabled = false;
            }
            
            // Special handling for custom keywords toggle - load from localStorage
            if (key === 'enableCustomKeywords') {
              chrome.storage.local.get(['enableCustomKeywords'], (result) => {
                const isEnabled = result.enableCustomKeywords || false;
                element.checked = isEnabled;
                updateCustomKeywordsButton(isEnabled, true);
              });
            } else if (key === 'enableScheduleBlocking') {
              chrome.storage.local.get(['enableScheduleBlocking'], (result) => {
                const isEnabled = result.enableScheduleBlocking || false;
                element.checked = isEnabled;
                updateScheduleBlockingButton(isEnabled, true);
              });
            } else {
              element.checked = settings[key] !== false;
            }
          } else {
            // Store current state before disabling
            if (key === 'enableCustomKeywords') {
              // Check localStorage for custom keywords
              chrome.storage.local.get(['enableCustomKeywords'], (result) => {
                if (result.enableCustomKeywords === true) {
                  previousProToggleStates[key] = true;
                }
              });
            } else if (settings[key] === true) {
              previousProToggleStates[key] = true;
            }
            
            element.disabled = true;
            element.checked = false;
            element.addEventListener('click', (e) => {
              e.preventDefault();
            });
            
            // Hide custom keywords button if not PRO
            if (key === 'enableCustomKeywords') {
              updateCustomKeywordsButton(false, false);
            }
            // Hide schedule blocking button if not PRO
            if (key === 'enableScheduleBlocking') {
              updateScheduleBlockingButton(false, false);
            }
          }
        }
      // Enable all non-PRO toggles
      else {
        element.disabled = false;
      }
      
      // Set initial checked states (except for dark mode and other PRO toggles which are handled above)
      if (key !== 'enableDarkMode' && !proOnlyToggles.includes(key)) {
        // Default ON for blockYouTubeAI, blockXAITweets, blockRedditAIPosts, blockInstagramAIPosts if not present
        if ((key === 'blockYouTubeAI' || key === 'blockXAITweets' || key === 'blockRedditAIPosts' || key === 'blockPinterestAIPosts' || key === 'blockGeneralAIPosts' || key === 'blockSpotifyYoutubeMusicArtists') && typeof settings[key] === 'undefined') {
          element.checked = true;
        } else if (key === 'blockInstagramAIPosts') {
          // Default ON; if any of Instagram / Facebook / Threads has been explicitly turned off, show as OFF
          if (typeof settings.blockInstagramAIPosts === 'undefined' && typeof settings.blockFacebookAIPosts === 'undefined') {
            element.checked = true;
          } else {
            element.checked = settings.blockInstagramAIPosts !== false || settings.blockFacebookAIPosts !== false;
          }
        } else {
          element.checked = settings[key];
        }
      }
    }
  }

  // If extension is globally disabled, disable all other toggles on page load
  if (settings.isEnabled === false) {
    Object.entries(toggles).forEach(([key, element]) => {
      if (key !== 'isEnabled' && element) {
        // EXCEPTION: Keep schedule blocking toggle enabled so users can modify their schedule
        // even when extension is currently OFF due to scheduling
        if (key === 'enableScheduleBlocking') {
          return; // Don't disable the schedule blocking toggle
        }
        element.disabled = true;
      }
    });
  }

  // Store previous toggle states in memory
  let previousToggleStates = {};

  /**
   * Update the main toggle state and all dependent toggles
   * @param {boolean} isEnabled - Whether extension should be enabled
   * @param {boolean} bySchedule - Whether this change is triggered by schedule (to avoid storage conflicts)
   */
  window.updateMainToggleState = async function(isEnabled, bySchedule = false) {
    if (!bySchedule) {
      // Only update storage if not triggered by schedule (schedule already updated storage)
      chrome.storage.local.set({ extensionGloballyEnabled: isEnabled });
    }
    
    // Get current settings to ensure we have latest PRO status
    const currentSettings = await getSettings();
    
    // When disabling extension, store and turn off all other toggles
    if (!isEnabled) {
      previousToggleStates = {};
      Object.entries(toggles).forEach(([otherKey, otherElement]) => {
        if (otherKey !== 'isEnabled' && otherElement) {
          previousToggleStates[otherKey] = otherElement.checked;
          otherElement.checked = false;
          
          // EXCEPTION: Keep schedule blocking toggle enabled so users can modify their schedule
          // even when extension is currently OFF due to scheduling
          if (otherKey === 'enableScheduleBlocking') {
            // Restore the actual schedule blocking state and keep it enabled
            chrome.storage.local.get(['enableScheduleBlocking'], (result) => {
              if (result.enableScheduleBlocking) {
                otherElement.checked = true;
              }
            });
            // Don't disable the schedule blocking toggle
            return;
          }
          
          // Disable ALL toggles (both general and PRO) when main extension is off
          otherElement.disabled = true;
        }
      });
    } else {
      // When enabling extension, restore previous toggle states
      Object.entries(toggles).forEach(([otherKey, otherElement]) => {
        if (otherKey !== 'isEnabled' && otherElement) {
          otherElement.checked = previousToggleStates[otherKey] ?? otherElement.checked;
          // Only disable Pro toggles for non-Pro users
          if (proOnlyToggles.includes(otherKey) && !currentSettings.isPro) {
            otherElement.disabled = true;
          } else {
            otherElement.disabled = false;
          }
        }
      });
    }
  };

  // Add event listeners
  Object.entries(toggles).forEach(([key, element]) => {
    if (element) {
      element.addEventListener('change', async () => {
        // Special handling for dark mode
        if (key === 'enableDarkMode') {
          const newTheme = element.checked ? 'dark' : 'light';
          await window.themeManager.setTheme(newTheme, true);
          // Also save to settings like other toggles
          await updateSettings({ [key]: element.checked });
          return;
        }
        
        if (key === 'blockInstagramAIPosts') {
          await updateSettings({ blockInstagramAIPosts: element.checked, blockFacebookAIPosts: element.checked, blockThreadsAIPosts: element.checked });
        } else {
          await updateSettings({ [key]: element.checked });
        }
        if (key === 'isEnabled') {
          // Record manual toggle change timestamp to prevent schedule override conflicts
          await chrome.storage.local.set({ 
            lastManualToggleChange: Date.now(),
            manualToggleState: element.checked 
          });
          
          // Use the shared toggle state management function
          await updateMainToggleState(element.checked, false); // false = manual click, not by schedule
        }
        
        // Special handling: if this is a PRO feature being disabled, 
        // and the user is losing PRO access, also disable dark mode
        if (!settings.isPro && key === 'isPro' && !element.checked) {
          const darkModeToggle = toggles.enableDarkMode;
          if (darkModeToggle && darkModeToggle.checked) {
            darkModeToggle.checked = false;
            await window.themeManager.setTheme('light', true);
          }
        }
        
        if (key === 'blockSearchAIOverview') {
          chrome.storage.local.set({ blockSearchAIOverview: element.checked });
        }
        if (key === 'blockYouTubeAI') {
          chrome.storage.local.set({ blockYouTubeAI: element.checked });
        }
        if (key === 'blockXAITweets') {
          chrome.storage.local.set({ blockXAITweets: element.checked });
        }
        if (key === 'blockGmailEmails') {
          chrome.storage.local.set({ blockGmailEmails: element.checked });
        }
        if (key === 'blockAmazonEbayAISummaries') {
          chrome.storage.local.set({ blockAmazonEbayAISummaries: element.checked });
        }
        if (key === 'blockNewsAIContent') {
          chrome.storage.local.set({ blockNewsAIContent: element.checked });
        }
        if (key === 'blockInstagramAIPosts') {
          chrome.storage.local.set({ blockInstagramAIPosts: element.checked, blockFacebookAIPosts: element.checked, blockThreadsAIPosts: element.checked });
        }
        if (key === 'blockSpotifyYoutubeMusicArtists') {
          chrome.storage.local.set({ blockSpotifyYoutubeMusicArtists: element.checked });
        }
        if (key === 'blockPinterestAIPosts') {
          chrome.storage.local.set({ blockPinterestAIPosts: element.checked });
        }
        // Add storage for new PRO toggles
        if (key === 'blockYouTubeAIVoiceVideos') {
          chrome.storage.local.set({ blockYouTubeAIVoiceVideos: element.checked });
          // Also sync to settings for popup synchronization  
          await updateSettings({ [key]: element.checked });
        }
        if (key === 'blockLinkedinFacebookAIContent') {
          chrome.storage.local.set({ blockLinkedinFacebookAIContent: element.checked });
          // Also sync to settings for popup synchronization
          await updateSettings({ [key]: element.checked });
        }
        if (key === 'enableCustomKeywords') {
          chrome.storage.local.set({ enableCustomKeywords: element.checked });
          // Get current settings to ensure we have latest PRO status
          getSettings().then(currentSettings => {
            updateCustomKeywordsButton(element.checked, currentSettings.isPro);
          });
        }
        if (key === 'enableScheduleBlocking') {
          chrome.storage.local.set({ enableScheduleBlocking: element.checked });
          // Get current settings to ensure we have latest PRO status
          getSettings().then(currentSettings => {
            updateScheduleBlockingButton(element.checked, currentSettings.isPro);
          });
          
          // Start or stop schedule checker based on toggle state
          if (element.checked && window.scheduleBlockingManager) {
            window.scheduleBlockingManager.startScheduleChecker();
          } else if (window.scheduleBlockingManager) {
            window.scheduleBlockingManager.stopScheduleChecker();
            // When disabling schedule blocking, restore normal extension operation
            // Don't force any state - let user control the main toggle manually
          }
        }
        if (chrome.runtime && chrome.runtime.id) {
          try {
            chrome.runtime.sendMessage({
              type: 'settingsUpdated',
              settings: { ...settings, [key]: element.checked }
            }).catch(() => {
              // Silently handle extension context invalidated errors
            });
          } catch (error) {
            // Silently handle any synchronous errors
          }
        }
      });
    }
  });

  // Initialize custom keywords functionality after all toggles are set up
  await initializeCustomKeywords();
  
  // Initialize schedule blocking functionality after all toggles are set up
  await initializeScheduleBlocking();
  
  // Start schedule checker if schedule blocking is already enabled
  chrome.storage.local.get(['enableScheduleBlocking'], (result) => {
    if (result.enableScheduleBlocking && window.scheduleBlockingManager) {
      window.scheduleBlockingManager.startScheduleChecker();
    }
  });

  // Listen for theme changes and enableCustomKeywords updates from other pages (e.g. Block Channel in YouTube modal)
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'themeChanged') {
        const darkModeToggle = toggles.enableDarkMode;
        if (darkModeToggle && !darkModeToggle.disabled) {
          darkModeToggle.checked = message.theme === 'dark';
        }
        sendResponse({ success: true });
      } else if (message.type === 'enableCustomKeywordsUpdated') {
        const enableCustomKeywordsToggle = document.getElementById('enableCustomKeywords');
        if (enableCustomKeywordsToggle && message.enabled === true) {
          enableCustomKeywordsToggle.checked = true;
          getSettings().then((s) => updateCustomKeywordsButton(true, s.isPro));
        }
        sendResponse({ success: true });
      }
    });
  }

  // Payment controls have been removed.
  const proButton = null;
  const stickyProButton = null;
  const stickyCta = null;
  const midProButton = null;
  const midProCta = null;
  const bottomCtaText = null;
  
  if (false && proButton) {
    // Reset button class to ensure clean state
    proButton.classList.remove('manage-subscription');
    
    // Update button text and functionality based on PRO status
    if (settings.isPro) {
      // Hide sticky CTA, mid-page CTA, and bottom CTA text for PRO users
      if (stickyCta) {
        stickyCta.style.display = 'none';
      }
      if (midProCta) {
        midProCta.style.display = 'none';
      }
      if (bottomCtaText) {
        bottomCtaText.style.display = 'none';
      }
      
      // Show manage subscription for PRO users
      proButton.textContent = getMessage('manageSubscription', 'Manage Subscription');
      proButton.setAttribute('data-i18n', 'manageSubscription');
      proButton.setAttribute('aria-label', getMessage('manageSubscription', 'Manage Subscription'));
      proButton.classList.add('manage-subscription');
      
      proButton.addEventListener('click', async () => {
        try {
          // Show loading state
          const originalText = proButton.textContent;
          proButton.textContent = 'Loading...';
          proButton.disabled = true;
          
          // Get installation ID
          const installationId = await window.StripeConfig?.getInstallationId?.() || 
                                 await getInstallationIdFallback();
          
          // Create customer portal session
                         const response = await fetch(`${window.StripeConfig?.STRIPE_API_BASE || 'https://stripe.aicontentshield.workers.dev'}/create-portal-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              installation_id: installationId,
              return_url: window.location.href
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          if (!data.portal_url) {
            throw new Error('No portal URL received');
          }
          
          // Open customer portal in new tab
          window.open(data.portal_url, '_blank');
          
          // Reset button state
          proButton.textContent = originalText;
          proButton.disabled = false;
          
        } catch (error) {
          
          // Reset button state
          proButton.textContent = originalText;
          proButton.disabled = false;
          
          // Show error message (you could implement a toast notification here)
          alert('Unable to access subscription management. Please try again later.');
        }
      });
      
      // Show stats button for PRO users
      updateStatsButtonVisibility(true);
    } else {
      // Show upgrade for non-PRO users
      const tryForFreeText = getMessage('startFreeTrial', 'Start free trial');
      proButton.textContent = tryForFreeText;
      proButton.setAttribute('data-i18n', 'startFreeTrial');
      proButton.setAttribute('aria-label', tryForFreeText);
      proButton.classList.remove('manage-subscription');
      
      
      // Show mid-page CTA and bottom CTA text for non-PRO users
      // (sticky CTA will be shown via IntersectionObserver when midProButton scrolls out of view)
      if (midProCta) {
        midProCta.style.display = 'block';
      }
      if (bottomCtaText) {
        bottomCtaText.style.display = 'block';
      }
      
      // Add event listener to sticky button
      if (stickyProButton) {
      }
      
      // Add event listener to mid-page CTA button
      if (midProButton) {
      }
      
      // Initialize sticky button visibility based on midProButton scroll position
      initializeStickyButtonVisibility();
      
      // Hide stats button for non-PRO users
      updateStatsButtonVisibility(false);
    }
  }

  // Add refresh subscription button handler
  const refreshSubscriptionBtn = null;
  if (false && refreshSubscriptionBtn) {
    refreshSubscriptionBtn.addEventListener('click', async () => {
      try {
        // Update button state with visual feedback
        const svg = refreshSubscriptionBtn.querySelector('svg');
        const originalAriaLabel = refreshSubscriptionBtn.getAttribute('aria-label');
        
        // Add spinning animation and disable button
        refreshSubscriptionBtn.setAttribute('aria-label', 'Checking subscription status...');
        refreshSubscriptionBtn.disabled = true;
        refreshSubscriptionBtn.style.opacity = '0.7';
        svg.style.animation = 'spin 1s linear infinite';
        
        // Force subscription check
        
        // Clear cache to force fresh check
        await chrome.storage.local.remove(['lastSubscriptionCheck', 'subscriptionStatus']);  
        
        // Perform fresh check
        const isPro = await window.SubscriptionChecker.performSubscriptionCheck(true);
        
        // Get current settings and compare
        const currentSettings = await getSettings();
        
        if (currentSettings.isPro !== isPro) {
          
          // If PRO is being activated for the first time, enable all PRO toggles
          if (!currentSettings.isPro && isPro) {
            const result = await chrome.storage.local.get(['proTogglesAutoEnabled']);
            const hasBeenAutoEnabled = result.proTogglesAutoEnabled || false;
            
            if (!hasBeenAutoEnabled) {
              
              const proTogglesUpdates = {
                blockYouTubeAIVoiceVideos: true,
                blockLinkedinFacebookAIContent: true, 
                blockGmailEmails: true,
                blockNewsAIContent: true,
                blockAmazonEbayAISummaries: true,
                isPro: isPro
              };
              
              await updateSettings(proTogglesUpdates);
              await chrome.storage.local.set({
                ...proTogglesUpdates,
                proTogglesAutoEnabled: true
              });
            } else {
              await updateSettings({ isPro });
            }
          } else {
            await updateSettings({ isPro });
          }
          
          // Show success state briefly
          svg.style.animation = '';
          refreshSubscriptionBtn.style.background = '#4caf50';
          refreshSubscriptionBtn.style.borderColor = '#4caf50';
          refreshSubscriptionBtn.setAttribute('aria-label', 'Status updated successfully');
          
          setTimeout(() => {
            // Reload page to reflect all changes
            location.reload();
          }, 1000);
        } else {
          // No change, show up-to-date state
          svg.style.animation = '';
          refreshSubscriptionBtn.style.background = '#4caf50';
          refreshSubscriptionBtn.style.borderColor = '#4caf50';
          refreshSubscriptionBtn.setAttribute('aria-label', 'Status is up to date');
          
          setTimeout(() => {
            // Reload page to ensure UI is fully refreshed
            location.reload();
          }, 1500);
        }
        
      } catch (error) {
        const svg = refreshSubscriptionBtn.querySelector('svg');
        
        // Show error state
        svg.style.animation = '';
        refreshSubscriptionBtn.style.background = '#f44336';
        refreshSubscriptionBtn.style.borderColor = '#f44336';
        refreshSubscriptionBtn.setAttribute('aria-label', 'Error checking subscription status');
        
        setTimeout(() => {
          // Reload page even on error to ensure UI consistency
          location.reload();
        }, 2000);
      }
    });
  }

  // Fallback function to get installation ID if StripeConfig is not available
  async function getInstallationIdFallback() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['installationId'], (result) => {
        if (result.installationId) {
          resolve(result.installationId);
        } else {
          const newId = 'install_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          chrome.storage.local.set({ installationId: newId }, () => {
            resolve(newId);
          });
        }
      });
    });
  }

  // Redirect on click of any locked toggle row
  document.querySelectorAll('.locked.toggle-row').forEach(row => {
    row.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });

  // Redirect on click of any locked text/description block
  document.querySelectorAll('.locked-clickable').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });

  // Pro feature row click/hover logic - check both PRO status and Silver+ level access
  const hasSilverOrAbove = await hasSilverLevelOrAbove();
  
  if (!settings.isPro) {
    document.querySelectorAll('.pro-feature-row').forEach(row => {
      const isDarkModeRow = row.id === 'pro-darkmode-row';
      const hasAccess = isDarkModeRow && hasSilverOrAbove;
      
      if (!hasAccess) {
        // Only add click handlers to rows that don't have Silver+ access
        row.classList.add('pro-feature-row--clickable');
        row.addEventListener('click', (e) => {
          e.preventDefault();
        });
      } else {
        // For Silver+ users with Dark Mode access, remove click styling
        row.classList.remove('pro-feature-row--clickable');
        
        // Update lock icon for Silver+ access
        const lockIcon = row.querySelector('.pro-locked');
        if (lockIcon) {
          lockIcon.innerHTML = `<span class="pro-text">${getMessage('pro', 'PRO')}</span>`;
          lockIcon.title = 'Unlocked with Silver+ Level (5+ referrals) - includes Gold & Diamond';
          lockIcon.style.opacity = '1';
        }
      }
    });
  } else {
    // For PRO users, unlock all features
    document.querySelectorAll('.pro-feature-row').forEach(row => {
      row.classList.remove('pro-feature-row--clickable');
      
      const lockIcon = row.querySelector('.pro-locked');
      if (lockIcon) {
        lockIcon.innerHTML = `<span class="pro-text">${getMessage('pro', 'PRO')}</span>`;
        lockIcon.title = 'PRO feature unlocked';
        lockIcon.style.opacity = '1';
      }
    });
  }

  // Reddit toggle logic
  const blockRedditAIPostsCheckbox = document.getElementById('blockRedditAIPosts');
  if (blockRedditAIPostsCheckbox) {
    chrome.storage.sync.get(['settings'], (result) => {
      const settings = result.settings || {};
      blockRedditAIPostsCheckbox.checked = settings.blockRedditAIPosts !== false;
    });
    blockRedditAIPostsCheckbox.addEventListener('change', () => {
      chrome.storage.sync.get(['settings'], (result) => {
        const settings = result.settings || {};
        settings.blockRedditAIPosts = blockRedditAIPostsCheckbox.checked;
        chrome.storage.sync.set({ settings }, () => {
          if (chrome.runtime && chrome.runtime.id) {
            try {
              chrome.runtime.sendMessage({ type: 'settingsUpdated', settings }).catch(() => {
                // Silently handle extension context invalidated errors
              });
            } catch (error) {
              // Silently handle any synchronous errors
            }
          }
        });
      });
    });
  }

  // Pinterest toggle logic
  const pinterestToggle = document.getElementById('blockPinterestAIPosts');
  if (pinterestToggle) {
    pinterestToggle.addEventListener('change', () => {
      chrome.storage.sync.get(['settings'], (result) => {
        const settings = result.settings || {};
        settings.blockPinterestAIPosts = pinterestToggle.checked;
        chrome.storage.sync.set({ settings });
      });
    });
    // Load state on page load
    chrome.storage.sync.get(['settings'], (result) => {
      const settings = result.settings || {};
      pinterestToggle.checked = settings.blockPinterestAIPosts !== false;
    });
  }

  // Update referral link display
  const referralInput = document.getElementById('aics-referral-url');
  if (referralInput && settings.refCode) {
    const refUrl = `https://www.aicontentshield.app/extension?ref=${settings.refCode}`;
    referralInput.value = refUrl;
    
    // Add click-to-select and copy functionality
    referralInput.addEventListener('click', function() {
      this.select();
      this.setSelectionRange(0, 99999); // For mobile devices
      
      // Copy to clipboard
      navigator.clipboard.writeText(this.value).then(() => {
        // Show feedback (optional)
        const copyBtn = document.getElementById('aics-referral-copy');
        if (copyBtn) {
                  const originalText = copyBtn.textContent;
        copyBtn.textContent = getMessage('copied', 'Copied!');
        copyBtn.style.background = '#4caf50';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.background = '#2196f3';
        }, 1500);
        }
      }).catch(err => {
        // Copy failed silently
      });
    });
  }

  // Social sharing handlers
  const shareHandlers = {
    'share-x': () => {
      const shareUrl = `https://www.aicontentshield.app/extension?ref=${settings.refCode}`;
      const shareMessage = getMessage('shareIntentMessage', "I'm using AI Content Shield to detect & block AI content - saving me time. Install it to make your feed feel human again. @aicontentshield #aicontentshield #aidetector #aicontentblocker");
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    },
    'share-facebook': () => {
      const shareUrl = `https://www.aicontentshield.app/extension?ref=${settings.refCode}`;
      const shareMessage = getMessage('shareIntentMessage', "I'm using AI Content Shield to detect & block AI content - saving me time. Install it to make your feed feel human again. @aicontentshield #aicontentshield #aidetector #aicontentblocker");
      // Copy message to clipboard first, then open Facebook sharer
      navigator.clipboard.writeText(shareMessage + ' ' + shareUrl).then(() => {
        alert('Message copied to clipboard! The Facebook sharing dialog will open - you can paste the message there.');
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, '_blank', 'width=580,height=400');
      }).catch(() => {
        // Fallback if clipboard API fails
        const textArea = document.createElement('textarea');
        textArea.value = shareMessage + ' ' + shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Message copied to clipboard! The Facebook sharing dialog will open - you can paste the message there.');
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, '_blank', 'width=580,height=400');
      });
    },
    'share-threads': () => {
      const shareUrl = `https://www.aicontentshield.app/extension?ref=${settings.refCode}`;
      const shareMessage = getMessage('shareIntentMessage', "I'm using AI Content Shield to detect & block AI content - saving me time. Install it to make your feed feel human again. @aicontentshield #aicontentshield #aidetector #aicontentblocker");
      const threadsUrl = `https://threads.net/intent/post?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`;
      window.open(threadsUrl, '_blank', 'width=550,height=420');
    },
    'share-instagram': () => {
      const shareUrl = `https://www.aicontentshield.app/extension?ref=${settings.refCode}`;
      const shareMessage = getMessage('shareIntentMessage', "I'm using AI Content Shield to detect & block AI content - saving me time. Install it to make your feed feel human again. @aicontentshield #aicontentshield #aidetector #aicontentblocker");
      // Instagram doesn't support direct sharing URLs, so copy to clipboard
      navigator.clipboard.writeText(shareMessage + ' ' + shareUrl).then(() => {
        alert('Message copied to clipboard! Now you can paste it in your Instagram post or story.');
        window.open('https://www.instagram.com/', '_blank');
      }).catch(() => {
        // Fallback if clipboard API fails
        const textArea = document.createElement('textarea');
        textArea.value = shareMessage + ' ' + shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Message copied to clipboard! Now you can paste it in your Instagram post or story.');
        window.open('https://www.instagram.com/', '_blank');
      });
    }
  };

  // Add event listeners for social sharing
  Object.keys(shareHandlers).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        shareHandlers[id]();
      });
    }
  });

  // Add event listener for the copy button
  const referralCopyBtn = document.getElementById('aics-referral-copy');
  if (referralCopyBtn && referralInput) {
    referralCopyBtn.addEventListener('click', () => {
      referralInput.select();
      referralInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(referralInput.value).then(() => {
        const originalText = referralCopyBtn.textContent;
        referralCopyBtn.textContent = getMessage('copied', 'Copied!');
        referralCopyBtn.style.background = '#4caf50';
        setTimeout(() => {
          referralCopyBtn.textContent = originalText;
          referralCopyBtn.style.background = '#2196f3';
        }, 1500);
      }).catch(err => {
        // Copy failed silently
      });
    });
  }

  
  // Handle smart blocking info message
  const smartBlockingInfo = document.getElementById('smart-blocking-info');
  const closeSmartBlockingBtn = document.getElementById('close-smart-blocking-info');
  
  // Check if user has already dismissed the message and show it if not dismissed
  chrome.storage.local.get(['smartBlockingInfoDismissed'], (result) => {
    if (!result.smartBlockingInfoDismissed) {
      smartBlockingInfo.style.display = 'block';
      
      // Ensure translations are applied to the now-visible element
      if (window.i18n && window.i18n.applyTranslations) {
        setTimeout(() => {
          window.i18n.applyTranslations();
          // Re-set version after translations are applied
          setTimeout(() => {
            setVersionDisplay();
          }, 0);
        }, 0);
      }
    }
  });
  
  // Handle close button click
  if (closeSmartBlockingBtn) {
    closeSmartBlockingBtn.addEventListener('click', () => {
      smartBlockingInfo.style.display = 'none';
      chrome.storage.local.set({ smartBlockingInfoDismissed: true });
    });
  }

  // Handle smart blocking overlay hover effects
  const smartBlockingOverlay = document.querySelector('.smart-blocking-overlay');
  if (smartBlockingOverlay) {
    smartBlockingOverlay.parentElement.addEventListener('mouseenter', () => {
      smartBlockingOverlay.style.opacity = '0.04';
    });
    
    smartBlockingOverlay.parentElement.addEventListener('mouseleave', () => {
      smartBlockingOverlay.style.opacity = '0';
    });
  }
  
  // Listen for PRO status changes and referral stats changes
  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (!chrome?.runtime?.id) return; // Extension context invalidated
    try {
    // Handle PRO status changes (sync storage)
    if (namespace === 'sync' && changes.settings) {
      const newSettings = changes.settings.newValue;
      const oldSettings = changes.settings.oldValue || {};
      
      // If PRO status changed
      if (oldSettings.isPro !== newSettings.isPro) {

        
        // Update PRO interface
        await updateProInterface(newSettings.isPro);
        
        // If PRO status changed from false to true (first-time activation)
        if (oldSettings.isPro === false && newSettings.isPro === true) {
          // Check if this is the first time PRO is activated (don't override manual changes)
          const result = await chrome.storage.local.get(['proTogglesAutoEnabled']);
          const hasBeenAutoEnabled = result.proTogglesAutoEnabled || false;
          
          if (!hasBeenAutoEnabled) {
            console.log('🎉 PRO activated for first time - enabling 5 main PRO toggles');
            
            // Auto-enable the 5 main PRO toggles for first-time PRO users
            const proTogglesUpdates = {
              blockYouTubeAIVoiceVideos: true,
              blockLinkedinFacebookAIContent: true, 
              blockGmailEmails: true,
              blockNewsAIContent: true,
              blockAmazonEbayAISummaries: true
            };
            
            // Update settings
            await updateSettings(proTogglesUpdates);
            
            // Update local storage for content scripts
            await chrome.storage.local.set({
              ...proTogglesUpdates,
              proTogglesAutoEnabled: true // Mark that we've auto-enabled once
            });
            
            // Update UI toggles if they exist
            Object.entries(proTogglesUpdates).forEach(([toggleKey, enabled]) => {
              const toggle = document.getElementById(toggleKey);
              if (toggle) {
                toggle.checked = enabled;
              }
            });
            
            console.log('✅ 5 main PRO toggles enabled for new PRO user');
          }
        }
        
        // If PRO status changed from true to false
        if (oldSettings.isPro === true && newSettings.isPro === false) {
          // Check if user still has Silver Level access before disabling dark mode
          const hasSilverOrAbove = await hasSilverLevelOrAbove();
          
          if (newSettings.darkMode === true && !hasSilverOrAbove) {

            await window.themeManager.setTheme('light', true);
            
            // Update the toggle if it exists
            const darkModeToggle = document.getElementById('enableDarkMode');
            if (darkModeToggle) {
              darkModeToggle.checked = false;
            }
            
            // Update settings
            await updateSettings({ darkMode: false });
          } else if (newSettings.darkMode === true && hasSilverOrAbove) {

          }
        }
      }
    }
    
    // Handle enableCustomKeywords changes (e.g. from Block Channel in YouTube modal)
    if (namespace === 'local' && changes.enableCustomKeywords) {
      const enableCustomKeywordsToggle = document.getElementById('enableCustomKeywords');
      if (enableCustomKeywordsToggle) {
        enableCustomKeywordsToggle.checked = changes.enableCustomKeywords.newValue === true;
        const settings = await getSettings();
        updateCustomKeywordsButton(enableCustomKeywordsToggle.checked, settings.isPro);
      }
    }
    
    // Handle referral stats changes (local storage)
    if (namespace === 'local' && changes.referralStats) {
      const newStats = changes.referralStats.newValue;
      const oldStats = changes.referralStats.oldValue;
      
      const newInstallCount = newStats?.stats?.totalInstalls || 0;
      const oldInstallCount = oldStats?.stats?.totalInstalls || 0;
      
      // Check if Silver+ level access changed
      const hadSilverAccess = oldInstallCount >= 5;
      const hasSilverAccess = newInstallCount >= 5;
      
      if (hadSilverAccess !== hasSilverAccess) {

        
        const settings = await getSettings();
        
        // If user lost Silver+ access and is not PRO, disable dark mode
        if (!hasSilverAccess && !settings.isPro && settings.darkMode === true) {

          await window.themeManager.setTheme('light', true);
          
          // Update the toggle if it exists
          const darkModeToggle = document.getElementById('enableDarkMode');
          if (darkModeToggle) {
            darkModeToggle.checked = false;
            darkModeToggle.disabled = true;
            
            // Re-add redirect handler
            const redirectHandler = (e) => {
              e.preventDefault();
            };
            darkModeToggle.addEventListener('click', redirectHandler);
            darkModeToggle._redirectHandler = redirectHandler;
          }
          
          // Update settings
          await updateSettings({ darkMode: false });
        }
        
        // If user gained Silver+ access and is not PRO, enable dark mode toggle
        else if (hasSilverAccess && !settings.isPro) {

          
          const darkModeToggle = document.getElementById('enableDarkMode');
          if (darkModeToggle) {
            darkModeToggle.disabled = false;
            
            // Remove redirect handler if it exists
            if (darkModeToggle._redirectHandler) {
              darkModeToggle.removeEventListener('click', darkModeToggle._redirectHandler);
              delete darkModeToggle._redirectHandler;
            }
          }
        }
        
        // Update the PRO interface to reflect new access levels
        await updateProInterface(settings.isPro);
      }
    }
    } catch (error) {
      // Extension context invalidated or other error - silently ignore
    }
  });

  // Update PRO interface based on subscription status
  await updateProInterface(settings.isPro);
  
  // Check if current dark mode state is valid for user's access level
  const activeTheme = window.themeManager?.currentTheme || 'light';
  if (activeTheme === 'dark' && settings.darkMode === true) {
    const hasSilverOrAbove = await hasSilverLevelOrAbove();
    const hasAccess = settings.isPro || hasSilverOrAbove;
    
    if (!hasAccess) {

      await window.themeManager.setTheme('light', true);
      
      // Update the toggle
      const darkModeToggle = document.getElementById('enableDarkMode');
      if (darkModeToggle) {
        darkModeToggle.checked = false;
      }
      
      // Update settings
      await updateSettings({ darkMode: false });
    }
  }
  
  // Initialize Firebase referral tracking if needed
  if (false) setTimeout(async () => {
    try {
      // Check if we have referral data that needs Firebase processing
      const currentData = await new Promise((resolve) => {
        chrome.storage.local.get(['referral_code', 'referral_timestamp', 'referral_processed', 'firebase_processed', 'install_timestamp'], resolve);
      });
      
      // Only process if we have referral data that hasn't been sent to Firebase yet
      if (currentData.referral_code && currentData.firebase_processed !== true) {
        // Initialize Firebase referral tracking
        await extensionReferralTracker.initialize();
      }
      
    } catch (error) {
      // Silent error handling
    }
  }, 3000); // Shorter delay since background script handles initial retrieval

});

// Process i18n attributes for translation with HTML support
function processI18nAttributes() {
  // Messages that are allowed to contain HTML (for security, only specific keys)
  const htmlAllowedKeys = [
    'enableExtension',
    'blockSearchAIOverview',
    'blockYouTubeAIVideos', 
    'blockXAIPosts',
    'blockInstagramAIPosts',
    'blockSpotifyYoutubeMusicArtists',
    'blockRedditAIPosts',
    'blockPinterestAIPosts',
    'blockGeneralAIPosts',
    // Additional keys that may contain HTML in translations
    'blockYouTubeAI',
    'blockXAITweets',
    'blockFacebookAIPosts',
    'blockGeneralAI'
  ];

  // Process text content
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      const message = getMessage(key);
      if (message) {
        // Use innerHTML for specific keys that might contain HTML, textContent for others
        // Enhanced HTML detection for better cross-browser compatibility
        if (htmlAllowedKeys.includes(key) && (message.includes('<b>') || message.includes('</b>') || message.includes('<i>') || message.includes('</i>') || message.includes('<strong>') || message.includes('</strong>'))) {
          element.innerHTML = message;
        } else {
          element.textContent = message;
        }
        // Add processed class to make element visible
        element.classList.add('i18n-processed');
      }
    }
  });
  
  // Process aria-label attributes (always use textContent for accessibility)
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    if (key) {
      const message = getMessage(key);
      if (message) {
        // Strip HTML tags for aria-label to ensure accessibility
        const cleanMessage = message.replace(/<[^>]*>/g, '');
        element.setAttribute('aria-label', cleanMessage);
        // Add processed class to make element visible
        element.classList.add('i18n-processed');
      }
    }
  });
  
  // Process alt attributes (always use textContent for accessibility)
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const key = element.getAttribute('data-i18n-alt');
    if (key) {
      const message = getMessage(key);
      if (message) {
        // Strip HTML tags for alt text to ensure accessibility
        const cleanMessage = message.replace(/<[^>]*>/g, '');
        element.setAttribute('alt', cleanMessage);
        // Add processed class to make element visible
        element.classList.add('i18n-processed');
      }
    }
  });
}

// Function to manage PRO interface changes
async function updateProInterface(isPro) {
  const proFeatureRows = document.querySelectorAll('.pro-feature-row');
  const settings = await getSettings();
  const hasSilverOrAbove = await hasSilverLevelOrAbove();
  
  for (const row of proFeatureRows) {
    const lockIcon = row.querySelector('.pro-locked');
    const toggle = row.querySelector('input[type="checkbox"]');
    const toggleId = toggle ? toggle.id : null;
    
    // Special handling for Dark Mode - accessible to PRO users OR Silver Level (5+ referrals)
    const isDarkModeRow = row.id === 'pro-darkmode-row';
    const hasAccess = isPro || (isDarkModeRow && hasSilverOrAbove);
    
    if (hasAccess) {
      // Replace lock icon with appropriate label
      if (lockIcon) {
        if (isPro) {
          lockIcon.innerHTML = `<span class="pro-text">${getMessage('pro', 'PRO')}</span>`;
          lockIcon.title = 'PRO feature unlocked';
        } else if (isDarkModeRow && hasSilverOrAbove) {
          lockIcon.innerHTML = `<span class="pro-text">${getMessage('pro', 'PRO')}</span>`;
          lockIcon.title = 'Unlocked with Silver+ Level (5+ referrals) - includes Gold & Diamond';
        }
        lockIcon.style.opacity = '1';
      }
      
      // Remove click handlers and styling
      row.classList.remove('pro-feature-row--clickable');
      row.onclick = null;
      
      // Enable and restore toggle states for all PRO toggles
      if (toggle && toggleId) {
        // Only enable PRO toggles if extension is globally enabled
        // Exception: Always allow schedule blocking toggle to be enabled
        if (settings.isEnabled !== false || toggleId === 'enableScheduleBlocking') {
          toggle.disabled = false;
        }
        
        // Remove any redirect click handlers from the toggle itself
        toggle.onclick = null;
        
        // Remove stored redirect handler if it exists
        if (toggle._redirectHandler) {
          toggle.removeEventListener('click', toggle._redirectHandler);
          delete toggle._redirectHandler;
        }
        
        // Restore from previous state or current settings
        // enableCustomKeywords lives in storage.local, not settings (sync) - always read from storage
        if (toggleId === 'enableCustomKeywords') {
          const localResult = await chrome.storage.local.get(['enableCustomKeywords']);
          toggle.checked = localResult.enableCustomKeywords === true;
          updateCustomKeywordsButton(toggle.checked, hasAccess);
        } else if (previousProToggleStates[toggleId] !== undefined) {
          toggle.checked = previousProToggleStates[toggleId];
          // Update settings to match restored state
          await updateSettings({ [toggleId]: previousProToggleStates[toggleId] });
        } else {
          // Use current settings value
          toggle.checked = settings[toggleId] !== false;
        }
        
        // Special handling for schedule blocking toggle (also in storage.local)
        if (toggleId === 'enableScheduleBlocking') {
          const schedResult = await chrome.storage.local.get(['enableScheduleBlocking']);
          toggle.checked = schedResult.enableScheduleBlocking === true;
          updateScheduleBlockingButton(toggle.checked, hasAccess);
        }
      }
    } else {
      // Non-PRO user: Show lock icon
      if (lockIcon) {
        lockIcon.innerHTML = `
          <svg class="gold-lock" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="4" y="9" width="12" height="7" rx="2" fill="#FFC107" stroke="#BFA32B" stroke-width="1.2"/>
            <path d="M7 9V7a3 3 0 1 1 6 0v2" stroke="#BFA32B" stroke-width="1.2" fill="none"/>
            <circle cx="10" cy="13" r="1.2" fill="#BFA32B"/>
          </svg>
        `;
        lockIcon.style.opacity = '';
        lockIcon.title = 'PRO feature';
      }
      
      // Add click handlers to redirect to subscription
      row.classList.add('pro-feature-row--clickable');
      row.onclick = (e) => {
        e.preventDefault();
      };
      
      // Store current state and disable PRO toggles
      if (toggle && toggleId) {
        if (toggle.checked) {
          previousProToggleStates[toggleId] = true;
        }
        toggle.checked = false;
        toggle.disabled = true;
        // Update settings to turn off PRO features
        await updateSettings({ [toggleId]: false });
        
        // Special handling for custom keywords toggle
        if (toggleId === 'enableCustomKeywords') {
          updateCustomKeywordsButton(false, false);
        }
        // Special handling for schedule blocking toggle
        if (toggleId === 'enableScheduleBlocking') {
          updateScheduleBlockingButton(false, false);
        }
      }
    }
  }
}

// Stats Modal Functions
function updateStatsButtonVisibility(isPro) {
  const statsButtonContainer = document.getElementById('statsButtonContainer');
  if (statsButtonContainer) {
    statsButtonContainer.style.display = isPro ? 'block' : 'none';
  }
}

function initializeStatsFeature() {
  const statsButton = document.getElementById('statsButton');
  const statsModal = document.getElementById('statsModal');
  const statsModalClose = document.getElementById('statsModalClose');
  const statsModalOverlay = document.querySelector('.stats-modal-overlay');

  if (statsButton && statsModal) {
    // Open modal
    statsButton.addEventListener('click', () => {
      populateStatsModal();
      statsModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    // Close modal handlers
    const closeModal = () => {
      statsModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    if (statsModalClose) {
      statsModalClose.addEventListener('click', closeModal);
    }
    
    if (statsModalOverlay) {
      statsModalOverlay.addEventListener('click', closeModal);
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && statsModal.style.display === 'flex') {
        closeModal();
      }
    });
  }
}

async function populateStatsModal() {
  try {
    // Get blocked counts from storage
    const result = await new Promise((resolve) => {
      chrome.storage.local.get(['blockedCounts'], resolve);
    });

    const blockedCounts = result.blockedCounts || {};
    const globalCounts = blockedCounts._global || {};
    const total = globalCounts.total || 0;

    // Calculate time-based stats
    const now = new Date();
    const today = getDateKey(now);
    const weekStart = getWeekStartDate(now);
    const monthStart = getMonthStartDate(now);

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    // Calculate daily counts
    Object.keys(blockedCounts).forEach(domain => {
      if (domain === '_global') return;
      
      const domainData = blockedCounts[domain];
      
      if (domainData.daily) {
        // Today's count
        const todayVal = domainData.daily[today] || 0;
        todayCount += todayVal;
        
        // Week count
        for (let i = 0; i < 7; i++) {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + i);
          const dateKey = getDateKey(date);
          const weekVal = domainData.daily[dateKey] || 0;
          weekCount += weekVal;
        }
        
        // Month count - get all days from start of month to today (inclusive)
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
        const todayDay = now.getDate();
        
        for (let day = 1; day <= todayDay; day++) {
          const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const monthVal = domainData.daily[dateKey] || 0;
          monthCount += monthVal;
        }
      }
    });

    // Update summary cards
    document.getElementById('totalBlocked').textContent = total.toLocaleString();
    document.getElementById('todayBlocked').textContent = todayCount.toLocaleString();
    document.getElementById('weekBlocked').textContent = weekCount.toLocaleString();
    document.getElementById('monthBlocked').textContent = monthCount.toLocaleString();

    // Time Saved: same formula as update page - (total * 10 minutes) / 60 = hours
    const hoursSaved = Math.round((total * 10) / 60);
    const timeSavedEl = document.getElementById('timeSavedBlocked');
    const hoursSuffixEl = document.getElementById('statsHoursSuffix');
    if (timeSavedEl) {
      timeSavedEl.textContent = hoursSaved.toLocaleString();
    }
    if (hoursSuffixEl) {
      const hoursMsg = (typeof chrome !== 'undefined' && chrome.i18n?.getMessage) ? chrome.i18n.getMessage('hours') : 'hours';
      hoursSuffixEl.textContent = hoursMsg ? hoursMsg.charAt(0) : 'h';
    }

    // Populate platform stats
    populatePlatformStats(blockedCounts);
    
    // Populate type stats
    populateTypeStats(blockedCounts);
    
    // Populate recent activity
    populateRecentActivity(blockedCounts);

  } catch (error) {
    // Silent error handling
  }
}

const STAT_SVG_ICONS = {
  google:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="m16.5 16.5 4.5 4.5" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  youtube:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="6" width="20" height="13" rx="3" stroke="#666" stroke-width="1.8"/><path d="m10 9.5 5 2.5-5 2.5z" fill="#666"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="8" width="5" height="13" rx="1" stroke="#666" stroke-width="1.7"/><circle cx="4.5" cy="4.5" r="2" stroke="#666" stroke-width="1.7"/><path d="M11 8v13M11 12c0-2.5 1.5-4 4-4s4 1.5 4 4v5" stroke="#666" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#666" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  instagram:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#666" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="#666" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="#666"/></svg>`,
  pinterest:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#666" stroke-width="1.8"/><path d="M8 12a4 4 0 1 1 5 3.87V21" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  amazon:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 2h12l2 9H4L6 2z" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11v2a8 8 0 0 0 16 0v-2" stroke="#666" stroke-width="1.8" stroke-linecap="round"/><path d="M9 22h6M12 19v3" stroke="#666" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  ebay:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="#666" stroke-width="1.8"/><path d="M3 13h18" stroke="#666" stroke-width="1.8" stroke-linecap="round"/><path d="M8 7V5a2 2 0 0 1 4 0v2" stroke="#666" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  gmail:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#666" stroke-width="1.8"/><path d="m2 7 10 7 10-7" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  reddit:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#666" stroke-width="1.8"/><circle cx="9.5" cy="12.5" r="1" fill="#666"/><circle cx="14.5" cy="12.5" r="1" fill="#666"/><path d="M9 16c1 1 5 1 6 0" stroke="#666" stroke-width="1.5" stroke-linecap="round"/><path d="M16 10a2 2 0 0 0-2.83-1.83" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  threads:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8" stroke="#666" stroke-width="1.8" stroke-linecap="round"/><path d="M16 8c0 2.21-1.79 4-4 4" stroke="#666" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  twitter:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 4 20 20M20 4 4 20" stroke="#666" stroke-width="2" stroke-linecap="round"/></svg>`,
  globe:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#2196f3" stroke-width="1.8"/><path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="#2196f3" stroke-width="1.5" stroke-linecap="round"/><path d="M3 12h18" stroke="#2196f3" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  tiktok:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bing:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 3v18l5-2.5 6-5-4-2 3.5-3L6 3z" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  duckduckgo:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="10" r="5" stroke="#666" stroke-width="1.8"/><path d="M9 18c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke="#666" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="9" r="1" fill="#666"/></svg>`,
  text:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" stroke-width="1.8"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  video:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2" stroke="#e53935" stroke-width="1.8"/><path d="m16 9 6-3v12l-6-3V9z" stroke="#e53935" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  music:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 18V5l12-2v13" stroke="#e53935" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" stroke="#e53935" stroke-width="1.8"/><circle cx="18" cy="16" r="3" stroke="#e53935" stroke-width="1.8"/></svg>`,
  image:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#e53935" stroke-width="1.8"/><circle cx="8.5" cy="9.5" r="2" stroke="#e53935" stroke-width="1.5"/><path d="m2 17 5-5 3 3 4-4 6 6" stroke="#e53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  summary:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2l1.2 3.6L17 4.5l-2.7 2.7.9 3.8L12 9l-3.2 2 .9-3.8L7 4.5l3.8 1.1L12 2z" fill="#2196f3" fill-opacity="0.15" stroke="#2196f3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="5" cy="17" r="1.2" fill="#2196f3"/><circle cx="19" cy="7" r="0.9" fill="#2196f3"/><path d="M4 13l.6 1.8L6.4 13l-1.8.6L6.4 12 4.6 12.6 4 13z" fill="#2196f3"/><path d="M17 16l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z" fill="#2196f3"/></svg>`,
  post:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  email:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#666" stroke-width="1.8"/><path d="m2 7 10 7 10-7" stroke="#666" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

function populatePlatformStats(blockedCounts) {
  const platformStats = document.getElementById('platformStats');
  if (!platformStats) return;

  // Platform mapping
  const platformMap = {
    'google.com':   { name: 'Google',      icon: STAT_SVG_ICONS.google },
    'youtube.com':  { name: 'YouTube',     icon: STAT_SVG_ICONS.youtube },
    'linkedin.com': { name: 'LinkedIn',    icon: STAT_SVG_ICONS.linkedin },
    'facebook.com': { name: 'Facebook',    icon: STAT_SVG_ICONS.facebook },
    'instagram.com':{ name: 'Instagram',   icon: STAT_SVG_ICONS.instagram },
    'pinterest.com':{ name: 'Pinterest',   icon: STAT_SVG_ICONS.pinterest },
    'amazon.com':   { name: 'Amazon',      icon: STAT_SVG_ICONS.amazon },
    'ebay.com':     { name: 'eBay',        icon: STAT_SVG_ICONS.ebay },
    'gmail.com':    { name: 'Gmail',       icon: STAT_SVG_ICONS.gmail },
    'reddit.com':      { name: 'Reddit',      icon: STAT_SVG_ICONS.reddit },
    'threads.net':     { name: 'Threads',     icon: STAT_SVG_ICONS.threads },
    'x.com':           { name: 'X (Twitter)', icon: STAT_SVG_ICONS.twitter },
    'tiktok.com':      { name: 'TikTok',      icon: STAT_SVG_ICONS.tiktok },
    'bing.com':        { name: 'Bing',        icon: STAT_SVG_ICONS.bing },
    'duckduckgo.com':  { name: 'DuckDuckGo',  icon: STAT_SVG_ICONS.duckduckgo },
    'ecosia.org':      { name: 'Ecosia',      icon: STAT_SVG_ICONS.duckduckgo },
    'search.brave.com': { name: 'Brave Search', icon: STAT_SVG_ICONS.duckduckgo }
  };

  const platformData = [];
  Object.keys(blockedCounts).forEach(domain => {
    if (domain === '_global') return;
    
    const domainData = blockedCounts[domain];
    const total = domainData.total || 0;
    if (total > 0) {
      const platform = platformMap[domain] || { name: domain, icon: STAT_SVG_ICONS.globe };
      platformData.push({ ...platform, count: total });
    }
  });

  // Sort by count
  platformData.sort((a, b) => b.count - a.count);

  // Create list items (limit to 5 for compactness)
  platformStats.innerHTML = '';
  platformData.slice(0, 5).forEach(platform => {
    const item = document.createElement('div');
    item.className = 'stats-list-item';
    item.innerHTML = `
      <div class="stats-list-item-label">
        ${platform.icon}${platform.name}
      </div>
      <div class="stats-list-item-value">${platform.count.toLocaleString()}</div>
    `;
    platformStats.appendChild(item);
  });
}

function populateTypeStats(blockedCounts) {
  const typeStats = document.getElementById('typeStats');
  if (!typeStats) return;

  // Content type mapping (estimated based on platform)
  const typeData = [
    { name: 'AI-Generated Text', icon: STAT_SVG_ICONS.text,    count: 0 },
    { name: 'AI Videos',         icon: STAT_SVG_ICONS.video,   count: 0 },
    { name: 'AI Images',         icon: STAT_SVG_ICONS.image,   count: 0 },
    { name: 'AI Summaries',      icon: STAT_SVG_ICONS.summary, count: 0 },
    { name: 'AI Posts',          icon: STAT_SVG_ICONS.post,    count: 0 },
    { name: 'AI Emails',         icon: STAT_SVG_ICONS.email,   count: 0 },
    { name: 'AI Music',          icon: STAT_SVG_ICONS.music,   count: 0 }
  ];

  // Estimate type counts based on platforms
  Object.keys(blockedCounts).forEach(domain => {
    if (domain === '_global') return;
    
    const domainData = blockedCounts[domain];
    const total = domainData.total || 0;
    
    // Spotify + YouTube Music only (not main YouTube video site)
    if (domain === 'music.youtube.com' || domain === 'music.apple.com' || domain.includes('spotify.com')) {
      typeData[6].count += total; // AI Music
    } else if (domain.includes('youtube.com') || domain.includes('tiktok')) {
      typeData[1].count += total; // AI Videos (www/m.youtube, etc. — excludes music.youtube.com)
    } else if (domain.includes('linkedin') || domain.includes('facebook')) {
      typeData[0].count += Math.floor(total * 0.6); // AI Text
      typeData[4].count += Math.floor(total * 0.4); // AI Posts
    } else if (domain.includes('pinterest') || domain.includes('instagram')) {
      typeData[2].count += total; // AI Images
    } else if (domain.includes('google') || domain.includes('bing') || domain.includes('duckduckgo') || domain.includes('ecosia') || domain.includes('brave') || domain.includes('amazon') || domain.includes('ebay')) {
      typeData[3].count += total; // AI Summaries
    } else if (domain.includes('gmail')) {
      typeData[5].count += total; // AI Emails
    } else {
      typeData[0].count += total; // Default to AI Text
    }
  });

  // Sort by count and filter out zero counts
  const filteredTypeData = typeData.filter(type => type.count > 0);
  filteredTypeData.sort((a, b) => b.count - a.count);

  // Create list items
  typeStats.innerHTML = '';
  filteredTypeData.forEach(type => {
    const item = document.createElement('div');
    item.className = 'stats-list-item';
    item.innerHTML = `
      <div class="stats-list-item-label">
        ${type.icon}${type.name}
      </div>
      <div class="stats-list-item-value">${type.count.toLocaleString()}</div>
    `;
    typeStats.appendChild(item);
  });
}

function populateRecentActivity(blockedCounts) {
  const recentActivity = document.getElementById('recentActivity');
  if (!recentActivity) return;

  // Create mock recent activity (in a real implementation, you'd store actual events)
  const activities = [];
  const now = new Date();
  
  // Get today's blocks from different platforms
  const today = getDateKey(now);
  Object.keys(blockedCounts).forEach(domain => {
    if (domain === '_global') return;
    
    const domainData = blockedCounts[domain];
    const todayCount = domainData.daily?.[today] || 0;
    
    if (todayCount > 0) {
      activities.push({
        domain,
        count: todayCount,
        time: 'Today'
      });
    }
  });

  // Sort by count
  activities.sort((a, b) => b.count - a.count);

  // Create activity items
  recentActivity.innerHTML = '';
  if (activities.length === 0) {
    recentActivity.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No activity today</div>';
    return;
  }

  activities.slice(0, 5).forEach(activity => {
    const platformMap = {
      'google.com':   { name: 'Google',    icon: STAT_SVG_ICONS.google },
      'youtube.com':  { name: 'YouTube',   icon: STAT_SVG_ICONS.youtube },
      'linkedin.com': { name: 'LinkedIn',  icon: STAT_SVG_ICONS.linkedin },
      'facebook.com': { name: 'Facebook',  icon: STAT_SVG_ICONS.facebook },
      'instagram.com':{ name: 'Instagram', icon: STAT_SVG_ICONS.instagram },
      'pinterest.com':{ name: 'Pinterest', icon: STAT_SVG_ICONS.pinterest },
      'amazon.com':      { name: 'Amazon',      icon: STAT_SVG_ICONS.amazon },
      'ebay.com':        { name: 'eBay',        icon: STAT_SVG_ICONS.ebay },
      'gmail.com':       { name: 'Gmail',       icon: STAT_SVG_ICONS.gmail },
      'tiktok.com':      { name: 'TikTok',      icon: STAT_SVG_ICONS.tiktok },
      'bing.com':        { name: 'Bing',        icon: STAT_SVG_ICONS.bing },
      'duckduckgo.com':  { name: 'DuckDuckGo',  icon: STAT_SVG_ICONS.duckduckgo },
      'ecosia.org':      { name: 'Ecosia',      icon: STAT_SVG_ICONS.duckduckgo },
      'search.brave.com': { name: 'Brave Search', icon: STAT_SVG_ICONS.duckduckgo }
    };
    
    const platform = platformMap[activity.domain] || { name: activity.domain, icon: STAT_SVG_ICONS.globe };
    
    const item = document.createElement('div');
    item.className = 'stats-activity-item';
    item.innerHTML = `
      <div class="stats-activity-icon">${platform.icon}</div>
      <div class="stats-activity-content">
        <div class="stats-activity-text">Blocked <span class="stats-number">${activity.count}</span> AI items on ${platform.name}</div>
        <div class="stats-activity-time">${activity.time}</div>
      </div>
    `;
    recentActivity.appendChild(item);
  });
}

// Helper functions for date calculations
function getDateKey(date) {
  return date.toISOString().split('T')[0];
}

function getWeekStartDate(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getMonthStartDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
} 
/******/ })()
;
//# sourceMappingURL=settings.js.map