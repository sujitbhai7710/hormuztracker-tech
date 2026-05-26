export const API_BASE = 'https://hormuzstraitmonitor.com/api';
export const API_BASE_2 = 'https://www.hormuztracker.com/api';

export const CARRIERS_DATA = [
  { name: 'Maersk', status: 'Suspended', country: 'Denmark', fleet: 730, notes: 'Suspended all Hormuz transits since Feb 28, 2026. Rerouting via Cape of Good Hope.' },
  { name: 'MSC', status: 'Suspended', country: 'Switzerland', fleet: 760, notes: 'Suspended Hormuz operations. Mediterranean Shipping Company rerouting all vessels.' },
  { name: 'CMA CGM', status: 'Suspended', country: 'France', fleet: 590, notes: 'Suspended transit through Strait. Using alternative routes for Middle East cargo.' },
  { name: 'Hapag-Lloyd', status: 'Suspended', country: 'Germany', fleet: 290, notes: 'Suspended all Strait of Hormuz transits. Monitoring situation for potential resumption.' },
  { name: 'ONE (Ocean Network Express)', status: 'Suspended', country: 'Japan/Singapore', fleet: 230, notes: 'Suspended operations. Rerouting Asia-Middle East services via Cape.' },
  { name: 'Evergreen', status: 'Suspended', country: 'Taiwan', fleet: 210, notes: 'Suspended Hormuz transits. Alternative routing in effect.' },
  { name: 'Yang Ming', status: 'Suspended', country: 'Taiwan', fleet: 110, notes: 'Suspended operations through Strait of Hormuz.' },
  { name: 'HMM', status: 'Suspended', country: 'South Korea', fleet: 75, notes: 'Suspended all Hormuz passages. Monitoring security situation.' },
  { name: 'ZIM', status: 'Suspended', country: 'Israel', fleet: 130, notes: 'Suspended due to direct conflict involvement. All vessels rerouted.' },
];

export const PIPELINES_DATA = [
  {
    name: 'East-West Pipeline (Petroline)',
    route: 'Abqaiq, Saudi Arabia → Yanbu, Red Sea',
    capacity: '5.0M bbl/day',
    effectiveCapacity: '2.5-3.5M bbl/day',
    status: 'Operational',
    statusColor: 'green',
    description: "Saudi Arabia's primary bypass option. Originally built in the 1980s with a design capacity of 5 million barrels per day. In recent decades, parts of the pipeline have been repurposed for natural gas liquids transport, reducing effective crude oil throughput to an estimated 2.5-3.5 million barrels per day. Full restoration to nameplate capacity would require weeks of re-commissioning. Terminates at Yanbu on the Red Sea coast, allowing tankers to bypass the Strait of Hormuz entirely."
  },
  {
    name: 'Abu Dhabi Crude Oil Pipeline (ADCOP)',
    route: 'Habshan, Abu Dhabi → Fujairah, Gulf of Oman',
    capacity: '1.5M bbl/day',
    effectiveCapacity: '~1.5M bbl/day',
    status: 'Partially Disrupted',
    statusColor: 'yellow',
    description: 'Completed in 2012 to give the UAE a Hormuz bypass. Capacity of 1.5 million barrels per day. Runs from Habshan oil fields to Fujairah on the Gulf of Oman coast, completely bypassing the Strait. Currently operating at near-full capacity. However, the pipeline terminus at Fujairah has been impacted by regional missile strikes, causing intermittent disruptions to loading operations.'
  },
  {
    name: 'Iraq-Turkey Pipeline',
    route: 'Kirkuk, Iraq → Ceyhan, Turkey',
    capacity: '1.6M bbl/day',
    effectiveCapacity: '~0.5M bbl/day',
    status: 'Limited',
    statusColor: 'orange',
    description: 'The Kirkuk-Ceyhan pipeline provides an alternative export route for Iraqi crude. However, it has been subject to ongoing disputes between the Iraqi central government and the Kurdistan Regional Government. Current throughput is well below nameplate capacity due to political and technical issues. Provides limited bypass capacity for non-Saudi, non-UAE crude.'
  }
];

