/**
 * Browser Compatibility Utility
 * Handles API differences between Chrome and Firefox
 */

// Detect browser type
const isFirefox = typeof browser !== 'undefined';
const isChrome = typeof chrome !== 'undefined';

/**
 * Get the appropriate browser API object
 * Firefox uses 'browser' namespace, Chrome uses 'chrome'
 */
export const getBrowserAPI = () => {
  if (isFirefox && typeof browser !== 'undefined') {
    return browser;
  }
  if (isChrome && typeof chrome !== 'undefined') {
    return chrome;
  }
  // Fallback
  return typeof browser !== 'undefined' ? browser : chrome;
};

/**
 * Cross-browser storage API wrapper
 */
export const browserStorage = {
  local: {
    get: (keys) => {
      const api = getBrowserAPI();
      return new Promise((resolve) => {
        api.storage.local.get(keys, resolve);
      });
    },
    set: (data) => {
      const api = getBrowserAPI();
      return new Promise((resolve) => {
        api.storage.local.set(data, resolve);
      });
    },
    remove: (keys) => {
      const api = getBrowserAPI();
      return new Promise((resolve) => {
        api.storage.local.remove(keys, resolve);
      });
    },
    clear: () => {
      const api = getBrowserAPI();
      return new Promise((resolve) => {
        api.storage.local.clear(resolve);
      });
    }
  },
  sync: {
    get: (keys) => {
      const api = getBrowserAPI();
      return new Promise((resolve) => {
        api.storage.sync.get(keys, resolve);
      });
    },
    set: (data) => {
      const api = getBrowserAPI();
      return new Promise((resolve) => {
        api.storage.sync.set(data, resolve);
      });
    }
  }
};

/**
 * Cross-browser runtime API wrapper
 */
export const browserRuntime = {
  sendMessage: (message) => {
    const api = getBrowserAPI();
    return api.runtime.sendMessage(message);
  },
  onMessage: {
    addListener: (callback) => {
      const api = getBrowserAPI();
      api.runtime.onMessage.addListener(callback);
    },
    removeListener: (callback) => {
      const api = getBrowserAPI();
      api.runtime.onMessage.removeListener(callback);
    }
  },
  getURL: (path) => {
    const api = getBrowserAPI();
    return api.runtime.getURL(path);
  },
  getManifest: () => {
    const api = getBrowserAPI();
    return api.runtime.getManifest();
  }
};

/**
 * Cross-browser tabs API wrapper
 */
export const browserTabs = {
  query: (queryInfo) => {
    const api = getBrowserAPI();
    return new Promise((resolve) => {
      api.tabs.query(queryInfo, resolve);
    });
  },
  create: (createProperties) => {
    const api = getBrowserAPI();
    return api.tabs.create(createProperties);
  },
  sendMessage: (tabId, message) => {
    const api = getBrowserAPI();
    return new Promise((resolve) => {
      api.tabs.sendMessage(tabId, message, resolve);
    });
  },
  reload: (tabId) => {
    const api = getBrowserAPI();
    return api.tabs.reload(tabId);
  },
  remove: (tabId) => {
    const api = getBrowserAPI();
    return api.tabs.remove(tabId);
  }
};

/**
 * Cross-browser action API wrapper (browserAction in Firefox, action in Chrome)
 */
export const browserAction = {
  setBadgeText: (details) => {
    const api = getBrowserAPI();
    // Firefox uses browserAction, Chrome uses action
    const actionAPI = api.action || api.browserAction;
    return actionAPI.setBadgeText(details);
  },
  setBadgeBackgroundColor: (details) => {
    const api = getBrowserAPI();
    const actionAPI = api.action || api.browserAction;
    return actionAPI.setBadgeBackgroundColor(details);
  },
  getBadgeText: (details) => {
    const api = getBrowserAPI();
    const actionAPI = api.action || api.browserAction;
    return new Promise((resolve) => {
      actionAPI.getBadgeText(details, resolve);
    });
  }
};

/**
 * Cross-browser i18n API wrapper
 */
export const browserI18n = {
  getMessage: (key, substitutions) => {
    const api = getBrowserAPI();
    return api.i18n.getMessage(key, substitutions);
  },
  getUILanguage: () => {
    const api = getBrowserAPI();
    return api.i18n.getUILanguage();
  }
};

/**
 * Cross-browser scripting API wrapper
 */
export const browserScripting = {
  executeScript: (details) => {
    const api = getBrowserAPI();
    return api.scripting.executeScript(details);
  }
}; 