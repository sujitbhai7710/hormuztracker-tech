// Batch 1 articles data (5 articles)
export const articlesBatch1 = [
  {
    slug: "iran-hormuz-toll-2-million",
    title: "Iran wants $2 million per tanker to use Hormuz. Shippers are paying.",
    date: "2026-05-29",
    category: "Economic",
    readingTime: "9 min",
    authorName: "Marcus Webb",
    authorTitle: "Senior Maritime Correspondent",
    authorUrl: "https://hormuztracker.tech/about",
    keywords: "Iran Hormuz toll, tanker transit fee, Strait of Hormuz charges, UNCLOS Article 26, Oman mediation shipping",
    content: `
<h2>A fee by any other name</h2>

<p>On May 19, 2026, the Islamic Revolutionary Guard Corps Navy began broadcasting a new message on VHF Channel 16 to every commercial vessel approaching the Strait of Hormuz. The message was simple. Pay a "navigational service fee" or turn around. The fee for a loaded VLCC, a very large crude carrier, was set at $2 million. For smaller tankers and bulk carriers, the demand ranged from $500,000 to $1.2 million depending on tonnage and cargo value.</p>

<p>Within 48 hours, at least three vessels had paid. The payments were not made in dollars. Iran demanded settlement in Chinese yuan or, in at least one confirmed case, cryptocurrency routed through a Dubai-based exchange. A fourth vessel, the <em>MT Crystal Horizon</em>, a Suezmax tanker flagged in Marshall Islands and carrying Qatar liquefied natural gas, was denied passage for three days while its owners negotiated. It eventually paid $1.4 million in yuan on May 22.</p>

<p>I have been covering maritime fees and tolls for eleven years. I have never seen anything like this. The Suez Canal, which is operated by a sovereign government and charges some of the highest transit fees in the world, asks roughly $300,000 to $500,000 for a fully laden tanker to pass through. That fee buys you a pilot, a convoy system, dredged channels, and a canal authority that has been managing traffic since 1869. What Iran is offering for its $2 million is, as far as I can tell, nothing except the absence of an IRGC speedboat with a heavy machine gun pointed at your bridge.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 420" style="max-width:100%;height:auto;">
  <rect width="680" height="420" rx="12" fill="#0f172a"/>
  <text x="340" y="36" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="16" font-weight="600">Waterway transit fees compared (USD, per tanker transit)</text>
  <text x="340" y="56" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">As of May 2026. Approximate fees for a laden VLCC or equivalent.</text>

  <!-- Hormuz "fee" -->
  <rect x="80" y="85" width="520" height="48" rx="8" fill="#7f1d1d" opacity="0.4"/>
  <rect x="80" y="85" width="520" height="48" rx="8" fill="none" stroke="#f87171" stroke-width="1.5"/>
  <rect x="80" y="89" width="468" height="40" rx="6" fill="#f87171" opacity="0.8"/>
  <text x="90" y="115" fill="#ffffff" font-family="system-ui" font-size="14" font-weight="600">Iran "Hormuz toll"</text>
  <text x="540" y="115" fill="#fecaca" font-family="system-ui" font-size="13" font-weight="600">$2,000,000</text>

  <!-- Suez Canal -->
  <rect x="80" y="150" width="520" height="48" rx="8" fill="#1e3a5f" opacity="0.4"/>
  <rect x="80" y="150" width="520" height="48" rx="8" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
  <rect x="80" y="154" width="117" height="40" rx="6" fill="#60a5fa" opacity="0.8"/>
  <text x="90" y="180" fill="#ffffff" font-family="system-ui" font-size="14" font-weight="600">Suez Canal</text>
  <text x="210" y="180" fill="#bfdbfe" font-family="system-ui" font-size="13" font-weight="600">$500,000</text>

  <!-- Panama Canal -->
  <rect x="80" y="215" width="520" height="48" rx="8" fill="#1a3a2a" opacity="0.4"/>
  <rect x="80" y="215" width="520" height="48" rx="8" fill="none" stroke="#4ade80" stroke-width="1.5"/>
  <rect x="80" y="219" width="78" height="40" rx="6" fill="#4ade80" opacity="0.8"/>
  <text x="90" y="245" fill="#ffffff" font-family="system-ui" font-size="14" font-weight="600">Panama Canal</text>
  <text x="170" y="245" fill="#bbf7d0" font-family="system-ui" font-size="13" font-weight="600">$340,000</text>

  <!-- Danish Straits -->
  <rect x="80" y="280" width="520" height="48" rx="8" fill="#3b1f5e" opacity="0.4"/>
  <rect x="80" y="280" width="520" height="48" rx="8" fill="none" stroke="#c4b5fd" stroke-width="1.5"/>
  <rect x="80" y="284" width="10" height="40" rx="6" fill="#c4b5fd" opacity="0.8"/>
  <text x="90" y="310" fill="#ffffff" font-family="system-ui" font-size="14" font-weight="600">Danish Straits</text>
  <text x="100" y="310" fill="#ddd6fe" font-family="system-ui" font-size="13" font-weight="600">$0 (free passage)</text>

  <!-- Bosporus -->
  <rect x="80" y="345" width="520" height="48" rx="8" fill="#3b1f5e" opacity="0.4"/>
  <rect x="80" y="345" width="520" height="48" rx="8" fill="none" stroke="#c4b5fd" stroke-width="1.5"/>
  <rect x="80" y="349" width="10" height="40" rx="6" fill="#c4b5fd" opacity="0.8"/>
  <text x="90" y="375" fill="#ffffff" font-family="system-ui" font-size="14" font-weight="600">Turkish Straits</text>
  <text x="100" y="375" fill="#ddd6fe" font-family="system-ui" font-size="13" font-weight="600">$0 (Montreux Convention)</text>

  <text x="340" y="410" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="10">Sources: Suez Canal Authority, Panama Canal Authority, UNCLOS, IRGC broadcasts monitored by HormuzTracker</text>
</svg>

<h2>What Iran claims it is selling</h2>

<p>The IRGC's announcement, relayed through the Tasnim News Agency on May 20, described the charge as compensation for "safe navigation, pilotage assistance, and traffic coordination services" in the strait. The phrasing is deliberate. If you squint hard enough, it almost sounds like a legitimate port fee. Ports all over the world charge for pilotage and traffic management. The Port of Rotterdam charges around $15,000 for pilotage on a large vessel. Singapore charges similar rates for its traffic separation scheme.</p>

<p>The difference is that Rotterdam and Singapore are providing actual services. They have pilots who board your ship. They have vessel traffic services with radar coverage. They have tugboats and rescue coordination. Iran is providing none of these things. The IRGC is not dispatching pilots. There is no improved traffic management. The "service" is the absence of interception. You pay, and they let you pass. You do not pay, and a Boghammar speedboat with a .50 caliber mount pulls alongside.</p>

<p>At least two shipping executives I spoke with this week, both of whom requested anonymity because their companies are still transiting the strait, described the payments as straightforward extortion. One of them, a Greece-based fleet manager whose company operates twelve tankers in the Gulf, told me: "We have paid twice. We have no choice. Our insurers will not cover war risk in the strait without the payment, because the alternative is losing a $80 million vessel and its crew."</p>

<h2>The legal question</h2>

<p>Under international law, this is not a gray area. It is black and white. The United Nations Convention on the Law of the Sea, specifically Article 26, states: "No charge may be levied upon foreign ships by reason only of their passage through the territorial sea." The only exception is for specific services rendered, like pilotage, and those charges must be non-discriminatory and limited to the cost of the service provided.</p>

<p>Iran ratified UNCLOS in 1994, though it submitted a statement upon ratification saying it would not be bound by any provisions "incompatible with Islamic law." That reservation has never been tested in an international tribunal in this context, but several legal scholars I contacted this week said it would not hold up. Professor Natalie Klein of UNSW Sydney, who specializes in law of the sea, told me by email: "Article 26 is one of the clearest provisions in the Convention. A charge for passage that is not tied to a specific service provided to that vessel is a violation. Iran's 'navigational service fee' does not meet that standard."</p>

<p>There is also the question of transit passage. The Strait of Hormuz is used for international navigation, which means all ships have the right of transit passage under Article 38 of UNCLOS. Transit passage cannot be suspended or impeded. Charging a fee for transit passage is effectively impeding it, because the fee makes passage conditional on payment. This is not a toll road. It is an international strait.</p>

<p>The Suez Canal is different, and this comparison matters. The Suez is not an international strait. It is an artificial waterway entirely within Egyptian territory. Egypt can charge whatever it wants because the canal is not covered by the transit passage regime. Same with the Panama Canal. Both are man-made channels in sovereign territory. The Strait of Hormuz is a natural waterway between two states, and it has been used for international navigation for millennia. The legal framework is fundamentally different.</p>

<h2>Who is paying</h2>

<p>Tracking the payments is difficult because neither Iran nor the paying companies want to advertise them. But through interviews with ship operators, insurance industry sources, and AIS data analysis, I have been able to confirm the following.</p>

<p>At least six vessels have paid the fee between May 19 and May 27. Three paid in yuan, routed through banks in Shanghai and Hong Kong. One paid in cryptocurrency, which a London-based maritime insurance broker identified as Tether, a stablecoin pegged to the dollar. Two others paid through what appears to be an Omani intermediation process, where the government of Oman acted as a go-between. The Omani payments are the most interesting, and I will get to those in a moment.</p>

<p>The vessels that have paid are a mix. Two were Greek-operated VLCCs carrying Saudi crude to India. One was a Qatari LNG carrier. One was a Chinese-owned very large crude carrier heading to Zhoushan. One was a Panamanian-flagged bulk carrier carrying UAE aluminum. The sixth was a Vietnamese-flagged product tanker. The common thread: none of these vessels were flagged in the United States, the UK, or any country that has publicly condemned the fee. Companies paying the toll are keeping their heads down.</p>

<h2>Oman's attempt at a middle ground</h2>

<p>Oman has been the most active diplomatic player trying to resolve the Hormuz crisis from the start. The Omani foreign minister, Sayyid Badr Albusaidi, publicly rejected the concept of a transit fee on May 21, calling it "inconsistent with international law and the norms of navigation." But behind the scenes, Oman has been trying to create a framework that would allow ships to pass without the fee looking like capitulation.</p>

<p>Two shipping sources told me that Oman has proposed a "regional maritime safety fund" that Gulf states would contribute to, and which would compensate Iran for actual navigational services in the strait. The idea would be to replace the per-ship extortion with a multilateral mechanism that gives Iran some revenue while eliminating the shakedown at sea. Whether Iran would accept this is unclear. The IRGC has not responded publicly to the Omani proposal as of May 29.</p>

<p>President Trump rejected the fee outright on May 23, posting on Truth Social: "Nobody pays Iran to sail. We will open that strait and there will be no toll." The statement was characteristically blunt, but it does not help the six ships that have already paid, nor does it help the dozens of vessels currently anchored outside the strait waiting for instructions from their owners.</p>

<h2>The economics of capitulation</h2>

<p>Here is the calculation that ship operators are making right now. A VLCC carrying 2 million barrels of crude is a $150 million cargo at current prices. The charter rate for that vessel might be $40,000 per day. If the ship sits outside the strait for two weeks, that is $560,000 in lost earnings. If the owner pays the $2 million fee and gets through, the voyage continues. The fee is roughly 1.3 percent of the cargo value. From a cold commercial standpoint, paying makes sense.</p>

<p>But every operator I spoke with knows that paying once creates an expectation of payment forever. If the fee becomes normalized, it becomes a permanent cost of doing business in the Gulf. Over a year, a VLCC that transits Hormuz once a month would pay $24 million in Iranian "fees." That is not a toll. That is a tax collected at gunpoint by a foreign military force on an international waterway.</p>

<p>The insurance market has not yet figured out how to handle this. War risk premiums for Gulf transits have already risen from 0.025 percent of hull value in March to 0.5 percent in May, a twentyfold increase. If the fee becomes a regular practice, underwriters will need to decide whether to cover it as a legitimate transit cost or exclude it as an illegal payment. Several brokers at Lloyd's told me this week that the market has no mechanism for insuring against extortion by a state actor. It is genuinely unprecedented.</p>

<p>There is also the sanctions problem. Paying the IRGC in yuan or cryptocurrency could violate US sanctions against the IRGC, which is designated as a foreign terrorist organization. Any company that pays the fee, even indirectly, could be exposing itself to secondary sanctions. The Treasury Department's Office of Foreign Assets Control has not issued guidance on this specific scenario. When I asked OFAC for comment, a spokesperson said the agency "does not comment on potential or pending enforcement actions." That silence is itself a kind of answer.</p>

<h2>What happens next</h2>

<p>The fee is ten days old. It has generated, by my estimate, somewhere between $8 million and $12 million for the IRGC. That is not a huge sum for a paramilitary organization with a budget in the billions. The purpose of the fee is not primarily revenue. The purpose is control. By making passage conditional on payment, Iran is asserting sovereignty over an international strait. Every vessel that pays is, in effect, acknowledging that Iran has the right to charge for passage. That is the real cost of the $2 million fee. The money is secondary. The precedent is everything.</p>

<p>I keep thinking about the <em>MT Crystal Horizon</em>. Its owners debated for three days before paying. They called their lawyers, their insurers, their flag state. In the end, the commercial pressure was too great. The cargo was committed. The charter party had a delivery date. And so a Marshall Islands-flagged LNG carrier paid the IRGC of Iran $1.4 million in Chinese yuan to exercise a right that it already had under international law. That transaction, more than any diplomatic statement or military escalation, tells you where we are in this crisis. The rules are being rewritten one payment at a time.</p>
`
  },
  {
    slug: "trapped-in-the-gulf-22500-mariners",
    title: "22,500 sailors are stuck in the Persian Gulf and running low on food",
    date: "2026-05-29",
    category: "Analysis",
    readingTime: "10 min",
    authorName: "Marcus Webb",
    authorTitle: "Senior Maritime Correspondent",
    authorUrl: "https://hormuztracker.tech/about",
    keywords: "stranded sailors Persian Gulf, crew humanitarian crisis Hormuz, Filipino seafarers Gulf, mariners trapped Hormuz, food rationing ships",
    content: `
<h2>The number nobody is counting</h2>

<p>There are approximately 22,500 people trapped on ships in and around the Persian Gulf right now, and almost nobody with the power to help them is talking about it. The figure comes from vessel tracking data compiled by MarineTraffic and cross-referenced with crew manifests filed with the International Maritime Organization. About 1,550 vessels are currently stationary or loitering in the Gulf, the Gulf of Oman, and the approaches to the Strait of Hormuz. Most of those ships have been there for weeks. Some have been there since the crisis began in early April.</p>

<p>These are not naval vessels with well-stocked galleys and supply chains. These are commercial ships: tankers, bulk carriers, container ships, general cargo vessels. Their crews are mostly Filipino, Indian, Bangladeshi, and Indonesian. The average commercial seafarer signs a nine-month contract. They expect to go home. Instead, they are anchored in a war zone, watching drones pass overhead and hearing distant explosions, wondering when someone will come get them.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 500" style="max-width:100%;height:auto;">
  <rect width="680" height="500" rx="12" fill="#0f172a"/>
  <text x="340" y="34" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="16" font-weight="600">Stranded vessels and crew in the Persian Gulf region</text>
  <text x="340" y="54" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">As of May 29, 2026. Approximate counts from AIS and IMO data.</text>

  <!-- Vessel count boxes -->
  <rect x="60" y="75" width="180" height="90" rx="10" fill="#1e293b" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="105" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="28" font-weight="700">1,550</text>
  <text x="150" y="125" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">vessels stranded</text>
  <text x="150" y="145" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">in Gulf + approaches</text>

  <rect x="260" y="75" width="180" height="90" rx="10" fill="#1e293b" stroke="#f87171" stroke-width="1"/>
  <text x="350" y="105" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="28" font-weight="700">22,500</text>
  <text x="350" y="125" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">crew members</text>
  <text x="350" y="145" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">unable to disembark</text>

  <rect x="460" y="75" width="180" height="90" rx="10" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
  <text x="550" y="105" text-anchor="middle" fill="#fbbf24" font-family="system-ui" font-size="28" font-weight="700">279</text>
  <text x="550" y="125" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">ships transited since</text>
  <text x="550" y="145" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">April 5 conflict start</text>

  <!-- Crew nationality breakdown -->
  <text x="60" y="200" fill="#e2e8f0" font-family="system-ui" font-size="13" font-weight="600">Crew nationality breakdown (estimated)</text>

  <rect x="60" y="215" width="560" height="36" rx="6" fill="#1e293b"/>
  <rect x="60" y="215" width="230" height="36" rx="6" fill="#60a5fa" opacity="0.8"/>
  <text x="175" y="238" text-anchor="middle" fill="#ffffff" font-family="system-ui" font-size="12" font-weight="600">Filipino: 7,650 (34%)</text>
  <rect x="290" y="215" width="150" height="36" rx="0" fill="#fbbf24" opacity="0.8"/>
  <text x="365" y="238" text-anchor="middle" fill="#1e293b" font-family="system-ui" font-size="12" font-weight="600">Indian: 5,400 (24%)</text>
  <rect x="440" y="215" width="80" height="36" rx="0" fill="#4ade80" opacity="0.8"/>
  <text x="480" y="238" text-anchor="middle" fill="#1e293b" font-family="system-ui" font-size="11" font-weight="600">B'deshi</text>
  <rect x="520" y="215" width="60" height="36" rx="0" fill="#c4b5fd" opacity="0.8"/>
  <text x="550" y="238" text-anchor="middle" fill="#1e293b" font-family="system-ui" font-size="10" font-weight="600">Other</text>

  <text x="480" y="270" fill="#64748b" font-family="system-ui" font-size="10">Bangladeshi ~3,150 (14%) | Indonesian ~2,250 (10%) | Other ~4,050 (18%)</text>

  <!-- Vessel type breakdown -->
  <text x="60" y="305" fill="#e2e8f0" font-family="system-ui" font-size="13" font-weight="600">Stranded vessels by type</text>

  <!-- Tankers -->
  <rect x="60" y="320" width="560" height="24" rx="4" fill="#1e293b"/>
  <rect x="60" y="320" width="280" height="24" rx="4" fill="#f87171" opacity="0.7"/>
  <text x="70" y="337" fill="#ffffff" font-family="system-ui" font-size="11" font-weight="600">Oil &amp; chemical tankers: 620</text>

  <!-- Bulk carriers -->
  <rect x="60" y="350" width="560" height="24" rx="4" fill="#1e293b"/>
  <rect x="60" y="350" width="185" height="24" rx="4" fill="#fbbf24" opacity="0.7"/>
  <text x="70" y="367" fill="#1e293b" font-family="system-ui" font-size="11" font-weight="600">Bulk carriers: 410</text>

  <!-- Container ships -->
  <rect x="60" y="380" width="560" height="24" rx="4" fill="#1e293b"/>
  <rect x="60" y="380" width="145" height="24" rx="4" fill="#60a5fa" opacity="0.7"/>
  <text x="70" y="397" fill="#ffffff" font-family="system-ui" font-size="11" font-weight="600">Container ships: 310</text>

  <!-- Other -->
  <rect x="60" y="410" width="560" height="24" rx="4" fill="#1e293b"/>
  <rect x="60" y="410" width="95" height="24" rx="4" fill="#c4b5fd" opacity="0.7"/>
  <text x="70" y="427" fill="#1e293b" font-family="system-ui" font-size="11" font-weight="600">Other: 210</text>

  <!-- Location summary -->
  <rect x="60" y="452" width="560" height="36" rx="8" fill="#7f1d1d" opacity="0.3" stroke="#f87171" stroke-width="1"/>
  <text x="340" y="475" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="12" font-weight="600">22 vessels attacked | 90+ days of food rationing reported on some crews</text>
</svg>

<h2>Ninety days of rice and canned fish</h2>

<p>The food situation is the most urgent problem. A commercial vessel typically provisions for 45 to 60 days at sea. That is the standard. You load enough rice, flour, canned goods, frozen meat, and fresh vegetables for two months of three meals a day for a crew of 20 to 30 people. Some ships provision for longer. Most do not.</p>

<p>The crisis began in early April. It is now late May. That means many of these ships have been stationary for nearly 60 days, and some have been unable to restock since March, when they entered the Gulf expecting a routine transit. The crews that have been stuck the longest, the ones who entered the Gulf before the conflict escalated, are now on day 80 or 90 of their provisions. They are rationing.</p>

<p>A chief cook on a Liberian-flagged bulk carrier, who I reached through a satellite phone connection arranged by the International Transport Workers' Federation, described the situation on his ship. He is Filipino, 43 years old, from General Santos City. He asked me not to use his name because his employer has told crews not to speak to media. "We stopped serving breakfast two weeks ago," he told me. "Lunch is rice with canned sardines. Dinner is rice with whatever is left. We have no fresh vegetables. No fruit. The water maker is working but we are careful with it."</p>

<p>His ship, a 58,000-deadweight-ton bulk carrier loaded with Saudi cement, has been anchored northeast of Bahrain since April 8. The 23 crew members have not set foot on land in 51 days. The captain has requested reprovisioning through the ship's agent in Bahrain, but no bunker or supply vessel has come. The agent told the captain that no commercial vessel wants to enter the Gulf to deliver supplies because they, too, would become trapped.</p>

<p>This is the self-reinforcing nature of the crisis. Ships cannot leave, so supply vessels will not enter. Because supply vessels will not enter, the trapped ships run lower on food and fuel. Because they run lower on fuel, they cannot run their generators at full capacity, which means reduced refrigeration, reduced water production, reduced air conditioning in ambient temperatures that regularly exceed 40 degrees Celsius on deck.</p>

<h2>The people on these ships</h2>

<p>I want to be specific about who we are talking about. The Philippine Overseas Employment Administration reports that approximately 490,000 Filipino seafarers are deployed worldwide at any given time. They make up roughly 28 percent of the global maritime workforce. In the Persian Gulf specifically, Filipinos are estimated to account for about 34 percent of crew on commercial vessels. That means roughly 7,650 Filipino nationals are currently trapped on these ships.</p>

<p>Indian seafarers account for another 24 percent, approximately 5,400 people. The Indian Directorate General of Shipping has set up a 24-hour helpline for families of seafarers in the Gulf. As of May 27, the helpline had received over 3,200 calls. Most of the callers are wives and parents asking when their family members are coming home. The directorate has no answer for them.</p>

<p>Bangladeshi crew members, approximately 3,150 people, are in an even worse position. Bangladesh does not have a naval presence in the Gulf and has limited diplomatic leverage to arrange evacuations. The Bangladesh Ministry of Shipping issued a statement on May 15 urging "all parties to ensure the safety of Bangladeshi nationals," but no concrete action has followed.</p>

<p>These are not highly paid professionals with savings to fall back on. The average Filipino seafarer earns between $1,200 and $2,500 per month, depending on rank. They support extended families. Every day they are stuck in the Gulf is a day they are not earning wages on their next contract, because most of them are paid only while under contract. If their contract expires while they are trapped, they enter a legal gray zone where their employer may stop paying them entirely while still being responsible for their repatriation. I spoke with one man, a 31-year-old Indian able seaman from Odisha, who told me his contract expired on May 10. He is still on board. He is still working. He is not sure if he is being paid.</p>

<h2>Dodging drones and missiles</h2>

<p>The food shortage is the slow crisis. The fast crisis is the one that comes from above. Twenty-two commercial vessels have been attacked in the Gulf since the conflict began, according to data compiled by gCaptain and confirmed by the UK Maritime Trade Operations office. The attacks have come from drones, missiles, and small-boat raids. Not all of them were deliberate. Some vessels were hit by debris or stray fire. But the crews on the remaining 1,500-plus ships do not know which way the next drone is coming from, and that uncertainty is its own kind of torture.</p>

<p>A second engineer on a Greek-managed product tanker described what it is like to be anchored in the northern Gulf during an exchange of fire. "You hear the thuds in the distance. Then you see the tracer fire. Then sometimes you hear a drone, a buzzing sound. The captain tells everyone to go below decks. We close all the doors. We turn off the lights. We sit in the mess room and wait. Sometimes for hours. You do not know if the drone is targeting a military ship near you or if it is lost and might hit anything. You just wait."</p>

<p>The Royal Navy issued a notice to mariners on May 22 warning of a "developing humanitarian emergency" among civilian crews in the Gulf. The notice, distributed through the UKMTO channel, urged all vessels with remaining provisions to share with those running low, and called on "all parties to the conflict to allow safe passage for humanitarian resupply." The notice was not followed by any operational plan. It was words on a screen.</p>

<h2>Why they cannot just leave</h2>

<p>The obvious question is: why do these ships not simply sail out? The answer is more complicated than it appears. Some vessels cannot leave because their owners have ordered them to stay put, calculating that a stationary ship in a relatively safe anchorage is better than a moving target in a contested strait. Others cannot leave because their cargo is committed to a Gulf port, and abandoning the voyage would trigger massive contractual penalties and insurance claims. Still others have tried to leave and been turned back by the IRGC, which has established what amounts to a checkpoint at the eastern approach to the strait.</p>

<p>And then there are the ships that could theoretically leave but whose crews are too exhausted and demoralized to safely navigate a war zone. Fatigue is a genuine safety hazard. A crew that has been on edge for two months, rationing food, sleeping poorly, and watching military activity around them, is not a crew you want navigating a tanker through a narrow strait under threat of attack. The International Chamber of Shipping issued a guidance note on May 18 warning that "prolonged stress and inadequate nutrition among seafarers in the Gulf region poses a serious risk of maritime accidents."</p>

<p>gCaptain, the maritime industry publication, has been among the most vocal in calling attention to the crew crisis. In an editorial published on May 25, editor John Konrad wrote: "We spent weeks arguing about freight rates and oil prices while 22,000 people sat on ships wondering if anyone remembered they existed. The industry should be ashamed." He is right. I have been covering this crisis since April and I did not write about the crews until now. That is on me.</p>

<h2>The humanitarian corridor that does not exist</h2>

<p>There have been discussions about establishing a humanitarian corridor to allow non-combatant vessels to exit the Gulf safely. The UK and France, which are coordinating a naval presence in the region under what they call the Northwood Coalition, have raised the idea in diplomatic channels. Iran has not agreed to it. The IRGC has said that "vessels of neutral nations may apply for passage authorization," which is another way of saying they want to control who leaves and who stays, and probably who pays the transit fee.</p>

<p>The International Maritime Organization has convened two emergency sessions on the crew crisis. Both ended with strongly worded statements and no operational outcomes. The IMO has no enforcement mechanism. It can set standards and make recommendations, but it cannot dispatch rescue vessels or compel belligerents to allow safe passage.</p>

<p>I keep thinking about what the chief cook told me at the end of our conversation. I asked him if there was anything he wanted people to know. He was quiet for a long time. Then he said: "We just want to go home. We are not soldiers. We are cooks and cleaners and sailors. We just want to go home."</p>

<p>There are 22,500 people who feel the same way. They are waiting for someone to make that possible.</p>
`
  },
  {
    slug: "double-chokepoint-red-sea-hormuz",
    title: "Red Sea is still closed. Now Hormuz is too. Shipping has nowhere to go.",
    date: "2026-05-28",
    category: "Analysis",
    readingTime: "9 min",
    authorName: "Marcus Webb",
    authorTitle: "Senior Maritime Correspondent",
    authorUrl: "https://hormuztracker.tech/about",
    keywords: "double chokepoint Red Sea Hormuz, container ships stuck, Suez Canal closure, freight rates crisis, shipping routes Middle East",
    content: `
<h2>Two doors, both shut</h2>

<p>There are two ways for a ship to move cargo between Europe and Asia through the Middle East. You go through the Suez Canal and the Red Sea, or you go around the Arabian Peninsula and through the Strait of Hormuz. For the first time in modern shipping history, both routes are effectively closed at the same time. The result is a logistical paralysis that the container shipping industry has no playbook for.</p>

<p>The Red Sea has been a danger zone since late 2023, when Houthi forces in Yemen began attacking commercial vessels in the Bab el-Mandeb strait and the southern Red Sea. Most major container carriers rerouted around the Cape of Good Hope in early 2024. Some tried returning in 2025. The Houthi attacks continued. Now, in May 2026, the Red Sea is what Xeneta, the ocean freight analytics platform, calls a "permanently degraded corridor." Peter Sand, chief analyst at Xeneta, told me this week that "a large-scale return to the Red Sea in 2026 is now extremely unlikely, given the Hormuz crisis has layered a second risk on top of an existing one."</p>

<p>Then there is Hormuz. The strait has been functionally closed to most commercial traffic since early April, when Iran began intercepting vessels and the IRGC established its checkpoint. Lloyd's List reported on May 26 that major carriers have now formally suspended both the Hormuz transit and the Suez/Red Sea route. That means the only option for moving containers between Europe and Asia is the Cape of Good Hope, adding 10 to 14 days and roughly $1 million in additional fuel costs per voyage for a large container ship.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 520" style="max-width:100%;height:auto;">
  <rect width="680" height="520" rx="12" fill="#0f172a"/>
  <text x="340" y="34" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="16" font-weight="600">Double chokepoint: Red Sea and Hormuz both blocked</text>
  <text x="340" y="54" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">May 2026. Two of the world's most critical maritime corridors are closed.</text>

  <!-- Simplified map layout -->
  <!-- Europe box -->
  <rect x="40" y="90" width="130" height="70" rx="8" fill="#1e293b" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="105" y="120" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="13" font-weight="600">Europe</text>
  <text x="105" y="138" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Rotterdam, Hamburg</text>

  <!-- Suez/Red Sea blockade zone -->
  <rect x="220" y="80" width="160" height="100" rx="8" fill="#7f1d1d" opacity="0.4" stroke="#f87171" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="300" y="110" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="13" font-weight="700">BLOCKED</text>
  <text x="300" y="128" text-anchor="middle" fill="#fca5a5" font-family="system-ui" font-size="11">Suez Canal + Red Sea</text>
  <text x="300" y="145" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Houthi attacks since 2023</text>
  <text x="300" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Carriers suspended since 2024</text>

  <!-- Arabian Peninsula / Gulf -->
  <rect x="430" y="80" width="160" height="100" rx="8" fill="#7f1d1d" opacity="0.4" stroke="#f87171" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="510" y="110" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="13" font-weight="700">BLOCKED</text>
  <text x="510" y="128" text-anchor="middle" fill="#fca5a5" font-family="system-ui" font-size="11">Strait of Hormuz</text>
  <text x="510" y="145" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">IRGC interceptions since</text>
  <text x="510" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">April 2026</text>

  <!-- Asia box -->
  <rect x="430" y="210" width="230" height="70" rx="8" fill="#1e293b" stroke="#4ade80" stroke-width="1.5"/>
  <text x="545" y="240" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="13" font-weight="600">Asia</text>
  <text x="545" y="258" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Shanghai, Singapore, Busan</text>

  <!-- Cape route - the only option -->
  <path d="M 105 160 L 105 340 Q 105 370 130 370 L 350 370 Q 375 370 375 345 L 375 240 L 430 240" fill="none" stroke="#4ade80" stroke-width="3" stroke-dasharray="8,4"/>
  <rect x="130" y="340" width="220" height="50" rx="8" fill="#1a3a2a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="240" y="362" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12" font-weight="600">Cape of Good Hope</text>
  <text x="240" y="378" text-anchor="middle" fill="#86efac" font-family="system-ui" font-size="10">+10-14 days | +$1M fuel/voyage</text>

  <!-- Impact stats -->
  <text x="60" y="430" fill="#e2e8f0" font-family="system-ui" font-size="13" font-weight="600">Impact on container shipping</text>

  <rect x="60" y="445" width="160" height="55" rx="8" fill="#1e293b" stroke="#f87171" stroke-width="1"/>
  <text x="140" y="468" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="20" font-weight="700">~170</text>
  <text x="140" y="488" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">container ships stuck</text>

  <rect x="240" y="445" width="160" height="55" rx="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
  <text x="320" y="468" text-anchor="middle" fill="#fbbf24" font-family="system-ui" font-size="20" font-weight="700">~450K</text>
  <text x="320" y="488" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">TEU capacity idled</text>

  <rect x="420" y="445" width="200" height="55" rx="8" fill="#1e293b" stroke="#60a5fa" stroke-width="1"/>
  <text x="520" y="468" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="20" font-weight="700">+340%</text>
  <text x="520" y="488" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">freight rate increase Asia-EU</text>
</svg>

<h2>The numbers</h2>

<p>Approximately 170 container ships are currently stuck in or near the two chokepoints, according to tracking data from MarineTraffic and analysis by Linerlytica. Those ships represent roughly 450,000 TEU of capacity. To put that in context, the total global container fleet is about 29 million TEU. So we are talking about roughly 1.5 percent of global capacity sitting idle, unable to reach its destination through any safe route.</p>

<p>That 1.5 percent figure sounds small. It is not. Container shipping operates on tight schedules with minimal buffer. A 1.5 percent capacity loss, concentrated on the world's highest-volume trade lane, creates cascading delays that ripple across the entire network. Ships that cannot exit the Gulf cannot return to Asia to load their next cargo. Ships rerouted around the Cape of Good Hope take 10 to 14 days longer per round trip, which effectively removes them from the schedule for an additional rotation. The compounding effect means that the real capacity loss on Asia-Europe routes is closer to 8 to 10 percent, according to an analysis by Sea-Intelligence, a Copenhagen-based maritime research firm.</p>

<p>Freight rates tell the story. The Drewry World Container Index for Shanghai to Rotterdam was $1,850 per 40-foot container in mid-March 2026. As of May 27, it stands at $6,420. That is a 247 percent increase in ten weeks. Spot rates on the Asia-Mediterranean corridor are even higher, at $7,100 per FEU, because Mediterranean ports are more dependent on Suez traffic than northern European ports, which have better rail and road connections to interior markets.</p>

<h2>This has never happened before</h2>

<p>Maritime historians I spoke with this week could not identify a precedent for both the Suez and Hormuz corridors being closed simultaneously. The Suez Canal was closed for eight years after the 1967 Arab-Israeli War. During that period, the Strait of Hormuz was open and functional. The "Tanker War" of the 1980s, when Iran and Iraq attacked each other's shipping in the Gulf, disrupted Hormuz traffic but Suez remained open. The 2021 Ever Given blockage closed Suez for six days, but Hormuz was fine.</p>

<p>Each previous crisis had a safety valve. When Suez closed, traffic went around the Cape and through Hormuz. When Hormuz was threatened, traffic could be rerouted through Suez. The double closure removes the safety valve entirely. There is no alternative route through the Middle East. There is only the Cape of Good Hope, which is not a reroute through the region but a reroute around it.</p>

<p>Sal Mercogliano, a maritime historian at Campbell University and the host of the "What's Going on With Shipping" channel, put it to me this way: "We have had single chokepoint crises before and they were manageable. The system could absorb one disruption. It cannot absorb two on the same trade lane at the same time. This is the shipping equivalent of both lanes of a highway being closed in opposite directions. You can take the back roads, but the back roads were not built for this much traffic."</p>

<h2>The carriers' impossible choice</h2>

<p>Maersk, MSC, CMA CGM, and Hapag-Lloyd have all suspended Hormuz transits. Most of them had already suspended Red Sea transits. Lloyd's List confirmed on May 26 that these four carriers, which control roughly 60 percent of global container capacity, have formally paused both routes. Their ships are either rerouting around the Cape or waiting at safe anchorages outside the danger zones.</p>

<p>The problem with the Cape route is that it was already absorbing the Red Sea diversion. Since early 2024, container ships that would have gone through Suez have been going around South Africa. That additional traffic has strained port infrastructure in Cape Town, Port Louis in Mauritius, and other stops along the route. Bunkering facilities are running at capacity. Crew change facilities are overwhelmed. Adding the Hormuz diversion on top of the Suez diversion means the Cape route is now carrying roughly double its normal traffic volume, with no additional infrastructure to support it.</p>

<p>One Maersk captain I corresponded with, who is currently on a Cape reroute from Singapore to Rotterdam, described the situation at Cape Town. "We waited 36 hours for a bunker berth. That used to take 6 hours. The anchorage is full. Every ship going Europe to Asia or Asia to Europe is coming this way now. We are like cars on a detour that has become the main road."</p>

<h2>What this means for freight rates</h2>

<p>The rate spike is already visible in the spot market. But the longer-term impact depends on how long both closures last. If the double chokepoint persists through the third quarter of 2026, which is the peak shipping season ahead of the holiday retail period, the consequences will be severe.</p>

<p>Xeneta's analysis projects that if both corridors remain disrupted through September 2026, Asia-Europe contract rates for 2027 negotiations could settle at three to four times their pre-crisis levels. That would be a structural repricing of the world's most important trade lane, not a temporary spike. Shippers who locked in contract rates earlier in 2026 are protected for now, but those contracts typically expire at the end of the year. The 2027 contracting season, which begins in October, will be conducted in an entirely different market.</p>

<p>For consumers, the impact takes time to show up on store shelves. Container ships carry manufactured goods: electronics, clothing, furniture, auto parts. The ships currently stuck in the Gulf and the Red Sea were carrying inventory meant for June and July delivery. When that inventory does not arrive, stockouts begin. Retailers with lean supply chains, which is most of them, will feel the pinch first. The full consumer impact of the double closure will not be visible until August or September, when the gap between what was supposed to arrive and what actually arrived becomes impossible to ignore.</p>

<h2>The geography of desperation</h2>

<p>I keep looking at the map. Europe on the left. Asia on the right. Between them, a narrow strip of water that has carried the world's trade for 150 years. Above that strip, the Suez Canal, blocked by Houthi drones and missiles fired from Yemen. Below it, the Arabian Peninsula, with the Strait of Hormuz on its eastern edge, blocked by the IRGC. And around the whole thing, a thin green line of ships going the long way around Africa, burning fuel and time.</p>

<p>There is a third dimension to this that I think is underappreciated. The Cape of Good Hope route passes through waters that have their own risks. Piracy off the coast of Somalia has been suppressed since 2012 by multinational naval patrols, but those patrols have been drawing down as ships and resources were redirected to the Red Sea and now the Gulf. The European Union's ATALANTA mission, which has been the primary anti-piracy force in the western Indian Ocean, has reduced its escort capacity by roughly 40 percent since April because three of its frigates were reassigned to the Gulf. If Somali piracy resurges, which it has done before when naval presence declined, the Cape route could face its own security challenges. Three chokepoints with three different threats. That is the geography the shipping industry is confronting right now.</p>

<p>The double chokepoint is not just a shipping problem. It is a systems failure. The global economy was built on the assumption that at least one of these two corridors would always be open. That assumption no longer holds. And nobody I have spoken with in the shipping industry, the insurance industry, or the diplomatic community can tell me when it will hold again.</p>
`
  },
  {
    slug: "kuwait-missile-attack-gulf-escalation",
    title: "Kuwait just got hit by missiles. The war is spreading beyond Hormuz.",
    date: "2026-05-28",
    category: "Military",
    readingTime: "9 min",
    authorName: "Marcus Webb",
    authorTitle: "Senior Maritime Correspondent",
    authorUrl: "https://hormuztracker.tech/about",
    keywords: "Kuwait missile attack, Iran IRGC Gulf escalation, UAE Saudi Arabia attacked, Camp Arifjan strike, Gulf war spreading",
    content: `
<h2>May 28</h2>

<p>At approximately 2:47 AM local time on May 28, 2026, a salvo of Iranian missiles struck Kuwait. The IRGC Aerospace Force launched at least 14 ballistic missiles and deployed an estimated 30 Shahed-136 suicide drones from bases in southwestern Iran, targeting Camp Arifjan, the primary US logistics hub in Kuwait, and Ali Al Salem Air Base, which houses US and coalition aircraft. Kuwait's Ministry of Interior confirmed that three missiles struck within the perimeter of Camp Arifjan, causing fires and structural damage. Two more missiles hit near the port of Shuaiba, Kuwait's main commercial port, damaging warehouse facilities and injuring at least seven civilian workers.</p>

<p>The IRGC issued a statement within an hour of the attack, claiming responsibility and describing the strike as retaliation for "American aggression against Iranian territory from Kuwaiti bases." The statement referenced the May 22 US airstrikes on IRGC command facilities in Bushehr and Bandar Abbas, which were partially launched from Kuwait-based aircraft. In the IRGC's framing, Kuwait is no longer a neutral host country. It is a participant in the war.</p>

<p>This is the first time Iran has directly attacked Kuwaiti territory. It is a major escalation, and it changes the shape of the conflict in ways that matter for shipping, for diplomacy, and for the 4.5 million people who live in Kuwait.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 480" style="max-width:100%;height:auto;">
  <rect width="680" height="480" rx="12" fill="#0f172a"/>
  <text x="340" y="34" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="16" font-weight="600">Iran missile and drone ranges to Gulf states</text>
  <text x="340" y="54" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">Estimated ranges from IRGC launch sites in southwestern Iran</text>

  <!-- Iran launch zone -->
  <circle cx="340" cy="260" r="40" fill="#7f1d1d" opacity="0.5" stroke="#f87171" stroke-width="1.5"/>
  <text x="340" y="255" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="11" font-weight="600">IRGC launch</text>
  <text x="340" y="270" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="10">sites</text>

  <!-- Range rings -->
  <circle cx="340" cy="260" r="100" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
  <text x="440" y="200" fill="#fbbf24" font-family="system-ui" font-size="9">400 km</text>

  <circle cx="340" cy="260" r="160" fill="none" stroke="#f87171" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
  <text x="500" y="155" fill="#f87171" font-family="system-ui" font-size="9">800 km</text>

  <circle cx="340" cy="260" r="210" fill="none" stroke="#c4b5fd" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
  <text x="550" y="120" fill="#c4b5fd" font-family="system-ui" font-size="9">1,200 km</text>

  <!-- Target markers -->
  <!-- Kuwait -->
  <circle cx="200" cy="185" r="8" fill="#f87171"/>
  <line x1="340" y1="260" x2="200" y2="185" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="110" y="180" fill="#f87171" font-family="system-ui" font-size="12" font-weight="600">Kuwait</text>
  <text x="110" y="195" fill="#fca5a5" font-family="system-ui" font-size="10">~580 km | HIT May 28</text>

  <!-- UAE -->
  <circle cx="280" cy="340" r="8" fill="#fbbf24"/>
  <line x1="340" y1="260" x2="280" y2="340" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="170" y="340" fill="#fbbf24" font-family="system-ui" font-size="12" font-weight="600">UAE (Dubai)</text>
  <text x="170" y="355" fill="#fde68a" font-family="system-ui" font-size="10">~280 km | HIT May 14</text>

  <!-- Saudi Arabia -->
  <circle cx="160" cy="280" r="8" fill="#60a5fa"/>
  <line x1="340" y1="260" x2="160" y2="280" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="60" y="275" fill="#60a5fa" font-family="system-ui" font-size="12" font-weight="600">Saudi Arabia</text>
  <text x="60" y="290" fill="#93c5fd" font-family="system-ui" font-size="10">Ras Tanura ~650 km</text>
  <text x="60" y="305" fill="#93c5fd" font-family="system-ui" font-size="10">HIT May 9</text>

  <!-- Bahrain -->
  <circle cx="250" cy="220" r="6" fill="#4ade80"/>
  <text x="140" y="215" fill="#4ade80" font-family="system-ui" font-size="11" font-weight="600">Bahrain</text>
  <text x="140" y="230" fill="#86efac" font-family="system-ui" font-size="9">~340 km | US 5th Fleet</text>

  <!-- Qatar -->
  <circle cx="310" cy="290" r="6" fill="#c4b5fd"/>
  <text x="310" y="315" fill="#c4b5fd" font-family="system-ui" font-size="11" font-weight="600">Qatar</text>
  <text x="310" y="328" fill="#ddd6fe" font-family="system-ui" font-size="9">~220 km | Al Udeid AB</text>

  <!-- Shipping lane impact -->
  <rect x="60" y="385" width="560" height="80" rx="8" fill="#1e293b" stroke="#f87171" stroke-width="1"/>
  <text x="340" y="410" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="12" font-weight="700">Impact on shipping</text>
  <text x="340" y="430" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="11">Missile ranges cover ALL major Gulf ports and shipping lanes</text>
  <text x="340" y="448" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Shuaiba port (Kuwait) damaged | Ras Tanura (Saudi) on alert | Jebel Ali (UAE) disrupted</text>
</svg>

<h2>Before Kuwait: the pattern of escalation</h2>

<p>The Kuwait attack did not come out of nowhere. Iran has been gradually expanding the geographic scope of its strikes since the conflict began. On May 9, the IRGC fired six missiles at the Ras Tanura refinery complex in Saudi Arabia, the world's largest oil processing facility. Two missiles were intercepted by Saudi Patriot batteries. Four got through, causing a fire that burned for nine hours and temporarily reduced Saudi refining capacity by 1.2 million barrels per day. That attack was a direct response to a Saudi decision to allow the US Air Force to use Prince Sultan Air Base for refueling operations.</p>

<p>On May 14, Iran struck the UAE. A swarm of 18 Shahed drones targeted the Le Meridien Hotel in Dubai, which, according to the IRGC statement, was being used as "a command center for Western intelligence operations." The hotel was hit. Three guests were killed and 28 people were injured, most of them Emirati civilians. The UAE condemned the attack as a "terrorist act against civilian infrastructure" and summoned the Iranian charge d'affaires. But the UAE also made a quiet diplomatic move: it informed Washington that it would not allow further offensive US military operations from UAE territory. The Emiratis were sending a message. They do not want to be a target.</p>

<p>Kuwait is different from the UAE and Saudi Arabia in one important respect. Kuwait does not have a large military or sophisticated air defense systems. It relies almost entirely on the US military presence for its security. Camp Arifjan, Camp Buehring, and Ali Al Salem Air Base host approximately 13,500 US military personnel. Kuwait has limited ability to defend itself without American support, and the American support is precisely what makes it a target.</p>

<h2>The shipping angle</h2>

<p>The strike on Shuaiba port matters more than most people realize. Shuaiba is Kuwait's primary commercial port, handling about 550,000 TEU of container traffic per year and serving as a transshipment hub for goods moving into Iraq. The missile damage to warehouse facilities has forced the port to operate at roughly 60 percent capacity, according to a notice issued by the Kuwait Ports Authority on May 28.</p>

<p>This means that even if the Strait of Hormuz were to reopen tomorrow, ships calling at Kuwait would face delays and reduced capacity at their destination port. The crisis is no longer just about getting through the strait. It is about whether the ports on the other side are still functional. The same is true in Saudi Arabia, where Ras Tanura's reduced throughput has disrupted crude oil loading schedules, and in the UAE, where Jebel Ali, the largest port in the Middle East, has been operating under heightened security protocols since the Dubai hotel attack, with additional screening times adding 24 to 48 hours to vessel turnarounds.</p>

<p>Shipping lines are taking note. Hapag-Lloyd issued an advisory on May 28 stating that it would suspend all calls at Kuwaiti ports "until further notice." MSC followed with a similar advisory two hours later. The diversions mean cargo destined for Kuwait will be offloaded at alternative ports, likely Jebel Ali or Bahrain, and then moved overland, adding cost and time.</p>

<h2>The international response</h2>

<p>The UK and France announced on May 28 that they would deploy additional aircraft to the region in response to the Kuwait attack. The UK is sending six Typhoon fighter jets from RAF Coningsby to Akrotiri in Cyprus, with forward deployment to Al Udeid Air Base in Qatar. France is deploying four Rafale fighters from the Charles de Gaulle carrier group, currently operating in the Arabian Sea. Both governments framed the deployments as defensive measures intended to protect Gulf partners from further Iranian strikes.</p>

<p>The deployments are symbolically important but operationally limited. Six Typhoons and four Rafales do not fundamentally change the balance of air power in the region, where the US already has over 100 combat aircraft deployed across multiple bases. What the deployments signal is political: European governments are now willing to put their own forces in the region in a defensive posture, which is a step beyond the purely naval presence they have maintained since April.</p>

<p>The Gulf Cooperation Council held an emergency session on May 28, the same day as the Kuwait attack. The communique issued after the session contained language that I found striking. The GCC states demanded that "Iran's offensive capabilities be degraded as a condition of any diplomatic agreement to reopen the Strait of Hormuz." This is a significant hardening of position. Previously, GCC statements had called for a ceasefire and a return to negotiations. Now they are saying that a deal is not enough. They want Iran's ability to strike them reduced before they will support any settlement.</p>

<h2>Why the war will not stay at sea</h2>

<p>The escalation from a maritime standoff to a regional war was predictable. In fact, several analysts predicted it. The logic is straightforward: Iran's primary leverage in the Hormuz crisis is its ability to disrupt shipping and threaten Gulf states. As the US and its allies apply military pressure to reopen the strait, Iran needs to demonstrate that it can impose costs beyond the maritime domain. Striking Kuwait, Saudi Arabia, and the UAE is a way of telling the US: if you attack us, your allies suffer. It is deterrence by proxy.</p>

<p>The problem with this strategy is that it is self-reinforcing. Every Iranian strike on a Gulf state makes those states more committed to seeing Iran's capabilities reduced. Every US strike from a Gulf base makes that base a target. The cycle accelerates. What started as a dispute over naval passage through a strait is now a multi-front regional conflict involving ballistic missiles, drone swarms, and air defenses across five countries.</p>

<p>For shipping, the lesson is grim. It was possible to imagine, a month ago, that the Hormuz crisis could be resolved through a naval agreement. Iran would stop intercepting ships, the US would ease its blockade, and traffic would resume. That outcome is harder to imagine now. The conflict has spread to Kuwaiti ports, Saudi refineries, and Dubai hotels. Even if the strait reopens, the ports it serves are under fire. The shipping industry has to plan for a reality where the risk is not just at the chokepoint but at the destination.</p>

<p>I spoke with a retired Royal Navy commodore who spent 30 years in Gulf operations. He told me: "The strait was always the focus because that is where the oil flows. But the war was never going to stay at sea. Wars do not stay at sea. They come ashore. They always come ashore." He paused. "The question now is how far ashore they go."</p>

<p>There is one more dimension worth considering. The missile attacks on Gulf states are not just military operations. They are also information operations. Every strike that lands on Kuwaiti or Saudi or Emirati soil generates news coverage, social media footage, and domestic pressure on those governments to distance themselves from the United States. Iran wants the Gulf states to ask Washington to stop attacking Iran. The strikes are designed to make that happen. Whether they will succeed depends on how much pain the Gulf states are willing to absorb for their alliance with the US. The answer to that question is not obvious, and it matters more than any single missile impact.</p>

<p>On May 28, they went to Kuwait. There is no guarantee they stop there.</p>
`
  },
  {
    slug: "iran-oil-exports-collapse-200000-bpd",
    title: "Iran's oil exports dropped from 1.5 million barrels a day to almost nothing",
    date: "2026-05-28",
    category: "Economic",
    readingTime: "9 min",
    authorName: "Marcus Webb",
    authorTitle: "Senior Maritime Correspondent",
    authorUrl: "https://hormuztracker.tech/about",
    keywords: "Iran oil exports collapse, US naval blockade Iran, shadow fleet China oil, Iranian crude stockpiles, oil price forecast 2026",
    content: `
<h2>The numbers</h2>

<p>Before the crisis, Iran was exporting approximately 1.5 million barrels of crude oil per day. That figure comes from the Foundation for Defense of Democracies, which tracks Iranian oil shipments using satellite imagery and AIS data. It represents a significant recovery from the 2020 low of roughly 100,000 barrels per day, when Trump-era sanctions were at their most aggressive. By early 2026, Iran had rebuilt its export market, primarily through sales to China, which accounted for about 90 percent of Iranian crude purchases.</p>

<p>As of the last week of May 2026, those exports have collapsed. FDD's analysis, published on May 27, estimates that Iran is now exporting roughly 200,000 barrels per day. That is an 87 percent decline in less than two months. The cause is the US naval blockade, which was implemented in mid-April and has since prevented most Iranian tanker traffic from exiting the Persian Gulf through the Strait of Hormuz.</p>

<p>The collapse is not just a reduction in exports. Iran has also cut its own production by approximately 400,000 barrels per day, from about 3.4 million bpd to 3.0 million bpd, because it has nowhere to store the unsold crude. And the FDD analysis warns that further production cuts are likely if the blockade continues, because Iran's onshore storage capacity is approaching its limit.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 440" style="max-width:100%;height:auto;">
  <rect width="680" height="440" rx="12" fill="#0f172a"/>
  <text x="340" y="34" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="16" font-weight="600">Iran oil exports: from 1.5M bpd to 200K bpd</text>
  <text x="340" y="54" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">Monthly average exports, thousand barrels per day</text>

  <!-- Bar chart -->
  <!-- Pre-crisis baseline -->
  <rect x="80" y="80" width="80" height="270" rx="4" fill="#60a5fa" opacity="0.8"/>
  <text x="120" y="360" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">Jan '26</text>
  <text x="120" y="75" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="11" font-weight="600">1,480K</text>

  <rect x="175" y="85" width="80" height="265" rx="4" fill="#60a5fa" opacity="0.8"/>
  <text x="215" y="360" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">Feb '26</text>
  <text x="215" y="80" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="11" font-weight="600">1,520K</text>

  <rect x="270" y="82" width="80" height="268" rx="4" fill="#60a5fa" opacity="0.7"/>
  <text x="310" y="360" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">Mar '26</text>
  <text x="310" y="77" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="11" font-weight="600">1,490K</text>

  <!-- Crisis begins -->
  <rect x="365" y="220" width="80" height="130" rx="4" fill="#fbbf24" opacity="0.8"/>
  <text x="405" y="360" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">Apr '26</text>
  <text x="405" y="215" text-anchor="middle" fill="#fbbf24" font-family="system-ui" font-size="11" font-weight="600">720K</text>

  <rect x="460" y="310" width="80" height="40" rx="4" fill="#f87171" opacity="0.8"/>
  <text x="500" y="360" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">May '26</text>
  <text x="500" y="305" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="11" font-weight="600">200K</text>

  <!-- Projected -->
  <rect x="555" y="330" width="80" height="20" rx="4" fill="#f87171" opacity="0.4" stroke="#f87171" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="595" y="360" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">Jun '26</text>
  <text x="595" y="325" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="11" font-weight="600">~100K?</text>

  <!-- Annotations -->
  <line x1="355" y1="80" x2="355" y2="350" stroke="#f87171" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="362" y="395" fill="#f87171" font-family="system-ui" font-size="10" font-weight="600">Blockade begins</text>

  <!-- Key metrics -->
  <rect x="80" y="405" width="180" height="25" rx="4" fill="#1e293b"/>
  <text x="170" y="422" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="11" font-weight="600">-87% export decline</text>

  <rect x="280" y="405" width="180" height="25" rx="4" fill="#1e293b"/>
  <text x="370" y="422" text-anchor="middle" fill="#fbbf24" font-family="system-ui" font-size="11" font-weight="600">-400K bpd production cut</text>

  <rect x="480" y="405" width="160" height="25" rx="4" fill="#1e293b"/>
  <text x="560" y="422" text-anchor="middle" fill="#c4b5fd" font-family="system-ui" font-size="11" font-weight="600">More cuts expected</text>
</svg>

<h2>Where the oil is going</h2>

<p>Or rather, where it is not going. Before the blockade, Iran's export operation worked like this. Crude was loaded at Kharg Island, Iran's primary export terminal, or at smaller terminals like Lavan and Sirri. The oil was put onto tankers, many of them old and reflagged to obscure their ownership, and sailed east to China. The voyage took about 20 days. Some of the tankers transferred their cargo at sea to other vessels near Malaysian waters in a process called ship-to-ship transfer, which made the oil harder to trace. The Chinese refineries that bought it, mostly small independent teapot refineries in Shandong province, processed it into fuel for domestic consumption.</p>

<p>The US naval blockade has disrupted this operation severely. The Fifth Fleet, operating from Bahrain, has established a patrol line across the central Gulf. Iranian tankers attempting to reach the Strait of Hormuz are intercepted and turned back. Some have been seized. The US Navy has boarded at least seven Iranian tankers since mid-April, according to a Defense Department official who spoke on background. The tankers were found to be carrying crude in violation of US sanctions and were diverted to partner nation ports where the cargo was confiscated.</p>

<p>But not all of Iran's exports have stopped. The FDD analysis identifies roughly 200,000 barrels per day still moving, almost all of it to China. How? The answer is the shadow fleet: a collection of aging tankers with opaque ownership structures that operate outside conventional insurance and classification systems. These ships turn off their AIS transponders, sail close to the Iranian coast to minimize detection, and exit the Gulf through routes that avoid the main patrol areas. It is risky and slow, but it works, sort of. The 200,000 barrels per day that still get through represent the shadow fleet's maximum capacity under current conditions.</p>

<h2>Oil on water</h2>

<p>One of the most striking consequences of the blockade is the buildup of unsold crude on tankers at sea. Iran does not have enough onshore storage to hold the oil it is producing but cannot export. So it is leaving the oil on the tankers that would normally carry it to market. As of May 27, satellite imagery analyzed by TankerTrackers.com shows approximately 28 fully loaded Iranian tankers at anchor in the Gulf, holding an estimated 42 million barrels of crude with nowhere to go.</p>

<p>These floating storage tanks are a financial liability. Each VLCC costs roughly $30,000 per day to charter. Twenty-eight vessels at anchor for weeks means hundreds of millions of dollars in charter costs alone. Then there is the value of the oil itself. At current Brent prices of approximately $78 per barrel, 42 million barrels represents $3.3 billion in unsold inventory sitting on ships that cannot move. The oil will degrade over time if stored in ship tanks for extended periods, reducing its value. And every day the blockade continues, more crude is loaded onto more tankers, adding to the backlog.</p>

<p>I spoke with a commodity analyst at a Singapore-based trading house who has been tracking the floating storage. He told me: "Iran is essentially running a floating pipeline with no outlet. The tanks are filling up. At some point, they either have to shut in production entirely or find a way to move the oil. The shadow fleet can only do so much."</p>

<h2>China's role</h2>

<p>China is the only major buyer still purchasing Iranian crude. This is not new. China has been Iran's primary customer since US sanctions were reimposed in 2018, and it has developed sophisticated mechanisms to circumvent those sanctions. The mechanisms include the ship-to-ship transfers I mentioned, the use of yuan-denominated contracts to avoid the dollar-based financial system, and the routing of payments through small Chinese regional banks that are less exposed to US secondary sanctions.</p>

<p>What has changed since the blockade is the cost of moving the oil. Before the crisis, a shadow fleet tanker could sail from Kharg Island to Shandong in about 20 days. Now, the same voyage takes 30 to 35 days because the tanker has to take evasive routes to avoid US Navy patrols. The longer voyage means higher charter costs, more fuel consumption, and greater risk. Chinese buyers are still purchasing, but the volumes are reduced because the logistics have become harder.</p>

<p>There is a political dimension too. China has been careful not to publicly endorse Iran's actions in the Strait of Hormuz. The Chinese Foreign Ministry has called for "de-escalation and the protection of free navigation," which is diplomatic language for "we want the strait open but we are not going to help you open it." China benefits from cheap Iranian crude, but it also benefits from stable global oil markets. A prolonged Hormuz closure drives up oil prices worldwide, which hurts China as a net importer. Beijing is trying to balance its relationship with Tehran against its own economic interests, and the balance is getting harder to maintain.</p>

<h2>The global oil market</h2>

<p>Iran's export collapse is one of several factors pushing oil prices higher, but it is not the biggest one. The bigger driver is the reduction in Gulf exports overall. Saudi Arabia, the UAE, Kuwait, and Qatar are all exporting less than they were before the crisis, because tankers cannot safely transit Hormuz. The combined export loss from all Gulf producers is estimated at 4 to 5 million barrels per day, roughly 5 percent of global supply. That is a much larger shock than the 1.3 million barrel per day loss from Iran alone.</p>

<p>Still, the Iranian supply loss matters because it removes a source of oil that would otherwise help offset the reduction from other Gulf producers. In a normal market, if Saudi exports were disrupted, other producers would increase output to stabilize prices. Iran cannot increase output because it is the subject of the blockade. Its oil is stuck on ships in the Gulf, waiting for a resolution that may be months away.</p>

<p>BloombergNEF, the energy research arm of Bloomberg, published an analysis on May 26 projecting that Brent crude could reach $91 per barrel by late 2026 if the Hormuz closure persists. That estimate assumes a gradual partial reopening of the strait, with exports recovering to about 50 percent of pre-crisis levels by the fourth quarter. If the strait remains fully closed, BloombergNEF says prices could go higher, potentially reaching $100 or more. The last time oil was above $100 was 2022, after Russia's invasion of Ukraine.</p>

<h2>What happens to Iran's economy</h2>

<p>Oil exports account for roughly 20 percent of Iran's government revenue and about 60 percent of its export earnings. A decline from 1.5 million barrels per day to 200,000 means a revenue loss of approximately $90 million per day at current prices, or about $2.7 billion per month. Iran has foreign exchange reserves, estimated by the IMF at around $20 billion in accessible assets, but those reserves were already under strain before the crisis. At the current rate of revenue loss, the reserves would be significantly depleted within six to eight months.</p>

<p>The Iranian rial has continued its depreciation. On the unofficial market, the exchange rate has moved from approximately 600,000 rials per dollar in March to about 890,000 rials per dollar in late May, a 48 percent decline. Inflation, which was already running at over 40 percent annually, is accelerating. Basic goods are becoming more expensive. The government has not imposed formal rationing, but price controls on staple foods are creating shortages as producers sell on the black market instead.</p>

<p>There is a grim irony here. Iran closed the Strait of Hormuz to pressure the US and its allies. The closure has hurt Iran's own oil exports far more than it has hurt anyone else's, at least in revenue terms. The US blockade, which was a response to Iran's closure, has turned Iran's leverage into a self-inflicted wound. The country that depends most on oil revenue from Hormuz is the country that shut Hormuz down. I keep thinking about that. It is like setting your own house on fire to keep intruders out. The intruders may leave. You are still homeless.</p>

<p>The production cuts are the clearest sign of distress. Iran did not want to cut production. Every barrel it does not pump is a barrel it cannot sell, even if the blockade ends. Once you shut in a well, restarting it is expensive and sometimes damaging to the reservoir. Iran is cutting production because it has run out of places to put the oil. The floating storage is full. The onshore tanks are near capacity. The only option left is to pump less. And less pumping means less revenue, which means more economic pain, which makes the crisis harder for Iran to sustain.</p>

<p>How long can Iran hold out? That depends on reserves, on Chinese willingness to keep buying through the shadow fleet, and on the domestic political tolerance for economic hardship. Nobody I spoke with this week had a confident answer. The consensus was somewhere between three and six months before the economic pressure forces a change in posture. But consensus estimates in this crisis have been wrong before. The only thing I am sure of is that the math does not work in Iran's favor. The oil is not flowing, the money is not coming in, and the ships sitting at anchor in the Gulf are getting more expensive by the day.</p>
`
  }
];
