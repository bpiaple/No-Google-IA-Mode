// /******/ (() => { // webpackBootstrap
// /******/ 	"use strict";
// /******/ 	var __webpack_modules__ = ({

// /***/ 171:
// /***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// ;// ./src/utils/ai-sites.js
// /**
//  * Websites where AI content blocking should be automatically disabled
//  * Includes 250+ sites across:
//  * - AI tools and platforms
//  * - Google Workspace (Drive, Docs, Sheets, etc.)
//  * - Microsoft 365 (Office, OneDrive, SharePoint, etc.)
//  * - Cloud storage services (Dropbox, Box, iCloud, etc.)
//  * - Development platforms and tools
//  * - Business productivity and project management
//  * - Communication and collaboration tools
//  * - Design and creative platforms
//  * - Marketing, analytics, and SEO tools
//  * - HR, finance, and legal platforms
//  * - Security and password managers
//  * - Learning and education platforms
//  * - Database and backend services
//  * - Travel booking (trains, buses, flights)
//  * - Government portals (US, EU, UK)
//  */
// const aiDedicatedSites = [
//   // OpenAI and ChatGPT
//   'openai.com',
//   'chatgpt.com',
//   'chat.openai.com',
  
//   // Google AI
//   'gemini.google.com',
//   'bard.google.com',
//   'ai.google.com',
//   'ai.google.dev',
  
//   // Anthropic
//   'claude.ai',
//   'claude.com',
//   'anthropic.com',
  
//   // Microsoft AI
//   'copilot.microsoft.com',
  
//   // DeepL (AI translation)
//   'deepl.com',
  
//   // Reference, Dictionary & Translation Sites (blocking inappropriate - users expect AI/translation content)
//   'wordreference.com',
//   'dictionary.com',
//   'thesaurus.com',
//   'merriam-webster.com',
//   'cambridge.org',
//   'collinsdictionary.com',
//   'oxfordlearnersdictionaries.com',
//   'lexico.com',
//   'vocabulary.com',
//   'linguee.com',
//   'reverso.net',
//   'context.reverso.net',
//   'bab.la',
//   'dict.cc',
//   'spanishdict.com',
//   'wordnik.com',
//   'wiktionary.org',
//   'urbandictionary.com',
//   'wikipedia.org',
//   'britannica.com',
//   'encyclopedia.com',
//   'investopedia.com',
  
//   // Mistral AI
//   'mistral.ai',
  
//   // DeepSeek
//   'deepseek.com',
  
//   // Meta AI
//   'meta.ai',
//   'ai.meta.com',
  
//   // OpenClaw / Clawbot (personal AI assistant)
//   'clawbot.ai',
//   'moltbot.io',
//   'moltbot.ai',
//   'openclaw.io',
//   'openclaw.ai',
  
//   // Pi / Inflection AI (personal AI)
//   'inflection.ai',
//   'pi.ai',
//   'heypi.com',
  
//   // Other Major AI Platforms
//   'poe.com',
//   'character.ai',
//   'midjourney.com',
//   'stability.ai',
//   'replicate.com',
//   'huggingface.co',
//   'perplexity.ai',
//   'you.com',
//   'phind.com',
//   'deepai.org',
//   'ai21.com',
//   'forefront.ai',
//   'inferkit.com',
//   'craiyon.com',
//   'nightcafe.ai',
//   'artbreeder.com',
//   'tome.app',
//   'beautiful.ai',
//   'gamma.app',
  
//   // AI Writing Tools
//   'jasper.ai',
//   'copy.ai',
//   'writesonic.com',
//   'rytr.me',
//   'grammarly.com',
//   'quillbot.com',
//   'wordtune.com',
//   'hemingwayapp.com',
//   'notion.ai',
//   'sudowrite.com',
//   'contentbot.ai',
//   'anyword.com',
//   'writer.com',
//   'frase.io',
//   'outwrite.com',
  
//   // AI Image/Video Generation
//   'dall-e.com',
//   'stablediffusion.com',
//   'leonardo.ai',
//   'runwayml.com',
//   'synthesia.io',
//   'lumen5.com',
//   'descript.com',
//   'pictory.ai',
//   'fliki.ai',
//   'elai.io',
//   'deepbrain.io',
//   'colossyan.com',
//   'remove.bg',
//   'cutout.pro',
//   'topazlabs.com',
  
//   // AI Development/API
//   'cohere.ai',
//   'together.ai',
//   'fireworks.ai',
//   'anyscale.com',
//   'banana.dev',
//   'modal.com',
//   'baseten.co',
  
//   // AI Coding Tools
//   'cursor.com',
//   'cursor.sh',
//   'replit.com',
//   'windsurf.dev',
//   'windsurf.com',
  
//   // Development Platforms
//   'github.com',
//   'gitlab.com',
//   'bitbucket.org',
//   'sourceforge.net',
//   'codepen.io',
//   'jsfiddle.net',
//   'glitch.com',
//   'codesandbox.io',
  
//   // Developer Communities
//   'stackoverflow.com',
//   'stackexchange.com',
//   'hashnode.com',
  
//   // Cloud Platforms - AWS
//   'aws.amazon.com',
//   'console.aws.amazon.com',
//   'amazonaws.com',
  
//   // Cloud Platforms - Microsoft Azure
//   'azure.microsoft.com',
//   'portal.azure.com',
//   'azurewebsites.net',
//   'dev.azure.com',
//   'visualstudio.com',
  
//   // Google Workspace & Productivity
//   'docs.google.com',
//   'drive.google.com',
//   'sheets.google.com',
//   'slides.google.com',
//   'forms.google.com',
//   'keep.google.com',
//   'calendar.google.com',
//   'meet.google.com',
//   'chat.google.com',
//   'sites.google.com',
//   'jamboard.google.com',
//   'script.google.com',
//   'myactivity.google.com',
  
//   // Cloud Platforms - Google Cloud
//   'cloud.google.com',
//   'console.cloud.google.com',
//   'googleapis.com',
//   'googlecloud.com',
  
//   // Microsoft 365 & Productivity
//   'office.com',
//   'office365.com',
//   'outlook.com',
//   'outlook.office.com',
//   'onedrive.live.com',
//   'onedrive.com',
//   'sharepoint.com',
//   'onenote.com',
//   'whiteboard.microsoft.com',
//   'to-do.microsoft.com',
//   'planner.cloud.microsoft',
//   'word.cloud.microsoft',
//   'excel.cloud.microsoft',
//   'powerpoint.cloud.microsoft',
  
//   // Cloud Storage Services
//   'dropbox.com',
//   'box.com',
//   'sync.com',
//   'pcloud.com',
//   'mega.nz',
//   'mega.io',
//   'idrive.com',
//   'backblaze.com',
//   'tresorit.com',
//   'egnyte.com',
//   'icedrive.net',
//   'icloud.com',
//   'me.com',
  
//   // Cloud Platforms - Other Major
//   'cloudflare.com',
//   'heroku.com',
//   'digitalocean.com',
//   'linode.com',
//   'vultr.com',
//   'netlify.com',
//   'vercel.com',
//   'railway.app',
//   'render.com',
//   'fly.io',
//   'supabase.com',
//   'planetscale.com',
//   'railway.com',
//   'deno.com',
  
//   // CRM Platforms
//   'salesforce.com',
//   'lightning.force.com',
//   'hubspot.com',
//   'pipedrive.com',
//   'zoho.com',
//   'freshworks.com',
//   'insightly.com',
  
//   // Business & Productivity Tools
//   'monday.com',
//   'asana.com',
//   'trello.com',
//   'notion.so',
//   'notion.site',
//   'airtable.com',
//   'clickup.com',
//   'basecamp.com',
//   'wrike.com',
//   'smartsheet.com',
//   'todoist.com',
//   'any.do',
//   'rememberthemilk.com',
//   'workflowy.com',
//   'roamresearch.com',
//   'obsidian.md',
//   'logseq.com',
//   'coda.io',
//   'fibery.io',
//   'mem.ai',
//   'craft.do',
//   'bear.app',
//   'ulysses.app',
  
//   // Note-Taking & Knowledge Management
//   'evernote.com',
//   'simplenote.com',
//   'standardnotes.com',
//   'zoho.com/notebook',
//   'nimbus.everhelper.me',
//   'notejoy.com',
//   'milanote.com',
//   'miro.com',
//   'mural.co',
//   'whimsical.com',
  
//   // Design & Creative Tools
//   'figma.com',
//   'canva.com',
//   'sketch.com',
//   'invision.com',
//   'invisionapp.com',
//   'adobe.com',
//   'behance.net',
//   'dribbble.com',
//   'protopie.io',
//   'principle.design',
//   'framer.com',
//   'spline.design',
//   'visme.co',
//   'piktochart.com',
//   'crello.com',
  
//   // Video Conferencing & Communication
//   'zoom.us',
//   'zoom.com',
//   'webex.com',
//   'gotomeeting.com',
//   'whereby.com',
//   'around.co',
//   'loom.com',
//   'mmhmm.app',
//   'riverside.fm',
//   'streamyard.com',
  
//   // Communication & Support
//   'slack.com',
//   'teams.microsoft.com',
//   'discord.com',
//   'zendesk.com',
//   'intercom.com',
//   'freshdesk.com',
//   'servicenow.com',
//   'atlassian.net',
//   'jira.atlassian.com',
//   'confluence.atlassian.com',
//   'rocket.chat',
//   'mattermost.com',
//   'twist.com',
//   'chanty.com',
  
//   // Project Management & Issue Tracking
//   'linear.app',
//   'height.app',
//   'shortcut.com',
//   'pivotaltracker.com',
//   'teamwork.com',
//   'podio.com',
//   'targetprocess.com',
//   'backlog.com',
//   'backlog.jp',
//   'youtrack.jetbrains.com',
//   'jetbrains.space',
//   'rally1.rallydev.com',
//   'versionone.com',
//   'ora.pm',
//   'hive.com',
//   'nifty.pm',
//   'proofhub.com',
//   'paymoapp.com',
//   'freedcamp.com',
//   'producteev.com',
//   'assembla.com',
//   'liquidplanner.com',
//   'workzone.com',
//   'clubhouse.io',
//   'taiga.io',
//   'phabricator.com',
//   'favro.com',
//   'cerb.ai',
//   'hygger.io',
//   'clubcollect.com',
//   'openproject.org',
//   'redmine.org',
//   'trac.edgewall.org',
//   'mantisbt.org',
//   'bugzilla.org',
  
