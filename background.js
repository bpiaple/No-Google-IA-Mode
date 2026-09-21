/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 659:
/***/ ((module) => {

                /**
                 * Subscription Status Checker
                 * Handles checking and syncing PRO subscription status with Stripe
                 */

                /**
                 * Check subscription status from Stripe webhook
                 * @param {string} installationId - Installation ID for the user
                 * @returns {Promise<Object>} Subscription status data
                 */
                async function checkSubscriptionStatus(installationId) {
                    try {
                        if (!installationId) {
                            throw new Error('Installation ID is required');
                        }

                        // Get STRIPE_API_BASE from stripe-config.js
                        const STRIPE_API_BASE = (typeof window !== 'undefined' && window.StripeConfig?.STRIPE_API_BASE)
                            || 'https://stripe.aicontentshield.workers.dev';

                        const response = await fetch(`${STRIPE_API_BASE}/check-subscription`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                installation_id: installationId
                            })
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();

                        return {
                            hasSubscription: data.has_subscription || false,
                            status: data.status || 'none',
                            planType: data.plan_type || null,
                            trialEnd: data.trial_end || null,
                            currentPeriodEnd: data.current_period_end || null,
                            cancelAtPeriodEnd: data.cancel_at_period_end || false
                        };

                    } catch (error) {
                        return {
                            hasSubscription: false,
                            status: 'error',
                            planType: null,
                            trialEnd: null,
                            currentPeriodEnd: null,
                            cancelAtPeriodEnd: false,
                            error: error.message
                        };
                    }
                }

                /**
                 * Get or create installation ID
                 * @returns {Promise<string>} Installation ID
                 */
                async function getInstallationId() {
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

                /**
                 * Sync PRO status with current subscription status
                 * @param {Object} subscriptionData - Subscription data from Stripe
                 */
                async function syncProStatus(subscriptionData) {
                    try {
                        const isPro = subscriptionData.hasSubscription &&
                            ['active', 'trialing'].includes(subscriptionData.status);

                        // Update settings with new PRO status
                        // Note: settings will be updated via chrome.storage.sync directly
                        const result = await chrome.storage.sync.get('settings');
                        const currentSettings = result.settings || {};
                        currentSettings.isPro = isPro;
                        await chrome.storage.sync.set({ settings: currentSettings });

                        // Also store subscription details for reference
                        await chrome.storage.local.set({
                            subscriptionStatus: {
                                isPro,
                                status: subscriptionData.status,
                                planType: subscriptionData.planType,
                                trialEnd: subscriptionData.trialEnd,
                                currentPeriodEnd: subscriptionData.currentPeriodEnd,
                                cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd,
                                lastChecked: Date.now()
                            }
                        });

                        return isPro;

                    } catch (error) {
                        return false;
                    }
                }

                /**
                 * Check if 24 hours have passed since last background check
                 * @returns {Promise<boolean>} True if 24h check is needed
                 */
                async function shouldPerform24HourCheck() {
                    try {
                        const result = await chrome.storage.local.get(['lastBackgroundSubscriptionCheck']);
                        const lastCheck = result.lastBackgroundSubscriptionCheck;

                        if (!lastCheck) {
                            return true; // Never checked before
                        }

                        const now = Date.now();
                        const timeSinceLastCheck = now - lastCheck;
                        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

                        return timeSinceLastCheck > twentyFourHours;
                    } catch (error) {
                        return true; // Default to checking on error
                    }
                }

                /**
                 * Perform subscription status check and sync
                 * @param {boolean} force - Force check even if recently checked
                 * @returns {Promise<boolean>} Current PRO status
                 */
                async function performSubscriptionCheck(force = false) {
                    try {
                        // Only apply 5-minute cache for background checks, not for forced checks
                        if (!force) {
                            const result = await chrome.storage.local.get(['subscriptionStatus']);
                            if (result.subscriptionStatus?.lastChecked) {
                                const timeSinceCheck = Date.now() - result.subscriptionStatus.lastChecked;
                                const fiveMinutes = 5 * 60 * 1000;

                                if (timeSinceCheck < fiveMinutes) {
                                    return result.subscriptionStatus.isPro || false;
                                }
                            }
                        }

                        const installationId = await getInstallationId();
                        const subscriptionData = await checkSubscriptionStatus(installationId);

                        if (subscriptionData.status === 'error') {
                            return false;
                        }

                        const isPro = await syncProStatus(subscriptionData);

                        // Update background check timestamp if this was a background check
                        if (!force) {
                            await chrome.storage.local.set({
                                lastBackgroundSubscriptionCheck: Date.now()
                            });
                        }

                        // Notify any listeners about the status change
                        if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
                            chrome.runtime.sendMessage({
                                type: 'SUBSCRIPTION_STATUS_UPDATED',
                                isPro,
                                subscriptionData
                            }).catch(() => {
                                // Ignore errors if no listeners
                            });
                        }

                        return isPro;

                    } catch (error) {
                        return false;
                    }
                }

                /**
                 * Check if we need to perform a 24-hour background subscription check
                 * and perform it if needed
                 */
                async function checkAnd24HourUpdate() {
                    try {
                        const needsCheck = await shouldPerform24HourCheck();
                        if (needsCheck) {
                            await performSubscriptionCheck(false); // false = background check with caching
                        }
                    } catch (error) {
                        // Silent error handling
                    }
                }

                /**
                 * Start subscription checking with 24h intervals using storage-based timing
                 */
                function setupSubscriptionChecking() {

                    // Perform initial check to see if 24h have passed
                    checkAnd24HourUpdate();

                    // Set up periodic checks every hour to see if 24h have passed
                    // This ensures we don't miss the 24h window even if the extension is inactive
                    setInterval(() => {
                        checkAnd24HourUpdate();
                    }, 60 * 60 * 1000); // Check every hour
                }

                /**
                 * @deprecated Use setupSubscriptionChecking() instead
                 */
                function startPeriodicStatusCheck(intervalMinutes = 30) {
                    setupSubscriptionChecking();

                    // Perform immediate check
                    performSubscriptionCheck(true);
                }

                // Legacy function stubs for backward compatibility (no-op since we don't use alarms)
                function setupSubscriptionAlarm() {
                    setupSubscriptionChecking();
                }

                function handleSubscriptionAlarm(alarm) {
                    // No-op since we're not using alarms
                }

                // Export functions for use in other modules
                if (typeof window !== 'undefined') {
                    window.SubscriptionChecker = {
                        checkSubscriptionStatus,
                        performSubscriptionCheck,
                        startPeriodicStatusCheck, // Keep for backward compatibility
                        setupSubscriptionChecking,
                        checkAnd24HourUpdate,
                        shouldPerform24HourCheck,
                        setupSubscriptionAlarm, // Keep for backward compatibility (no-op)
                        handleSubscriptionAlarm, // Keep for backward compatibility (no-op)
                        syncProStatus
                    };
                }

                // Export for module environments
                if (true && module.exports) {
                    module.exports = {
                        checkSubscriptionStatus,
                        performSubscriptionCheck,
                        startPeriodicStatusCheck, // Keep for backward compatibility
                        setupSubscriptionChecking,
                        checkAnd24HourUpdate,
                        shouldPerform24HourCheck,
                        setupSubscriptionAlarm, // Keep for backward compatibility (no-op)
                        handleSubscriptionAlarm, // Keep for backward compatibility (no-op)
                        syncProStatus
                    };
                }

                /***/
})

        /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
    /******/
    /************************************************************************/
    // This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
    (() => {
        "use strict";

        ;// ./src/utils/referral-tracker.ts
        /**
         * Referral Tracking Utility for AI Content Shield Extension
         * Handles retrieving referral data from aicontentshield.app and storing in extension
         */
        var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        // Configuration
        const REFERRAL_CONFIG = {
            website_domain: 'www.aicontentshield.app',
            storage_keys: {
                ref: 'aics_ref',
                timestamp: 'aics_ref_timestamp',
                browser: 'aics_browser',
                visitId: 'aics_visit_id'
            },
            extension_keys: {
                referralCode: 'referral_code',
                referralTimestamp: 'referral_timestamp',
                referralProcessed: 'referral_processed',
                installTimestamp: 'install_timestamp'
            }
        };
        /**
         * Check if referral tracking has already been processed
         */
        function isReferralProcessed() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    chrome.storage.local.get([REFERRAL_CONFIG.extension_keys.referralProcessed], (result) => {
                        resolve(!!result[REFERRAL_CONFIG.extension_keys.referralProcessed]);
                    });
                });
            });
        }
        /**
         * Get stored referral data from extension storage
         */
        function getReferralData() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    const keys = Object.values(REFERRAL_CONFIG.extension_keys);
                    chrome.storage.local.get(keys, (result) => {
                        resolve({
                            referralCode: result[REFERRAL_CONFIG.extension_keys.referralCode] || null,
                            referralTimestamp: result[REFERRAL_CONFIG.extension_keys.referralTimestamp] || null,
                            installTimestamp: result[REFERRAL_CONFIG.extension_keys.installTimestamp] || null,
                            isProcessed: !!result[REFERRAL_CONFIG.extension_keys.referralProcessed]
                        });
                    });
                });
            });
        }
        /**
         * Store referral data in extension storage
         */
        function storeReferralData(referralCode, originalTimestamp) {
            return __awaiter(this, void 0, void 0, function* () {
                const now = Date.now();
                const dataToStore = {
                    [REFERRAL_CONFIG.extension_keys.referralCode]: referralCode,
                    [REFERRAL_CONFIG.extension_keys.referralTimestamp]: originalTimestamp || now.toString(),
                    [REFERRAL_CONFIG.extension_keys.installTimestamp]: now.toString(),
                    [REFERRAL_CONFIG.extension_keys.referralProcessed]: true
                };
                return new Promise((resolve) => {
                    chrome.storage.local.set(dataToStore, () => {
                        resolve({
                            referralCode,
                            referralTimestamp: originalTimestamp || now.toString(),
                            installTimestamp: now.toString(),
                            isProcessed: true
                        });
                    });
                });
            });
        }
        /**
         * Mark referral as processed (even if no referral code exists)
         */
        function markReferralProcessed() {
            return __awaiter(this, void 0, void 0, function* () {
                const now = Date.now();
                const dataToStore = {
                    [REFERRAL_CONFIG.extension_keys.installTimestamp]: now.toString(),
                    [REFERRAL_CONFIG.extension_keys.referralProcessed]: true
                };
                return new Promise((resolve) => {
                    chrome.storage.local.set(dataToStore, () => {
                        resolve({
                            referralCode: null,
                            referralTimestamp: null,
                            installTimestamp: now.toString(),
                            isProcessed: true
                        });
                    });
                });
            });
        }
        /**
         * Retrieve referral data by visiting website in background tab (only after installation)
         */
        function retrieveReferralFromWebsite() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Check if already processed
                    const processed = yield isReferralProcessed();
                    if (processed) {
                        return yield getReferralData();
                    }
                    // Create background tab to visit website
                    return new Promise((resolve, reject) => {
                        chrome.tabs.create({
                            url: `https://${REFERRAL_CONFIG.website_domain}`,
                            active: false // Background tab - not visible to user
                        }, (tab) => {
                            if (!tab || !tab.id) {
                                markReferralProcessed().then(resolve);
                                return;
                            }
                            const tabId = tab.id;
                            let tabClosed = false;
                            // Set up message listener for data from content script
                            const messageListener = (message, sender, sendResponse) => {
                                var _a;
                                if (((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id) === tabId && message.type === 'REFERRAL_DATA_FROM_WEBSITE') {
                                    chrome.runtime.onMessage.removeListener(messageListener);
                                    // Close the background tab
                                    if (!tabClosed) {
                                        tabClosed = true;
                                        chrome.tabs.remove(tabId).catch(() => { });
                                    }
                                    if (message.data && message.data.ref) {
                                        storeReferralData(message.data.ref, message.data.timestamp).then(resolve);
                                    }
                                    else {
                                        markReferralProcessed().then(resolve);
                                    }
                                }
                            };
                            chrome.runtime.onMessage.addListener(messageListener);
                            // Wait for tab to load, then inject content script
                            chrome.tabs.onUpdated.addListener(function listener(updatedTabId, info) {
                                if (updatedTabId === tabId && info.status === 'complete') {
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    // Inject content script to read localStorage
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId },
                                        func: function () {
                                            // Content script code (runs in website context)
                                            const STORAGE_KEYS = {
                                                ref: 'aics_ref',
                                                timestamp: 'aics_ref_timestamp',
                                                browser: 'aics_browser',
                                                visitId: 'aics_visit_id'
                                            };
                                            const referralData = {};
                                            let platformKeyFound = '';
                                            // First try direct localStorage keys
                                            for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
                                                try {
                                                    const value = localStorage.getItem(storageKey);
                                                    if (value) {
                                                        referralData[key] = value;
                                                    }
                                                }
                                                catch (error) {
                                                    // Silent error handling
                                                }
                                            }
                                            // If no direct keys found, try to find Wix platform keys
                                            if (Object.keys(referralData).length === 0) {
                                                for (let i = 0; i < localStorage.length; i++) {
                                                    const key = localStorage.key(i);
                                                    // Look for platform keys that might contain referral data
                                                    if (key && (key.includes('platform_app_') || key.includes('aics_'))) {
                                                        try {
                                                            const value = localStorage.getItem(key);
                                                            // Try to parse as JSON
                                                            if (value && value.startsWith('{')) {
                                                                try {
                                                                    const parsed = JSON.parse(value);
                                                                    // Extract referral data from parsed JSON
                                                                    if (parsed.aics_ref) {
                                                                        referralData.ref = parsed.aics_ref;
                                                                        if (parsed.aics_ref_timestamp)
                                                                            referralData.timestamp = parsed.aics_ref_timestamp;
                                                                        if (parsed.aics_browser)
                                                                            referralData.browser = parsed.aics_browser;
                                                                        if (parsed.aics_visit_id)
                                                                            referralData.visitId = parsed.aics_visit_id;
                                                                        platformKeyFound = key;
                                                                        break; // Found data, stop searching
                                                                    }
                                                                }
                                                                catch (parseError) {
                                                                    // Not valid JSON, continue searching
                                                                }
                                                            }
                                                        }
                                                        catch (error) {
                                                            // Silent error handling
                                                        }
                                                    }
                                                }
                                            }
                                            // Browser-specific message passing
                                            const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
                                            if (isFirefox) {
                                                // Firefox: Wait for content script ready signal before sending data
                                                let readyTimeout;
                                                const readyListener = (event) => {
                                                    if (event.data &&
                                                        event.data.source === 'AICS_CONTENT_SCRIPT' &&
                                                        event.data.type === 'READY') {
                                                        window.removeEventListener('message', readyListener);
                                                        clearTimeout(readyTimeout);
                                                        // Now send the referral data
                                                        try {
                                                            window.postMessage({
                                                                source: 'AICS_EXTENSION_INJECTED',
                                                                type: 'REFERRAL_DATA_FROM_WEBSITE',
                                                                data: referralData
                                                            }, '*');
                                                        }
                                                        catch (error) {
                                                            // Silent error handling
                                                        }
                                                    }
                                                };
                                                window.addEventListener('message', readyListener);
                                                // Fallback timeout
                                                readyTimeout = setTimeout(() => {
                                                    window.removeEventListener('message', readyListener);
                                                    try {
                                                        window.postMessage({
                                                            source: 'AICS_EXTENSION_INJECTED',
                                                            type: 'REFERRAL_DATA_FROM_WEBSITE',
                                                            data: referralData
                                                        }, '*');
                                                    }
                                                    catch (error) {
                                                        // Silent error handling
                                                    }
                                                }, 2000); // 2 second timeout
                                            }
                                            else {
                                                // Chrome: Original runtime.sendMessage
                                                if (window.chrome && window.chrome.runtime && window.chrome.runtime.id) {
                                                    try {
                                                        chrome.runtime.sendMessage({
                                                            type: 'REFERRAL_DATA_FROM_WEBSITE',
                                                            data: referralData,
                                                            source: 'website_localStorage'
                                                        }).catch(() => {
                                                            // Silent error handling
                                                        });
                                                    }
                                                    catch (error) {
                                                        // Silent error handling
                                                    }
                                                }
                                            }
                                            // Clean up localStorage after successful read (only for Chrome)
                                            if (Object.keys(referralData).length > 0 && !isFirefox) {
                                                setTimeout(() => {
                                                    if (platformKeyFound) {
                                                        // Remove the platform key if that's where we found the data
                                                        try {
                                                            localStorage.removeItem(platformKeyFound);
                                                        }
                                                        catch (error) {
                                                            // Silent error handling
                                                        }
                                                    }
                                                    else {
                                                        // Remove direct keys
                                                        for (const storageKey of Object.values(STORAGE_KEYS)) {
                                                            try {
                                                                localStorage.removeItem(storageKey);
                                                            }
                                                            catch (error) {
                                                                // Silent error handling
                                                            }
                                                        }
                                                    }
                                                }, 1000);
                                            }
                                        }
                                    }).then(() => {
                                        // Firefox only: inject content script to listen for postMessage and relay to extension
                                        const isFirefoxForContentScript = navigator.userAgent.toLowerCase().includes('firefox');
                                        if (isFirefoxForContentScript) {
                                            chrome.scripting.executeScript({
                                                target: { tabId: tabId },
                                                func: function () {
                                                    // Signal that content script is ready
                                                    window.postMessage({
                                                        source: 'AICS_CONTENT_SCRIPT',
                                                        type: 'READY'
                                                    }, '*');
                                                    // Listen for postMessage from the main script
                                                    window.addEventListener('message', (event) => {
                                                        if (event.data && event.data.source === 'AICS_EXTENSION_INJECTED') {
                                                            // Forward to extension using runtime API (available in content script)
                                                            if (chrome && chrome.runtime) {
                                                                chrome.runtime.sendMessage({
                                                                    type: 'REFERRAL_DATA_FROM_WEBSITE',
                                                                    data: event.data.data,
                                                                    source: 'content_script_relay'
                                                                }).catch(() => {
                                                                    // Silent error handling
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }).catch(() => {
                                                // Silent error handling
                                            });
                                        }
                                    }).catch((error) => {
                                        chrome.runtime.onMessage.removeListener(messageListener);
                                        if (!tabClosed) {
                                            tabClosed = true;
                                            chrome.tabs.remove(tabId).catch(() => { });
                                        }
                                        markReferralProcessed().then(resolve);
                                    });
                                }
                            });
                            // Timeout fallback - close tab and mark as processed if no response
                            setTimeout(() => {
                                chrome.runtime.onMessage.removeListener(messageListener);
                                if (!tabClosed) {
                                    tabClosed = true;
                                    chrome.tabs.remove(tabId).catch(() => { });
                                }
                                markReferralProcessed().then(resolve);
                            }, 10000); // 10 second timeout
                        });
                    });
                }
                catch (error) {
                    yield markReferralProcessed();
                    return { referralCode: null, referralTimestamp: null, installTimestamp: null, isProcessed: true };
                }
            });
        }
        /**
         * Initialize referral tracking (call this when extension starts or settings page opens)
         */
        function initializeReferralTracking() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const referralData = yield retrieveReferralFromWebsite();
                    if (referralData.referralCode) {
                        // Mark as needing Firebase processing (will be handled by settings page)
                        yield markFirebaseProcessingNeeded();
                        return referralData;
                    }
                    else {
                        return referralData;
                    }
                }
                catch (error) {
                    yield markReferralProcessed();
                    return {
                        referralCode: null,
                        referralTimestamp: null,
                        installTimestamp: null,
                        isProcessed: true,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    };
                }
            });
        }
        /**
         * Mark referral data as needing Firebase processing (for later pickup)
         */
        function markFirebaseProcessingNeeded() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    chrome.storage.local.set({ firebase_processed: false }, resolve);
                });
            });
        }
        /**
         * Calculate referral analytics for display
         */
        function getReferralAnalytics() {
            return __awaiter(this, void 0, void 0, function* () {
                const referralData = yield getReferralData();
                let daysSinceReferral = null;
                if (referralData.referralTimestamp) {
                    const referralTime = parseInt(referralData.referralTimestamp);
                    const now = Date.now();
                    daysSinceReferral = Math.floor((now - referralTime) / (1000 * 60 * 60 * 24));
                }
                return {
                    referralCode: referralData.referralCode,
                    hasReferral: !!referralData.referralCode,
                    referralTimestamp: referralData.referralTimestamp,
                    installTimestamp: referralData.installTimestamp,
                    daysSinceReferral
                };
            });
        }

        ;// ./src/utils/ai-text-detector.ts
        var ai_text_detector_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        /**
         * AI Text Detector utility for Chrome extension
         * Provides client-side rate limiting and integration with Cloudflare worker
         */
        class AITextDetector {
            constructor() {
                this.WORKER_ENDPOINT = 'https://ai-text-detector.aicontentshield.workers.dev/detect';
                this.STORAGE_KEY = 'ai_text_detector_rate_limit';
                this.DAILY_LIMIT = 40;
                this.SHORT_TERM_LIMIT = 1;
                this.SHORT_TERM_WINDOW = 30 * 1000; // 30 seconds in milliseconds
                this.DAILY_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            }
            /**
             * Get singleton instance
             */
            static getInstance() {
                if (!AITextDetector.instance) {
                    AITextDetector.instance = new AITextDetector();
                }
                return AITextDetector.instance;
            }
            /**
             * Get current rate limit data from storage
             */
            getRateLimitData() {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield chrome.storage.local.get(this.STORAGE_KEY);
                        const data = result[this.STORAGE_KEY];
                        if (!data) {
                            return this.getDefaultRateLimitData();
                        }
                        const now = Date.now();
                        // Reset daily counter if 24 hours have passed
                        if (now > data.dailyResetTime) {
                            data.dailyCount = 0;
                            data.dailyResetTime = now + this.DAILY_WINDOW;
                        }
                        // Reset short-term counter if 30 seconds have passed
                        if (now > data.shortTermResetTime) {
                            data.shortTermCount = 0;
                            data.shortTermResetTime = now + this.SHORT_TERM_WINDOW;
                        }
                        return data;
                    }
                    catch (error) {
                        return this.getDefaultRateLimitData();
                    }
                });
            }
            /**
             * Get default rate limit data
             */
            getDefaultRateLimitData() {
                const now = Date.now();
                return {
                    dailyCount: 0,
                    dailyResetTime: now + this.DAILY_WINDOW,
                    lastRequestTime: 0,
                    shortTermCount: 0,
                    shortTermResetTime: now + this.SHORT_TERM_WINDOW
                };
            }
            /**
             * Save rate limit data to storage
             */
            saveRateLimitData(data) {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    try {
                        yield chrome.storage.local.set({ [this.STORAGE_KEY]: data });
                    }
                    catch (error) {
                        // Silent error handling
                    }
                });
            }
            /**
             * Check if request is within rate limits
             */
            checkRateLimit() {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    const data = yield this.getRateLimitData();
                    const now = Date.now();
                    // Check daily limit
                    if (data.dailyCount >= this.DAILY_LIMIT) {
                        return {
                            allowed: false,
                            rateLimitInfo: {
                                remainingDaily: 0,
                                remainingShortTerm: Math.max(0, this.SHORT_TERM_LIMIT - data.shortTermCount),
                                resetTime: data.dailyResetTime
                            }
                        };
                    }
                    // Check short-term limit (30 seconds)
                    if (data.shortTermCount >= this.SHORT_TERM_LIMIT && now < data.shortTermResetTime) {
                        return {
                            allowed: false,
                            rateLimitInfo: {
                                remainingDaily: Math.max(0, this.DAILY_LIMIT - data.dailyCount),
                                remainingShortTerm: 0,
                                resetTime: data.shortTermResetTime
                            }
                        };
                    }
                    const remainingDaily = Math.max(0, this.DAILY_LIMIT - data.dailyCount - 1);
                    const remainingShortTerm = Math.max(0, this.SHORT_TERM_LIMIT - data.shortTermCount - 1);
                    return {
                        allowed: true,
                        rateLimitInfo: {
                            remainingDaily,
                            remainingShortTerm,
                            resetTime: data.shortTermResetTime
                        }
                    };
                });
            }
            /**
             * Update rate limit counters after successful request
             */
            updateRateLimitCounters() {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    const data = yield this.getRateLimitData();
                    const now = Date.now();
                    data.dailyCount++;
                    data.lastRequestTime = now;
                    // If short-term window has expired, reset the counter
                    if (now >= data.shortTermResetTime) {
                        data.shortTermCount = 1;
                        data.shortTermResetTime = now + this.SHORT_TERM_WINDOW;
                    }
                    else {
                        data.shortTermCount++;
                    }
                    yield this.saveRateLimitData(data);
                });
            }
            /**
             * Make HTTP request to Cloudflare worker
             */
            makeRequest(text) {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    const maxRetries = 2;
                    const timeoutMs = 15000; // 15 seconds timeout
                    for (let attempt = 1; attempt <= maxRetries; attempt++) {
                        try {
                            // Create AbortController for timeout
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
                            const response = yield fetch(this.WORKER_ENDPOINT, {
                                method: 'POST',
                                headers: Object.assign({ 'Content-Type': 'application/json' }, (typeof navigator === 'undefined' || !navigator.userAgent.toLowerCase().includes('firefox')
                                    ? { 'User-Agent': 'Mozilla/5.0 (AI Content Shield Extension)' }
                                    : {})),
                                body: JSON.stringify({ text }),
                                signal: controller.signal
                            });
                            clearTimeout(timeoutId);
                            if (!response.ok) {
                                const errorText = yield response.text();
                                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                            }
                            const responseData = yield response.json();
                            return responseData;
                        }
                        catch (error) {
                            // If this is the last attempt, throw the error
                            if (attempt === maxRetries) {
                                throw error;
                            }
                            // Wait before retry (exponential backoff)
                            const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s...
                            yield new Promise(resolve => setTimeout(resolve, delay));
                        }
                    }
                    throw new Error('Max retries exceeded');
                });
            }
            /**
             * Detect if text is AI-generated
             * @param text - The text to analyze
             * @returns Promise<AITextDetectionResponse>
             */
            detectAIText(text) {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    // Firefox compatibility: Use background script for network requests due to CSP restrictions
                    // Only do this from content scripts, not from background script itself
                    if (typeof navigator !== 'undefined' &&
                        navigator.userAgent.toLowerCase().includes('firefox') &&
                        typeof chrome !== 'undefined' &&
                        chrome.runtime &&
                        chrome.runtime.getURL('').includes('moz-extension://')) {
                        try {
                            const response = yield chrome.runtime.sendMessage({
                                type: 'AI_TEXT_DETECTION',
                                text: text
                            });
                            return response;
                        }
                        catch (error) {
                            // If messaging fails, fall back to direct request (probably in background script)
                        }
                    }
                    try {
                        // Validate input
                        if (!text || typeof text !== 'string') {
                            return {
                                success: false,
                                score: 0,
                                label: '',
                                prediction: '',
                                confidence: 0,
                                error: 'Invalid input: text must be a non-empty string'
                            };
                        }
                        // Trim and validate text length
                        const trimmedText = text.trim();
                        if (trimmedText.length === 0) {
                            return {
                                success: false,
                                score: 0,
                                label: '',
                                prediction: '',
                                confidence: 0,
                                error: 'Invalid input: text cannot be empty'
                            };
                        }
                        if (trimmedText.length > 10000) {
                            return {
                                success: false,
                                score: 0,
                                label: '',
                                prediction: '',
                                confidence: 0,
                                error: 'Text too long: maximum 10,000 characters allowed'
                            };
                        }
                        // Check if text contains Cyrillic characters (should be rejected)
                        const cyrillicRegex = /[\u0400-\u04FF]/;
                        if (cyrillicRegex.test(trimmedText)) {
                            return {
                                success: false,
                                score: 0,
                                label: '',
                                prediction: '',
                                confidence: 0,
                                error: 'Text contains Cyrillic characters (not supported)'
                            };
                        }
                        // Check if text contains only Latin alphabet characters and emoji (including surrogate pairs)
                        const latinRegex = /^[\u0020-\u007E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u1F700-\u1F77F\u1F780-\u1F7FF\u1F800-\u1F8FF\u1F900-\u1F9FF\u1FA00-\u1FA6F\u1FA70-\u1FAFF\u2600-\u26FF\u2700-\u27BF\u1F1E0-\u1F1FF\u3000-\u303F\u2010-\u2027\u2030-\u205F\u2000-\u206F\u20A0-\u20CF\u20D0-\u20FF\u2100-\u214F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2400-\u243F\u2460-\u24FF\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\u2900-\u297F\u2B00-\u2BFF\uFE00-\uFE0F\uFE20-\uFE2F\uD800-\uDBFF\uDC00-\uDFFF\s\n\r\t]+$/;
                        if (!latinRegex.test(trimmedText)) {
                            return {
                                success: false,
                                score: 0,
                                label: '',
                                prediction: '',
                                confidence: 0,
                                error: 'Text must contain only Latin alphabet characters and emoji'
                            };
                        }
                        // Check rate limits
                        const rateLimitCheck = yield this.checkRateLimit();
                        if (!rateLimitCheck.allowed) {
                            return {
                                success: false,
                                score: 0,
                                label: '',
                                prediction: '',
                                confidence: 0,
                                error: 'Rate limit exceeded',
                                rateLimitExceeded: true,
                                rateLimitInfo: rateLimitCheck.rateLimitInfo
                            };
                        }
                        // Make request to Cloudflare worker
                        const workerResponse = yield this.makeRequest(trimmedText);
                        // Update rate limit counters after successful request
                        yield this.updateRateLimitCounters();
                        // Return successful response
                        return {
                            success: true,
                            score: workerResponse.score || 0,
                            label: workerResponse.label || '',
                            prediction: workerResponse.prediction || '',
                            confidence: workerResponse.confidence || 0,
                            rateLimitInfo: rateLimitCheck.rateLimitInfo
                        };
                    }
                    catch (error) {
                        return {
                            success: false,
                            score: 0,
                            label: '',
                            prediction: '',
                            confidence: 0,
                            error: error instanceof Error ? error.message : 'Unknown error occurred'
                        };
                    }
                });
            }
            /**
             * Get current rate limit status
             */
            getRateLimitStatus() {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    const data = yield this.getRateLimitData();
                    return {
                        dailyUsed: data.dailyCount,
                        dailyLimit: this.DAILY_LIMIT,
                        shortTermUsed: data.shortTermCount,
                        shortTermLimit: this.SHORT_TERM_LIMIT,
                        nextResetTime: data.shortTermResetTime
                    };
                });
            }
            /**
             * Reset rate limit data (for testing purposes)
             */
            resetRateLimits() {
                return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                    yield chrome.storage.local.remove(this.STORAGE_KEY);
                });
            }
        }
        /**
         * Convenience function to get detector instance and detect AI text
         */
        function detectAIText(text) {
            return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                const detector = AITextDetector.getInstance();
                return yield detector.detectAIText(text);
            });
        }
        /**
         * Convenience function to get rate limit status
         */
        function getRateLimitStatus() {
            return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                const detector = AITextDetector.getInstance();
                return yield detector.getRateLimitStatus();
            });
        }
        /**
         * Convenience function to reset rate limits (for testing)
         */
        function resetRateLimits() {
            return ai_text_detector_awaiter(this, void 0, void 0, function* () {
                const detector = AITextDetector.getInstance();
                yield detector.resetRateLimits();
            });
        }

        ;// ./src/utils/milestone.ts
        /**
         * Milestone upsell feature utilities.
         *
         * Design notes:
         * - Only the NEXT milestone ahead of the current count is ever triggered (no retroactive milestones).
         * - At most one milestone is kept pending at a time; if multiple are crossed while snoozed or
         *   within a cooldown window, the earliest unrewarded milestone is preserved.
         * - The badge and modal are both gated by:
         *     1. 7-day cooldown after the update page was last shown.
         *     2. 30-day cooldown between any two milestone modal displays.
         * - "Not now" clears pendingMilestone; the same milestone is never re-shown.
         */
        const MILESTONE_LADDER = [
            500, 1000, 2500, 5000, 7500, 10000, 15000, 20000,
            35000, 50000, 75000, 100000, 125000, 150000, 175000,
            200000, 250000,
        ];
        /**
         * Returns the smallest milestone strictly greater than blockedCount,
         * or null when the user has surpassed all milestones.
         */
        function computeNextMilestone(blockedCount, ladder = MILESTONE_LADDER) {
            var _a;
            return (_a = ladder.find((m) => m > blockedCount)) !== null && _a !== void 0 ? _a : null;
        }
        // ─── Storage key constants ────────────────────────────────────────────────────
        const MS_KEY_NEXT = 'nextMilestone'; // number
        const MS_KEY_PENDING = 'pendingMilestone'; // number | null
        const MS_KEY_LAST_SHOWN = 'lastMilestoneModalShownAt'; // ms timestamp
        const MS_KEY_LAST_VALUE = 'lastMilestoneValueShown'; // number
        const MS_KEY_BADGE_ACTIVE = 'milestoneBadgeActive'; // boolean
        const MS_KEY_UPDATE_PAGE = 'lastUpdatePageShownAt'; // ms timestamp
        // ─── Timing constants ─────────────────────────────────────────────────────────
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

        ;// ./src/background.ts
        /**
         * AI Content Shield - Background Service Worker (Manifest V3)
         * Handles extension lifecycle, periodic subscription checks, and message routing
         */
        var background_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };




        // ─── Milestone badge state ─────────────────────────────────────────────────────
        // Cached in-memory so UPDATE_BADGE handlers can skip synchronous storage reads.
        // Restored from storage every time the service worker starts.
        let milestoneGlobalBadgeActive = false;
        /** Apply "!!!" badge text + color to a single tab (or global if tabId undefined). */
        function applyMilestoneBadgeToTab(tabId) {
            chrome.action.setBadgeText({ text: '!!!', tabId });
            chrome.action.setBadgeBackgroundColor({ color: '#e53935', tabId });
        }
        /**
         * Set the global toolbar badge to "!!!" and push it to every open tab.
         * Per-tab overrides would otherwise hide the global badge on tabs that
         * already had a numeric count badge set before the milestone was reached.
         */
        function setMilestoneBadge() {
            milestoneGlobalBadgeActive = true;
            chrome.storage.local.set({ [MS_KEY_BADGE_ACTIVE]: true });
            // Global default badge
            applyMilestoneBadgeToTab();
            // Override any existing per-tab badges so "!!!" is visible everywhere
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    if (tab.id != null)
                        applyMilestoneBadgeToTab(tab.id);
                }
            });
        }
        /**
         * Clear the global toolbar badge and remove per-tab overrides.
         * Persist the flag so the service worker doesn't re-apply it on restart.
         */
        function clearMilestoneBadge() {
            milestoneGlobalBadgeActive = false;
            chrome.storage.local.set({ [MS_KEY_BADGE_ACTIVE]: false });
            chrome.action.setBadgeText({ text: '' });
            // Also clear any per-tab overrides that were set by setMilestoneBadge
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    if (tab.id != null) {
                        chrome.action.setBadgeText({ text: '', tabId: tab.id });
                    }
                }
            });
        }
        /** Pro users never see milestone badge or modal. */
        function isProUser() {
            return background_awaiter(this, void 0, void 0, function* () {
                var _a;
                const result = yield chrome.storage.sync.get(['settings']);
                return ((_a = result.settings) === null || _a === void 0 ? void 0 : _a.isPro) === true;
            });
        }
        // ─── Milestone eligibility check (badge-gate) ─────────────────────────────────
        /**
         * Determines whether the badge (and later the modal) are currently allowed to
         * be shown given the 7-day update-page cooldown and 30-day modal-frequency cap.
         */
        function isMilestoneEligible() {
            return background_awaiter(this, void 0, void 0, function* () {
                const result = yield chrome.storage.local.get([
                    MS_KEY_UPDATE_PAGE, MS_KEY_LAST_SHOWN,
                ]);
                const now = Date.now();
                const lastUpdateShown = result[MS_KEY_UPDATE_PAGE] || 0;
                const lastModalShown = result[MS_KEY_LAST_SHOWN] || 0;
                if (lastUpdateShown > 0 && (now - lastUpdateShown) < SEVEN_DAYS_MS)
                    return false;
                if (lastModalShown > 0 && (now - lastModalShown) < THIRTY_DAYS_MS)
                    return false;
                return true;
            });
        }
        // ─── Milestone storage migration / initialisation ─────────────────────────────
        /**
         * Called once on install or update (and lazily on first blocked-count change).
         * Sets up nextMilestone based on the current blocked count so we never
         * retroactively trigger old milestones.
         */
        function initializeMilestoneStorage() {
            return background_awaiter(this, void 0, void 0, function* () {
                const result = yield chrome.storage.local.get(['blockedCounts', MS_KEY_NEXT]);
                if (result[MS_KEY_NEXT] != null)
                    return; // already initialised
                const blockedCounts = result.blockedCounts || {};
                const globalStats = blockedCounts._global || {};
                const currentCount = globalStats.total || 0;
                const nextMilestone = computeNextMilestone(currentCount, MILESTONE_LADDER);
                yield chrome.storage.local.set({ [MS_KEY_NEXT]: nextMilestone });
            });
        }
        /**
         * Restore in-memory badge flag and re-apply badge if it was active before
         * the service worker was last terminated.
         */
        function initializeMilestoneState() {
            return background_awaiter(this, void 0, void 0, function* () {
                if (yield isProUser()) {
                    milestoneGlobalBadgeActive = false;
                    yield chrome.storage.local.set({ [MS_KEY_BADGE_ACTIVE]: false, [MS_KEY_PENDING]: null });
                    clearMilestoneBadge();
                    return;
                }
                const result = yield chrome.storage.local.get([MS_KEY_BADGE_ACTIVE, MS_KEY_PENDING]);
                milestoneGlobalBadgeActive = result[MS_KEY_BADGE_ACTIVE] === true;
                if (milestoneGlobalBadgeActive && result[MS_KEY_PENDING]) {
                    // Re-apply badge that was set before the service worker restarted.
                    setMilestoneBadge();
                }
                else if (milestoneGlobalBadgeActive && !result[MS_KEY_PENDING]) {
                    // pendingMilestone was cleared (modal shown) but badge flag wasn't — reconcile.
                    milestoneGlobalBadgeActive = false;
                    chrome.storage.local.set({ [MS_KEY_BADGE_ACTIVE]: false });
                }
                else if (!milestoneGlobalBadgeActive && result[MS_KEY_PENDING]) {
                    // A milestone was queued while the badge was suppressed by a cooldown.
                    // Re-check now — cooldowns may have expired since then (e.g. service worker
                    // restarted 30+ days later), so activate the badge if eligible.
                    const eligible = yield isMilestoneEligible();
                    if (eligible) {
                        setMilestoneBadge();
                    }
                }
            });
        }
        // ─── Milestone detection on blockedCounts change ──────────────────────────────
        /**
         * Reacts to changes in blockedCounts storage.  If the global total has just
         * crossed nextMilestone, records the pending milestone and sets the badge.
         *
         * Queuing rule: if there is already a pendingMilestone, keep it (earliest
         * unrewarded milestone wins); still advance nextMilestone so we don't stall.
         */
        function onBlockedCountsChanged(newBlockedCounts) {
            return background_awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (!(newBlockedCounts === null || newBlockedCounts === void 0 ? void 0 : newBlockedCounts._global))
                    return;
                const currentCount = newBlockedCounts._global.total || 0;
                if (yield isProUser())
                    return;
                const result = yield chrome.storage.local.get([
                    MS_KEY_NEXT, MS_KEY_PENDING,
                ]);
                let nextMilestone = (_a = result[MS_KEY_NEXT]) !== null && _a !== void 0 ? _a : null;
                const pendingMilestone = (_b = result[MS_KEY_PENDING]) !== null && _b !== void 0 ? _b : null;
                // Lazy init in case storage wasn't set yet.
                if (nextMilestone == null) {
                    nextMilestone = computeNextMilestone(currentCount, MILESTONE_LADDER);
                    yield chrome.storage.local.set({ [MS_KEY_NEXT]: nextMilestone });
                    return; // first-time init – no milestone "crossed" this increment
                }
                if (nextMilestone == null || currentCount < nextMilestone)
                    return;
                // ── Milestone crossed ──────────────────────────────────────────────────────
                const crossedMilestone = nextMilestone;
                // Advance nextMilestone regardless (never re-trigger the same milestone).
                const newNext = computeNextMilestone(currentCount, MILESTONE_LADDER);
                const updates = { [MS_KEY_NEXT]: newNext };
                if (pendingMilestone == null) {
                    // No pending milestone — record this one.
                    updates[MS_KEY_PENDING] = crossedMilestone;
                }
                else {
                    // Keep the earliest pending milestone (don't overwrite).
                }
                yield chrome.storage.local.set(updates);
                // Set the badge only if all cooldowns are satisfied.
                if (!milestoneGlobalBadgeActive && (updates[MS_KEY_PENDING] != null || pendingMilestone != null)) {
                    const eligible = yield isMilestoneEligible();
                    if (eligible) {
                        setMilestoneBadge();
                    }
                }
            });
        }
        /**
         * Sets the uninstall URL to collect user feedback
         */
        /**
         * Listens for messages from content scripts to update the extension badge.
         */
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
            var _a, _b;
            if (msg && msg.type === 'UPDATE_BADGE') {
                if (milestoneGlobalBadgeActive) {
                    // Milestone badge takes priority: keep "!!!" on this tab instead of
                    // allowing a numeric count to overwrite it.
                    applyMilestoneBadgeToTab((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id);
                }
                else {
                    if (typeof msg.count === 'number' && msg.count > 0) {
                        chrome.action.setBadgeText({
                            text: msg.count.toString(),
                            tabId: sender.tab ? sender.tab.id : undefined
                        });
                        chrome.action.setBadgeBackgroundColor({
                            color: '#6D6D6D',
                            tabId: sender.tab ? sender.tab.id : undefined
                        });
                    }
                }
            }
            if (msg && msg.type === 'CLEAR_BADGE') {
                if (milestoneGlobalBadgeActive) {
                    // Keep "!!!" visible even when the content script tries to clear
                    // (e.g. on new page load when per-page count resets to 0).
                    applyMilestoneBadgeToTab((_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id);
                }
                else {
                    chrome.action.setBadgeText({
                        text: '',
                        tabId: sender.tab ? sender.tab.id : undefined
                    });
                }
            }
            // Popup signals that the milestone modal was shown – clear the badge.
            if (msg && msg.type === 'MILESTONE_BADGE_CLEAR') {
                clearMilestoneBadge();
            }
            // Handle theme changes - broadcast to all extension pages
            if (msg && msg.type === 'themeChanged') {
                chrome.runtime.sendMessage({
                    type: 'themeChanged',
                    theme: msg.theme
                }).catch(() => {
                    // Ignore errors if no listeners
                });
            }
        });
        // Listen for Firefox AI text detection
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            // Firefox-only: Handle AI text detection requests from content scripts
            if (request.type === 'AI_TEXT_DETECTION') {
                // Use the AI text detector in background context
                const detector = AITextDetector.getInstance();
                detector.detectAIText(request.text)
                    .then((result) => {
                        sendResponse(result);
                    })
                    .catch((error) => {
                        sendResponse({
                            success: false,
                            score: 0,
                            label: '',
                            prediction: '',
                            confidence: 0,
                            error: error.message || 'Background detection failed'
                        });
                    });
                return true; // Keep message channel open for async response
            }
        });
        // Initialize milestone storage after installation
        chrome.runtime.onInstalled.addListener((details) => background_awaiter(void 0, void 0, void 0, function* () {
            if (details.reason === 'install') {
                // Initialise milestone storage (count is 0 on fresh install)
                initializeMilestoneStorage().catch(() => { });
            }
        }));
        // Set uninstall URL on startup (in case it wasn't set during install)
        /**
         * Initialize schedule-based blocking in background
         */
        function initializeScheduleBlocking() {
            return background_awaiter(this, void 0, void 0, function* () {
                try {
                    // Check if schedule blocking is enabled
                    const result = yield chrome.storage.local.get(['enableScheduleBlocking', 'blockingSchedule', 'lastManualToggleChange', 'manualToggleState']);
                    const scheduleBlockingEnabled = result.enableScheduleBlocking || false;
                    if (!scheduleBlockingEnabled) {
                        return;
                    }
                    const schedule = result.blockingSchedule || {};
                    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                    const checkScheduleAndUpdate = () => background_awaiter(this, void 0, void 0, function* () {
                        var _a;
                        try {
                            // Re-check if schedule blocking is still enabled
                            const currentResult = yield chrome.storage.local.get(['enableScheduleBlocking', 'blockingSchedule', 'lastManualToggleChange', 'manualToggleState']);
                            if (!currentResult.enableScheduleBlocking) {
                                return;
                            }
                            // Check if user has made a manual override
                            const lastManualChange = currentResult.lastManualToggleChange || 0;
                            const manualToggleState = currentResult.manualToggleState;
                            if (lastManualChange > 0) {
                                // User has made a manual change, check if we should honor it
                                const currentSchedule = currentResult.blockingSchedule || {};
                                const now = new Date();
                                const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
                                const currentDay = daysOfWeek[dayIndex];
                                const daySchedule = currentSchedule[currentDay];
                                let shouldBlock = false;
                                if (daySchedule && daySchedule.enabled) {
                                    const currentMinutes = now.getHours() * 60 + now.getMinutes();
                                    const startMinutes = parseInt(daySchedule.startTime.split(':')[0]) * 60 + parseInt(daySchedule.startTime.split(':')[1]);
                                    const endMinutes = parseInt(daySchedule.endTime.split(':')[0]) * 60 + parseInt(daySchedule.endTime.split(':')[1]);
                                    shouldBlock = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
                                }
                                // If manual state matches what schedule wants, clear the override (back to normal)
                                if (manualToggleState === shouldBlock) {
                                    console.log('Background Schedule: Manual override now matches schedule, clearing override');
                                    yield chrome.storage.local.remove(['lastManualToggleChange', 'manualToggleState']);
                                }
                                else {
                                    // Manual override is still different from schedule - respect user choice
                                    console.log('Background Schedule: Honoring manual override until next natural schedule transition');
                                    return;
                                }
                            }
                            const currentSchedule = currentResult.blockingSchedule || {};
                            const now = new Date();
                            const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
                            const currentDay = daysOfWeek[dayIndex];
                            const daySchedule = currentSchedule[currentDay];
                            let shouldBlock = false;
                            if (daySchedule && daySchedule.enabled) {
                                const currentMinutes = now.getHours() * 60 + now.getMinutes();
                                const startMinutes = parseInt(daySchedule.startTime.split(':')[0]) * 60 + parseInt(daySchedule.startTime.split(':')[1]);
                                const endMinutes = parseInt(daySchedule.endTime.split(':')[0]) * 60 + parseInt(daySchedule.endTime.split(':')[1]);
                                shouldBlock = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
                            }
                            // Get current extension state
                            const settings = yield chrome.storage.sync.get(['settings']);
                            const currentlyEnabled = ((_a = settings.settings) === null || _a === void 0 ? void 0 : _a.isEnabled) !== false;
                            // Update extension state if needed
                            if (shouldBlock && !currentlyEnabled) {
                                // Enable extension - it's within blocking hours
                                yield chrome.storage.sync.set({
                                    settings: Object.assign(Object.assign({}, settings.settings), { isEnabled: true })
                                });
                                yield chrome.storage.local.set({ extensionGloballyEnabled: true });
                                console.log('Background Schedule: Enabling extension (within blocking hours)');
                            }
                            else if (!shouldBlock && currentlyEnabled) {
                                // Disable extension - it's outside blocking hours
                                yield chrome.storage.sync.set({
                                    settings: Object.assign(Object.assign({}, settings.settings), { isEnabled: false })
                                });
                                yield chrome.storage.local.set({ extensionGloballyEnabled: false });
                                console.log('Background Schedule: Disabling extension (outside blocking hours)');
                            }
                        }
                        catch (error) {
                            console.error('Background: Error checking schedule:', error);
                        }
                    });
                    // Check immediately
                    yield checkScheduleAndUpdate();
                    // Set up interval to check every minute
                    setInterval(checkScheduleAndUpdate, 60000);
                }
                catch (error) {
                    // Silent error handling
                }
            });
        }
        // Listen for schedule updates and milestone detection
        chrome.storage.onChanged.addListener((changes, namespace) => {
            var _a;
            if (!((_a = chrome === null || chrome === void 0 ? void 0 : chrome.runtime) === null || _a === void 0 ? void 0 : _a.id))
                return; // Extension context invalidated
            try {
                if (namespace === 'local') {
                    if (changes.enableScheduleBlocking || changes.blockingSchedule) {
                        initializeScheduleBlocking();
                    }
                    // Detect milestone crossings whenever the blocked count changes.
                    if (changes.blockedCounts) {
                        const newCounts = changes.blockedCounts.newValue;
                        onBlockedCountsChanged(newCounts).catch(() => { });
                    }
                }
            }
            catch (error) {
                // Extension context invalidated or other error - silently ignore
            }
        });
        // Initialize on every service worker startup
        (() => background_awaiter(void 0, void 0, void 0, function* () {
            // Restore milestone badge state before anything else.
            yield initializeMilestoneState();
            // Lazily ensure milestone storage is seeded (handles existing users on feature rollout).
            yield initializeMilestoneStorage();
            yield initializeScheduleBlocking();
        }))();

    })();

    /******/
})()
    ;
//# sourceMappingURL=background.js.map