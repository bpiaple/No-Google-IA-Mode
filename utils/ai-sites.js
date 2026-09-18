/**
 * Websites where AI content blocking should be automatically disabled
 * Includes 250+ sites across:
 * - AI tools and platforms
 * - Google Workspace (Drive, Docs, Sheets, etc.)
 * - Microsoft 365 (Office, OneDrive, SharePoint, etc.)
 * - Cloud storage services (Dropbox, Box, iCloud, etc.)
 * - Development platforms and tools
 * - Business productivity and project management
 * - Communication and collaboration tools
 * - Design and creative platforms
 * - Marketing, analytics, and SEO tools
 * - HR, finance, and legal platforms
 * - Security and password managers
 * - Learning and education platforms
 * - Database and backend services
 * - Travel booking (trains, buses, flights)
 * - Government portals (US, EU, UK)
 */
export const aiDedicatedSites = [
  // OpenAI and ChatGPT
  'openai.com',
  'chatgpt.com',
  'chat.openai.com',
  
  // Google AI
  'gemini.google.com',
  'bard.google.com',
  'ai.google.com',
  'ai.google.dev',
  
  // Anthropic
  'claude.ai',
  'claude.com',
  'anthropic.com',
  
  // Microsoft AI
  'copilot.microsoft.com',
  
  // DeepL (AI translation)
  'deepl.com',
  
  // Reference, Dictionary & Translation Sites (blocking inappropriate - users expect AI/translation content)
  'wordreference.com',
  'dictionary.com',
  'thesaurus.com',
  'merriam-webster.com',
  'cambridge.org',
  'collinsdictionary.com',
  'oxfordlearnersdictionaries.com',
  'lexico.com',
  'vocabulary.com',
  'linguee.com',
  'reverso.net',
  'context.reverso.net',
  'bab.la',
  'dict.cc',
  'spanishdict.com',
  'wordnik.com',
  'wiktionary.org',
  'urbandictionary.com',
  'wikipedia.org',
  'britannica.com',
  'encyclopedia.com',
  'investopedia.com',
  
  // Mistral AI
  'mistral.ai',
  
  // DeepSeek
  'deepseek.com',
  
  // Meta AI
  'meta.ai',
  'ai.meta.com',
  
  // OpenClaw / Clawbot (personal AI assistant)
  'clawbot.ai',
  'moltbot.io',
  'moltbot.ai',
  'openclaw.io',
  'openclaw.ai',
  
  // Pi / Inflection AI (personal AI)
  'inflection.ai',
  'pi.ai',
  'heypi.com',
  
  // Other Major AI Platforms
  'poe.com',
  'character.ai',
  'midjourney.com',
  'stability.ai',
  'replicate.com',
  'huggingface.co',
  'perplexity.ai',
  'you.com',
  'phind.com',
  'deepai.org',
  'ai21.com',
  'forefront.ai',
  'inferkit.com',
  'craiyon.com',
  'nightcafe.ai',
  'artbreeder.com',
  'tome.app',
  'beautiful.ai',
  'gamma.app',
  
  // AI Writing Tools
  'jasper.ai',
  'copy.ai',
  'writesonic.com',
  'rytr.me',
  'grammarly.com',
  'quillbot.com',
  'wordtune.com',
  'hemingwayapp.com',
  'notion.ai',
  'sudowrite.com',
  'contentbot.ai',
  'anyword.com',
  'writer.com',
  'frase.io',
  'outwrite.com',
  
  // AI Image/Video Generation
  'dall-e.com',
  'stablediffusion.com',
  'leonardo.ai',
  'runwayml.com',
  'synthesia.io',
  'lumen5.com',
  'descript.com',
  'pictory.ai',
  'fliki.ai',
  'elai.io',
  'deepbrain.io',
  'colossyan.com',
  'remove.bg',
  'cutout.pro',
  'topazlabs.com',
  
  // AI Development/API
  'cohere.ai',
  'together.ai',
  'fireworks.ai',
  'anyscale.com',
  'banana.dev',
  'modal.com',
  'baseten.co',
  
  // AI Coding Tools
  'cursor.com',
  'cursor.sh',
  'replit.com',
  'windsurf.dev',
  'windsurf.com',
  
  // Development Platforms
  'github.com',
  'gitlab.com',
  'bitbucket.org',
  'sourceforge.net',
  'codepen.io',
  'jsfiddle.net',
  'glitch.com',
  'codesandbox.io',
  
  // Developer Communities
  'stackoverflow.com',
  'stackexchange.com',
  'hashnode.com',
  
  // Cloud Platforms - AWS
  'aws.amazon.com',
  'console.aws.amazon.com',
  'amazonaws.com',
  
  // Cloud Platforms - Microsoft Azure
  'azure.microsoft.com',
  'portal.azure.com',
  'azurewebsites.net',
  'dev.azure.com',
  'visualstudio.com',
  
  // Google Workspace & Productivity
  'docs.google.com',
  'drive.google.com',
  'sheets.google.com',
  'slides.google.com',
  'forms.google.com',
  'keep.google.com',
  'calendar.google.com',
  'meet.google.com',
  'chat.google.com',
  'sites.google.com',
  'jamboard.google.com',
  'script.google.com',
  'myactivity.google.com',
  
  // Cloud Platforms - Google Cloud
  'cloud.google.com',
  'console.cloud.google.com',
  'googleapis.com',
  'googlecloud.com',
  
  // Microsoft 365 & Productivity
  'office.com',
  'office365.com',
  'outlook.com',
  'outlook.office.com',
  'onedrive.live.com',
  'onedrive.com',
  'sharepoint.com',
  'onenote.com',
  'whiteboard.microsoft.com',
  'to-do.microsoft.com',
  'planner.cloud.microsoft',
  'word.cloud.microsoft',
  'excel.cloud.microsoft',
  'powerpoint.cloud.microsoft',
  
  // Cloud Storage Services
  'dropbox.com',
  'box.com',
  'sync.com',
  'pcloud.com',
  'mega.nz',
  'mega.io',
  'idrive.com',
  'backblaze.com',
  'tresorit.com',
  'egnyte.com',
  'icedrive.net',
  'icloud.com',
  'me.com',
  
  // Cloud Platforms - Other Major
  'cloudflare.com',
  'heroku.com',
  'digitalocean.com',
  'linode.com',
  'vultr.com',
  'netlify.com',
  'vercel.com',
  'railway.app',
  'render.com',
  'fly.io',
  'supabase.com',
  'planetscale.com',
  'railway.com',
  'deno.com',
  
  // CRM Platforms
  'salesforce.com',
  'lightning.force.com',
  'hubspot.com',
  'pipedrive.com',
  'zoho.com',
  'freshworks.com',
  'insightly.com',
  
  // Business & Productivity Tools
  'monday.com',
  'asana.com',
  'trello.com',
  'notion.so',
  'notion.site',
  'airtable.com',
  'clickup.com',
  'basecamp.com',
  'wrike.com',
  'smartsheet.com',
  'todoist.com',
  'any.do',
  'rememberthemilk.com',
  'workflowy.com',
  'roamresearch.com',
  'obsidian.md',
  'logseq.com',
  'coda.io',
  'fibery.io',
  'mem.ai',
  'craft.do',
  'bear.app',
  'ulysses.app',
  
  // Note-Taking & Knowledge Management
  'evernote.com',
  'simplenote.com',
  'standardnotes.com',
  'zoho.com/notebook',
  'nimbus.everhelper.me',
  'notejoy.com',
  'milanote.com',
  'miro.com',
  'mural.co',
  'whimsical.com',
  
  // Design & Creative Tools
  'figma.com',
  'canva.com',
  'sketch.com',
  'invision.com',
  'invisionapp.com',
  'adobe.com',
  'behance.net',
  'dribbble.com',
  'protopie.io',
  'principle.design',
  'framer.com',
  'spline.design',
  'visme.co',
  'piktochart.com',
  'crello.com',
  
  // Video Conferencing & Communication
  'zoom.us',
  'zoom.com',
  'webex.com',
  'gotomeeting.com',
  'whereby.com',
  'around.co',
  'loom.com',
  'mmhmm.app',
  'riverside.fm',
  'streamyard.com',
  
  // Communication & Support
  'slack.com',
  'teams.microsoft.com',
  'discord.com',
  'zendesk.com',
  'intercom.com',
  'freshdesk.com',
  'servicenow.com',
  'atlassian.net',
  'jira.atlassian.com',
  'confluence.atlassian.com',
  'rocket.chat',
  'mattermost.com',
  'twist.com',
  'chanty.com',
  
  // Project Management & Issue Tracking
  'linear.app',
  'height.app',
  'shortcut.com',
  'pivotaltracker.com',
  'teamwork.com',
  'podio.com',
  'targetprocess.com',
  'backlog.com',
  'backlog.jp',
  'youtrack.jetbrains.com',
  'jetbrains.space',
  'rally1.rallydev.com',
  'versionone.com',
  'ora.pm',
  'hive.com',
  'nifty.pm',
  'proofhub.com',
  'paymoapp.com',
  'freedcamp.com',
  'producteev.com',
  'assembla.com',
  'liquidplanner.com',
  'workzone.com',
  'clubhouse.io',
  'taiga.io',
  'phabricator.com',
  'favro.com',
  'cerb.ai',
  'hygger.io',
  'clubcollect.com',
  'openproject.org',
  'redmine.org',
  'trac.edgewall.org',
  'mantisbt.org',
  'bugzilla.org',
  
  // Automation & Integration
  'zapier.com',
  'ifttt.com',
  'integromat.com',
  'make.com',
  'n8n.io',
  'automate.io',
  'workato.com',
  'tray.io',
  'integrately.com',
  
  // Analytics & Marketing
  'analytics.google.com',
  'googletagmanager.com',
  'mixpanel.com',
  'amplitude.com',
  'segment.com',
  'mailchimp.com',
  'constantcontact.com',
  'sendgrid.com',
  'marketo.com',
  'pardot.com',
  'activecampaign.com',
  'getresponse.com',
  'convertkit.com',
  'drip.com',
  'klaviyo.com',
  'moosend.com',
  'sendinblue.com',
  'brevo.com',
  'omnisend.com',
  
  // SEO & Web Analytics
  'semrush.com',
  'ahrefs.com',
  'moz.com',
  'similarweb.com',
  'hotjar.com',
  'crazyegg.com',
  'fullstory.com',
  'logrocket.com',
  'sentry.io',
  'rollbar.com',
  'bugsnag.com',
  
  // E-commerce & Payment Platforms
  'shopify.com',
  'wix.com',
  'squarespace.com',
  'bigcommerce.com',
  'woocommerce.com',
  'stripe.com',
  'paypal.com',
  'square.com',
  'gumroad.com',
  'paddle.com',
  
  // Social Media Management
  'hootsuite.com',
  'buffer.com',
  'sproutsocial.com',
  'later.com',
  'planoly.com',
  'sendible.com',
  'agorapulse.com',
  'socialpilot.co',
  'crowdfire.com',
  
  // HR & Recruitment
  'workday.com',
  'bamboohr.com',
  'gusto.com',
  'rippling.com',
  'namely.com',
  'adp.com',
  'paychex.com',
  'zenefits.com',
  'greenhouse.io',
  'lever.co',
  'workable.com',
  'breezy.hr',
  'recruitee.com',
  
  // Documentation & Wiki
  'gitbook.com',
  'gitbook.io',
  'readme.com',
  'docusaurus.io',
  'bookstack.com',
  'nuclino.com',
  'slite.com',
  'tettra.com',
  'slab.com',
  'bloomfire.com',
  
  // File Transfer & Sharing
  'wetransfer.com',
  'sendanywhere.com',
  'filemail.com',
  'transfer.sh',
  'gofile.io',
  'pixeldrain.com',
  'mediafire.com',
  '4shared.com',
  
  // Accounting & Finance
  'quickbooks.intuit.com',
  'xero.com',
  'freshbooks.com',
  'wave.apps',
  'zohobooks.com',
  'freeagent.com',
  'kashoo.com',
  'bench.co',
  'expensify.com',
  'concur.com',
  'receipt-bank.com',
  'dext.com',
  
  // Legal & Contract Management
  'docusign.com',
  'hellosign.com',
  'pandadoc.com',
  'adobesign.com',
  'signrequest.com',
  'signnow.com',
  'ironclad.com',
  'contractworks.com',
  'concord.com',
  
  // Time Tracking & Productivity
  'toggl.com',
  'clockify.me',
  'harvest.com',
  'timely.com',
  'rescuetime.com',
  'hubstaff.com',
  'timedoctor.com',
  'everhour.com',
  'timeneye.com',
  'hourstack.com',
  
  // Password Managers & Security
  '1password.com',
  'lastpass.com',
  'dashlane.com',
  'bitwarden.com',
  'keeper.io',
  'nordpass.com',
  'roboform.com',
  'passwordboss.com',
  
  // VPN & Security Services
  'nordvpn.com',
  'expressvpn.com',
  'surfshark.com',
  'protonvpn.com',
  'mullvad.net',
  'cyberghostvpn.com',
  'privateinternetaccess.com',
  
  // Learning & Education Platforms
  'udemy.com',
  'coursera.org',
  'edx.org',
  'pluralsight.com',
  'skillshare.com',
  'linkedin.com/learning',
  'masterclass.com',
  'udacity.com',
  'codecademy.com',
  'treehouse.com',
  'datacamp.com',
  'frontendmasters.com',
  'egghead.io',
  'grokipedia.com',
  
  // Database & Backend Services
  'mongodb.com',
  'postgresql.org',
  'mysql.com',
  'redis.io',
  'elastic.co',
  'fauna.com',
  'cockroachlabs.com',
  'hasura.io',
  'prisma.io',
  'retool.com',
  'budibase.com',
  'appsmith.com',

  // Travel — Trains & Rail
  'interrail.eu',
  'interrail.com',
  'eurail.com',
  'trainline.com',
  'thetrainline.com',
  'raileurope.com',
  'amtrak.com',
  'sncf-connect.com',
  'sncf.com',
  'bahn.de',
  'deutschebahn.com',
  'trenitalia.com',
  'renfe.com',
  'oebb.at',
  'sbb.ch',
  'ns.nl',
  'vr.fi',
  'dsb.dk',
  'sj.se',
  'vy.no',
  'irishrail.ie',
  'nationalrail.co.uk',
  'omio.com',
  'rome2rio.com',
  'seat61.com',

  // Travel — Buses
  'flixbus.com',
  'flixbus.de',
  'megabus.com',
  'greyhound.com',
  'nationalexpress.com',
  'blablabus.com',
  'busbud.com',
  'wanderu.com',
  'checkmybus.com',
  'redcoachusa.com',

  // Travel — Flights
  'skyscanner.com',
  'kayak.com',
  'expedia.com',
  'kiwi.com',
  'momondo.com',
  'cheapflights.com',
  'trip.com',
  'priceline.com',
  'orbitz.com',
  'hotwire.com',
  'hopper.com',
  'ryanair.com',
  'easyjet.com',
  'lufthansa.com',
  'britishairways.com',
  'ba.com',
  'united.com',
  'delta.com',
  'americanairlines.com',
  'southwest.com',
  'jetblue.com',
  'emirates.com',
  'qatarairways.com',
  'airfrance.com',
  'klm.com',
  'vueling.com',
  'norwegian.com',
  'wizzair.com',
  'spirit.com',
  'alaskaair.com',
  'frontierairlines.com',

  // Government — United States (.gov TLD)
  'gov',
  'usa.gov',

  // Government — United Kingdom
  'gov.uk',
  'nhs.uk',
  'parliament.uk',
  'police.uk',

  // Government — European Union
  'europa.eu',

  // Government — EU member states
  'gouv.fr',
  'service-public.fr',
  'bund.de',
  'gob.es',
  'governo.it',
  'gov.pl',
  'overheid.nl',
  'rijksoverheid.nl',
  'gov.ie',
  'gov.be',
  'gov.gr',
  'gov.pt',
  'gov.se',
  'gov.cz',
  'gov.ro',
  'gov.hu',
  'gov.si',
  'gov.hr',
  'gov.lv',
  'gov.ee',
  'gov.lt',
  'gov.sk',
  'gov.cy',
  'gov.mt',
  'gouvernement.lu',
  'gov.bg'
];