//   // Automation & Integration
//   'zapier.com',
//   'ifttt.com',
//   'integromat.com',
//   'make.com',
//   'n8n.io',
//   'automate.io',
//   'workato.com',
//   'tray.io',
//   'integrately.com',
  
//   // Analytics & Marketing
//   'analytics.google.com',
//   'googletagmanager.com',
//   'mixpanel.com',
//   'amplitude.com',
//   'segment.com',
//   'mailchimp.com',
//   'constantcontact.com',
//   'sendgrid.com',
//   'marketo.com',
//   'pardot.com',
//   'activecampaign.com',
//   'getresponse.com',
//   'convertkit.com',
//   'drip.com',
//   'klaviyo.com',
//   'moosend.com',
//   'sendinblue.com',
//   'brevo.com',
//   'omnisend.com',
  
//   // SEO & Web Analytics
//   'semrush.com',
//   'ahrefs.com',
//   'moz.com',
//   'similarweb.com',
//   'hotjar.com',
//   'crazyegg.com',
//   'fullstory.com',
//   'logrocket.com',
//   'sentry.io',
//   'rollbar.com',
//   'bugsnag.com',
  
//   // E-commerce & Payment Platforms
//   'shopify.com',
//   'wix.com',
//   'squarespace.com',
//   'bigcommerce.com',
//   'woocommerce.com',
//   'stripe.com',
//   'paypal.com',
//   'square.com',
//   'gumroad.com',
//   'paddle.com',
  
//   // Social Media Management
//   'hootsuite.com',
//   'buffer.com',
//   'sproutsocial.com',
//   'later.com',
//   'planoly.com',
//   'sendible.com',
//   'agorapulse.com',
//   'socialpilot.co',
//   'crowdfire.com',
  
//   // HR & Recruitment
//   'workday.com',
//   'bamboohr.com',
//   'gusto.com',
//   'rippling.com',
//   'namely.com',
//   'adp.com',
//   'paychex.com',
//   'zenefits.com',
//   'greenhouse.io',
//   'lever.co',
//   'workable.com',
//   'breezy.hr',
//   'recruitee.com',
  
//   // Documentation & Wiki
//   'gitbook.com',
//   'gitbook.io',
//   'readme.com',
//   'docusaurus.io',
//   'bookstack.com',
//   'nuclino.com',
//   'slite.com',
//   'tettra.com',
//   'slab.com',
//   'bloomfire.com',
  
//   // File Transfer & Sharing
//   'wetransfer.com',
//   'sendanywhere.com',
//   'filemail.com',
//   'transfer.sh',
//   'gofile.io',
//   'pixeldrain.com',
//   'mediafire.com',
//   '4shared.com',
  
//   // Accounting & Finance
//   'quickbooks.intuit.com',
//   'xero.com',
//   'freshbooks.com',
//   'wave.apps',
//   'zohobooks.com',
//   'freeagent.com',
//   'kashoo.com',
//   'bench.co',
//   'expensify.com',
//   'concur.com',
//   'receipt-bank.com',
//   'dext.com',
  
//   // Legal & Contract Management
//   'docusign.com',
//   'hellosign.com',
//   'pandadoc.com',
//   'adobesign.com',
//   'signrequest.com',
//   'signnow.com',
//   'ironclad.com',
//   'contractworks.com',
//   'concord.com',
  
//   // Time Tracking & Productivity
//   'toggl.com',
//   'clockify.me',
//   'harvest.com',
//   'timely.com',
//   'rescuetime.com',
//   'hubstaff.com',
//   'timedoctor.com',
//   'everhour.com',
//   'timeneye.com',
//   'hourstack.com',
  
//   // Password Managers & Security
//   '1password.com',
//   'lastpass.com',
//   'dashlane.com',
//   'bitwarden.com',
//   'keeper.io',
//   'nordpass.com',
//   'roboform.com',
//   'passwordboss.com',
  
//   // VPN & Security Services
//   'nordvpn.com',
//   'expressvpn.com',
//   'surfshark.com',
//   'protonvpn.com',
//   'mullvad.net',
//   'cyberghostvpn.com',
//   'privateinternetaccess.com',
  
//   // Learning & Education Platforms
//   'udemy.com',
//   'coursera.org',
//   'edx.org',
//   'pluralsight.com',
//   'skillshare.com',
//   'linkedin.com/learning',
//   'masterclass.com',
//   'udacity.com',
//   'codecademy.com',
//   'treehouse.com',
//   'datacamp.com',
//   'frontendmasters.com',
//   'egghead.io',
//   'grokipedia.com',
  
//   // Database & Backend Services
//   'mongodb.com',
//   'postgresql.org',
//   'mysql.com',
//   'redis.io',
//   'elastic.co',
//   'fauna.com',
//   'cockroachlabs.com',
//   'hasura.io',
//   'prisma.io',
//   'retool.com',
//   'budibase.com',
//   'appsmith.com',

//   // Travel — Trains & Rail
//   'interrail.eu',
//   'interrail.com',
//   'eurail.com',
//   'trainline.com',
//   'thetrainline.com',
//   'raileurope.com',
//   'amtrak.com',
//   'sncf-connect.com',
//   'sncf.com',
//   'bahn.de',
//   'deutschebahn.com',
//   'trenitalia.com',
//   'renfe.com',
//   'oebb.at',
//   'sbb.ch',
//   'ns.nl',
//   'vr.fi',
//   'dsb.dk',
//   'sj.se',
//   'vy.no',
//   'irishrail.ie',
//   'nationalrail.co.uk',
//   'omio.com',
//   'rome2rio.com',
//   'seat61.com',

//   // Travel — Buses
//   'flixbus.com',
//   'flixbus.de',
//   'megabus.com',
//   'greyhound.com',
//   'nationalexpress.com',
//   'blablabus.com',
//   'busbud.com',
//   'wanderu.com',
//   'checkmybus.com',
//   'redcoachusa.com',

//   // Travel — Flights
//   'skyscanner.com',
//   'kayak.com',
//   'expedia.com',
//   'kiwi.com',
//   'momondo.com',
//   'cheapflights.com',
//   'trip.com',
//   'priceline.com',
//   'orbitz.com',
//   'hotwire.com',
//   'hopper.com',
//   'ryanair.com',
//   'easyjet.com',
//   'lufthansa.com',
//   'britishairways.com',
//   'ba.com',
//   'united.com',
//   'delta.com',
//   'americanairlines.com',
//   'southwest.com',
//   'jetblue.com',
//   'emirates.com',
//   'qatarairways.com',
//   'airfrance.com',
//   'klm.com',
//   'vueling.com',
//   'norwegian.com',
//   'wizzair.com',
//   'spirit.com',
//   'alaskaair.com',
//   'frontierairlines.com',

//   // Government — United States (.gov TLD)
//   'gov',
//   'usa.gov',

//   // Government — United Kingdom
//   'gov.uk',
//   'nhs.uk',
//   'parliament.uk',
//   'police.uk',

//   // Government — European Union
//   'europa.eu',

//   // Government — EU member states
//   'gouv.fr',
//   'service-public.fr',
//   'bund.de',
//   'gob.es',
//   'governo.it',
//   'gov.pl',
//   'overheid.nl',
//   'rijksoverheid.nl',
//   'gov.ie',
//   'gov.be',
//   'gov.gr',
//   'gov.pt',
//   'gov.se',
//   'gov.cz',
//   'gov.ro',
//   'gov.hu',
//   'gov.si',
//   'gov.hr',
//   'gov.lv',
//   'gov.ee',
//   'gov.lt',
//   'gov.sk',
//   'gov.cy',
//   'gov.mt',
//   'gouvernement.lu',
//   'gov.bg'
// ];

// /**
//  * Streaming platforms where blocking should be disabled (same as AI sites)
//  * but without showing the AI site indicator popup
//  */
// const streamingPlatforms = [
//   'netflix.com',
//   'hulu.com',
//   'primevideo.com',
//   'disneyplus.com',
//   'twitch.tv',
//   'kick.com',
//   'hbomax.com',
//   'max.com',
//   'paramountplus.com',
//   'peacocktv.com',
//   'crunchyroll.com',
//   'tv.apple.com',
//   'vimeo.com',
//   'dailymotion.com',
//   'tubi.tv',
//   'pluto.tv',
//   'roku.com',
//   'fubo.tv',
//   'sling.com',
//   'directv.com',
//   'starz.com',
//   'showtime.com',
//   'mubi.com',
//   'criterionchannel.com',
//   'curiositystream.com',
//   'discoveryplus.com',
//   'britbox.com',
//   'acorn.tv',
//   'shudder.com',
//   'funimation.com',
//   'hidive.com',
//   'amcplus.com',
//   'mgmplus.com',
//   'espn.com',
//   'nba.com',
//   'nfl.com',
//   'mlb.com',
//   'nhl.com',
//   'dazn.com'
// ];

// /**
//  * Check if a hostname is a site where blocking should be disabled (AI sites or streaming)
//  * Use this for blocking logic. Use isAIDedicatedSite for AI-specific UI (e.g. popup message)
//  * @param {string} hostname - The hostname to check
//  * @returns {boolean} True if blocking should be disabled
//  */
// function isBlockingDisabledSite(hostname) {
//   return isAIDedicatedSite(hostname) || isStreamingPlatform(hostname);
// }

// /**
//  * Check if a hostname is a streaming platform
//  * @param {string} hostname - The hostname to check
//  * @returns {boolean} True if it's a streaming platform
//  */
// function isStreamingPlatform(hostname) {
//   if (!hostname || typeof hostname !== 'string') return false;
//   const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase();
//   return streamingPlatforms.some(site => {
//     const normalizedSite = site.toLowerCase();
//     return normalizedHostname === normalizedSite ||
//            normalizedHostname.endsWith('.' + normalizedSite);
//   });
// }

// /**
//  * Check if URL is a site where blocking should be disabled (AI sites or streaming)
//  * @param {string} url - Full URL to check
//  * @returns {boolean} True if blocking should be disabled
//  */
// function isBlockingDisabledURL(url) {
//   return isAIDedicatedURL(url) || isStreamingPlatformURL(url);
// }

// /**
//  * Check if URL is a streaming platform (including path-based detection)
//  * @param {string} url - Full URL to check
//  * @returns {boolean} True if it's a streaming platform
//  */
// function isStreamingPlatformURL(url) {
//   if (!url || typeof url !== 'string') return false;
//   try {
//     const urlObj = new URL(url);
//     const hostname = urlObj.hostname;
//     return isStreamingPlatform(hostname);
//   } catch (e) {
//     return false;
//   }
// }

