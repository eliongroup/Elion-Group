/**
 * English copy. Other locales must export an object of the same shape
 * (`satisfies Dictionary`), which keeps translations complete and typed.
 */
import { businessEn } from "./en-business";

export const en = {
  ...businessEn,
  meta: {
    siteDescription:
      "ELION GROUP is a holding group registered in Georgia, active in real estate development, investment partnerships and luxury timepieces.",
    home: {
      title: "ELION GROUP — Building Enduring Legacies",
      description:
        "A Georgian holding group in real estate development, investment partnerships and luxury timepieces, built for the long term.",
    },
    about: {
      title: "About",
      description:
        "The story, mission, values and structure of ELION GROUP, a diversified holding group registered in Georgia.",
    },
    team: {
      title: "Team",
      description:
        "The leadership and people of ELION GROUP, and how the group is organised across real estate, luxury goods and future ventures.",
    },
    contact: {
      title: "Contact",
      description: "Contact ELION GROUP. Office in Georgia, by email, telephone or WhatsApp.",
    },
    notFound: { title: "Page not found" },
  },

  nav: {
    skip: "Skip to content",
    home: "Home",
    about: "About",
    team: "Team",
    businesses: "Businesses",
    investment: "Investment",
    blog: "Blog",
    contact: "Contact",
    enquire: "Enquire",
    menu: "Menu",
    close: "Close",
    mainLabel: "Main",
    menuTitle: "Navigation",
    menuCta: "Contact the Group",
    toggle: "Show the {menu} menu",
    aboutIntro: "A Georgian holding group in real estate development, investment partnerships and luxury timepieces.",
    aboutAll: "About the group",
    story: "Our Story",
    storyText: "History, mission, values and the structure of the group.",
    storyImageAlt: "Tbilisi at sunset, with the Holy Trinity Cathedral and the Narikala fortress lit in gold",
    teamText: "The leadership and functions behind the group.",
    teamImageAlt: "The leadership team around an architectural model, before a window over Tbilisi",
    investmentImageAlt: "A new residential district of Tbilisi at golden hour, with the river and the Caucasus mountains",
    menuImageAlt: "Tbilisi at dusk, with the old town and the Narikala fortress",
    ourBusinesses: "Our Businesses",
    businessesIntro: "Three businesses and one investment guide, connected by a single standard.",
    businessesAll: "All businesses",
    theBusinesses: "The Businesses",
    investmentGuide: "Investment Guide",
    investmentText: "Nine markets across Georgia, the Gulf, Europe and Zanzibar.",
    byCountry: "By Country",
    call: "Call",
    email: "Email",
    office: "Office",
  },

  common: {
    status: {
      active: "Active",
      soon: "Coming Soon",
      forming: "In Formation",
    },
    learnMore: "Learn more",
  },

  home: {
    hero: {
      eyebrow: "ELION GROUP — Est. 2026",
      title: "Building Enduring Legacies",
      subtitle: "A Georgian holding group in real estate development, investment partnerships and luxury timepieces.",
      cta: "Discover the Group",
      secondary: "Explore the Investment Guide",
      scroll: "Scroll",
      imageAlt: "Tbilisi at dusk: an illuminated limestone tower beside the old town, the Narikala fortress and the Mtkvari river",
      facts: [
        { label: "Headquarters", value: "Tbilisi, Georgia" },
        { label: "Established", value: "2026" },
        { label: "Businesses", value: "Real Estate · Investment · Timepieces" },
      ],
    },
    intro: {
      index: "01",
      label: "The Group",
      imageAlt: "The ELION GROUP reception: brass lettering on a travertine wall above a stone reception desk, in late sunlight",
      statement:
        "ELION GROUP brings together a small number of businesses we intend to hold for generations. We develop real estate, guide the investors and partners who build with us, and carry the same craftsmanship into luxury goods, so that each part of the group makes the others stronger.",
      /* Only verifiable figures. Add "m² under development" and "partner developers" here once they are real. */
      figures: [
        { value: "9", label: "Markets covered for investors" },
        { value: "4", label: "Regions: Georgia, the Gulf, Europe, Zanzibar" },
        { value: "1", label: "Point of contact from enquiry to ownership" },
      ],
    },
    businesses: {
      index: "02",
      label: "Our Businesses",
      title: "Three businesses, one standard",
      intro: "One develops, one connects, one crafts, and each makes the others stronger.",
      all: "View all businesses",
    },
    invest: {
      index: "04",
      label: "Investment Guide",
      title: "Nine markets, one guide",
      text: "Our investors look across Georgia, the Gulf and Europe, and so do we. Elion Partners gives them one clear path, from the first conversation to registered ownership.",
      how: "How a Tbilisi group covers nine markets: we develop our own projects in Georgia. Elsewhere, Elion Partners works with selected local developers and licensed advisers, and stays your single point of contact.",
      points: [
        "Georgia, the Gulf, Europe and Zanzibar",
        "One point of contact through Elion Partners",
        "Independent legal and tax advice at every step",
      ],
      link: "Read the Investment Guide",
      imageAlt: "Golden-hour view over a new residential district of Tbilisi, with the river, the old town and the Caucasus mountains",
    },
    values: {
      index: "05",
      label: "What Guides Us",
      title: "Principles that outlast cycles",
    },
    quote: {
      label: "A Message from Leadership",
      text: "We are not building for the next season. We are building companies that our partners, our clients and the next generation can rely on — quietly, carefully and for a very long time.",
      name: "[Founder Name]",
      role: "Founder & Chairman, ELION GROUP",
      imageAlt: "A leader in a navy suit, seen from behind, looking out over Tbilisi old town and the Narikala fortress at golden hour",
    },
  },

  values: [
    {
      icon: "integrity" as const,
      title: "Integrity",
      text: "We keep our word, disclose openly and choose the right course over the convenient one.",
    },
    {
      icon: "craft" as const,
      title: "Craftsmanship",
      text: "Quality is decided in the details: in materials, in design and in the people we work with.",
    },
    {
      icon: "stewardship" as const,
      title: "Long-term Stewardship",
      text: "We hold assets for generations and make decisions that remain sound for decades.",
    },
    {
      icon: "discretion" as const,
      title: "Discretion",
      text: "We let our work speak, and we treat the trust of our partners as our most valued asset.",
    },
  ],

  blog: {
    meta: {
      title: "Blog",
      description: "News and insights from ELION GROUP on real estate in Georgia, investment across our markets and the group's businesses.",
    },
    header: {
      label: "Blog",
      title: "News & Insights",
      text: "Updates from the group, and our view on real estate and investment in Georgia and beyond.",
    },
    empty: "Our first articles will be published here soon.",
    read: "Read article",
    all: "All articles",
    minRead: "min read",
    by: "By",
    latest: {
      index: "06",
      label: "From the Blog",
      title: "Latest articles",
      all: "View all articles",
    },
  },

  ctaBand: {
    label: "Contact",
    title: "Begin a conversation.",
    text: "For investment, partnerships and press enquiries, our team will respond personally.",
    button: "Contact the Group",
    whatsapp: "Message us on WhatsApp",
    newTab: "(opens in a new tab)",
    imageAlt: "The ELION GROUP client lounge at golden hour: cream armchairs, a travertine table and a view of the Narikala fortress",
  },

  about: {
    hero: {
      label: "About",
      title: "Our Story",
      imageAlt: "Tbilisi at sunset with the Holy Trinity Cathedral and the Narikala fortress lit in gold beside a glowing tower",
      text: "A holding group built slowly, held patiently, and made to be handed on.",
    },
    story: {
      index: "01",
      label: "Our Story",
      lede: "ELION GROUP was founded in Georgia with a simple conviction: that the best businesses are built slowly, held patiently and handed on in better condition than they were found.",
      body: [
        "We began with real estate, a field where quality is visible and permanence matters. Elion Real Estate develops residential and mixed-use projects, and Elion Partners grew alongside it to guide the investors and developers who build with us.",
        "From that foundation the group is extending into luxury goods through Elion Timepieces. Each business keeps its own leadership and character, while the group provides capital, governance and a common standard: considered design, honest dealing and a long horizon.",
      ],
      imageAlt: "A private office at dusk with a walnut desk and a wide window over the lights of Tbilisi",
    },
    missionVision: {
      index: "02",
      label: "Mission & Vision",
      mission: {
        title: "Mission",
        text: "To build and steward brands of lasting quality, creating value for our clients, partners and communities over generations.",
      },
      vision: {
        title: "Vision",
        text: "To be recognised as a Georgian group whose name stands for permanence, craftsmanship and trust, at home and abroad.",
      },
    },
    values: { index: "03", label: "Our Values", title: "What we hold to" },
    structure: {
      index: "04",
      label: "Group Structure",
      title: "One group, distinct houses",
      intro:
        "ELION GROUP acts as the holding company. Its three businesses each have their own leadership, while sharing the group’s capital, governance and standards.",
      holding: "ELION GROUP",
      holdingNote: "Holding company",
    },
    leadership: {
      index: "05",
      label: "Leadership",
      title: "The people behind the group",
      people: [
        { name: "[Name Surname]", role: "Founder & Chairman", initials: "—" },
        { name: "[Name Surname]", role: "Chief Executive Officer", initials: "—" },
        { name: "[Name Surname]", role: "Managing Director, Elion Real Estate", initials: "—" },
      ],
      note: "Profiles will be published shortly.",
      teaser:
        "A small, senior team leads the group, with dedicated leadership for each business.",
      link: "Meet the team",
    },
    timeline: {
      index: "06",
      label: "Milestones",
      title: "A long view, step by step",
      items: [
        { year: "2026", title: "ELION GROUP founded", text: "The holding company is registered in Georgia." },
        { year: "2026", title: "Elion Real Estate", text: "The first development programme begins in Tbilisi." },
        { year: "2026", title: "Elion Partners", text: "Investor guidance and developer partnerships begin." },
        { year: "[2027]", title: "Elion Timepieces", text: "A house of watchmaking, now in preparation." },
        { year: "Future", title: "Future Ventures", text: "New businesses that meet the group’s standards." },
      ],
    },
  },

  team: {
    hero: {
      label: "Team",
      title: "The People of Elion",
      text: "A small, senior team of builders, investors and makers, united by a long horizon and a shared standard.",
      imageAlt: "The leadership team, seen from behind, around an architectural model before a window over Tbilisi at golden hour",
    },
    intro: {
      index: "01",
      label: "Our Approach",
      statement:
        "We keep the team deliberately small and senior. Each business is led by people who know their craft, supported by a group that provides capital, governance and continuity.",
    },
    leadership: {
      index: "02",
      label: "Leadership",
      title: "Leadership",
      intro: "Full profiles will be published as the group grows.",
      photoAlt: "Portrait of {name}, {role}",
      // Team members are managed in the admin panel: /admin/team
    },
    functions: {
      index: "03",
      label: "Group Functions",
      title: "How the group is organised",
      items: [
        { title: "Investment & Strategy", text: "Capital allocation, new ventures and the long-term plan of the group." },
        { title: "Development & Real Estate", text: "Land, design and delivery of Elion Real Estate projects." },
        { title: "Brand & Design", text: "The identity of each house and the standard of every detail." },
        { title: "Finance & Governance", text: "Reporting, compliance and the controls that protect our partners’ trust." },
      ],
    },
    culture: {
      index: "04",
      label: "How We Work",
      title: "Fewer decisions, made carefully",
      points: [
        "We hire slowly and build careers for the long term.",
        "Every project has one accountable owner.",
        "Craft is reviewed in person, at full scale, before it is approved.",
        "We say less in public and deliver more in private.",
      ],
      imageAlt: "A private library with walnut shelves, a leather armchair and a window over the city lights at dusk",
    },
    careers: {
      label: "Careers",
      title: "Join the group",
      text: "We are glad to hear from exceptional people in development, design, finance and watchmaking.",
      button: "Send your profile",
    },
  },

  contact: {
    header: {
      label: "Contact",
      title: "Begin a conversation",
      imageAlt: "The ELION GROUP boardroom overlooking Tbilisi at golden hour",
      text: "Write to us about investment, developer partnerships, our businesses or press enquiries. We reply personally, usually within two business days.",
    },
    form: {
      title: "Send a message",
      name: "Full name",
      email: "Email address",
      phone: "Telephone",
      optional: "Optional",
      subject: "Subject",
      subjectPlaceholder: "Select a subject",
      subjects: ["General enquiry", "Real estate", "Investment", "Developer partnership", "Timepieces", "Careers", "Press", "Other"],
      message: "Message",
      consentBefore: "I have read the",
      consentLink: "Privacy Policy",
      consentAfter: "and agree to my details being used to answer this enquiry.",
      submit: "Send message",
      submitting: "Sending…",
      required: "Required",
      successTitle: "Thank you.",
      successText: "Your message has been received. We will reply within two business days.",
      sendAnother: "Send another message",
      errorTitle: "Your message could not be sent.",
      errorText: "Please try again in a moment, or write to us directly at",
      errorsSummary: "Please correct the highlighted fields.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid telephone number.",
        subject: "Please choose a subject.",
        message: "Please write a message of at least 20 characters.",
        consent: "Please confirm that you agree to the Privacy Policy.",
        rate: "Too many messages were sent from this connection. Please try again later.",
      },
      honeypot: "Leave this field empty",
    },
    details: {
      title: "Office",
      office: "Office",
      email: "Email",
      phone: "Telephone",
      hours: "Hours",
      whatsapp: "Message on WhatsApp",
    },
    map: {
      title: "Location",
      previewAlt: "The stone entrance of the ELION GROUP office at dusk",
      load: "Load map",
      notice: "The map is provided by OpenStreetMap and loads only when you choose.",
      open: "Open in OpenStreetMap",
      iframeTitle: "Map showing the ELION GROUP office location",
    },
  },

  legal: {
    label: "Legal",
    updated: "Last updated",
    draft: "DRAFT – to be reviewed by a lawyer.",
    draftText:
      "This text is a working draft provided for structure only. It is not legal advice and must be reviewed by qualified counsel in Georgia before publication.",
    onThisPage: "On this page",
    otherDocuments: "Other documents",
  },

  footer: {
    statement:
      "A Georgian holding group in real estate development, investment partnerships and luxury timepieces.",
    group: "Group",
    legal: "Legal",
    contact: "Contact",
    registered: "Registered in Georgia",
    id: "ID",
    cookieSettings: "Cookie settings",
    rights: "All rights reserved.",
  },

  cookies: {
    title: "Cookies",
    short: "We use essential cookies, and analytics only with your consent.",
    text: "We use essential cookies to run this website. With your consent, we may also use analytics cookies to understand how it is used.",
    policy: "Cookie Policy",
    accept: "Accept all",
    decline: "Essential only",
    settings: "Settings",
    save: "Save choices",
    essential: "Essential",
    essentialText: "Required for the website to function. Always on.",
    analytics: "Analytics",
    analyticsText: "Helps us understand how visitors use the website. Off unless you agree.",
    dialogLabel: "Cookie preferences",
  },

  notFound: {
    label: "Error 404",
    title: "This page has moved or never existed.",
    text: "The address may be mistyped, or the page may have been retired.",
    home: "Return home",
    contact: "Contact us",
  },

  legalNav: {
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookies: "Cookie Policy",
    notice: "Legal Notice",
    disclaimer: "Disclaimer",
  },
};

export type Dictionary = typeof en;
export type BrandStatus = Dictionary["divisions"][number]["status"] | Dictionary["futureVentures"]["status"];
export type ValueIcon = Dictionary["values"][number]["icon"];