/**
 * Streaming platforms where blocking should be disabled (same as AI sites)
 * but without showing the AI site indicator popup
 */
export const streamingPlatforms = [
  'netflix.com',
  'hulu.com',
  'primevideo.com',
  'disneyplus.com',
  'twitch.tv',
  'kick.com',
  'hbomax.com',
  'max.com',
  'paramountplus.com',
  'peacocktv.com',
  'crunchyroll.com',
  'tv.apple.com',
  'vimeo.com',
  'dailymotion.com',
  'tubi.tv',
  'pluto.tv',
  'roku.com',
  'fubo.tv',
  'sling.com',
  'directv.com',
  'starz.com',
  'showtime.com',
  'mubi.com',
  'criterionchannel.com',
  'curiositystream.com',
  'discoveryplus.com',
  'britbox.com',
  'acorn.tv',
  'shudder.com',
  'funimation.com',
  'hidive.com',
  'amcplus.com',
  'mgmplus.com',
  'espn.com',
  'nba.com',
  'nfl.com',
  'mlb.com',
  'nhl.com',
  'dazn.com'
];

/**
 * Check if a hostname is a site where blocking should be disabled (AI sites or streaming)
 * Use this for blocking logic. Use isAIDedicatedSite for AI-specific UI (e.g. popup message)
 * @param {string} hostname - The hostname to check
 * @returns {boolean} True if blocking should be disabled
 */