export const ROUTES_DATA = [
  { from: 'Ras Tanura, Saudi Arabia', to: 'Rotterdam, Netherlands', type: 'VLCC', normalDays: 19, normalNm: 6400, capeDays: 35, capeNm: 11800, extraDays: 16, extraNm: 5400, extraCost: '$500K' },
  { from: 'Ras Laffan, Qatar', to: 'Yokohama, Japan', type: 'LNG Carrier', normalDays: 16, normalNm: 6600, capeDays: 38, capeNm: 13200, extraDays: 22, extraNm: 6600, extraCost: '$850K' },
  { from: 'Jebel Ali, UAE', to: 'Singapore', type: 'Container', normalDays: 7, normalNm: 3100, capeDays: 28, capeNm: 10500, extraDays: 21, extraNm: 7400, extraCost: '$600K' },
  { from: 'Basra, Iraq', to: 'Shanghai, China', type: 'VLCC', normalDays: 18, normalNm: 7200, capeDays: 40, capeNm: 14500, extraDays: 22, extraNm: 7300, extraCost: '$900K' },
  { from: 'Jubail, Saudi Arabia', to: 'Rotterdam, Netherlands', type: 'Container', normalDays: 18, normalNm: 6500, capeDays: 34, capeNm: 12000, extraDays: 16, extraNm: 5500, extraCost: '$450K' },
  { from: 'Jubail, Saudi Arabia', to: 'Yokohama, Japan', type: 'VLCC', normalDays: 16, normalNm: 6800, capeDays: 38, capeNm: 13200, extraDays: 22, extraNm: 6400, extraCost: '$850K' },
  { from: 'Kuwait City, Kuwait', to: 'Mumbai, India', type: 'VLCC', normalDays: 3, normalNm: 1200, capeDays: 25, capeNm: 10800, extraDays: 22, extraNm: 9600, extraCost: '$400K' },
  { from: 'Ras Laffan, Qatar', to: 'Incheon, South Korea', type: 'LNG Carrier', normalDays: 8, normalNm: 4500, capeDays: 30, capeNm: 12000, extraDays: 22, extraNm: 7500, extraCost: '$1.2M' },
  { from: 'Ras Tanura, Saudi Arabia', to: 'Singapore', type: 'VLCC', normalDays: 10, normalNm: 4200, capeDays: 28, capeNm: 11500, extraDays: 18, extraNm: 7300, extraCost: '$650K' },
  { from: 'Jubail, Saudi Arabia', to: 'Jamnagar, India', type: 'VLCC', normalDays: 4, normalNm: 1500, capeDays: 26, capeNm: 11000, extraDays: 22, extraNm: 9500, extraCost: '$500K' },
  { from: 'Kharg Island, Iran', to: 'Ningbo, China', type: 'VLCC', normalDays: 17, normalNm: 6900, capeDays: 39, capeNm: 14200, extraDays: 22, extraNm: 7300, extraCost: '$880K' },
];

export const GLOSSARY_DATA = [
  { term: 'AIS', definition: 'Automatic Identification System — a tracking system used on ships and by vessel traffic services (VTS) to identify and locate vessels electronically.' },
  { term: 'VLCC', definition: 'Very Large Crude Carrier — a tanker ship with a capacity of 200,000-320,000 DWT, typically used for long-haul crude oil transport.' },
  { term: 'DWT', definition: 'Deadweight Tonnage — a measure of how much weight a ship can safely carry, including cargo, fuel, crew, and provisions.' },
  { term: 'Brent Crude', definition: 'A major trading classification of sweet light crude oil that serves as a benchmark price for purchases of oil worldwide.' },
  { term: 'WTI', definition: 'West Texas Intermediate — a grade of crude oil used as a benchmark in oil pricing, alongside Brent Crude.' },
  { term: 'TTF', definition: 'Title Transfer Facility — the Dutch virtual natural gas trading point, used as a benchmark for European gas prices.' },
  { term: 'LNG', definition: 'Liquefied Natural Gas — natural gas that has been cooled to -162°C for transport and storage as a liquid.' },
  { term: 'TEU', definition: 'Twenty-foot Equivalent Unit — a standard unit of measurement in container shipping, representing one 20-foot container.' },
  { term: 'MMSI', definition: 'Maritime Mobile Service Identity — a unique 9-digit number used to identify a ship station in the AIS system.' },
  { term: 'IRGC', definition: "Islamic Revolutionary Guard Corps — Iran's primary military force responsible for Strait of Hormuz security operations." },
  { term: 'SPR', definition: 'Strategic Petroleum Reserve — emergency fuel storage maintained by countries to mitigate supply disruptions.' },
  { term: 'War Risk Insurance', definition: 'Additional marine insurance coverage required when vessels transit through designated high-risk zones.' },
  { term: 'Worldscale (WS)', definition: 'A unified system for assessing freight rates for tanker shipping, used as a standard reference in the industry.' },
  { term: 'Cape of Good Hope', definition: 'The route around the southern tip of Africa, used as an alternative to the Suez Canal and Strait of Hormuz transits.' },
  { term: 'UNCLOS', definition: 'United Nations Convention on the Law of the Sea — the international treaty governing maritime rights and navigation.' },
  { term: 'Transit Passage', definition: "The right of ships and aircraft to pass through international straits without being impeded, as defined by UNCLOS." },
  { term: 'TD3C', definition: 'AG-East route — a benchmark tanker route from the Arabian Gulf to East Asia, used for freight rate assessment.' },
  { term: 'Bunker Fuel', definition: 'The fuel oil used by ships, typically heavy fuel oil (HFO) or marine gas oil (MGO).' },
];