// /**
//  * Check if a hostname is an AI-dedicated site where blocking should be disabled
//  * @param {string} hostname - The hostname to check
//  * @returns {boolean} True if it's an AI-dedicated site
//  */
// function isAIDedicatedSite(hostname) {
//   if (!hostname || typeof hostname !== 'string') return false;
  
//   // Normalize hostname (remove www prefix if present)
//   const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase();
  
//   return aiDedicatedSites.some(site => {
//     const normalizedSite = site.toLowerCase();
//     // Exact match or subdomain match
//     return normalizedHostname === normalizedSite || 
//            normalizedHostname.endsWith('.' + normalizedSite);
//   });
// }

// /**
//  * Check if current URL is an AI-dedicated site (including path-based detection)
//  * @param {string} url - Full URL to check
//  * @returns {boolean} True if it's an AI-dedicated site
//  */
// function isAIDedicatedURL(url) {
//   if (!url || typeof url !== 'string') return false;
  
//   try {
//     const urlObj = new URL(url);
//     const protocol = urlObj.protocol;
//     const hostname = urlObj.hostname;
//     const pathname = urlObj.pathname;
    
//     // Only support HTTP/HTTPS protocols
//     if (protocol !== 'http:' && protocol !== 'https:') {
//       return false;
//     }
    
//     // First check hostname-based detection
//     if (isAIDedicatedSite(hostname)) {
//       return true;
//     }
    
//     // Special cases for path-based AI interfaces
//     const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase();
//     const normalizedPath = pathname.toLowerCase();
    
//     // Bing Chat
//     if (normalizedHostname === 'bing.com' && normalizedPath.startsWith('/chat')) {
//       return true;
//     }
    
//     // GitHub Copilot pages
//     if (normalizedHostname === 'github.com' && normalizedPath.startsWith('/features/copilot')) {
//       return true;
//     }
    
//     return false;
//   } catch (e) {
//     return false;
//   }
// }

// /**
//  * Get the current tab's AI site status
//  * @param {Function} callback - Callback function that receives the result
//  */
// function getCurrentTabAIStatus(callback) {
//   if (typeof chrome !== 'undefined' && chrome.tabs) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tab = tabs[0];
//       if (!tab || !tab.url) return callback(false);
      
//       try {
//         const url = new URL(tab.url);
//         const isAISite = isAIDedicatedSite(url.hostname);
//         callback(isAISite);
//       } catch (e) {
//         callback(false);
//       }
//     });
//   } else {
//     // For content script context
//     const isAISite = isAIDedicatedSite(window.location.hostname);
//     callback(isAISite);
//   }
// }

// /**
//  * @param {string} hostname - The hostname being checked
//  * @returns {boolean} whether the host is treated as an AI-dedicated site (blocking disabled there)
//  */
// function logAISiteStatus(hostname) {
//   return isAIDedicatedSite(hostname);
// } 
// ;// ./src/popup.js
// /* module decorator */ module = __webpack_require__.hmd(module);
// /**
//  * Get a localized message with fallback support
//  */
// function getMessage(key, defaultText = '') {
//   try {
//     if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
//       const message = chrome.i18n.getMessage(key);
//       return message || defaultText || key;
//     }
//   } catch (error) {
//     console.warn('Error getting i18n message:', error);
//   }
//   // Fallback for non-extension environments
//   const fallbacks = {
//     'starIconTooltip': 'You\'re a Star - Thanks for rating AICS',
//     'starShareIconTooltip': 'You\'re a Star - Thanks for sharing AICS'
//   };
//   return fallbacks[key] || defaultText;
// }

// /**
//  * Process data-i18n attributes for Firefox compatibility
//  */
// function processI18nAttributes() {
//   // Firefox doesn't automatically process data-i18n attributes like Chrome does
//   if (navigator.userAgent.toLowerCase().includes('firefox')) {
//     const elements = document.querySelectorAll('[data-i18n]');
//     elements.forEach(element => {
//       const key = element.getAttribute('data-i18n');
//       if (key) {
//         const translation = getMessage(key);
//         if (translation !== key) {
//           element.textContent = translation;
//         }
//       }
//     });

//     // Process data-i18n-title attributes
//     const titleElements = document.querySelectorAll('[data-i18n-title]');
//     titleElements.forEach(element => {
//       const key = element.getAttribute('data-i18n-title');
//       if (key) {
//         const translation = getMessage(key);
//         if (translation !== key) {
//           element.title = translation;
//         }
//       }
//     });

//     // Process data-i18n-aria-label attributes
//     const ariaElements = document.querySelectorAll('[data-i18n-aria-label]');
//     ariaElements.forEach(element => {
//       const key = element.getAttribute('data-i18n-aria-label');
//       if (key) {
//         const translation = getMessage(key);
//         if (translation !== key) {
//           element.setAttribute('aria-label', translation);
//         }
//       }
//     });

//     // Process data-i18n-alt attributes
//     const altElements = document.querySelectorAll('[data-i18n-alt]');
//     altElements.forEach(element => {
//       const key = element.getAttribute('data-i18n-alt');
//       if (key) {
//         const translation = getMessage(key);
//         if (translation !== key) {
//           element.alt = translation;
//         }
//       }
//     });
//   }
// }

// /**
//  * Get the current tab's URL and hostname.
//  */
// function getCurrentTabInfo(callback) {
//   try {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (chrome.runtime.lastError) {
//         console.error('Error querying tabs:', chrome.runtime.lastError);
//         return callback(null);
//       }
//       const tab = tabs[0];
//       if (!tab || !tab.url) return callback(null);
//       try {
//         const url = new URL(tab.url);
//         callback({ url: tab.url, hostname: url.hostname, pathname: url.pathname, tabId: tab.id });
//       } catch (e) {
//         callback(null);
//       }
//     });
//   } catch (e) {
//     callback(null);
//   }
// }