export function isBlockingDisabledSite(hostname) {
  return isAIDedicatedSite(hostname) || isStreamingPlatform(hostname);
}

/**
 * Check if a hostname is a streaming platform
 * @param {string} hostname - The hostname to check
 * @returns {boolean} True if it's a streaming platform
 */
export function isStreamingPlatform(hostname) {
  if (!hostname || typeof hostname !== 'string') return false;
  const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase();
  return streamingPlatforms.some(site => {
    const normalizedSite = site.toLowerCase();
    return normalizedHostname === normalizedSite ||
           normalizedHostname.endsWith('.' + normalizedSite);
  });
}

/**
 * Check if URL is a site where blocking should be disabled (AI sites or streaming)
 * @param {string} url - Full URL to check
 * @returns {boolean} True if blocking should be disabled
 */
export function isBlockingDisabledURL(url) {
  return isAIDedicatedURL(url) || isStreamingPlatformURL(url);
}

/**
 * Check if URL is a streaming platform (including path-based detection)
 * @param {string} url - Full URL to check
 * @returns {boolean} True if it's a streaming platform
 */
export function isStreamingPlatformURL(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    return isStreamingPlatform(hostname);
  } catch (e) {
    return false;
  }
}

/**
 * Check if a hostname is an AI-dedicated site where blocking should be disabled
 * @param {string} hostname - The hostname to check
 * @returns {boolean} True if it's an AI-dedicated site
 */
