/**
 * API Configuration for Real-Time Lead Discovery
 * 
 * To get real leads (Phones & Emails) from Google Maps & JustDial:
 * 1. Sign up at Apify (https://apify.com/) - They give $5/month for free (~2500 leads).
 * 2. Get your API Token from Settings > API.
 * 3. Replace the placeholder below with your token.
 */
export const API_CONFIG = {
  APIFY_TOKEN: import.meta.env.VITE_APIFY_TOKEN || '', // Add your Apify Token in a .env file
  DEFAULT_LOCATION: 'Pune, Maharashtra',
  MAX_LEADS_PER_SEARCH: 15
};
