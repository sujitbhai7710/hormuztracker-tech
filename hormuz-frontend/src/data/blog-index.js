// Consolidated blog post index - all 30 posts
// Old posts (15) + New posts (15)

import { articlesBatch1 } from './articles-batch1-data.js';
import { newArticlesBatch2 } from './new-articles-batch2.js';
import { newArticlesBatch3 } from './new-articles-batch3.js';

// Original 15 posts (metadata only - content in [slug].astro legacy format)
const legacyPosts = [
  { slug: 'us-strikes-iranian-missile-sites-may27', title: 'US Strikes Iranian Missile Sites Near Hormuz in Defensive Operation', date: '2026-05-27', category: 'Military', readingTime: '8 min', excerpt: 'US Central Command confirms precision strikes on Iranian missile launch sites and mine-laying naval vessels near the Strait of Hormuz as military escalation intensifies.', authorName: 'Capt. Rick Halstead (Ret.)', authorTitle: 'Naval Affairs Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'US strikes Iran, Hormuz military operation, CENTCOM, Qeshm Island, IRGC naval mines' },
  { slug: 'ceasefire-framework-emerges-may26', title: 'Ceasefire Framework Emerges After Beijing-Mediated Marathon Talks', date: '2026-05-26', category: 'Diplomacy', readingTime: '9 min', excerpt: 'China brokers a 60-day truce extension framework between US and Iran, with phased strait reopening and sanctions relief as key provisions.', authorName: 'Rina Khatri', authorTitle: 'Diplomatic Affairs Editor', authorUrl: 'https://hormuztracker.tech/about', keywords: 'ceasefire Hormuz, Beijing talks, Iran US truce, Strait of Hormuz diplomacy, sanctions relief' },
  { slug: 'oil-prices-surge-may26', title: 'Brent Surges Past $102 as Military Strikes Dampen Peace Deal Hopes', date: '2026-05-26', category: 'Economic', readingTime: '7 min', excerpt: 'Oil prices spike 2.3% in a single session as US military strikes interrupt diplomatic progress, with analysts warning of further escalation premium.', authorName: 'James O\'Sullivan', authorTitle: 'Energy Markets Analyst', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Brent crude price, oil surge Hormuz, war premium oil, energy crisis 2026' },
  { slug: 'three-vessels-cross-hormuz-may26', title: 'Three Vessels Cross Hormuz Under Diplomatic Escort as Talks Continue', date: '2026-05-26', category: 'Diplomacy', readingTime: '6 min', excerpt: 'Two LNG carriers and one oil tanker pass through the strait in the first commercial transit in 72 hours, escorted by international naval vessels.', authorName: 'Marcus Webb', authorTitle: 'Senior Maritime Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Hormuz transit, diplomatic escort, LNG carrier, naval convoy, strait crossing' },
  { slug: 'india-fuel-crisis-may25', title: 'India Declares Fuel Emergency as Reserve Levels Hit Critical Threshold', date: '2026-05-25', category: 'Economic', readingTime: '8 min', excerpt: 'The Indian government activates emergency fuel rationing protocols as strategic petroleum reserves fall below 15 days of coverage for the first time.', authorName: 'Priya Nair', authorTitle: 'Asia Economics Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'India fuel emergency, strategic petroleum reserves, fuel rationing, India oil crisis' },
  { slug: 'eu-gas-prices-record-may25', title: 'EU Gas Prices Hit Record as Qatar Force Majeure Enters Third Month', date: '2026-05-25', category: 'Economic', readingTime: '7 min', excerpt: 'TTF gas futures surge to all-time highs as European utilities scramble for alternative LNG supplies amid prolonged Qatar export disruption.', authorName: 'James O\'Sullivan', authorTitle: 'Energy Markets Analyst', authorUrl: 'https://hormuztracker.tech/about', keywords: 'EU gas prices, TTF futures, Qatar force majeure, LNG supply crisis Europe' },
  { slug: 'us-naval-convoy-may25', title: 'US Naval Escort Operation Completes Fifth Convoy Through Hormuz', date: '2026-05-25', category: 'Military', readingTime: '7 min', excerpt: 'Operation Freedom of Navigation escorts its fifth convoy of commercial vessels through the Strait of Hormuz amid ongoing security threats.', authorName: 'Capt. Rick Halstead (Ret.)', authorTitle: 'Naval Affairs Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'naval convoy Hormuz, Operation Freedom of Navigation, US Navy escort, Fifth Fleet' },
  { slug: 'walls-closing-in', title: 'Walls Closing In: The Geopolitics of a Choked Strait', date: '2026-05-20', category: 'Analysis', readingTime: '8 min', excerpt: 'As the Hormuz crisis enters its third month, the geopolitical walls are closing in on all parties.', authorName: 'Marcus Webb', authorTitle: 'Senior Maritime Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Hormuz geopolitics, strait closure politics, Iran US standoff, Gulf crisis analysis' },
  { slug: 'when-hormuz-stopped', title: 'When Hormuz Stopped: The Day Global Trade Froze', date: '2026-03-15', category: 'Analysis', readingTime: '10 min', excerpt: 'February 28, 2026 will be remembered as the day the global trading system experienced its most severe shock since 1973.', authorName: 'Marcus Webb', authorTitle: 'Senior Maritime Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Hormuz closure day, global trade freeze, February 28 2026, shipping crisis' },
  { slug: 'beijing-summit', title: 'The Beijing Summit: Can China Broker a Deal?', date: '2026-05-24', category: 'Diplomacy', readingTime: '7 min', excerpt: 'China\'s emergency summit brings together Iran, Saudi Arabia, UAE, and Oman.', authorName: 'Rina Khatri', authorTitle: 'Diplomatic Affairs Editor', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Beijing summit, China broker deal, Iran Saudi talks, Hormuz diplomacy China' },
  { slug: 'insurance-markets', title: 'Insurance Markets in Uncharted Territory', date: '2026-04-10', category: 'Analysis', readingTime: '6 min', excerpt: 'The withdrawal of all six major P&I clubs has created an unprecedented maritime insurance crisis.', authorName: 'Marcus Webb', authorTitle: 'Senior Maritime Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'marine insurance crisis, P&I clubs withdrawal, war risk insurance, hull insurance Gulf' },
  { slug: 'cape-of-good-hope', title: 'Life on the Cape Route: 12 Extra Days, $650K More', date: '2026-04-05', category: 'Explainer', readingTime: '5 min', excerpt: 'The Cape of Good Hope has become the world\'s busiest shipping lane overnight.', authorName: 'Tom Engelhardt', authorTitle: 'Maritime Logistics Editor', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Cape of Good Hope route, shipping detour cost, alternative shipping route, extra days shipping' },
  { slug: 'lng-crisis', title: 'The LNG Crisis: No Pipeline Can Carry Gas', date: '2026-04-15', category: 'Explainer', readingTime: '6 min', excerpt: 'Unlike crude oil, LNG cannot be piped over land, making this the most intractable aspect.', authorName: 'Tom Engelhardt', authorTitle: 'Maritime Logistics Editor', authorUrl: 'https://hormuztracker.tech/about', keywords: 'LNG crisis, liquefied natural gas, no LNG pipeline, gas shipping Hormuz' },
  { slug: 'iran-safe-transit', title: 'Iran\'s "Safe Transit" Proposal: Genuine or Stalling?', date: '2026-05-18', category: 'Analysis', readingTime: '7 min', excerpt: 'Iran\'s proposed safe transit corridor comes with conditions that make acceptance unlikely.', authorName: 'Rina Khatri', authorTitle: 'Diplomatic Affairs Editor', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Iran safe transit, Hormuz corridor proposal, Iran conditions transit, safe passage Hormuz' },
  { slug: 'project-freedom', title: 'Operation Freedom of Navigation: The Naval Escort Mission', date: '2026-05-12', category: 'Military', readingTime: '8 min', excerpt: 'The US-led naval escort operation has completed three convoy transits.', authorName: 'Capt. Rick Halstead (Ret.)', authorTitle: 'Naval Affairs Correspondent', authorUrl: 'https://hormuztracker.tech/about', keywords: 'Operation Freedom Navigation, naval escort Hormuz, US convoy mission, Pentagon operation' },
];

// New articles with full content
const newArticles = [
  ...articlesBatch1,
  ...newArticlesBatch2,
  ...newArticlesBatch3
];

// Map of slug to full content for new articles
export const newArticleContent = {};
newArticles.forEach(a => {
  newArticleContent[a.slug] = a.content;
});

// All posts sorted by date (newest first)
export const allPosts = [
  ...legacyPosts,
  ...newArticles.map(a => ({
    slug: a.slug,
    title: a.title,
    date: a.date,
    category: a.category,
    readingTime: a.readingTime,
    excerpt: a.excerpt,
    authorName: a.authorName,
    authorTitle: a.authorTitle,
    authorUrl: a.authorUrl,
    keywords: a.keywords
  }))
].sort((a, b) => new Date(b.date) - new Date(a.date));

// Get a specific post by slug
export function getPost(slug) {
  return allPosts.find(p => p.slug === slug);
}

// Get all slugs for static paths
export function getAllSlugs() {
  return allPosts.map(p => p.slug);
}