export function isAIDedicatedSite(hostname) {
  if (!hostname || typeof hostname !== 'string') return false;
  
  // Normalize hostname (remove www prefix if present)
  const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase();
  
  return aiDedicatedSites.some(site => {
    const normalizedSite = site.toLowerCase();
    // Exact match or subdomain match
    return normalizedHostname === normalizedSite || 
           normalizedHostname.endsWith('.' + normalizedSite);
  });
}

/**
 * Check if current URL is an AI-dedicated site (including path-based detection)
 * @param {string} url - Full URL to check
 * @returns {boolean} True if it's an AI-dedicated site
 */
export function isAIDedicatedURL(url) {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol;
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;
    
    // Only support HTTP/HTTPS protocols
    if (protocol !== 'http:' && protocol !== 'https:') {
      return false;
    }
    
    // First check hostname-based detection
    if (isAIDedicatedSite(hostname)) {
      return true;
    }
    
    // Special cases for path-based AI interfaces
    const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase();
    const normalizedPath = pathname.toLowerCase();
    
    // Bing Chat
    if (normalizedHostname === 'bing.com' && normalizedPath.startsWith('/chat')) {
      return true;
    }
    
    // GitHub Copilot pages
    if (normalizedHostname === 'github.com' && normalizedPath.startsWith('/features/copilot')) {
      return true;
    }
    
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Get the current tab's AI site status
 * @param {Function} callback - Callback function that receives the result
 */
export function getCurrentTabAIStatus(callback) {
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.url) return callback(false);
      
      try {
        const url = new URL(tab.url);
        const isAISite = isAIDedicatedSite(url.hostname);
        callback(isAISite);
      } catch (e) {
        callback(false);
      }
    });
  } else {
    // For content script context
    const isAISite = isAIDedicatedSite(window.location.hostname);
    callback(isAISite);
  }
}

/**
 * @param {string} hostname - The hostname being checked
 * @returns {boolean} whether the host is treated as an AI-dedicated site (blocking disabled there)
 */
export function logAISiteStatus(hostname) {
  return isAIDedicatedSite(hostname);
} 