// /**
//  * Load and display blocked stats for today and total.
//  */
// function displayBlockedStats(hostname) {
//   try {
//     // Get total blocked count
//     chrome.storage.local.get(['blockedCounts'], (result) => {
//       if (chrome.runtime.lastError) {
//         console.error('Error getting blocked counts:', chrome.runtime.lastError);
//         document.getElementById('blocked-total').textContent = '0';
//         return;
//       }
//       const counts = result.blockedCounts || {};
//       const global = counts._global || {};
//       const totalCount = global.total || 0;
//       document.getElementById('blocked-total').textContent = totalCount.toLocaleString();
//     });
//     // Get per-page blocked count from content script
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (chrome.runtime.lastError) {
//         console.error('Error querying tabs:', chrome.runtime.lastError);
//         return;
//       }
//       if (!tabs[0] || !tabs[0].id) return;
//       chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_BLOCKED_COUNT' }, (response) => {
//         if (chrome.runtime.lastError) {
//           // Content script not available, use fallback
//           chrome.action.getBadgeText({ tabId: tabs[0].id }, (badgeText) => {
//             if (chrome.runtime.lastError) {
//               document.getElementById('blocked-page').textContent = '0';
//               return;
//             }
//             const badgeCount = parseInt(badgeText, 10);
//             const pageCount = !isNaN(badgeCount) && badgeCount > 0 ? badgeCount : 0;
//             document.getElementById('blocked-page').textContent = pageCount.toLocaleString();
//           });
//           return;
//         }
//         let pageCount = response && typeof response.count === 'number' ? response.count : 0;
//         if (pageCount === 0) {
//           // Try to get the badge value as a fallback
//           chrome.action.getBadgeText({ tabId: tabs[0].id }, (badgeText) => {
//             if (chrome.runtime.lastError) {
//               document.getElementById('blocked-page').textContent = '0';
//               return;
//             }
//             const badgeCount = parseInt(badgeText, 10);
//             if (!isNaN(badgeCount) && badgeCount > 0) {
//               pageCount = badgeCount;
//             }
//             document.getElementById('blocked-page').textContent = pageCount.toLocaleString();
//           });
//         } else {
//           document.getElementById('blocked-page').textContent = pageCount.toLocaleString();
//         }
//       });
//     });
//   } catch (e) {
//     // Gracefully handle errors
//     document.getElementById('blocked-total').textContent = '0';
//     document.getElementById('blocked-page').textContent = '0';
//   }
// }

// // List of Pro-only sites (top 30 news, LinkedIn, Gmail)
// const proOnlySites = [
//   // Top 30 news sites (domains only)
//   'nytimes.com', 'cnn.com', 'bbc.com', 'bbc.co.uk', 'theguardian.com', 'washingtonpost.com', 'reuters.com', 'foxnews.com', 'nbcnews.com', 'dailymail.co.uk',
//   'wsj.com', 'bloomberg.com', 'usatoday.com', 'latimes.com', 'news.yahoo.com', 'cbsnews.com', 'abcnews.go.com', 'forbes.com', 'huffpost.com', 'npr.org',
//   'apnews.com', 'politico.com', 'businessinsider.com', 'time.com', 'aljazeera.com', 'sky.com', 'newsweek.com', 'telegraph.co.uk', 'independent.co.uk', 'cbc.ca',
//   // LinkedIn
//   'linkedin.com',
//   // Gmail/Google Mail
//   'mail.google.com', 'gmail.com',
//   // Amazon main domains
//   'amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.de', 'amazon.fr', 'amazon.it', 'amazon.es', 'amazon.in', 'amazon.com.au', 'amazon.co.jp', 'amazon.com.br', 'amazon.com.mx', 'amazon.nl', 'amazon.sg', 'amazon.ae', 'amazon.sa', 'amazon.se', 'amazon.pl', 'amazon.tr',
//   // eBay main domains
//   'ebay.com', 'ebay.co.uk', 'ebay.ca', 'ebay.de', 'ebay.fr', 'ebay.it', 'ebay.es', 'ebay.com.au', 'ebay.nl', 'ebay.ie', 'ebay.com.hk', 'ebay.com.sg', 'ebay.com.my', 'ebay.com.ph', 'ebay.in'
// ];

// function isProOnlySite(hostname) {
//   return proOnlySites.some(domain => hostname === domain || hostname.endsWith('.' + domain));
// }

// // Import AI site detection from utils
// // Import AI site detection functions


// async function loadAISiteDetection() {
//   // Functions are already imported statically - no need to load
//   return Promise.resolve();
// }

// let lastTabInfo = null;
// let lastSiteKey = null;
// let lastPageKey = null;
// let lastSiteToggle = null;
// let lastPageToggle = null;

// function updateTogglesForEnableState(isEnabled) {
//   const siteToggle = lastSiteToggle || document.getElementById('toggle-site');
//   const pageToggle = lastPageToggle || document.getElementById('toggle-page');
  
//   if (!siteToggle || !pageToggle) return;
  
//   if (!isEnabled) {
//     siteToggle.checked = false;
//     pageToggle.checked = false;
//     siteToggle.disabled = true;
//     pageToggle.disabled = true;
//   } else {
//     // Restore previous state from storage
//     if (lastSiteKey && lastPageKey) {
//       chrome.storage.local.get([lastSiteKey, lastPageKey], (result) => {
//         siteToggle.checked = result[lastSiteKey] !== false;
//         pageToggle.checked = result[lastPageKey] !== false;
//         siteToggle.disabled = false;
//         pageToggle.disabled = false;
//       });
//     } else {
//       siteToggle.disabled = false;
//       pageToggle.disabled = false;
//     }
//   }
// }

// function truncateText(text, maxLength = 30) {
//   if (typeof text !== 'string') return '';
//   return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
// }

// /**
//  * Set up toggles for current site and page, load state from storage, and handle changes.
//  */
// async function setupToggles(tabInfo) {
//   if (!tabInfo) return;
  
//   // Ensure PRO status and AI site detection are loaded
//   await initializeProStatus();
//   await loadAISiteDetection();
  
//   const siteKey = `blockSite:${tabInfo.hostname}`;
//   const pageKey = `blockPage:${tabInfo.hostname}${tabInfo.pathname}`;
//   const siteToggle = document.getElementById('toggle-site');
//   const pageToggle = document.getElementById('toggle-page');
//   lastTabInfo = tabInfo;
//   lastSiteKey = siteKey;
//   lastPageKey = pageKey;
//   lastSiteToggle = siteToggle;
//   lastPageToggle = pageToggle;
//   const sitePro = document.getElementById('site-pro-label') || document.createElement('span');
//   const pagePro = document.getElementById('page-pro-label') || document.createElement('span');
//   sitePro.id = 'site-pro-label';
//   pagePro.id = 'page-pro-label';
//   sitePro.className = 'pro-label';
//   pagePro.className = 'pro-label';
//   sitePro.textContent = 'Pro';
//   pagePro.textContent = 'Pro';
//   // Set smaller and truncated text for site/page values
//   const siteNameEl = document.getElementById('site-name');
//   const pagePathEl = document.getElementById('page-path');
//   if (siteNameEl) {
//     siteNameEl.textContent = truncateText(tabInfo.hostname, 30);
//     siteNameEl.style.fontSize = '0.89em';
//     siteNameEl.style.color = '#888';
//     siteNameEl.style.wordBreak = 'break-all';
//   }
//   if (pagePathEl) {
//     pagePathEl.textContent = truncateText(tabInfo.pathname, 30);
//     pagePathEl.style.fontSize = '0.89em';
//     pagePathEl.style.color = '#888';
//     pagePathEl.style.wordBreak = 'break-all';
//   }

//   // Pro-only logic
//   if (isProOnlySite(tabInfo.hostname)) {
//     function ensureProBadgeRow(toggleId, proBadge) {
//       const toggle = document.getElementById(toggleId);
//       // Find the .toggle-controls container for this toggle
//       const controls = toggle && toggle.closest('.toggle-controls');
//       if (!controls) return;
//       // Remove existing badge if present
//       if (proBadge.parentElement) proBadge.parentElement.removeChild(proBadge);
//       // Insert badge as the first child of .toggle-controls
//       controls.insertBefore(proBadge, controls.firstChild);
//       proBadge.className = 'pro-label';
//       proBadge.style.display = 'inline-block';
//       proBadge.style.cursor = 'pointer';
//       proBadge.title = 'Upgrade to PRO';
//       proBadge.onclick = (e) => {
//         e.preventDefault();
//       };
//       // Make the whole row clickable and pointer
//       const toggleRow = controls.closest('.toggle-row');
//       if (toggleRow) {
//         toggleRow.style.cursor = 'pointer';
//         toggleRow.title = 'Upgrade to PRO to enable blocking on this site';
//         toggleRow.onclick = (e) => {
//           e.preventDefault();
//         };
//         // Add pro-disabled class for special styling
//         toggleRow.classList.add('pro-disabled');
//       }
//     }
//     if (!isProUser) {
//       siteToggle.checked = false;
//       pageToggle.checked = false;
//       siteToggle.disabled = true;
//       pageToggle.disabled = true;
//       ensureProBadgeRow('toggle-site', sitePro);
//       ensureProBadgeRow('toggle-page', pagePro);
//     } else {
//       siteToggle.disabled = false;
//       pageToggle.disabled = false;
//       // Remove badge click/cursor for Pro users
//       [sitePro, pagePro].forEach(badge => {
//         badge.style.cursor = '';
//         badge.title = '';
//         badge.onclick = null;
//         if (badge.parentElement) badge.parentElement.removeChild(badge);
//       });
//       // Remove row click/cursor and pro-disabled for Pro users
//       [siteToggle, pageToggle].forEach(toggle => {
//         const row = toggle.closest('.toggle-row');
//         if (row) {
//           row.style.cursor = '';
//           row.title = '';
//           row.onclick = null;
//           row.classList.remove('pro-disabled');
//         }
//       });

//       // For PRO users on PRO-only sites, load the toggle states and set up event listeners
//       chrome.storage.sync.get(['settings'], (syncResult) => {
//         const isEnabled = syncResult.settings ? syncResult.settings.isEnabled !== false : true;
//         if (!isEnabled) {
//           siteToggle.checked = false;
//           pageToggle.checked = false;
//           siteToggle.disabled = false;
//           pageToggle.disabled = false;
//           return; // Do not load per-site/page state if globally disabled
//         }
//         // If enabled, load per-site/page toggle states
//         chrome.storage.local.get([siteKey, pageKey], (result) => {
//           siteToggle.checked = result[siteKey] !== false; // default ON
//           pageToggle.checked = result[pageKey] !== false; // default ON
//           siteToggle.disabled = false;
//           pageToggle.disabled = false;
//         });
//       });

//       // Handle toggle changes for PRO-only sites
//       siteToggle.addEventListener('change', () => {
//         if (siteToggle.disabled) return;
        
//         // Check if extension is globally disabled
//         chrome.storage.sync.get(['settings'], (syncResult) => {
//           const isEnabled = syncResult.settings ? syncResult.settings.isEnabled !== false : true;
//           if (!isEnabled && siteToggle.checked) {
//             // Extension is disabled but user is trying to enable toggle
//             // Revert the toggle state and redirect to settings
//             siteToggle.checked = false;
//             openPageAndClosePopup('settings.html');
//             return;
//           }
          
//           // Normal toggle handling
//           chrome.storage.local.set({ [siteKey]: siteToggle.checked }, () => {
//             sendBlockingState(tabInfo, siteToggle.checked, null);
//           });
//           // If site toggle is turned off, also turn off page toggle
//           if (!siteToggle.checked) {
//             pageToggle.checked = false;
//             chrome.storage.local.set({ [pageKey]: false }, () => {
//               sendBlockingState(tabInfo, null, false);
//             });
//           }
//         });
//       });
//       pageToggle.addEventListener('change', () => {
//         if (pageToggle.disabled) return;
        
//         // Check if extension is globally disabled
//         chrome.storage.sync.get(['settings'], (syncResult) => {
//           const isEnabled = syncResult.settings ? syncResult.settings.isEnabled !== false : true;
//           if (!isEnabled && pageToggle.checked) {
//             // Extension is disabled but user is trying to enable toggle
//             // Revert the toggle state and redirect to settings
//             pageToggle.checked = false;
//             openPageAndClosePopup('settings.html');
//             return;
//           }
          
//           // Normal toggle handling
//           // If page toggle is turned on and site toggle is off, turn site toggle on as well
//           if (pageToggle.checked && !siteToggle.checked) {
//             siteToggle.checked = true;
//             chrome.storage.local.set({ [siteKey]: true }, () => {
//               sendBlockingState(tabInfo, true, null);
//             });
//           }
//           chrome.storage.local.set({ [pageKey]: pageToggle.checked }, () => {
//             sendBlockingState(tabInfo, null, pageToggle.checked);
//           });
//         });
//       });
//     }
//     // Return early for PRO-only sites after setting up proper handling
//     return;
//   } else {
//     // Remove Pro badge if present
//     if (sitePro.parentElement) sitePro.parentElement.removeChild(sitePro);
//     if (pagePro.parentElement) pagePro.parentElement.removeChild(pagePro);
//     siteToggle.disabled = false;
//     pageToggle.disabled = false;
//   }

//   // Check if current site has blocking disabled (AI sites or streaming platforms)
//   if (isBlockingDisabledSite(tabInfo.hostname) || isBlockingDisabledURL(tabInfo.url)) {
//     // Set toggles to off but keep them enabled
//     siteToggle.checked = false;
//     pageToggle.checked = false;
//     siteToggle.disabled = false;
//     pageToggle.disabled = false;
    
//     // Only show AI site indicator and popup for AI-dedicated sites (not streaming platforms)
//     const isAISite = isAIDedicatedSite(tabInfo.hostname) || isAIDedicatedURL(tabInfo.url);
//     if (isAISite) {
//       // Add AI site indicator
//       const aiIndicator = document.createElement('div');
//       aiIndicator.className = 'ai-site-indicator';
//       aiIndicator.style.cssText = `
//         background: linear-gradient(135deg, #4285f4, #34a853);
//         color: white;
//         padding: 8px 12px;
//         border-radius: 8px;
//         font-size: 0.9em;
//         text-align: center;
//         margin: 10px 0;
//         font-weight: 500;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//       `;
//       aiIndicator.innerHTML = `
//         <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
//           <span style="font-size: 1.2em;">🤖</span>
//           <span>AI Site Detected - Blocking Disabled</span>
//         </div>
//         <div style="font-size: 0.8em; opacity: 0.9; margin-top: 4px;">
//           AI tools work best without content blocking
//         </div>
//       `;
      
//       // Insert the indicator after the stats section
//       const statsSection = document.querySelector('.stats');
//       if (statsSection && statsSection.parentNode) {
//         statsSection.parentNode.insertBefore(aiIndicator, statsSection.nextSibling);
//       }
      
//       // Add special event listeners for AI sites (show popup when user tries to toggle)
//       const showAIFeedback = (e) => {
//         e.preventDefault();
//         e.target.checked = false; // Keep toggle off
        
//         // Show helpful tooltip/message
//         const message = document.createElement('div');
//         message.className = 'ai-feedback-message';
//         message.style.cssText = `
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background: linear-gradient(135deg, #4285f4, #34a853);
//           color: white;
//           padding: 15px 20px;
//           border-radius: 8px;
//           font-size: 14px;
//           z-index: 10000;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//           text-align: center;
//           max-width: 280px;
//         `;
//         message.innerHTML = `
//           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
//             <span style="font-size: 18px;">🤖</span>
//             <strong>AI Site Detected</strong>
//           </div>
//           <div style="font-size: 13px; opacity: 0.9;">
//             Blocking is automatically disabled on AI tools for optimal performance
//           </div>
//         `;
        
//         document.body.appendChild(message);
        
//         // Remove message after 3 seconds
//         setTimeout(() => {
//           if (message.parentNode) {
//             message.parentNode.removeChild(message);
//           }
//         }, 3000);
//       };
      
//       siteToggle.addEventListener('change', showAIFeedback);
//       pageToggle.addEventListener('change', showAIFeedback);
      
//       console.log(`AI Site Detected: ${tabInfo.hostname} - All blocking disabled`);
//     } else {
//       // Streaming platform: show indicator banner and popup when user tries to enable blocking
//       const streamingIndicator = document.createElement('div');
//       streamingIndicator.className = 'streaming-site-indicator';
//       streamingIndicator.style.cssText = `
//         background: linear-gradient(135deg, #e50914, #b20710);
//         color: white;
//         padding: 8px 12px;
//         border-radius: 8px;
//         font-size: 0.9em;
//         text-align: center;
//         margin: 10px 0;
//         font-weight: 500;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//       `;
//       streamingIndicator.innerHTML = `
//         <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
//           <span style="font-size: 1.2em;">🎥</span>
//           <span>${getMessage('streamingSiteIndicatorTitle', 'Streaming Site Detected - Blocking Disabled')}</span>
//         </div>
//         <div style="font-size: 0.8em; opacity: 0.9; margin-top: 4px;">
//           ${getMessage('streamingSiteIndicatorDesc', 'Streaming sites work best without content blocking')}
//         </div>
//       `;
//       const statsSection = document.querySelector('.stats');
//       if (statsSection && statsSection.parentNode) {
//         statsSection.parentNode.insertBefore(streamingIndicator, statsSection.nextSibling);
//       }
//       const showStreamingFeedback = (e) => {
//         e.preventDefault();
//         e.target.checked = false;
//         const message = document.createElement('div');
//         message.className = 'streaming-feedback-message';
//         message.style.cssText = `
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background: linear-gradient(135deg, #e50914, #b20710);
//           color: white;
//           padding: 15px 20px;
//           border-radius: 8px;
//           font-size: 14px;
//           z-index: 10000;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//           text-align: center;
//           max-width: 280px;
//         `;
//         message.innerHTML = `
//           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
//             <span style="font-size: 18px;">🎥</span>
//             <strong>${getMessage('streamingSitePopupTitle', 'Streaming Site Detected')}</strong>
//           </div>
//           <div style="font-size: 13px; opacity: 0.9;">
//             ${getMessage('streamingSitePopupMessage', 'Blocking is automatically disabled on streaming sites for optimal performance')}
//           </div>
//         `;
//         document.body.appendChild(message);
//         setTimeout(() => {
//           if (message.parentNode) message.parentNode.removeChild(message);
//         }, 3000);
//       };
//       siteToggle.addEventListener('change', showStreamingFeedback);
//       pageToggle.addEventListener('change', showStreamingFeedback);
//     }
//     return;
//   }

//   // --- Check global enable state for non-Pro-only sites ---
//   chrome.storage.sync.get(['settings'], (syncResult) => {
//     const isEnabled = syncResult.settings ? syncResult.settings.isEnabled !== false : true;
//     if (!isEnabled) {
//       siteToggle.checked = false;
//       pageToggle.checked = false;
//       // Do NOT disable the toggles
//       siteToggle.disabled = false;
//       pageToggle.disabled = false;
//       return; // Do not load per-site/page state if globally disabled
//     }
//     // If enabled, load per-site/page toggle states
//     chrome.storage.local.get([siteKey, pageKey], (result) => {
//       siteToggle.checked = result[siteKey] !== false; // default ON
//       pageToggle.checked = result[pageKey] !== false; // default ON
//       siteToggle.disabled = false;
//       pageToggle.disabled = false;
//     });
//   });

//   // Handle toggle changes
//   siteToggle.addEventListener('change', () => {
//     if (siteToggle.disabled) return;
    
//     // Check if extension is globally disabled
//     chrome.storage.sync.get(['settings'], (syncResult) => {
//       const isEnabled = syncResult.settings ? syncResult.settings.isEnabled !== false : true;
//       if (!isEnabled && siteToggle.checked) {
//         // Extension is disabled but user is trying to enable toggle
//         // Revert the toggle state and redirect to settings
//         siteToggle.checked = false;
//         openPageAndClosePopup('settings.html');
//         return;
//       }
      
//       // Normal toggle handling
//       chrome.storage.local.set({ [siteKey]: siteToggle.checked }, () => {
//         sendBlockingState(tabInfo, siteToggle.checked, null);
//       });
//       // If site toggle is turned off, also turn off page toggle
//       if (!siteToggle.checked) {
//         pageToggle.checked = false;
//         chrome.storage.local.set({ [pageKey]: false }, () => {
//           sendBlockingState(tabInfo, null, false);
//         });
//       }
//     });
//   });
//   pageToggle.addEventListener('change', () => {
//     if (pageToggle.disabled) return;
    
//     // Check if extension is globally disabled
//     chrome.storage.sync.get(['settings'], (syncResult) => {
//       const isEnabled = syncResult.settings ? syncResult.settings.isEnabled !== false : true;
//       if (!isEnabled && pageToggle.checked) {
//         // Extension is disabled but user is trying to enable toggle
//         // Revert the toggle state and redirect to settings
//         pageToggle.checked = false;
//         openPageAndClosePopup('settings.html');
//         return;
//       }
      
//       // Normal toggle handling
//       // If page toggle is turned on and site toggle is off, turn site toggle on as well
//       if (pageToggle.checked && !siteToggle.checked) {
//         siteToggle.checked = true;
//         chrome.storage.local.set({ [siteKey]: true }, () => {
//           sendBlockingState(tabInfo, true, null);
//         });
//       }
//       chrome.storage.local.set({ [pageKey]: pageToggle.checked }, () => {
//         sendBlockingState(tabInfo, null, pageToggle.checked);
//       });
//     });
//   });
// }

// /**
//  * Send a message to the content script to enable/disable blocking.
//  */
// function sendBlockingState(tabInfo, siteState, pageState) {
//   if (!tabInfo || !tabInfo.tabId) return;
//   chrome.tabs.sendMessage(tabInfo.tabId, {
//     type: 'UPDATE_BLOCKING_STATE',
//     siteState,
//     pageState,
//     hostname: tabInfo.hostname,
//     pathname: tabInfo.pathname
//   }, () => {
//     if (chrome.runtime.lastError) {
//       // Content script not available, just reload the tab
//       chrome.tabs.reload(tabInfo.tabId);
//       return;
//     }
//     // After updating state, reload the tab to re-inject content script and re-block
//     chrome.tabs.reload(tabInfo.tabId);
//   });
// }

// function setupSettings() {
//   // No-op: settings modal is not present in popup.html
// }

// // Load Pro subscription status from storage
// let isProUser = false;

// // Initialize PRO status on load
// async function initializeProStatus() {
//   try {
//     const result = await chrome.storage.sync.get('settings');
//     const settings = result.settings || {};
//     isProUser = settings.isPro || false;
//     console.log('PRO status loaded:', isProUser ? 'ENABLED' : 'DISABLED');
    
//     // Setup PRO interface after loading status
//     await setupProInterface();
//   } catch (error) {
//     console.error('Error loading PRO status:', error);
//     isProUser = false;
//   }
// }

// // Setup PRO interface based on subscription status
// async function setupProInterface() {
//   const upgradeBtn = document.querySelector('.upgrade-btn');
//   const proFeatureRows = document.querySelectorAll('.pro-feature-row');
  
//   if (isProUser) {
//     // Pro users never see milestone badge — clear any stuck state
//     chrome.action.setBadgeText({ text: '' });
//     chrome.storage.local.set({ milestoneBadgeActive: false, pendingMilestone: null });
//     chrome.runtime.sendMessage({ type: 'MILESTONE_BADGE_CLEAR' }).catch(() => {});

//     // Change upgrade button to PRO
//     if (upgradeBtn) {
//       upgradeBtn.textContent = getMessage('pro', 'PRO');
//       upgradeBtn.classList.add('pro-active');
//       upgradeBtn.onclick = (e) => {
//         e.preventDefault();
//         openPageAndClosePopup('settings.html');
//       };
//     }
    
//     // Transform pro feature rows for PRO users
//     proFeatureRows.forEach(row => {
//       row.classList.add('pro-active');
      
//       // Replace lock icon with golden PRO text, keep descriptions
//       const proLocked = row.querySelector('.pro-locked');
//       const proToggleControls = row.querySelector('.pro-toggle-controls');
      
//       if (proLocked) {
//         // Replace lock icon with golden "PRO" text
//         proLocked.innerHTML = '<span class="pro-text">PRO</span>';
//         proLocked.style.display = '';
//       }
      
//       if (proToggleControls) proToggleControls.style.display = 'block';
      
//       // Remove clickable behavior for PRO users
//       row.classList.remove('pro-feature-row--clickable');
//       row.onclick = null;
//       row.style.cursor = '';
//     });
    
//     // Load settings and setup toggle event listeners
//     await setupProToggleListeners();
    
//   } else {
//     // Ensure non-PRO interface
//     if (upgradeBtn) {
//       upgradeBtn.textContent = getMessage('upgrade', 'Upgrade');
//       upgradeBtn.classList.remove('pro-active');
//       upgradeBtn.onclick = (e) => {
//         e.preventDefault();
//       };
//     }
    
//     // Ensure pro feature rows are in locked state
//     proFeatureRows.forEach(row => {
//       row.classList.remove('pro-active');
      
//       const proLocked = row.querySelector('.pro-locked');
//       const proToggleControls = row.querySelector('.pro-toggle-controls');
      
//       if (proLocked) {
//         // Restore original lock icon
//         proLocked.innerHTML = `
//           <svg class="gold-lock" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
//             <rect x="4" y="9" width="12" height="7" rx="2" fill="#FFC107" stroke="#BFA32B" stroke-width="1.2"/>
//             <path d="M7 9V7a3 3 0 1 1 6 0v2" stroke="#BFA32B" stroke-width="1.2" fill="none"/>
//             <circle cx="10" cy="13" r="1.2" fill="#BFA32B"/>
//           </svg>
//         `;
//         proLocked.style.display = '';
//       }
      
//       if (proToggleControls) proToggleControls.style.display = 'none';
//     });
//   }
// }

// // Setup toggle listeners for PRO features
// async function setupProToggleListeners() {
//   try {
//     const result = await chrome.storage.sync.get('settings');
//     const settings = result.settings || {};
    
//     // Define mapping between popup toggles and settings
//     const toggleMappings = {
//       'popup-blockYouTubeAI': 'blockYouTubeAIVoiceVideos',
//       'popup-blockFacebookAIPosts': 'blockLinkedinFacebookAIContent',
//       'popup-blockGmailEmails': 'blockGmailEmails',
//       'popup-blockNewsAIContent': 'blockNewsAIContent'
//     };
    
//     // Setup each toggle
//     Object.entries(toggleMappings).forEach(([toggleId, settingKey]) => {
//       const toggle = document.getElementById(toggleId);
//       if (toggle) {
//         // Set initial state
//         toggle.checked = settings[settingKey] !== false;
        
//         // Add change listener
//         toggle.addEventListener('change', async () => {
//           try {
//             const result = await chrome.storage.sync.get('settings');
//             const currentSettings = result.settings || {};
            
//             // Update the specific setting
//             currentSettings[settingKey] = toggle.checked;
            
//             // Handle special case for Facebook/Threads mirroring
//             if (settingKey === 'blockFacebookAIPosts') {
//               currentSettings.blockThreadsAIPosts = toggle.checked;
//             }
            
//             await chrome.storage.sync.set({ settings: currentSettings });

//             if (settingKey === 'blockLinkedinFacebookAIContent') {
//               await chrome.storage.local.set({ blockLinkedinFacebookAIContent: toggle.checked });
//             }
            
//             // Notify background script of settings change
//             if (chrome.runtime && chrome.runtime.id) {
//               try {
//                 chrome.runtime.sendMessage({
//                   type: 'settingsUpdated',
//                   settings: currentSettings
//                 }).catch(() => {
//                   // Silently handle extension context invalidated errors
//                 });
//               } catch (error) {
//                 // Silently handle any synchronous errors
//               }
//             }
            
//             console.log(`Updated ${settingKey}:`, toggle.checked);
//           } catch (error) {
//             console.error(`Error updating ${settingKey}:`, error);
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.error('Error setting up PRO toggle listeners:', error);
//   }
// }

// async function setupThemeToggle() {
//   // Ensure PRO status is loaded first
//   await initializeProStatus();
  
//   const btnLight = document.getElementById('theme-light');
//   const btnDark = document.getElementById('theme-dark');
//   const proLabel = document.getElementById('theme-pro-label');
//   if (!btnLight || !btnDark || !proLabel) return;
//   // Set initial state from storage
//   chrome.storage.local.get(['theme'], (result) => {
//     const theme = result.theme || 'light';
//     setTheme(theme);
//     btnLight.classList.toggle('selected', theme === 'light');
//     btnDark.classList.toggle('selected', theme === 'dark');
//   });
//   // Pro logic
//   if (!isProUser) {
//     btnDark.disabled = true;
//     proLabel.style.display = '';
//   } else {
//     btnDark.disabled = false;
//     proLabel.style.display = 'none';
//   }
//   btnLight.addEventListener('click', () => {
//     setTheme('light');
//     chrome.storage.local.set({ theme: 'light' });
//     btnLight.classList.add('selected');
//     btnDark.classList.remove('selected');
//   });
//   btnDark.addEventListener('click', () => {
//     if (!isProUser) return;
//     setTheme('dark');
//     chrome.storage.local.set({ theme: 'dark' });
//     btnLight.classList.remove('selected');
//     btnDark.classList.add('selected');
//   });
// }

// function setTheme(theme) {
//   document.body.classList.remove('theme-light', 'theme-dark');
//   document.body.classList.add('theme-' + theme);
// }

// /**
//  * Helper function to open a page and close popup in Firefox to prevent dual display
//  */
// function openPageAndClosePopup(url, target = '_blank') {
//   window.open(url, target);
//   // Close popup in Firefox only to prevent dual display
//   if (navigator.userAgent.toLowerCase().includes('firefox')) {
//     window.close();
//   }
// }

// async function setupProRedirections() {
//   // Note: PRO status already loaded in initializeProStatus()
  
//   // Pro toggles and locked features in popup
//   const proToggles = [
//     document.getElementById('toggle-search-ai-overview'),
//     document.getElementById('toggle-site'),
//     document.getElementById('toggle-page'),
//     // Add other pro toggles here if needed
//   ];
//   proToggles.forEach(toggle => {
//     if (toggle && toggle.disabled) {
//       toggle.addEventListener('click', (e) => {
//         e.preventDefault();
//       });
//     }
//   });
  
//   // Only setup redirections for non-PRO users
//   if (!isProUser) {
//     // Upgrade/locked buttons
//     document.querySelectorAll('.locked, .pro-label').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         redirectToSubscribe();
//       });
//     });
//   }
// }

// // Listen for settings changes from settings page
// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg && msg.type === 'settingsUpdated' && msg.settings) {
//     if (typeof msg.settings.isEnabled !== 'undefined') {
//       updateTogglesForEnableState(msg.settings.isEnabled);
//     }
//   }
  
//   // Listen for theme changes from other pages
//   if (msg && msg.type === 'themeChanged') {
//     setTheme(msg.theme);
//   }
// });

// // Listen for PRO status changes and automatically disable dark mode if PRO is disabled
// chrome.storage.onChanged.addListener((changes, namespace) => {
//   if (!chrome?.runtime?.id) return; // Extension context invalidated
//   try {
//   if (namespace === 'sync' && changes.settings) {
//     const newSettings = changes.settings.newValue;
//     const oldSettings = changes.settings.oldValue || {};
    
//     // If PRO status changed from false to true (first-time activation)
//     if (oldSettings.isPro === false && newSettings.isPro === true) {
//       console.log('🎉 PRO activated in popup - updating interface');
//       // Update popup interface to reflect PRO status change
//       setupProInterface();
//     }
    
//     // If PRO status changed from true to false
//     if (oldSettings.isPro === true && newSettings.isPro === false) {
//       // Automatically disable dark mode
//       if (newSettings.darkMode === true || document.body.classList.contains('theme-dark')) {
//         console.log('🌙 PRO disabled - automatically switching to light mode');
//         setTheme('light');
        
//         // Update popup interface to reflect PRO status change
//         setupProInterface();
//       }
//     }
//   }
//   } catch (error) {
//     // Extension context invalidated or other error - silently ignore
//   }
// });

// /**
//  * Determine user level based on install count
//  */
// function getUserLevel(installCount) {
//   if (installCount >= 25) {
//     return {
//       level: 'Diamond',
//       icon: '../icons/rewards/diamond-96.png'
//     };
//   } else if (installCount >= 10) {
//     return {
//       level: 'Gold',
//       icon: '../icons/rewards/gold-96.png'
//     };
//   } else if (installCount >= 5) {
//     return {
//       level: 'Silver',
//       icon: '../icons/rewards/silver-96.png'
//     };
//   } else if (installCount >= 1) {
//     return {
//       level: 'Bronze',
//       icon: '../icons/rewards/bronze-96.png'
//     };
//   } else {
//     return null; // No level yet
//   }
// }


// /**
//  * Load and display referral badge from local storage
//  */
// function loadReferralBadge() {
//   chrome.storage.local.get(['referralStats'], (result) => {
//     if (chrome.runtime.lastError) {
//       console.error('Error reading referral stats from storage:', chrome.runtime.lastError);
//       return;
//     }
    
//     const badgeIcon = document.getElementById('referral-badge');
//     if (!badgeIcon) return;
    
//     if (result.referralStats && result.referralStats.stats) {
//       const installCount = result.referralStats.stats.totalInstalls || 0;
//       const userLevel = getUserLevel(installCount);
      
//       if (userLevel && installCount > 0) {
//         badgeIcon.src = userLevel.icon;
//         badgeIcon.alt = `${userLevel.level} Level Badge`;
//         badgeIcon.title = `${userLevel.level} Level (${installCount} referral${installCount === 1 ? '' : 's'}) - Click to view rewards`;
//         badgeIcon.style.display = 'block';
//         console.log(`🏆 Popup badge loaded: ${userLevel.level} Level (${installCount} installs)`);
//       } else {
//         badgeIcon.style.display = 'none';
//       }
//     } else {
//       badgeIcon.style.display = 'none';
//     }
//   });
// }

// // ─── Milestone modal ──────────────────────────────────────────────────────────

// const MS_KEY_PENDING      = 'pendingMilestone';
// const MS_KEY_UPDATE_PAGE  = 'lastUpdatePageShownAt';
// const MS_KEY_LAST_SHOWN   = 'lastMilestoneModalShownAt';
// const MS_KEY_LAST_VALUE   = 'lastMilestoneValueShown';
// const MS_KEY_BADGE_ACTIVE = 'milestoneBadgeActive';
// const SEVEN_DAYS_MS       = 7  * 24 * 60 * 60 * 1000;
// const THIRTY_DAYS_MS      = 30 * 24 * 60 * 60 * 1000;

// /**
//  * Checks all gating rules and, if eligible, shows the milestone modal overlay.
//  * Only shown to non-PRO users – paying customers don't need the upsell.
//  * Must be called after isProUser is resolved.
//  */
// async function maybeShowMilestoneModal() {
//   try {
//     // Never show the upsell to current PRO subscribers.
//     if (isProUser) return;

//     const result = await chrome.storage.local.get([
//       MS_KEY_PENDING,
//       MS_KEY_UPDATE_PAGE,
//       MS_KEY_LAST_SHOWN,
//     ]);

//     const pendingMilestone     = result[MS_KEY_PENDING]     ?? null;
//     if (!pendingMilestone) return;

//     const now                  = Date.now();
//     const lastUpdatePageShownAt= (result[MS_KEY_UPDATE_PAGE] ) || 0;
//     const lastMilestoneShownAt = (result[MS_KEY_LAST_SHOWN]  ) || 0;

//     // ── Gating checks ──────────────────────────────────────────────────────
//     // 1. 7-day cooldown after update page was shown
//     if (lastUpdatePageShownAt > 0 && (now - lastUpdatePageShownAt) < SEVEN_DAYS_MS) return;
//     // 2. 30-day frequency cap between any two milestone modal displays
//     if (lastMilestoneShownAt  > 0 && (now - lastMilestoneShownAt)  < THIRTY_DAYS_MS) return;

//     // ── Show the modal ─────────────────────────────────────────────────────
//     showMilestoneModal(pendingMilestone);
//   } catch {
//     // Silently ignore — non-critical, modal simply won't show.
//   }
// }

// /**
//  * Renders and activates the milestone modal overlay.
//  * Records the display timestamp and clears the badge immediately on show.
//  */
// function showMilestoneModal(milestone) {
//   const modal       = document.getElementById('milestone-modal');
//   const countEl     = document.getElementById('milestone-modal-count');
//   const hoursEl     = document.getElementById('milestone-hours-saved');
//   const infoIconEl  = document.getElementById('milestone-time-saved')?.querySelector('.milestone-info-icon');
//   const ctaBtn      = document.getElementById('milestone-cta-btn');
//   const closeBtn    = document.getElementById('milestone-close-btn');

//   if (!modal || !countEl || !ctaBtn || !closeBtn) return;

//   // Blocked count — red + bigger via CSS class.
//   countEl.textContent = Number(milestone).toLocaleString();

//   // Hours saved — calculated from the milestone value (same formula as update page:
//   // 10 minutes per blocked item → divide by 60 for hours).
//   if (hoursEl) {
//     const hoursSaved = Math.round((milestone * 10) / 60);
//     hoursEl.textContent = hoursSaved.toLocaleString();
//   }

//   // Localise the info-icon native tooltip.
//   if (infoIconEl) {
//     const tooltipText = getMessage('timeSavedTooltip',
//       'Estimated using 10 minutes per blocked AI video/article, etc.');
//     infoIconEl.title = tooltipText;
//   }

//   // Record the show timestamp and consume the pending milestone immediately.
//   // This ensures the same milestone is never re-shown regardless of how the popup is closed.
//   chrome.storage.local.set({ [MS_KEY_LAST_SHOWN]: Date.now(), [MS_KEY_LAST_VALUE]: milestone, [MS_KEY_PENDING]: null });

//   // Clear the "!!!" badge immediately – user has opened the popup.
//   chrome.action.setBadgeText({ text: '' });
//   chrome.storage.local.set({ [MS_KEY_BADGE_ACTIVE]: false });
//   // Tell the background service worker so its in-memory flag is also cleared.
//   chrome.runtime.sendMessage({ type: 'MILESTONE_BADGE_CLEAR' }).catch(() => {});

//   // Show the overlay.
//   modal.hidden = false;
//   ctaBtn.focus();

//   // ── Secondary: Not now ─────────────────────────────────────────────────
//   closeBtn.onclick = () => {
//     modal.hidden = true;
//   };

//   // Allow clicking the backdrop to dismiss (same as "Not now").
//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//       closeBtn.onclick();
//     }
//   }, { once: true });
// }

// /** Opera blocks search-engine pages unless the user opts in via extension settings. */
// function maybeShowOperaSearchResultsNotice() {
//   if (!/OPR\/|Opera/i.test(navigator.userAgent)) return;

//   chrome.storage.local.get(['operaSearchResultsNoticeDismissed'], (result) => {
//     if (chrome.runtime.lastError || result.operaSearchResultsNoticeDismissed) return;

//     const container = document.querySelector('.popup-container');
//     if (!container) return;

//     const notice = document.createElement('div');
//     notice.className = 'opera-search-notice';
//     notice.setAttribute('role', 'status');
//     notice.innerHTML = `
//       <p><strong>${getMessage('operaSearchNoticeTitle', 'Opera: enable search blocking')}</strong></p>
//       <p>${getMessage('operaSearchNoticeDescription', 'Open <code>opera://extensions</code>, open this extension&apos;s details, and turn on <strong>Allow access to search page results</strong> so AI blocking works.')}</p>
//       <button type="button" class="opera-search-dismiss">${getMessage('gotIt', 'Got it!')}</button>
//     `;

//     notice.querySelector('.opera-search-dismiss')?.addEventListener('click', () => {
//       chrome.storage.local.set({ operaSearchResultsNoticeDismissed: true });
//       notice.remove();
//     });

//     container.insertBefore(notice, container.firstChild);
//   });
// }

// document.addEventListener('DOMContentLoaded', async () => {
//   // Apply translations first
//   if (window.i18n && window.i18n.applyTranslations) {
//     window.i18n.applyTranslations();
//   }
  
//   // Firefox-specific: Process data-i18n attributes manually
//   processI18nAttributes();

//   maybeShowOperaSearchResultsNotice();
  
//   // Handle share text truncation after translations are applied
//   handleShareTextTruncation();
  
//   // Initialize PRO status first
//   await initializeProStatus();
  
//   getCurrentTabInfo(async (tabInfo) => {
//     if (tabInfo) {
//       await setupToggles(tabInfo);
//       displayBlockedStats(tabInfo.hostname);
//     }
//   });
  
//   // Load referral badge from local storage
//   loadReferralBadge();
//   setupReferralBadgeClick();
  
//   // setupSettings(); // No-op, safe to call
//   await setupThemeToggle();
//   await setupProRedirections();
  
//   // Initialize star rating icon display
//   initializeStarRatingIcon();

//   // Listen for extension enable/disable changes to update toggle states
//   chrome.storage.onChanged.addListener((changes, namespace) => {
//     if (!chrome?.runtime?.id) return; // Extension context invalidated
//     try {
//     if (namespace === 'sync' && changes.settings) {
//       const oldSettings = changes.settings.oldValue || {};
//       const newSettings = changes.settings.newValue || {};
      
//       // Check if isEnabled state changed
//       if (oldSettings.isEnabled !== newSettings.isEnabled) {
//         const isEnabled = newSettings.isEnabled !== false;
        
//         // Update toggle states when extension is re-enabled
//         if (isEnabled && lastTabInfo && lastSiteKey && lastPageKey) {
//           // Restore the correct toggle states from storage
//           chrome.storage.local.get([lastSiteKey, lastPageKey], (result) => {
//             if (lastSiteToggle) {
//               lastSiteToggle.checked = result[lastSiteKey] !== false;
//             }
//             if (lastPageToggle) {
//               lastPageToggle.checked = result[lastPageKey] !== false;
//             }
//           });
//         }
//       }
      
//       // Synchronize PRO toggles between settings and popup
//       const proToggleMappings = {
//         'blockYouTubeAIVoiceVideos': 'popup-blockYouTubeAI',
//         'blockLinkedinFacebookAIContent': 'popup-blockFacebookAIPosts', 
//         'blockGmailEmails': 'popup-blockGmailEmails',
//         'blockNewsAIContent': 'popup-blockNewsAIContent'
//       };
      
//       Object.entries(proToggleMappings).forEach(([settingKey, popupToggleId]) => {
//         if (oldSettings[settingKey] !== newSettings[settingKey]) {
//           const popupToggle = document.getElementById(popupToggleId);
//           if (popupToggle) {
//             popupToggle.checked = newSettings[settingKey] !== false;
//             console.log(`Synchronized ${settingKey} toggle: ${popupToggle.checked}`);
//           }
//         }
//       });
//     }
//     } catch (error) {
//       // Extension context invalidated or other error - silently ignore
//     }
//   });

//   // RATE AICS button: open appropriate store review page based on browser
//   const rateBtn = document.getElementById('rate-aics-btn');
//   if (rateBtn) {
//     rateBtn.addEventListener('click', (e) => {
//       e.preventDefault();
      
//       // Save that user clicked the rate button (for star icon display)
//       chrome.storage.sync.set({
//         reviewModalClickedRate: true
//       });
      
//       // Immediately show the star icon for instant feedback
//       const starIcon = document.getElementById('star-rating-icon');
//       if (starIcon) {
//         starIcon.style.display = 'inline-block';
//         const tooltipText = getMessage('starIconTooltip', 'You\'re a Star - Thanks for rating AICS');
//         starIcon.setAttribute('title', tooltipText);
//       }
      
//       // Detect browser and redirect to appropriate store
//       const userAgent = navigator.userAgent.toLowerCase();
//       if (userAgent.includes('firefox')) {
//         window.open('https://addons.mozilla.org/en-US/firefox/addon/ai-content-shield/', '_blank');
//       } else if (userAgent.includes('edg/') || userAgent.includes('edge/')) {
//         window.open('https://microsoftedge.microsoft.com/addons/detail/ai-content-shield-block/gacldhdafnaikcfalldlkednhaboldfj', '_blank');
//       } else {
//         // Default to Chrome Web Store for Chrome and other browsers
//         window.open('https://chrome.google.com/webstore/detail/ai-content-shield/eoghcliblbhjimkgnfemelcpfdnmiceo/reviews', '_blank');
//       }
      
//       // Close the popup window
//       window.close();
//     });
//   }

//   // Settings button: always open settings.html in a new tab (popup context safe)
//   const settingsBtn = document.querySelector('.settings-btn');
//   if (settingsBtn) {
//     settingsBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       openPageAndClosePopup('settings.html');
//     });
//   }

//   // Add ARIA feedback and button handlers as needed
//   // (block-element-btn and report-issue-btn are not present in popup.html, so skip)

//   // Pro feature row click/hover logic for non-Pro users
//   if (!isProUser) {
//     document.querySelectorAll('.pro-feature-row').forEach(row => {
//       row.classList.add('pro-feature-row--clickable');
//       row.addEventListener('click', (e) => {
//         e.preventDefault();
//       });
//     });
//   }

//   // Footer slider logic
//   const slides = [
//     document.getElementById('footer-slide-0'),
//     document.getElementById('footer-slide-2'), // Follow us! is now second
//     document.getElementById('footer-slide-1')
//   ];
//   const tabButtons = Array.from(document.querySelectorAll('.footer-slider-tab'));
//   let currentSlide = 0;
//   let intervalId = null;

//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       const isActive = i === index;
//       slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      
//       // Manage focusable elements within the slide
//       const focusableElements = slide.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
//       focusableElements.forEach(element => {
//         if (isActive) {
//           // Remove tabindex or restore original tabindex for active slide
//           if (element.hasAttribute('data-original-tabindex')) {
//             const originalTabindex = element.getAttribute('data-original-tabindex');
//             if (originalTabindex === 'null') {
//               element.removeAttribute('tabindex');
//             } else {
//               element.setAttribute('tabindex', originalTabindex);
//             }
//             element.removeAttribute('data-original-tabindex');
//           }
//         } else {
//           // Store original tabindex and make unfocusable for hidden slides
//           const currentTabindex = element.getAttribute('tabindex');
//           element.setAttribute('data-original-tabindex', currentTabindex || 'null');
//           element.setAttribute('tabindex', '-1');
//         }
//       });
//     });
    
//     tabButtons.forEach((btn, i) => {
//       btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
//       const progress = btn.querySelector('.tab-progress');
//       if (progress) {
//         if (i === index) {
//           // Will animate below
//         } else {
//           progress.style.transition = 'none';
//           progress.style.width = '0%';
//         }
//       }
//     });
    
//     // Animate progress bar for active tab
//     const activeProgress = tabButtons[index].querySelector('.tab-progress');
//     if (activeProgress) {
//       activeProgress.style.transition = 'none';
//       activeProgress.style.width = '0%';
//       void activeProgress.offsetWidth;
//       activeProgress.style.transition = 'width 3s linear';
//       activeProgress.style.width = '100%';
//     }
//     currentSlide = index;
//   }

//   function nextSlide() {
//     let next = (currentSlide + 1) % slides.length;
//     showSlide(next);
//   }

//   function startSlider() {
//     clearInterval(intervalId);
//     showSlide(currentSlide);
//     intervalId = setInterval(() => {
//       nextSlide();
//     }, 3000);
//   }

//   tabButtons.forEach((btn, i) => {
//     btn.addEventListener('click', () => {
//       showSlide(i);
//       startSlider();
//     });
//   });

//   startSlider();

//   // Contact support button handler
//   const contactBtn = document.getElementById('contact-support-btn');
//   if (contactBtn) {
//     contactBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       window.open('mailto:support@aicontentshield.app?subject=Support%20Request');
//     });
//   }

//   // Social sharing functionality
//   chrome.storage.sync.get(['settings'], (result) => {
//     const settings = result.settings || {};
//     const shareMessage = getMessage('shareIntentMessage', "I'm using AI Content Shield to detect & block AI content - saving me time. Install it to make your feed feel human again. @aicontentshield #aicontentshield #aidetector #aicontentblocker");
//     const shareUrl = `https://www.aicontentshield.app/extension?ref=${settings.refCode || 'popup'}`;
    
//     // X (Twitter) sharing
//     const shareX = document.getElementById('popup-share-x');
//     if (shareX) {
//       shareX.addEventListener('click', (e) => {
//         e.preventDefault();
//         const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
//         window.open(twitterUrl, '_blank', 'width=550,height=420');
//       });
//     }

//     // Facebook sharing
//     const shareFacebook = document.getElementById('popup-share-facebook');
//     if (shareFacebook) {
//       shareFacebook.addEventListener('click', (e) => {
//         e.preventDefault();
//         // Copy message to clipboard first, then open Facebook sharer
//         navigator.clipboard.writeText(shareMessage + ' ' + shareUrl).then(() => {
//           alert(getMessage('messageCopiedFacebook', 'Message copied to clipboard! The Facebook sharing dialog will open - you can paste the message there.'));
//           const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
//           window.open(facebookUrl, '_blank', 'width=580,height=400');
//         }).catch(() => {
//           // Fallback if clipboard API fails
//           const textArea = document.createElement('textarea');
//           textArea.value = shareMessage + ' ' + shareUrl;
//           document.body.appendChild(textArea);
//           textArea.select();
//           document.execCommand('copy');
//           document.body.removeChild(textArea);
//           alert(getMessage('messageCopiedFacebook', 'Message copied to clipboard! The Facebook sharing dialog will open - you can paste the message there.'));
//           const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
//           window.open(facebookUrl, '_blank', 'width=580,height=400');
//         });
//       });
//     }

//     // Threads sharing
//     const shareThreads = document.getElementById('popup-share-threads');
//     if (shareThreads) {
//       shareThreads.addEventListener('click', (e) => {
//         e.preventDefault();
//         const threadsUrl = `https://threads.net/intent/post?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`;
//         window.open(threadsUrl, '_blank', 'width=550,height=420');
//       });
//     }

//     // Instagram sharing
//     const shareInstagram = document.getElementById('popup-share-instagram');
//     if (shareInstagram) {
//       shareInstagram.addEventListener('click', (e) => {
//         e.preventDefault();
//         // Copy message to clipboard for Instagram
//         navigator.clipboard.writeText(shareMessage + ' ' + shareUrl).then(() => {
//           alert(getMessage('messageCopiedInstagram', 'Message copied to clipboard! Now you can paste it in your Instagram post or story.'));
//           window.open('https://www.instagram.com/', '_blank');
//         }).catch(() => {
//           // Fallback if clipboard API fails
//           const textArea = document.createElement('textarea');
//           textArea.value = shareMessage + ' ' + shareUrl;
//           document.body.appendChild(textArea);
//           textArea.select();
//           document.execCommand('copy');
//           document.body.removeChild(textArea);
//           alert(getMessage('messageCopiedInstagram', 'Message copied to clipboard! Now you can paste it in your Instagram post or story.'));
//           window.open('https://www.instagram.com/', '_blank');
//         });
//       });
//     }

//     // Copy referral link
//     const copyLink = document.getElementById('popup-copy-link');
//     if (copyLink) {
//       copyLink.addEventListener('click', (e) => {
//         e.preventDefault();
//         navigator.clipboard.writeText(shareUrl).then(() => {
//           // Show feedback by briefly changing the icon or adding a tooltip
//           const originalTitle = copyLink.title;
//           copyLink.title = getMessage('copied', 'Copied!');
//           copyLink.style.background = '#4caf50';
//           setTimeout(() => {
//             copyLink.title = originalTitle;
//             copyLink.style.background = '#fff';
//           }, 1500);
//         }).catch(() => {
//           // Fallback if clipboard API fails
//           const textArea = document.createElement('textarea');
//           textArea.value = shareUrl;
//           document.body.appendChild(textArea);
//           textArea.select();
//           document.execCommand('copy');
//           document.body.removeChild(textArea);
//           copyLink.title = getMessage('copied', 'Copied!');
//           setTimeout(() => {
//             copyLink.title = getMessage('copyReferralLink', 'Copy referral link');
//           }, 1500);
//         });
//       });
//     }
//   });

//   // Initialize star rating icon display
//   initializeStarRatingIcon();

//   // Check and show milestone upsell modal if eligible (runs after isProUser resolved).
//   await maybeShowMilestoneModal();
// });

// // Export functions for testing
// if ( true && module.exports) {
//   module.exports = {
//     getCurrentTabInfo,
//     displayBlockedStats,
//     isProOnlySite,
//     truncateText,
//     updateTogglesForEnableState,
//     handleShareTextTruncation
//   };
// }

// /**
//  * Handle share text truncation if it's 25+ characters
//  */
// function handleShareTextTruncation() {
//   const shareTextElement = document.querySelector('.share-text');
//   if (!shareTextElement) return;
  
//   // Get the full text content from both span and link
//   const shareSpan = shareTextElement.querySelector('span[data-i18n="shareAndGet"]');
//   const rewardsLink = shareTextElement.querySelector('.rewards-link');
  
//   if (!shareSpan || !rewardsLink) return;
  
//   const fullText = shareSpan.textContent + rewardsLink.textContent;
  
//   // Check if text is 25+ characters
//   if (fullText.length >= 25) {
//     shareTextElement.classList.add('truncated');
//   } else {
//     shareTextElement.classList.remove('truncated');
//   }
// }

// // Initialize star rating icon display
// function initializeStarRatingIcon() {
//   chrome.storage.sync.get(['reviewModalClickedRate', 'shareModalClickedRate'], (result) => {
//     const starIcon = document.getElementById('star-rating-icon');
//     const shareStarIcon = document.getElementById('star-share-icon');
//     const tooltipText = getMessage('starIconTooltip', 'You\'re a Star - Thanks for rating AICS');
//     const shareTooltipText = getMessage('starShareIconTooltip', 'You\'re a Star - Thanks for sharing AICS');

//     if (starIcon && result.reviewModalClickedRate === true) {
//       starIcon.style.display = 'inline-block';
//       starIcon.setAttribute('title', tooltipText);
//     }
//     if (shareStarIcon && result.shareModalClickedRate === true) {
//       shareStarIcon.style.display = 'inline-block';
//       shareStarIcon.setAttribute('title', shareTooltipText);
//     }
//   });
// } 

// /***/ })

// /******/ 	});
// /************************************************************************/
// /******/ 	// The module cache
// /******/ 	var __webpack_module_cache__ = {};
// /******/ 	
// /******/ 	// The require function
// /******/ 	function __webpack_require__(moduleId) {
// /******/ 		// Check if module is in cache
// /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
// /******/ 		if (cachedModule !== undefined) {
// /******/ 			return cachedModule.exports;
// /******/ 		}
// /******/ 		// Create a new module (and put it into the cache)
// /******/ 		var module = __webpack_module_cache__[moduleId] = {
// /******/ 			id: moduleId,
// /******/ 			loaded: false,
// /******/ 			exports: {}
// /******/ 		};
// /******/ 	
// /******/ 		// Execute the module function
// /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
// /******/ 	
// /******/ 		// Flag the module as loaded
// /******/ 		module.loaded = true;
// /******/ 	
// /******/ 		// Return the exports of the module
// /******/ 		return module.exports;
// /******/ 	}
// /******/ 	
// /************************************************************************/
// /******/ 	/* webpack/runtime/harmony module decorator */
// /******/ 	(() => {
// /******/ 		__webpack_require__.hmd = (module) => {
// /******/ 			module = Object.create(module);
// /******/ 			if (!module.children) module.children = [];
// /******/ 			Object.defineProperty(module, 'exports', {
// /******/ 				enumerable: true,
// /******/ 				set: () => {
// /******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
// /******/ 				}
// /******/ 			});
// /******/ 			return module;
// /******/ 		};
// /******/ 	})();
// /******/ 	
// /************************************************************************/
// /******/ 	
// /******/ 	// startup
// /******/ 	// Load entry module and return exports
// /******/ 	// This entry module is referenced by other modules so it can't be inlined
// /******/ 	var __webpack_exports__ = __webpack_require__(171);
// /******/ 	
// /******/ })()
// ;
// //# sourceMappingURL=popup.js.map