export const FAQ_DATA = [
  {
    question: 'Is the Strait of Hormuz open?',
    answer: 'dynamic:straitStatus'
  },
  {
    question: 'How many ships are stranded at the Strait of Hormuz?',
    answer: 'dynamic:strandedVessels'
  },
  {
    question: 'How has the Hormuz crisis affected oil prices?',
    answer: 'dynamic:oilPrice'
  },
  {
    question: 'Are there peace talks planned for the Strait of Hormuz crisis?',
    answer: 'dynamic:diplomacy'
  },
  {
    question: 'Where is the Strait of Hormuz?',
    answer: 'The Strait of Hormuz is a narrow waterway between the Persian Gulf and the Gulf of Oman. It lies between Iran to the north and the UAE and Oman (Musandam Peninsula) to the south. At its narrowest point, the strait is just 21 nautical miles (39 km) wide, with two 2-mile-wide shipping lanes separated by a 2-mile buffer zone.'
  },
  {
    question: 'Why is the Strait of Hormuz important?',
    answer: 'The Strait of Hormuz is the world\'s most important oil chokepoint. Roughly 20% of the global oil supply and about 25% of global liquefied natural gas (LNG) trade passes through it daily. Any disruption to traffic through the strait has immediate consequences for global energy prices and supply chains, making it one of the most strategically significant waterways on Earth.'
  },
  {
    question: 'Who controls the Strait of Hormuz?',
    answer: 'The Strait of Hormuz is bordered by Iran on the northern shore and Oman (Musandam Peninsula) and the UAE on the southern shore. Under the UN Convention on the Law of the Sea (UNCLOS), the strait is classified as an international waterway with the right of transit passage for all vessels. In practice, the US Fifth Fleet based in Bahrain and various naval coalitions maintain a significant presence to ensure freedom of navigation.'
  },
  {
    question: 'What happens if the Strait of Hormuz is blocked?',
    answer: 'A blockade of the Strait of Hormuz would immediately disrupt roughly 20% of the world\'s oil supply, causing crude prices to spike dramatically. Countries dependent on Gulf oil — particularly in Asia and Europe — would face severe shortages. Alternative routes exist but cannot compensate fully: the East-West Pipeline across Saudi Arabia can handle about 5 million barrels/day, and some shipments can reroute via the Suez Canal, but these alternatives cover only a fraction of the strait\'s normal throughput of approximately 17-18 million barrels per day.'
  },
  {
    question: 'How wide is the Strait of Hormuz?',
    answer: 'At its narrowest point, the Strait of Hormuz is 21 nautical miles (39 km) wide. The Traffic Separation Scheme (TSS) managed by the International Maritime Organization (IMO) defines two shipping lanes, each 2 miles wide — one for inbound traffic and one for outbound — separated by a 2-mile buffer zone.'
  },
  {
    question: 'What is war risk insurance for shipping?',
    answer: 'War risk insurance is an additional premium that shipowners must pay when vessels transit through areas designated as high-risk zones due to armed conflict, terrorism, or political instability. Normal hull and machinery insurance excludes war risks, so separate coverage must be purchased. During the current Hormuz crisis, war risk premiums have increased from a normal rate of about 0.15% of ship value to over 2.4%, a 16x increase.'
  }
];

