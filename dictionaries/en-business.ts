/**
 * English copy for the group's businesses and the Investment Guide.
 * Merged into the main dictionary in dictionaries/en.ts.
 *
 * Writing rule for this file: every paragraph picks up the thread of the one
 * before it, and every page closes by pointing to the next, so the site reads
 * as one connected account of the group.
 */

export type DivisionSlug = "real-estate" | "partners" | "timepieces";

export const businessEn = {
  divisions: [
    {
      slug: "real-estate" as DivisionSlug,
      name: "Elion Real Estate",
      kicker: "Development & Projects",
      status: "active" as const,
      summary:
        "Residential and mixed-use developments in Georgia, from land and design through construction to handover.",
      bridge: "It builds what Elion Partners offers investors.",
      image: "/images/brand-real-estate-residence.jpg",
      imageAlt: "A limestone residence at dusk with planted terraces, glowing windows and a reflecting pool",
      subject: "Real estate",
      hero: {
        title: "Elion Real Estate",
        text: "Residential and mixed-use developments in Georgia, built with lasting materials and considered design.",
        imageAlt: "The entrance of a limestone headquarters building at dusk, lit in warm gold",
      },
      overview: {
        lede: "Real estate is where ELION GROUP began, and it remains the clearest expression of how the group thinks: build carefully, in the right places, for people who intend to stay.",
        body: [
          "That starting point shapes every project we take on. We select land in established and emerging districts of Tbilisi and other Georgian cities, then work with architects, engineers and contractors who share our attention to proportion, materials and detail.",
          "Because the group holds a long-term view, we design each building to age well rather than to sell quickly. The result is property that keeps its value for owners and investors alike, which is also why Elion Partners can recommend our projects with confidence.",
        ],
      },
      services: {
        title: "What Elion Real Estate does",
        items: [
          { title: "Land & feasibility", text: "Site selection, planning studies and financial feasibility before a single line is drawn." },
          { title: "Design & development", text: "Architecture, interiors and engineering coordinated to one standard of quality." },
          { title: "Construction management", text: "Programme, budget and quality control with trusted contractors, from groundworks to handover." },
          { title: "Sales & aftercare", text: "Direct sales, handover and ongoing care for owners, residents and their property." },
        ],
      },
      process: {
        title: "From site to handover",
        intro: "Each development follows the same disciplined path, so that partners and buyers always know what comes next.",
        steps: [
          { title: "Select", text: "We acquire land only where location, access and long-term demand align." },
          { title: "Design", text: "Plans are refined until every space earns its place and every material will last." },
          { title: "Build", text: "Construction is supervised against a fixed programme, budget and quality standard." },
          { title: "Deliver", text: "Homes are handed over complete, documented and supported after completion." },
        ],
      },
      connection:
        "Elion Real Estate develops the projects; Elion Partners brings investors and co-developers to them; and the craftsmanship standards it shares with Elion Timepieces run through every detail.",
    },
    {
      slug: "partners" as DivisionSlug,
      name: "Elion Partners",
      kicker: "Investment & Partnerships",
      status: "active" as const,
      summary:
        "Guidance for investors in real estate, and long-term partnerships with developers.",
      bridge: "It links investors and developers to our projects.",
      proof: { label: "Investor service", value: "Shortlist, due diligence and registration in nine markets, with one contact" },
      image: "/images/office-boardroom.jpg",
      imageAlt: "The ELION GROUP boardroom overlooking Tbilisi at golden hour",
      subject: "Investment",
      hero: {
        title: "Elion Partners",
        text: "Investment guidance and development partnerships, built on local knowledge and a long horizon.",
        imageAlt: "A boardroom with a long walnut table and a view over Tbilisi at golden hour",
      },
      overview: {
        lede: "Good projects need good partners. Elion Partners exists to bring the right investors, developers and advisers together around real estate in Georgia, and to stay with them for the long term.",
        body: [
          "For investors, that begins with clear information. We explain the market, introduce suitable projects (our own and those of selected partner developers), and coordinate the independent legal and tax advice every acquisition deserves.",
          "For developers, we act as a long-term partner rather than a broker: co-developing projects, sharing design and quality standards, and introducing capital that is patient enough to build well. Each partnership strengthens the pipeline that Elion Real Estate and our investors rely on.",
        ],
      },
      services: {
        title: "What Elion Partners does",
        items: [
          { title: "Investor guidance", text: "Market briefings, project shortlists and a clear path from first conversation to registration." },
          { title: "Developer partnerships", text: "Co-development, joint ventures and shared standards with selected Georgian developers." },
          { title: "Capital introductions", text: "Connecting long-term private capital with well-structured projects." },
          { title: "Asset stewardship", text: "Coordination of letting, management and resale for owners after acquisition." },
        ],
      },
      process: {
        title: "How a partnership works",
        intro: "Whether you invest or develop, the relationship follows the same four stages, each built on the one before.",
        steps: [
          { title: "Understand", text: "We begin with your objectives, timeframe and appetite for involvement." },
          { title: "Select", text: "We shortlist projects or partners and share the due-diligence picture openly." },
          { title: "Structure", text: "Agreements are prepared with independent lawyers and registered transparently." },
          { title: "Steward", text: "We stay involved after signing, through construction, handover and beyond." },
        ],
      },
      connection:
        "Elion Partners draws on Elion Real Estate for projects and delivery, and on the group’s governance for the trust that long-term partnerships require.",
    },
    {
      slug: "timepieces" as DivisionSlug,
      name: "Elion Timepieces",
      kicker: "Luxury Watches",
      status: "soon" as const,
      summary:
        "A house of watchmaking in preparation, with partnerships with established watch brands.",
      bridge: "It brings our craftsmanship to luxury goods.",
      image: "/images/brand-timepieces-atelier.jpg",
      imageAlt: "A gold watch with an ivory dial beside an open mechanical movement, loupe and tweezers on a walnut bench",
      subject: "Timepieces",
      hero: {
        title: "Elion Timepieces",
        text: "A house of watchmaking in preparation, guided by restraint, precision and time itself.",
        imageAlt: "A gold watch with an ivory dial beside an open mechanical movement on a watchmaker’s bench",
      },
      overview: {
        lede: "A well-made watch and a well-made building share more than it first appears: both are measured in decades, and both reveal their quality in the details few people notice.",
        body: [
          "That shared conviction is why ELION GROUP is extending into luxury goods through Elion Timepieces. The house is being prepared around a small number of refined designs, developed with experienced watchmaking partners and finished to exacting standards.",
          "Alongside its own collection, Elion Timepieces will work with established watch brands on selected partnerships and representation in the region. In doing so, it brings the group’s standard of craftsmanship to a new audience while serving the same discerning clients our other businesses already know.",
        ],
      },
      services: {
        title: "What Elion Timepieces will do",
        items: [
          { title: "Own collection", text: "A concise range of timepieces designed in-house and produced with expert partners." },
          { title: "Brand partnerships", text: "Selected collaborations and representation with established watch houses." },
          { title: "Private clients", text: "Discreet, appointment-based service for collectors and clients of the group." },
          { title: "Care & heritage", text: "Servicing, provenance and long-term care for every timepiece we place." },
        ],
      },
      process: {
        title: "How the house is being built",
        intro: "Like every Elion business, the watch house is being built step by step, without shortcuts.",
        steps: [
          { title: "Define", text: "A clear design language: restrained, legible and made to last." },
          { title: "Partner", text: "Collaboration with experienced watchmakers and established brands." },
          { title: "Refine", text: "Prototypes are tested and refined until every detail is right." },
          { title: "Present", text: "A measured launch to private clients first, then to the wider market." },
        ],
      },
      connection:
        "Elion Timepieces shares its clients, its standards and its long horizon with the rest of the group, bringing the discipline of real estate development to the craft of watchmaking.",
    },
  ],

  futureVentures: {
    name: "Future Ventures",
    status: "forming" as const,
    text: "New businesses that meet the group’s standards for quality and longevity.",
  },

  businesses: {
    meta: {
      title: "Our Businesses",
      description:
        "ELION GROUP’s three businesses: Elion Real Estate (development and projects), Elion Partners (investment and partnerships) and Elion Timepieces (luxury watches).",
    },
    hero: {
      label: "Our Businesses",
      title: "Three Businesses, One Standard",
      text: "Development, investment and craftsmanship, each strengthening the others.",
      imageAlt: "The ELION GROUP reception: brass lettering on a travertine wall above a stone reception desk",
    },
    intro: {
      index: "01",
      label: "The Structure",
      lede: "ELION GROUP is organised around three businesses that were designed to work together rather than side by side.",
      body: [
        "Elion Real Estate creates the assets: carefully developed residential and mixed-use projects in Georgia. Elion Partners connects those projects with the investors and developers who help them grow, guiding each through the market with local knowledge.",
        "Elion Timepieces carries the same standard of craftsmanship into luxury goods. Together, the three share one governance, one network of clients and partners, and one measure of success: that what we build is still valued decades from now.",
      ],
    },
    list: { index: "02", label: "The Businesses", explore: "Explore" },
    flow: {
      index: "03",
      label: "How It Connects",
      title: "One group, one flow of value",
      intro: "The businesses form a single chain: each step makes the next one stronger.",
      steps: [
        { title: "Investors & partners", text: "Private investors and developers come to the group through Elion Partners." },
        { title: "Guidance & structure", text: "Elion Partners briefs, selects and structures each opportunity with independent advisers." },
        { title: "Development & delivery", text: "Elion Real Estate designs, builds and delivers the project to one standard." },
        { title: "Lasting assets", text: "Owners hold property, and clients hold timepieces, made to keep their value." },
      ],
    },
  },

  divisionPage: {
    label: "Our Businesses",
    overview: "Overview",
    services: "What We Do",
    process: "How We Work",
    within: "Within the Group",
    withinTitle: "Connected to the rest of the group",
    explore: "Explore",
    enquire: "Enquire about",
    next: "Next",
  },

  investment: {
    meta: {
      title: "Investment Guide",
      description:
        "ELION GROUP’s guide to real estate investment in Georgia, the Gulf (UAE, Qatar, Saudi Arabia, Oman), Europe (United Kingdom, Portugal, France) and Zanzibar: markets, ownership, how we guide investors and partner developers.",
    },
    hero: {
      label: "Investment Guide",
      title: "Nine Markets, One Guide",
      text: "Real estate investment across Georgia, the Gulf, Europe and the Indian Ocean, with one considered path from first conversation to long-term ownership.",
      imageAlt: "Golden-hour view over a new residential district of Tbilisi, with the river, the old town and the Caucasus mountains",
    },
    intro: {
      index: "01",
      label: "Introduction",
      lede: "Our investors come from across the Gulf and beyond, and the markets they consider are connected. Opportunity alone, however, is not enough; what matters is choosing the right market, the right project and the right structure.",
      body: [
        "This guide covers the nine markets where Elion Partners works: Georgia, our home market; the United Arab Emirates, Qatar, Saudi Arabia and Oman in the Gulf; the United Kingdom, Portugal and France in Europe; and Zanzibar on the Indian Ocean. It begins with an overview of each, continues with the step-by-step way we guide every investment, and closes with how we work alongside developers.",
        "It is general information rather than advice. Every investment is different, which is why each conversation with us starts with your objectives, and why we always work alongside independent legal and tax advisers.",
      ],
    },
    markets: {
      index: "02",
      label: "The Markets",
      title: "Nine markets, one guide",
      intro: "Each market has its own rules, character and opportunities. Choose a market to read its full guide.",
      read: "Read the guide",
      compareTitle: "At a glance",
      compare: { market: "Market", hubs: "Main hubs", ownership: "International ownership", residency: "Residency", role: "Role" },
      compareNote: "A simplified summary. Rules change; confirm the details with independent advisers in each country.",
    },
    steps: {
      index: "03",
      label: "How We Guide You",
      title: "Five steps, one point of contact",
      intro: "Each step builds on the one before, and you have a single Elion Partners contact throughout.",
      items: [
        { title: "Introduction", text: "We meet, understand your objectives, budget and timeframe, and explain how the market works." },
        { title: "Shortlist", text: "We present suitable projects, from Elion Real Estate and selected partners, with the information you need to compare them." },
        { title: "Due diligence", text: "Title, permits, developer track record and contracts are reviewed with independent lawyers." },
        { title: "Acquisition", text: "Agreements are signed, payments are structured and ownership is registered transparently." },
        { title: "Stewardship", text: "After completion we can coordinate management, letting and, when the time comes, resale." },
      ],
    },
    developers: {
      index: "04",
      label: "For Developers",
      title: "Partnering with developers",
      lede: "The same discipline applies when we work with developers. We look for partners who share our standards, and we commit to them for the length of the project, not just the launch.",
      points: [
        "Co-development and joint ventures on selected sites",
        "Shared design, materials and quality standards",
        "Introductions to long-term private capital",
        "Sales, marketing and client relationships through the group",
      ],
      cta: "Discuss a partnership",
      imageAlt: "The stone entrance of the ELION GROUP headquarters at dusk, with the name engraved above the door",
    },
    faq: {
      index: "05",
      label: "Questions",
      title: "Frequently asked questions",
      items: [
        { q: "Which markets do you cover?", a: "Nine markets: Georgia, where the group develops its own projects; the United Arab Emirates, Qatar, Saudi Arabia and Oman in the Gulf; the United Kingdom, Portugal and France in Europe; and Zanzibar. In each, Elion Partners works with selected developers and advisers, and many of our international clients also use us as their route into Georgia." },
        { q: "Can foreign nationals buy property in Georgia?", a: "In general, yes. Foreign individuals and companies can acquire non-agricultural property such as apartments and commercial premises. Agricultural land is subject to separate rules. Your independent lawyer will confirm the position for your specific purchase." },
        { q: "How is ownership registered?", a: "Ownership is registered with the National Agency of Public Registry. The process is largely digital and is typically completed quickly once documents are in order. We coordinate the steps with your lawyer and the notary where needed." },
        { q: "Do you only offer ELION GROUP projects?", a: "No. Elion Partners presents projects from Elion Real Estate and from selected partner developers whose standards we have reviewed. We will always tell you which is which." },
        { q: "Do you provide legal or tax advice?", a: "No. We guide the process and share what we know about the market, but legal and tax advice should always come from independent, qualified advisers, whom we can introduce." },
        { q: "How do we begin?", a: "With a conversation. Tell us about your objectives through the contact form or by telephone, and an Elion Partners contact will arrange an introductory meeting in Tbilisi or online." },
      ],
    },
    notice:
      "This guide is general information only. It is not an offer, investment advice, or legal or tax advice. Please read our Disclaimer and take independent advice before investing.",
    disclaimerLink: "Read the Disclaimer",
    cta: "Speak with Elion Partners",
  },

  nextChapter: {
    label: "Continue",
  },

  /**
   * Investment Guide markets. Statements are deliberately general: ownership
   * and residency rules change, so every page directs readers to independent
   * advice. Review with qualified counsel in each country before publishing.
   */
  markets: [
    {
      slug: "georgia" as MarketSlug,
      region: "Home Market",
      name: "Georgia",
      hubs: "Tbilisi · Batumi",
      role: "Home market",
      image: "/images/invest-tbilisi.jpg",
      imageAlt: "Golden-hour view over a new residential district of Tbilisi, with the river, the old town and the Caucasus mountains",
      tagline: "An open market at the meeting point of Europe and Asia, and the home of Elion Real Estate.",
      ownership: "Open to international buyers",
      residency: "Residence routes linked to property",
      overview: {
        lede: "Georgia is where ELION GROUP is registered and where Elion Real Estate builds, so it is the market we know most closely.",
        body: [
          "Its appeal to international investors rests on openness: foreign individuals and companies can generally acquire non-agricultural property on the same basis as local buyers, and ownership is recorded in a largely digital public registry.",
          "That openness is matched by steady demand in Tbilisi and Batumi for homes that are genuinely well built. This is the gap our own developments are designed to fill, and the reason many of the investors we meet in the Gulf choose Georgia as a second market.",
        ],
      },
      highlights: [
        { title: "Open to international buyers", text: "Non-agricultural property, including apartments, can generally be acquired by foreign individuals and companies." },
        { title: "Transparent registration", text: "Ownership is recorded with the National Agency of Public Registry, known for its speed and clarity." },
        { title: "A simple tax framework", text: "Georgia is recognised for a straightforward, business-friendly tax system; your adviser will confirm how it applies to you." },
        { title: "Growing cities", text: "Tbilisi and Batumi continue to attract residents, businesses and visitors." },
      ],
      ownershipPoints: [
        "Foreign buyers can generally purchase apartments and commercial property directly.",
        "Agricultural land is subject to separate, more restrictive rules.",
        "Ownership is registered with the National Agency of Public Registry.",
      ],
      residencyNote: "Property ownership above set value thresholds can support an application for residence. Eligibility and current thresholds should be confirmed with the authorities and your adviser.",
      elion: "In Georgia, Elion Real Estate develops our own projects and Elion Partners presents them alongside selected partner developments, guiding each investor from shortlist to registration.",
    },
    {
      slug: "uae" as MarketSlug,
      region: "The Gulf",
      name: "United Arab Emirates",
      hubs: "Dubai · Abu Dhabi",
      role: "Gulf market",
      image: "/images/market-uae.jpg",
      imageAlt: "The Dubai skyline at dawn, with the Burj Khalifa rising above the towers and highways",
      tagline: "A global hub with established freehold districts and a mature, regulated market.",
      ownership: "Freehold in designated areas",
      residency: "Long-term visa routes",
      overview: {
        lede: "The United Arab Emirates, and Dubai in particular, has become one of the world’s most international property markets.",
        body: [
          "Its strength lies in structure: non-nationals can own freehold property in designated areas, and regulators oversee sales, including off-plan projects, with established registration and escrow practices.",
          "For our investors, that maturity makes the UAE both a market in its own right and a natural point of departure. Many who already hold property in the Emirates look to Georgia for a second, earlier-stage opportunity, which is where Elion Partners connects the two.",
        ],
      },
      highlights: [
        { title: "Freehold districts", text: "Non-nationals can own freehold property in areas designated by each emirate." },
        { title: "Regulated market", text: "Land departments and regulators oversee registration, off-plan sales and escrow arrangements." },
        { title: "Tax environment", text: "The UAE does not levy personal income tax on individuals; other taxes and fees apply and should be reviewed with an adviser." },
        { title: "Global connectivity", text: "A leading aviation and business hub connecting Europe, Asia and Africa." },
      ],
      ownershipPoints: [
        "Freehold ownership for non-nationals is available in designated areas.",
        "Transactions are registered with the relevant land department (in Dubai, the Dubai Land Department).",
        "Off-plan purchases are subject to specific regulation, including escrow requirements.",
      ],
      residencyNote: "Long-term residence visas, including the Golden Visa, can be linked to property investment above set thresholds. Criteria change periodically and should be confirmed with the authorities.",
      elion: "In the UAE, Elion Partners works with selected developers and advisers, and introduces investors based in the Emirates to opportunities in Georgia.",
    },
    {
      slug: "qatar" as MarketSlug,
      region: "The Gulf",
      name: "Qatar",
      hubs: "Doha · Lusail · The Pearl",
      role: "Gulf market",
      image: "/images/market-qatar.jpg",
      imageAlt: "The Doha skyline at blue hour across the bay, with a traditional dhow in the foreground",
      tagline: "A compact, high-quality market shaped by long-term national planning.",
      ownership: "Freehold & usufruct in designated areas",
      residency: "Residency linked to property",
      overview: {
        lede: "Qatar offers a smaller, carefully planned market, with new districts such as Lusail and The Pearl built to a high standard.",
        body: [
          "Non-Qataris may own freehold property, or hold long-term usufruct rights, within areas designated by the government. That framework gives international buyers a clear, if selective, route into the market.",
          "The same long-term planning that shapes Qatar’s cities reflects how ELION GROUP works. For Qatar-based investors, Elion Partners offers guidance on local opportunities and a considered path into Georgian real estate.",
        ],
      },
      highlights: [
        { title: "Designated areas", text: "Freehold and long-term usufruct ownership are available to non-Qataris in government-designated areas." },
        { title: "Planned districts", text: "Developments such as Lusail and The Pearl were planned as complete, high-quality urban districts." },
        { title: "National vision", text: "Qatar National Vision 2030 guides long-term investment in infrastructure and the economy." },
        { title: "Residency route", text: "Property ownership above set values can qualify the owner for residency." },
      ],
      ownershipPoints: [
        "Freehold ownership is permitted for non-Qataris in designated areas.",
        "Long-term usufruct rights are available in additional designated areas.",
        "Registration is handled by the Ministry of Justice’s real estate registration authority.",
      ],
      residencyNote: "Residency, and in some cases additional benefits, can be linked to the value of property owned. Thresholds and conditions should be confirmed with the authorities.",
      elion: "In Qatar, Elion Partners guides investors on local opportunities and connects Qatar-based clients with projects in Georgia.",
    },
    {
      slug: "saudi-arabia" as MarketSlug,
      region: "The Gulf",
      name: "Saudi Arabia",
      hubs: "Riyadh · Jeddah",
      role: "Gulf market",
      image: "/images/market-saudi-arabia.jpg",
      imageAlt: "An aerial view of Riyadh with the Kingdom Centre tower on the skyline",
      tagline: "The region’s largest economy, opening steadily to international ownership.",
      ownership: "Opening in designated zones",
      residency: "Premium Residency routes",
      overview: {
        lede: "Saudi Arabia is in the midst of a transformation that is reshaping its cities, its economy and its property market.",
        body: [
          "Under Vision 2030, recent reforms are extending property ownership to non-Saudis within designated zones, with special conditions in Makkah and Madinah. The framework is new and its implementing rules continue to develop, which makes careful guidance essential.",
          "That is precisely where Elion Partners adds value: following the changes closely, working alongside local advisers, and helping Saudi-based investors compare opportunities at home with those in Georgia.",
        ],
      },
      highlights: [
        { title: "Vision 2030", text: "A national programme driving large-scale investment in cities, tourism and infrastructure." },
        { title: "Widening ownership", text: "Recent reforms open property ownership to non-Saudis in designated zones, subject to approval." },
        { title: "Premium Residency", text: "Residency programmes include routes connected to real estate ownership." },
        { title: "Scale", text: "The largest economy in the Gulf, with major urban development under way in Riyadh and Jeddah." },
      ],
      ownershipPoints: [
        "Ownership by non-Saudis is being permitted within designated zones under the new framework.",
        "Makkah and Madinah are subject to special conditions.",
        "Acquisitions require registration and, in some cases, approval; rules are still evolving.",
      ],
      residencyNote: "The Premium Residency programme includes a route for real estate owners above a set property value. Requirements should be confirmed with the authorities.",
      elion: "In Saudi Arabia, Elion Partners tracks the new ownership framework with local advisers, and offers Saudi-based investors a clear route into Georgian real estate.",
    },
    {
      slug: "oman" as MarketSlug,
      region: "The Gulf",
      name: "Oman",
      hubs: "Muscat · Integrated Tourism Complexes",
      role: "Gulf market",
      image: "/images/market-oman.jpg",
      imageAlt: "The Muttrah Corniche in Muscat at dusk, with a mosque reflected in the water",
      tagline: "A measured, scenic market with freehold ownership in designated complexes.",
      ownership: "Freehold in tourism complexes",
      residency: "Investor residency programme",
      overview: {
        lede: "Oman offers a quieter alternative: a market shaped by its coastline, its heritage and a deliberate pace of development.",
        body: [
          "International buyers can own freehold property within Integrated Tourism Complexes and other areas designated by the government, where residential communities are developed to a consistent standard.",
          "Its calm, long-term character sits naturally with the way ELION GROUP invests. Elion Partners helps Oman-based investors weigh local opportunities and, where it suits their goals, diversify into Georgia.",
        ],
      },
      highlights: [
        { title: "Integrated Tourism Complexes", text: "Designated developments where non-Omanis can own freehold residential property." },
        { title: "Investor residency", text: "A long-term residency programme is available to qualifying investors." },
        { title: "Oman Vision 2040", text: "A national strategy guiding diversification, tourism and urban development." },
        { title: "Stable character", text: "A measured pace of development and a strong sense of place." },
      ],
      ownershipPoints: [
        "Freehold ownership for non-Omanis is available in Integrated Tourism Complexes.",
        "Additional areas may be designated by the government.",
        "Titles are registered with the Ministry of Housing and Urban Planning.",
      ],
      residencyNote: "Property purchases in qualifying developments, and the investor residency programme, can support long-term residence. Conditions should be confirmed with the authorities.",
      elion: "In Oman, Elion Partners guides investors on opportunities in designated complexes and introduces Oman-based clients to projects in Georgia.",
    },
    {
      slug: "united-kingdom" as MarketSlug,
      region: "Europe",
      name: "United Kingdom",
      hubs: "London · Manchester",
      role: "European market",
      image: "/images/market-uk.jpg",
      imageAlt: "An aerial view of London along the Thames, with Tower Bridge and the City skyline",
      tagline: "A deep, transparent market anchored by London, long trusted by international buyers.",
      ownership: "Open to international buyers",
      residency: "No property-based route",
      overview: {
        lede: "For many international families, a home in London is less an investment than a long-standing tradition, and the United Kingdom remains one of the most transparent property markets in the world.",
        body: [
          "There are generally no restrictions on foreign individuals or companies buying property, and title is recorded at HM Land Registry. Overseas entities that hold UK property must also be listed on a public register, part of a framework designed to keep ownership transparent.",
          "That clarity comes with costs that are easy to underestimate, from stamp duty surcharges for non-resident buyers to ongoing management. Elion Partners helps clients weigh those factors, and introduces UK-based buyers to earlier-stage opportunities in Georgia.",
        ],
      },
      highlights: [
        { title: "Open market", text: "Foreign individuals and companies can generally buy freehold and leasehold property." },
        { title: "Rule of law", text: "A long-established legal system and a public land registry underpin every transaction." },
        { title: "Global city", text: "London combines deep rental demand with international schools, finance and culture." },
        { title: "Transparency", text: "Overseas entities holding UK property must be registered on a public register." },
      ],
      ownershipPoints: [
        "Freehold and leasehold property can generally be bought by non-UK buyers.",
        "Title is registered with HM Land Registry.",
        "Stamp duty applies, with surcharges for non-resident buyers and additional homes.",
      ],
      residencyNote: "Buying property in the United Kingdom does not, by itself, provide a right to live there. Immigration routes are separate and should be reviewed with a qualified adviser.",
      elion: "In the United Kingdom, Elion Partners works with selected advisers to guide international clients, including Gulf-based investors, and introduces UK-based buyers to projects in Georgia.",
    },
    {
      slug: "portugal" as MarketSlug,
      region: "Europe",
      name: "Portugal",
      hubs: "Lisbon · Porto · Algarve",
      role: "European market",
      image: "/images/market-portugal.jpg",
      imageAlt: "Lisbon at dusk, with warm lights across the hills and the castle above the old town",
      tagline: "Light, coastline and a historic capital, open to buyers from around the world.",
      ownership: "Open to international buyers",
      residency: "Visa routes; property not a Golden Visa route",
      overview: {
        lede: "Portugal has become one of Europe’s most sought-after places to live, drawn by its light, its coastline and the quiet confidence of Lisbon and Porto.",
        body: [
          "There are no general restrictions on foreigners buying property. Purchases are completed before a notary or other authorised official and registered at the Land Registry, with a Portuguese tax number required from the outset.",
          "Residence rules have changed in recent years, and buying property alone no longer qualifies for the Golden Visa. Elion Partners helps clients understand what remains possible, and offers those who look beyond Portugal a considered path into Georgia.",
        ],
      },
      highlights: [
        { title: "Open to all buyers", text: "Foreign individuals and companies can buy property on the same basis as residents." },
        { title: "Quality of life", text: "A mild climate, a long coastline and two characterful cities in Lisbon and Porto." },
        { title: "Clear process", text: "Notarised deeds and a public Land Registry provide a well-defined path to ownership." },
        { title: "European base", text: "Membership of the European Union and the euro area." },
      ],
      ownershipPoints: [
        "Foreign buyers can purchase property without general restrictions.",
        "A Portuguese tax number (NIF) is required before buying.",
        "Deeds are signed before a notary or authorised official and registered at the Land Registry.",
      ],
      residencyNote: "Direct property purchase no longer qualifies for Portugal’s Golden Visa. Other residence routes exist and should be confirmed with a qualified adviser.",
      elion: "In Portugal, Elion Partners works with selected advisers to guide international buyers, and introduces Portugal-based clients to projects in Georgia.",
    },
    {
      slug: "france" as MarketSlug,
      region: "Europe",
      name: "France",
      hubs: "Paris · Côte d’Azur",
      role: "European market",
      image: "/images/market-france.jpg",
      imageAlt: "The Eiffel Tower at dusk above the Seine in Paris",
      tagline: "Timeless addresses, from the boulevards of Paris to the Riviera.",
      ownership: "Open to international buyers",
      residency: "No property-based route",
      overview: {
        lede: "Few markets carry the enduring appeal of France, where an apartment in Paris or a villa on the Côte d’Azur is often held for generations.",
        body: [
          "International buyers can generally acquire property without restriction. Every sale is completed through a notaire, a public official who verifies title and registers the transfer, which gives the process its reliability.",
          "That reliability is balanced by acquisition costs and, for larger holdings, a real-estate wealth tax. Elion Partners helps clients plan around both, and introduces France-based buyers to opportunities in Georgia.",
        ],
      },
      highlights: [
        { title: "Open market", text: "Foreign individuals and companies can generally buy residential property." },
        { title: "Notarial system", text: "A notaire verifies title and records each sale, providing legal certainty." },
        { title: "Enduring value", text: "Prime addresses in Paris and on the Riviera have long attracted international families." },
        { title: "European base", text: "Membership of the European Union and the euro area." },
      ],
      ownershipPoints: [
        "Property can generally be bought by non-residents without restriction.",
        "Sales are completed through a notaire and recorded with the land registration service.",
        "Acquisition costs and, above set thresholds, a real-estate wealth tax apply.",
      ],
      residencyNote: "Owning property in France does not, by itself, grant a right of residence. Visa and residence routes are separate and should be reviewed with a qualified adviser.",
      elion: "In France, Elion Partners works with selected advisers to guide international clients, and introduces France-based buyers to projects in Georgia.",
    },
    {
      slug: "zanzibar" as MarketSlug,
      region: "Indian Ocean",
      name: "Zanzibar",
      hubs: "Stone Town · Nungwi · Paje",
      role: "Indian Ocean market",
      image: "/images/market-zanzibar.jpg",
      imageAlt: "A white-sand beach lined with palm trees and a thatched shelter beside a turquoise sea",
      tagline: "An emerging island market on the Indian Ocean, shaped by heritage and tourism.",
      ownership: "Leasehold in approved projects",
      residency: "Residence linked to approved purchases",
      overview: {
        lede: "Zanzibar, the semi-autonomous archipelago of Tanzania, joins a UNESCO-listed old town with some of the Indian Ocean’s most beautiful coastline.",
        body: [
          "Land in Zanzibar is not sold freehold to foreigners. Instead, international buyers can acquire residential units on long-term leasehold within projects approved by the Zanzibar Investment Promotion Authority, which makes the choice of project and developer especially important.",
          "That is where Elion Partners adds value: reviewing approvals, developer track records and lease terms with local advisers, and helping clients decide whether an island home belongs alongside holdings in Georgia or the Gulf.",
        ],
      },
      highlights: [
        { title: "Approved projects", text: "Foreign buyers acquire units in developments approved by the Zanzibar Investment Promotion Authority." },
        { title: "Tourism growth", text: "Beaches, heritage and direct flights continue to draw visitors from Europe and the Gulf." },
        { title: "Heritage", text: "Stone Town is a UNESCO World Heritage Site with a distinctive Swahili and Arab character." },
        { title: "Residence route", text: "Purchases in approved projects can support an application for a residence permit." },
      ],
      ownershipPoints: [
        "Land is held under long-term leasehold rather than sold freehold to foreigners.",
        "Foreign buyers acquire units within projects approved by the Zanzibar Investment Promotion Authority.",
        "Lease terms, approvals and developer track record should be reviewed with local advisers.",
      ],
      residencyNote: "Purchases in approved projects above set values can support a residence permit. Requirements should be confirmed with the authorities and a qualified adviser.",
      elion: "In Zanzibar, Elion Partners reviews approved projects with local advisers, and helps international clients weigh an island home alongside opportunities in Georgia and the Gulf.",
    },
  ],

  marketPage: {
    label: "Investment Guide",
    overview: "Overview",
    highlights: "Highlights",
    highlightsTitle: "What draws investors",
    ownership: "Ownership",
    ownershipTitle: "How ownership works",
    residency: "Residency",
    elion: "With Elion",
    elionTitle: "How Elion Partners works here",
    others: "Other Markets",
    othersTitle: "Explore the other markets",
    hubs: "Main hubs",
    advice: "This page is general information only and may not reflect the latest rules. It is not legal, tax or investment advice. Always take independent advice in the relevant country before investing.",
    back: "Back to the Investment Guide",
    speak: "Speak with Elion Partners",
  },
};

export type MarketSlug =
  | "georgia"
  | "uae"
  | "qatar"
  | "saudi-arabia"
  | "oman"
  | "united-kingdom"
  | "portugal"
  | "france"
  | "zanzibar";
