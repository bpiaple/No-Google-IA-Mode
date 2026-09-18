/**
 * Simple Internationalization Utility
 * Works across Chrome, Firefox, Safari, and Edge
 * Automatically detects browser language and applies translations
 */

(function() {
  'use strict';

  /**
   * Get translated message
   * @param {string} key - Translation key
   * @param {string|Array} substitutions - Optional substitutions
   * @returns {string} Translated message or key if not found
   */
  function getMessage(key, substitutions = null) {
    try {
      // Use chrome.i18n API if available (Chrome, Firefox, Edge)
      if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
        const message = chrome.i18n.getMessage(key, substitutions);
        return message || key;
      }
      
      // Fallback for other browsers or if chrome.i18n is not available
      return key;
    } catch (error) {
      console.warn('i18n getMessage error:', error);
      return key;
    }
  }

  /**
   * Get current language
   * @returns {string} Current language code (e.g., 'en', 'es', 'fr')
   */
  function getCurrentLanguage() {
    try {
      // Use chrome.i18n API if available
      if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getUILanguage) {
        const uiLang = chrome.i18n.getUILanguage().toLowerCase();
        
        // Firefox-specific: use navigator.language if chrome.i18n doesn't provide country code
        if (navigator.userAgent.toLowerCase().includes('firefox')) {
          const navLang = navigator.language || navigator.userLanguage || 'en';
          return navLang.toLowerCase().split('-')[0];
        }
        
        return uiLang.split('-')[0];
      }
      
      // Fallback to browser language
      const language = navigator.language || navigator.userLanguage || 'en';
      return language.toLowerCase().split('-')[0];
    } catch (error) {
      console.warn('i18n getCurrentLanguage error:', error);
      return 'en';
    }
  }

  /**
   * Apply translations to elements with data-i18n attribute
   */
  function applyTranslations() {
    try {
      // Set document language
      const currentLang = getCurrentLanguage();
      document.documentElement.lang = currentLang;
      
      // Find all elements with data-i18n attribute
      const elements = document.querySelectorAll('[data-i18n]');
      
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
          const translatedText = getMessage(key);
          
          if (translatedText) {
            // Check if element has data-i18n-attr to translate attributes
            const attrToTranslate = element.getAttribute('data-i18n-attr');
            if (attrToTranslate) {
              element.setAttribute(attrToTranslate, translatedText);
            } else {
              // Check if the translated text contains HTML tags and if it's safe to render as HTML
              // For security, only allow basic formatting tags
              if ((translatedText.includes('<b>') || translatedText.includes('</b>') || 
                   translatedText.includes('<i>') || translatedText.includes('</i>') || 
                   translatedText.includes('<strong>') || translatedText.includes('</strong>')) &&
                  !translatedText.includes('<script') && !translatedText.includes('<iframe') && 
                  !translatedText.includes('javascript:') && !translatedText.includes('onclick')) {
                // Safe to render as HTML
                element.innerHTML = translatedText;
              } else {
                // Translate as text content
                element.textContent = translatedText;
              }
            }
          }
        }
      });

      // Handle elements with data-i18n-html for HTML content
      const htmlElements = document.querySelectorAll('[data-i18n-html]');
      htmlElements.forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        if (key) {
          const translatedText = getMessage(key);
          if (translatedText) {
            element.innerHTML = translatedText;
          }
        }
      });

      // Handle aria-label translations
      const ariaLabelElements = document.querySelectorAll('[data-i18n-aria-label]');
      ariaLabelElements.forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        if (key) {
          const translatedText = getMessage(key);
          element.setAttribute('aria-label', translatedText);
        }
      });

      // Handle title attribute translations
      const titleElements = document.querySelectorAll('[data-i18n-title]');
      titleElements.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (key) {
          const translatedText = getMessage(key);
          element.setAttribute('title', translatedText);
        }
      });

      // Handle alt attribute translations
      const altElements = document.querySelectorAll('[data-i18n-alt]');
      altElements.forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (key) {
          const translatedText = getMessage(key);
          element.setAttribute('alt', translatedText);
        }
      });


    } catch (error) {
      console.warn('i18n applyTranslations error:', error);
    }
  }

  /**
   * Initialize i18n when DOM is ready
   */
  function initI18n() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyTranslations);
    } else {
      // DOM is already ready
      applyTranslations();
    }
  }

  // Make functions available globally
  window.i18n = {
    getMessage: getMessage,
    getCurrentLanguage: getCurrentLanguage,
    applyTranslations: applyTranslations,
    init: initI18n
  };

  // Auto-initialize
  initI18n();

})(); 