export const BLOG_POSTS = [
  {
    slug: 'walls-closing-in-trump-iran-options',
    title: 'The Walls Closing In: How Gulf Allies and Congress Are Constraining Trump\'s War Options',
    description: 'Gulf allies blocked a U.S. strike on Iran while the Senate advanced a war powers resolution — two simultaneous constraints that are reshaping Trump\'s military calculus.',
    date: '2026-05-21',
    category: 'Analysis',
    readingTime: 7
  },
  {
    slug: 'when-hormuz-stopped-being-an-oil-story',
    title: 'When Hormuz Stopped Being an Oil Story',
    description: 'The crisis has evolved far beyond energy markets. From fertilizer shortages to food security, the Hormuz closure is reshaping global supply chains in ways nobody predicted.',
    date: '2026-05-18',
    category: 'Analysis',
    readingTime: 8
  },
  {
    slug: 'beijing-summit-trump-xi-hormuz',
    title: 'Beijing Summit: Trump, Xi, and the Hormuz Question',
    description: 'The Trump-Xi summit in Beijing placed the Strait of Hormuz at the center of US-China negotiations, with energy security and trade access as key bargaining chips.',
    date: '2026-05-15',
    category: 'Diplomacy',
    readingTime: 6
  },
  {
    slug: 'insurance-markets-hormuz-shock',
    title: 'Insurance Markets in Uncharted Waters After Hormuz Shock',
    description: 'Marine war risk insurance has entered unprecedented territory. How the 16x premium increase is reshaping global shipping economics.',
    date: '2026-05-12',
    category: 'Markets',
    readingTime: 5
  },
  {
    slug: 'cape-of-good-hope-bottleneck',
    title: 'The Cape of Good Hope Is Becoming a Bottleneck',
    description: 'As hundreds of vessels reroute around Africa, ports along the Cape route are struggling to handle the surge. Congestion, delays, and rising costs.',
    date: '2026-05-09',
    category: 'Logistics',
    readingTime: 6
  },
  {
    slug: 'lng-crisis-asia-energy',
    title: 'The LNG Crisis: Asia Faces a Winter Without Gas',
    description: 'With Qatar\'s LNG exports disrupted and Asian importers scrambling for alternatives, the coming winter could bring unprecedented energy shortages.',
    date: '2026-05-06',
    category: 'Energy',
    readingTime: 7
  },
  {
    slug: 'iran-safe-transit-procedures',
    title: 'Iran\'s "Safe Transit Procedures" — What We Know',
    description: 'The IRGC announced new safe transit procedures for the Strait. Here\'s what shipping companies need to know about the new rules and risks.',
    date: '2026-05-06',
    category: 'Security',
    readingTime: 5
  },
  {
    slug: 'project-freedom-naval-escort',
    title: 'Operation Project Freedom: The US Naval Escort Mission Explained',
    description: 'The Pentagon\'s plan to escort merchant vessels through the Strait. Strategy, risks, and why it was paused after just one day.',
    date: '2026-05-04',
    category: 'Military',
    readingTime: 6
  },
  {
    slug: 'dual-blockade-economics',
    title: 'The Dual Blockade: When Both Sides Close a Waterway',
    description: 'Iran blocks the Strait. The US blockades Iranian ports. The result is an unprecedented dual-blockade scenario with cascading global economic impacts.',
    date: '2026-04-28',
    category: 'Analysis',
    readingTime: 8
  },
  {
    slug: 'fertilizer-crisis-hormuz',
    title: 'The Fertilizer Crisis: Hormuz and Global Food Security',
    description: 'Urea fertilizer prices have surged 35% in one month. The Hormuz disruption threatens food production across South Asia and Africa.',
    date: '2026-04-25',
    category: 'Agriculture',
    readingTime: 6
  },
  {
    slug: 'saudi-pipeline-capacity',
    title: 'Can Saudi Arabia\'s Pipelines Replace Hormuz?',
    description: 'The East-West Pipeline can move 5 million barrels per day in theory. In practice, the picture is far more complicated.',
    date: '2026-04-20',
    category: 'Energy',
    readingTime: 5
  }
];
