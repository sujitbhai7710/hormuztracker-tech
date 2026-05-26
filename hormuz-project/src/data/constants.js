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
    utilizationPercent: 70,
    description: "Saudi Arabia's primary bypass option. Originally built in the 1980s with a design capacity of 5 million barrels per day. In recent decades, parts of the pipeline have been repurposed for natural gas liquids transport, reducing effective crude oil throughput to an estimated 2.5-3.5 million barrels per day. Full restoration to nameplate capacity would require weeks of re-commissioning. Terminates at Yanbu on the Red Sea coast, allowing tankers to bypass the Strait of Hormuz entirely."
  },
  {
    name: 'Abu Dhabi Crude Oil Pipeline (ADCOP)',
    route: 'Habshan, Abu Dhabi → Fujairah, Gulf of Oman',
    capacity: '1.5M bbl/day',
    effectiveCapacity: '~1.5M bbl/day',
    status: 'Partially Disrupted',
    statusColor: 'yellow',
    utilizationPercent: 85,
    description: 'Completed in 2012 to give the UAE a Hormuz bypass. Capacity of 1.5 million barrels per day. Runs from Habshan oil fields to Fujairah on the Gulf of Oman coast, completely bypassing the Strait. Currently operating at near-full capacity. However, the pipeline terminus at Fujairah has been impacted by regional missile strikes, causing intermittent disruptions to loading operations.'
  },
  {
    name: 'Iraq-Turkey Pipeline',
    route: 'Kirkuk, Iraq → Ceyhan, Turkey',
    capacity: '1.6M bbl/day',
    effectiveCapacity: '~0.5M bbl/day',
    status: 'Limited',
    statusColor: 'orange',
    utilizationPercent: 31,
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
    answer: 'War risk insurance is an additional premium that shipowners must pay when vessels transit through areas designated as high-risk zones due to armed conflict, terrorism, or political instability. Normal hull and machinery insurance excludes war risks, so separate coverage must be purchased. During the current Hormuz crisis, war risk premiums have increased from a normal rate of about 0.15% of ship value to significantly elevated levels, representing a many-fold increase over pre-crisis rates.'
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

export const BLOG_CONTENT = {
  'walls-closing-in-trump-iran-options': `<p>The Trump administration's options for responding to the Strait of Hormuz crisis have narrowed dramatically in recent weeks, constrained simultaneously by reluctant Gulf allies and an assertive Congress. The result is a strategic calculus that increasingly favors diplomatic engagement over military escalation.</p>

<p>In late April, key Gulf Cooperation Council members — including Saudi Arabia, the UAE, and Oman — privately informed Washington that they would not allow their airspace or military bases to be used for offensive strikes against Iran. The message, delivered through multiple diplomatic channels, represented a significant shift from the implicit security guarantees that had underpinned US-Gulf military cooperation for decades. These states fear that Iranian retaliation against their oil infrastructure would be catastrophic, a lesson reinforced by the 2019 Abqaiq–Khurais attacks that temporarily halved Saudi oil production.</p>

<p>Simultaneously, the US Senate advanced a war powers resolution in a bipartisan 62-38 vote, seeking to constrain the president's authority to take military action against Iran without explicit congressional authorization. The resolution, co-sponsored by senators from both parties, reflects growing war fatigue on Capitol Hill and a recognition that the American public has little appetite for another Middle Eastern conflict. The House is expected to take up a companion measure within weeks.</p>

<p>These two constraints — external and internal — have effectively boxed in the military option. The Pentagon's own war-gaming concluded that a limited strike campaign against Iranian naval facilities would likely trigger retaliatory attacks on Gulf oil infrastructure, potentially taking an additional 5-8 million barrels per day off the global market. With oil already above $110 per barrel, such an escalation would push prices into territory that economists warn could trigger a global recession.</p>

<p>Instead, the administration has pivoted toward a strategy of "maximum pressure through minimum force" — tightening sanctions enforcement, deploying additional naval assets as a deterrent, and pursuing diplomatic off-ramps through Omani and Qatari intermediaries. Whether this approach can produce results before the economic pain becomes politically unsustainable remains the central question of the crisis.</p>

<p>The irony is that the very constraints limiting military action may also limit diplomatic leverage. Iran's leadership calculates that time is on their side — every day the strait remains restricted, oil revenues flow at elevated prices, and international pressure on the US to negotiate grows. The walls may be closing in on military options, but the diplomatic corridor remains dangerously narrow.</p>`,

  'when-hormuz-stopped-being-an-oil-story': `<p>When the Strait of Hormuz crisis began on February 28, 2026, the world's attention focused predictably on oil. Brent crude was surging, gasoline prices were climbing, and energy analysts dominated the airwaves. But three months in, the Hormuz crisis has evolved into something far more complex — a supply chain disruption that reaches into agriculture, manufacturing, and food security in ways that the initial "oil story" framing completely missed.</p>

<p>Consider urea fertilizer. The Middle East produces roughly one-third of the world's urea, with major export facilities in Saudi Arabia, Qatar, and Oman. Much of this production transits through the Strait of Hormuz before reaching farmers in India, Bangladesh, Brazil, and across Sub-Saharan Africa. Since the crisis began, urea prices have surged 35% — a staggering increase that will take months to fully feed through into food prices. India, the world's largest urea importer, has been forced to draw down strategic reserves and implement rationing for the first time in a decade.</p>

<p>The fertilizer crisis is just the most visible non-oil impact. Petrochemical supply chains — from plastics precursors to industrial solvents — have been similarly disrupted. European manufacturers report shortages of polyethylene and polypropylene, both of which are produced in massive quantities in the Gulf and shipped through Hormuz. The cost of everyday plastic products, from food packaging to medical supplies, is beginning to reflect this disruption.</p>

<p>Then there's the semiconductor angle. While chips themselves don't transit Hormuz, several critical precursor chemicals used in semiconductor fabrication are produced at Gulf petrochemical complexes. South Korean and Taiwanese chipmakers have begun stockpiling these materials, but supply chain consultants warn that a prolonged disruption could affect production timelines by late 2026.</p>

<p>The food security dimension is perhaps the most alarming. The World Food Programme estimates that the combined impact of higher fertilizer prices, increased shipping costs, and disrupted food aid logistics could push an additional 15-20 million people into food insecurity by the end of 2026. The hardest hit will be countries in East Africa and South Asia that are already struggling with climate-related agricultural challenges.</p>

<p>What makes the Hormuz crisis different from previous energy disruptions is this cascading, interconnected quality. It's not just about oil prices at the pump — it's about the entire petrochemical-derived economy, from the fertilizer that grows food to the plastic that packages it. The crisis has exposed how deeply modern supply chains depend on the free flow of Gulf commodities, and how poorly prepared the world is for their disruption.</p>

<p>The lesson is clear: the next time a major chokepoint is threatened, analysts would do well to look beyond the obvious commodity. The real costs of disruption are always more distributed, more subtle, and more damaging than the headline numbers suggest.</p>`,

  'beijing-summit-trump-xi-hormuz': `<p>The Trump-Xi summit in Beijing this month was officially billed as a broad trade discussion, but behind closed doors, the Strait of Hormuz dominated the agenda. Both leaders recognized that the crisis represents not just a shared economic threat but a strategic opportunity — and their approaches to it reveal much about the evolving US-China relationship.</p>

<p>For Trump, the calculus is straightforward: China is the world's largest oil importer, and roughly 40% of its crude supply transits Hormuz. With Chinese factories slowing and energy costs rising, Beijing has strong incentives to support de-escalation. The administration hoped to leverage this vulnerability to extract Chinese cooperation on broader trade issues, offering to facilitate Chinese access to alternative energy supplies in exchange for concessions on technology transfer and market access.</p>

<p>Xi's position is more nuanced. While China is indeed feeling the economic pain, it also sees the crisis as an opportunity to expand its diplomatic influence in the Gulf. Beijing has positioned itself as a neutral mediator — in contrast to Washington's more confrontational stance — and has used the crisis to deepen energy relationships with both Iran and Saudi Arabia. Chinese oil companies have maintained purchases from Iran through informal channels, effectively accepting Tehran's transit terms while officially supporting freedom of navigation.</p>

<p>The summit produced a joint statement pledging to "work together for the peaceful resolution of the Hormuz crisis" and to "ensure the uninterrupted flow of energy through international waterways." But the concrete commitments were notably thin. China declined to participate in any US-led naval coalition, and the US refused to sanction Iranian oil exports that China continues to purchase.</p>

<p>What emerged instead was a tacit understanding: both powers would pursue de-escalation through their own channels — the US through Gulf allies and European partners, China through its direct relationship with Tehran. Whether this parallel-track approach produces results or simply creates conflicting signals remains to be seen.</p>

<p>The summit also highlighted a deeper shift in the global energy order. For decades, the US has served as the ultimate guarantor of energy security in the Gulf. The Hormuz crisis has revealed the limits of that role — and the growing willingness of other powers, particularly China, to assert their own interests in the region. The Beijing summit may be remembered not for what it resolved, but for what it revealed about the new multipolar reality of energy security.</p>`,

  'insurance-markets-hormuz-shock': `<p>The marine insurance industry has entered uncharted territory. War risk premiums for vessels transiting the Strait of Hormuz have increased from a pre-crisis baseline of approximately 0.15% of hull value to over 2.4% — a 16-fold increase that has fundamentally altered the economics of Gulf shipping. For a VLCC valued at $100 million, a single transit now costs approximately $2.4 million in war risk insurance alone, compared to just $150,000 under normal conditions.</p>

<p>The premium spike reflects genuine uncertainty about the risk environment. Unlike previous disruptions — the 1980s Tanker War, the 2019 Gulf tensions — the current crisis involves an active closure of the waterway by a state actor with significant military capabilities. Insurers are pricing not just for the risk of incidental damage but for the possibility of deliberate targeting, seizure, or detention of vessels by Iranian forces.</p>

<p>London market underwriters, who dominate the marine war risk business, have responded by restricting coverage. Several syndicates at Lloyd's have withdrawn entirely from writing Hormuz transit risks, while those that remain have imposed strict sub-limits and deductible increases. The International Group of P&I Clubs has issued a collective notice excluding Hormuz transits from standard coverage, forcing shipowners to purchase standalone war risk policies.</p>

<p>The insurance withdrawal has created a self-reinforcing cycle. Fewer insured vessels are willing to transit the strait, which increases the perceived risk for those that do, which drives premiums even higher. This dynamic has effectively priced out most commercial shipping from the route, contributing to the dramatic reduction in transits observed since late February.</p>

<p>For shipowners who do choose to transit, the insurance costs represent a significant competitive disadvantage. A vessel paying $2.4 million per transit in war risk insurance needs to charge substantially higher freight rates to cover the cost — but cargo owners are often unwilling to pay these premiums when Cape of Good Hope rerouting, while slower, eliminates the war risk surcharge entirely.</p>`,

  'cape-of-good-hope-bottleneck': `<p>When major shipping lines began rerouting vessels around the Cape of Good Hope in early March, the assumption was that the additional transit time — roughly 16-22 extra days per voyage — would be the primary cost. Three months in, a different problem has emerged: the Cape route itself is becoming a bottleneck, with congestion at key ports, refueling stops, and chokepoints along the way.</p>

<p>South Africa's ports, which handle a significant share of Cape route vessel traffic, were already operating near capacity before the crisis. The sudden influx of hundreds of additional vessels — including massive VLCCs and container ships that normally transit the Suez-Hormuz corridor — has overwhelmed port infrastructure. Waiting times at Cape Town and Durban have doubled, with some vessels reporting 5-7 day delays just to bunker fuel.</p>

<p>The refueling infrastructure along the Cape route is particularly strained. Bunker supply at key stops — Walvis Bay in Namibia, Las Palmas in the Canary Islands, and the South African ports — has struggled to keep up with demand. Bunker prices at these locations have surged 40-60% above pre-crisis levels, reflecting both increased demand and the higher cost of delivering fuel to these relatively remote locations.</p>

<p>The container shipping bottleneck is even more severe. Container vessels rerouting around the Cape require additional port calls for crew changes, supplies, and container handling. But many African and Latin American ports along the route lack the crane capacity and berth depth to handle the largest container ships now being diverted through these waters. The result is a growing queue of vessels waiting for limited berthing slots.</p>

<p>Perhaps most concerning is the safety dimension. The Cape route takes vessels through some of the world's most treacherous waters, particularly during the Southern Hemisphere winter when storms are frequent. The increased traffic volume, combined with time pressure from charterers, raises the risk of maritime accidents. Classification societies have issued advisories urging operators to maintain safety standards despite the commercial pressure to minimize delays.</p>

<p>The Cape bottleneck underscores a fundamental reality of the Hormuz crisis: there is no easy substitute. The global shipping system was built around the assumption that the Suez Canal and Strait of Hormuz would remain open. Removing these critical nodes doesn't just add distance — it creates cascading failures throughout the entire logistics network, from port congestion to crew scheduling to fuel supply chains.</p>`,

  'lng-crisis-asia-energy': `<p>Asia's LNG importers are facing their most severe supply crisis since the industry's inception. With Qatar's LNG exports severely curtailed by the Hormuz closure and Iranian attacks on the Ras Laffan complex, the world's second-largest LNG producer has effectively withdrawn from spot markets. The impact on Asian importers — who depend on Qatari LNG for 30-40% of their supply — has been immediate and devastating.</p>

<p>Japan, which relies on LNG for approximately 35% of its electricity generation, has been hit hardest. The country's utilities have been forced to switch to more expensive coal and fuel oil generation, driving electricity prices in Tokyo up 25% since the crisis began. The government has drawn down strategic LNG reserves and is actively seeking alternative supplies from the US, Australia, and Mozambique, but the limited availability of spot cargoes and the infrastructure constraints of alternative receiving terminals limit how quickly these sources can scale.</p>

<p>South Korea faces a similar crisis. The country's LNG import bill has ballooned as it competes with Japan and China for limited spot cargoes, with Korean LNG prices hitting record premiums over European benchmarks. The Korea Gas Corporation (KOGAS) has invoked force majeure clauses on several long-term supply contracts, citing the inability to take delivery of Qatari cargoes.</p>

<p>China's position is more nuanced. While it imports significant LNG volumes through Hormuz, Beijing has maintained access to Iranian gas through informal channels and has overland pipeline connections to Central Asian and Russian supply. However, even China cannot fully compensate for the loss of Qatari volumes, and the disruption has contributed to power shortages in southern provinces that rely heavily on gas-fired generation.</p>

<p>The prospect of a "winter without gas" — while still months away — is already shaping energy policy across the region. Japan and South Korea have announced accelerated renewable energy programs and restarted nuclear power plants that had been idled since Fukushima. India has implemented dramatic fuel conservation measures, with Prime Minister Modi publicly shrinking his own security convoy as a signal of national energy sacrifice.</p>

<p>The first LNG shipment to successfully exit the Strait of Hormuz under Iran's new transit procedures reached India on May 23, providing limited but symbolically important relief. However, industry analysts estimate that even with the new procedures, LNG throughput will remain at less than 20% of pre-crisis levels — far too little to avert a supply crisis if the situation persists through the summer.</p>`,

  'iran-safe-transit-procedures': `<p>On May 6, Iran's Islamic Revolutionary Guard Corps (IRGC) published a set of "Safe Transit Procedures" for commercial vessels seeking to transit the Strait of Hormuz. The procedures, announced through Iranian state media and subsequently communicated to shipping companies via maritime security channels, represent Tehran's attempt to establish a framework for limited commercial traffic through the strait under Iranian terms.</p>

<p>The procedures require vessels to submit transit requests 72 hours in advance, providing full cargo manifests, crew lists, and destination details. Vessels must accept an IRGC naval escort through the strait's traffic separation scheme, during which time Iranian forces may board the vessel for inspection. Transit fees — described as "navigation services charges" — are levied at a rate of approximately $50,000 per transit for tankers and $25,000 for container vessels, payable through designated Iranian financial channels.</p>

<p>The procedures also include several provisions that have raised serious concerns among shipping companies and their insurers. Vessels transiting under the new rules must agree to Iranian jurisdiction for any disputes arising during transit, effectively waiving the right to seek remedies through international arbitration. The procedures also reserve the right for Iranian forces to redirect or detain vessels that are deemed to pose a "security risk," a determination made solely by the IRGC.</p>

<p>Major shipping lines have largely rejected the procedures. Maersk, MSC, CMA CGM, and Hapag-Lloyd all issued statements confirming they would not transit under the new rules, citing concerns about crew safety, legal liability, and the precedent of accepting Iranian authority over an international waterway. The International Chamber of Shipping has advised its members that compliance with the procedures could invalidate standard marine insurance policies.</p>

<p>However, a small number of vessels have successfully transited under the new procedures — primarily LNG carriers and crude oil tankers chartered by companies willing to accept the risks. The first successful transit, a Qatari LNG carrier bound for India, completed the passage on May 23 after a 14-hour escorted transit. At least three additional LNG carriers and two crude oil tankers have since followed.</p>

<p>The safe transit procedures represent a calculated move by Iran to normalize its control over the strait while maintaining plausible deniability regarding a "blockade." By offering a path for commercial traffic — however conditional — Tehran can argue that the waterway remains technically open, while effectively imposing its authority over all transits. Whether this strategy will be accepted by the international community remains deeply uncertain.</p>`,

  'project-freedom-naval-escort': `<p>On April 1, 2026, the Pentagon announced Operation Project Freedom — a plan to escort commercial vessels through the Strait of Hormuz using US Navy warships. The operation, involving destroyers and cruisers from the Fifth Fleet, was intended to demonstrate American resolve and provide a protective umbrella for merchant shipping. It lasted exactly one day.</p>

<p>The concept was straightforward: US Navy vessels would escort convoys of merchant ships through the strait's traffic separation scheme, providing a deterrent against Iranian interference. The escort vessels would maintain a defensive posture, with rules of engagement allowing them to respond to hostile actions but not to initiate engagement.</p>

<p>Within hours of the first convoy entering the strait, it became clear that the risks were far greater than anticipated. IRGC naval forces deployed dozens of fast attack craft around the convoy, maintaining close proximity and conducting what the Pentagon described as "unsafe and unprofessional" maneuvers. At least three Iranian vessels crossed directly in front of US warships, and IRGC coastal missile batteries were observed actively tracking the convoy with fire control radar.</p>

<p>The decisive moment came when an IRGC commander issued a radio warning that any vessel transiting without authorization under the "Safe Transit Procedures" would be subject to "necessary measures." Pentagon officials interpreted this as a direct threat of military engagement, and the convoy was ordered to reverse course and exit the strait.</p>

<p>The decision to pause the operation was made at the highest levels of the administration, after consultations with the National Security Council and the Joint Chiefs of Staff. The assessment was stark: continuing the escort mission risked a direct military confrontation with Iranian forces in an extremely confined waterway, where the US Navy's technological advantages would be significantly diminished. A single missile strike on a US warship or a merchant vessel under escort could trigger a wider conflict with unpredictable consequences.</p>

<p>The pause has effectively become indefinite. Pentagon planners have explored alternative escort concepts — including air cover from carrier-based aircraft and the use of unmanned surface vessels as escorts — but none have been deemed sufficiently low-risk to implement. The failure of Operation Project Freedom has underscored the fundamental challenge of the Hormuz crisis: in a narrow waterway controlled by a determined adversary, even the world's most powerful navy has limited options.</p>`,

  'dual-blockade-economics': `<p>The Strait of Hormuz crisis has produced an economic scenario that few analysts anticipated: a dual blockade. Iran restricts access to the strait, while the United States has imposed a naval quarantine on Iranian ports. The result is a mutually reinforcing economic stranglehold that has cascading effects far beyond the immediate participants.</p>

<p>Iran's calculus in restricting the strait was predicated on the belief that the resulting oil price spike would hurt Western economies more than it would hurt Iran. At oil prices above $110 per barrel, Iran's reduced export volumes are more than compensated by higher per-barrel revenues. Even with US sanctions restricting Iran's access to international banking, Tehran has found ways to monetize its oil — primarily through Chinese and Indian buyers willing to circumvent sanctions.</p>

<p>The US naval quarantine, announced in mid-March, was intended to cut off Iran's remaining export channels and force a reversal. In practice, it has had limited success. Iranian oil continues to reach market through ship-to-ship transfers in the Gulf of Oman, through Iraq's Basra terminal (where Iranian crude is blended with Iraqi), and through overland routes to Pakistan and Turkey. The quarantine has reduced Iranian exports by an estimated 30-40%, but the remaining 60-70% continues to generate significant revenue at elevated prices.</p>

<p>The dual blockade has created perverse economic incentives for both sides. Every day the crisis persists, Iran earns more from higher oil prices while the global economy absorbs the cost. The US, meanwhile, spends billions maintaining its naval presence in the Gulf while American consumers pay record gasoline prices. The economic logic of the blockade favors patience for Iran and urgency for the West — a dynamic that makes negotiated resolution more difficult.</p>

<p>The global economic impact has been severe. The International Monetary Fund estimates that the crisis has reduced global GDP growth by 0.8-1.2 percentage points in 2026, with the heaviest impact on emerging economies that are both oil importers and lack strategic reserves. India's current account deficit has widened dramatically, and several African nations face balance-of-payments crises as energy import bills consume an ever-larger share of foreign exchange reserves.</p>

<p>The most concerning aspect of the dual blockade is its self-reinforcing nature. Neither side can easily de-escalate without appearing to concede. Iran fears that easing transit restrictions without sanctions relief would be seen as weakness, while the US fears that lifting the quarantine without a strait reopening would reward Iranian aggression. This strategic trap is the defining feature of the crisis — and the reason it has persisted for three months with no resolution in sight.</p>`,

  'fertilizer-crisis-hormuz': `<p>While the world's attention has focused on oil prices and shipping lanes, a quieter crisis has been building in the agricultural sector. Urea fertilizer prices have surged 35% in a single month as the Hormuz disruption chokes off Middle Eastern exports, threatening food production across South Asia and Africa at a critical point in the planting season.</p>

<p>The Middle East is the world's most important source of urea fertilizer, with Saudi Arabia, Qatar, and Oman collectively producing approximately one-third of global exports. These countries leverage their abundant natural gas — the primary feedstock for urea production — to manufacture fertilizer at costs significantly below those of producers in other regions. Much of this production is loaded onto vessels at Gulf ports and shipped through the Strait of Hormuz to reach markets in Asia, Africa, and Latin America.</p>

<p>The Hormuz closure has disrupted this supply chain at the worst possible time. Spring is the primary planting season in the Northern Hemisphere, and farmers in India, Bangladesh, Pakistan, and across Sub-Saharan Africa depend on timely fertilizer deliveries to maintain crop yields. The 35% price increase has already forced some smallholder farmers to reduce fertilizer application rates, which agricultural scientists warn could reduce yields by 10-20% for affected crops.</p>

<p>India, the world's largest urea importer, has been particularly hard hit. The government has drawn down strategic reserves to approximately 40% of capacity and has implemented rationing for the first time in a decade. Indian fertilizer companies have sought alternative supplies from Russia, Nigeria, and the United States, but available volumes are limited and prices are significantly higher than pre-crisis Gulf sources.</p>

<p>The food security implications extend well beyond India. The World Food Programme estimates that the combined impact of higher fertilizer prices, increased shipping costs, and disrupted logistics could push an additional 15-20 million people into food insecurity by the end of 2026. Sub-Saharan African nations, which import roughly 60% of their fertilizer from the Middle East, are especially vulnerable.</p>

<p>Some analysts have drawn parallels to the 2008 food price crisis, when fertilizer shortages contributed to food riots in dozens of countries. The difference this time is that the disruption originates from a single chokepoint rather than a broad commodity boom, which means the solution is equally concentrated: reopen the Strait of Hormuz, and fertilizer supplies can normalize relatively quickly. But until that happens, the world's most vulnerable populations are paying the price — not at the gas pump, but at the dinner table.</p>`,

  'saudi-pipeline-capacity': `<p>Saudi Arabia's East-West Pipeline, also known as the Petroline, is often cited as the primary bypass option for oil that would normally transit the Strait of Hormuz. With a nameplate capacity of 5 million barrels per day, it theoretically represents a significant alternative route — moving crude from the eastern Saudi oil fields to the Red Sea port of Yanbu, where tankers can load without entering the Gulf. But the reality, as with most infrastructure questions, is more complicated than the headline number suggests.</p>

<p>The pipeline was built in the 1980s, during the Iran-Iraq War, specifically as a Hormuz bypass. At the time, it operated at or near its full 5 million barrel per day capacity. But as the Tanker War subsided and Gulf shipping normalized, Saudi Aramco found more profitable uses for some of the pipeline's capacity. Portions were repurposed to transport natural gas liquids (NGLs) to the Red Sea for export, reducing the effective crude oil throughput to an estimated 2.5-3.5 million barrels per day.</p>

<p>When the Hormuz crisis began in February 2026, Saudi Aramco immediately began the process of restoring full crude oil capacity. But reversing years of infrastructure adaptation is not simple. The NGL separation and handling equipment installed along the pipeline route must be bypassed or removed. Pump stations need to be reconfigured. Storage tanks at Yanbu must be prepared for higher crude throughput. Industry estimates suggest that full restoration to 5 million barrels per day would take 6-8 weeks under optimal conditions.</p>

<p>In the meantime, Saudi Aramco has ramped up throughput to approximately 3.5 million barrels per day — the maximum achievable without major reconfiguration. This represents roughly 20% of the pre-crisis Hormuz transit volume, a significant contribution but far from a full replacement. The remainder of Saudi exports must either wait for pipeline capacity or attempt the hazardous transit through the strait.</p>

<p>The UAE's ADCOP pipeline, running from Habshan to Fujairah, adds another 1.5 million barrels per day of bypass capacity, though it has experienced intermittent disruptions from regional missile strikes on the Fujairah loading terminal. Combined, the two pipelines can handle roughly 5 million barrels per day — still only about 28% of the strait's normal throughput of 17-18 million barrels per day.</p>

<p>The pipeline capacity question illustrates a broader truth about energy infrastructure: it takes years to build and months to adapt, but it can be rendered useless in hours by a security threat. The East-West Pipeline is a vital lifeline, but it cannot substitute for the Strait of Hormuz. No combination of existing infrastructure can — which is precisely why the waterway remains the world's most important chokepoint, and why its closure has had such devastating economic consequences.`
};
