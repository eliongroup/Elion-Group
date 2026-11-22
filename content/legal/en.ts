/**
 * DRAFT legal texts — structure only, to be reviewed by a lawyer in Georgia.
 * All company placeholders come from content/site.ts.
 */
import { fullAddress, site } from "@/content/site";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type LegalSection = { id: string; heading: string; blocks: LegalBlock[] };
export type LegalDocument = {
  slug: LegalSlug;
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

export const legalSlugs = ["privacy", "terms", "cookies", "notice", "disclaimer"] as const;
export type LegalSlug = (typeof legalSlugs)[number];

const company = `${site.legalName}, a limited liability company registered in Georgia by the ${site.registry} under identification number ${site.registrationNumber}, with its legal address at ${fullAddress}`;

const privacy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  description: "How ELION GROUP collects, uses and protects personal data.",
  intro: `This Privacy Policy explains how ${site.name} processes personal data when you visit this website or contact us. It is prepared in line with the Law of Georgia on Personal Data Protection and reflects the rights recognised under the EU General Data Protection Regulation (GDPR).`,
  sections: [
    {
      id: "controller",
      heading: "1. Who we are",
      blocks: [
        { type: "p", text: `The data controller is ${company}.` },
        { type: "p", text: `For any question about this policy or your personal data, write to ${site.email}.` },
      ],
    },
    {
      id: "data-we-collect",
      heading: "2. Data we collect",
      blocks: [
        { type: "h3", text: "Information you give us" },
        {
          type: "ul",
          items: [
            "Contact form: your name, email address, telephone number (optional), subject and message.",
            "Correspondence: any information you include when writing to us by email, telephone or WhatsApp.",
          ],
        },
        { type: "h3", text: "Information collected automatically" },
        {
          type: "ul",
          items: [
            "Technical data such as IP address, browser type, device and pages visited, processed by our hosting provider for security and operation.",
            "Cookie preferences and, only with your consent, analytics data. See our Cookie Policy.",
          ],
        },
      ],
    },
    {
      id: "purposes",
      heading: "3. Purposes and legal bases",
      blocks: [
        {
          type: "table",
          head: ["Purpose", "Legal basis"],
          rows: [
            ["Responding to your enquiry", "Your request and our legitimate interest in answering it; your consent where required"],
            ["Operating and securing the website", "Our legitimate interest in a secure, functioning website"],
            ["Analytics (if enabled)", "Your consent, which you may withdraw at any time"],
            ["Complying with legal obligations", "Legal obligation under Georgian law"],
          ],
        },
      ],
    },
    {
      id: "retention",
      heading: "4. How long we keep data",
      blocks: [
        {
          type: "p",
          text: "We keep enquiries for as long as needed to respond and to maintain a record of our correspondence, and in any case no longer than [24 months] after our last contact, unless a longer period is required by law.",
        },
      ],
    },
    {
      id: "recipients",
      heading: "5. Who receives your data",
      blocks: [
        { type: "p", text: "We do not sell personal data. We share it only with service providers acting on our instructions:" },
        {
          type: "ul",
          items: [
            "Website hosting: Vercel Inc. (infrastructure and security logs).",
            "Email delivery: Resend (transmission of contact-form messages).",
            "Professional advisers and authorities where required by law.",
          ],
        },
      ],
    },
    {
      id: "transfers",
      heading: "6. International transfers",
      blocks: [
        {
          type: "p",
          text: "Some providers process data outside Georgia, including in the European Union and the United States. Where this happens, we rely on appropriate safeguards recognised under Georgian law, such as standard contractual clauses.",
        },
      ],
    },
    {
      id: "rights",
      heading: "7. Your rights",
      blocks: [
        { type: "p", text: "Subject to the conditions set by law, you have the right to:" },
        {
          type: "ul",
          items: [
            "be informed about the processing of your data and access it;",
            "have inaccurate data corrected or completed;",
            "have your data deleted or destroyed;",
            "restrict or block processing;",
            "receive your data in a portable format;",
            "object to processing based on legitimate interests;",
            "withdraw consent at any time, without affecting earlier processing.",
          ],
        },
        {
          type: "p",
          text: `To exercise a right, write to ${site.email}. We will respond within the period required by law. You may also lodge a complaint with the Personal Data Protection Service of Georgia.`,
        },
      ],
    },
    {
      id: "security",
      heading: "8. Security",
      blocks: [
        {
          type: "p",
          text: "We apply appropriate technical and organisational measures, including encrypted connections (HTTPS), restricted access and spam protection, to protect personal data against loss and unauthorised access.",
        },
      ],
    },
    {
      id: "changes",
      heading: "9. Changes to this policy",
      blocks: [
        { type: "p", text: "We may update this policy. The date at the top of this page shows when it was last revised." },
      ],
    },
  ],
};

const terms: LegalDocument = {
  slug: "terms",
  title: "Terms of Use",
  description: "The terms that apply to the use of the ELION GROUP website.",
  intro: `These Terms of Use govern your use of this website, operated by ${company}. By using the website you accept these terms.`,
  sections: [
    {
      id: "use",
      heading: "1. Use of the website",
      blocks: [
        {
          type: "p",
          text: "You may use this website for lawful, personal and informational purposes. You must not interfere with its operation, attempt unauthorised access or use it to transmit unlawful or harmful content.",
        },
      ],
    },
    {
      id: "ip",
      heading: "2. Intellectual property",
      blocks: [
        {
          type: "p",
          text: `All content on this website, including names, logos, text, design and images, is owned by or licensed to ${site.name} and protected by intellectual property law. No licence is granted except to view the website.`,
        },
        {
          type: "p",
          text: `The names ${site.name}, Elion Real Estate and Elion Timepieces, and related marks, may not be used without prior written permission.`,
        },
      ],
    },
    {
      id: "information",
      heading: "3. Information on this website",
      blocks: [
        {
          type: "p",
          text: "Information is provided for general purposes only and may change without notice. It does not constitute an offer, advice or a binding commitment. Please read our Disclaimer.",
        },
      ],
    },
    {
      id: "links",
      heading: "4. Links to other websites",
      blocks: [
        { type: "p", text: "We are not responsible for the content or practices of websites we link to." },
      ],
    },
    {
      id: "liability",
      heading: "5. Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "To the extent permitted by law, we are not liable for any loss arising from the use of, or inability to use, this website or its content.",
        },
      ],
    },
    {
      id: "law",
      heading: "6. Governing law",
      blocks: [
        {
          type: "p",
          text: "These terms are governed by the laws of Georgia. Disputes are subject to the jurisdiction of the courts of Georgia, without prejudice to mandatory consumer protections.",
        },
      ],
    },
  ],
};

const cookies: LegalDocument = {
  slug: "cookies",
  title: "Cookie Policy",
  description: "How the ELION GROUP website uses cookies and how to manage them.",
  intro:
    "Cookies are small text files stored on your device. This policy explains which cookies this website uses and how you can control them.",
  sections: [
    {
      id: "what-we-use",
      heading: "1. Cookies we use",
      blocks: [
        {
          type: "table",
          head: ["Name", "Category", "Purpose", "Duration"],
          rows: [
            ["elion_consent", "Essential", "Stores your cookie choices", "12 months"],
            ["[analytics cookie]", "Analytics", "Only if analytics is enabled and you consent", "[duration]"],
          ],
        },
        {
          type: "p",
          text: "At present the website sets only the essential consent cookie. No analytics or advertising cookies are set unless you give consent and we enable such a service, in which case this table will be updated.",
        },
      ],
    },
    {
      id: "third-parties",
      heading: "2. Third-party content",
      blocks: [
        {
          type: "p",
          text: "The map on our contact page is provided by OpenStreetMap and loads only when you choose to display it. When loaded, OpenStreetMap may process your IP address under its own privacy policy.",
        },
      ],
    },
    {
      id: "manage",
      heading: "3. Managing your choices",
      blocks: [
        {
          type: "p",
          text: "You can change your choices at any time through the “Cookie settings” link in the footer. You can also block or delete cookies in your browser settings; essential features may then not work.",
        },
      ],
    },
  ],
};

const notice: LegalDocument = {
  slug: "notice",
  title: "Legal Notice",
  description: "Company information for ELION GROUP.",
  intro: "Information about the company responsible for this website.",
  sections: [
    {
      id: "company",
      heading: "1. Company information",
      blocks: [
        {
          type: "table",
          head: ["", ""],
          rows: [
            ["Registered name", site.legalName],
            ["Legal form", site.legalForm],
            ["Identification number", site.registrationNumber],
            ["Date of registration", site.registrationDate],
            ["Registering authority", site.registry],
            ["Legal address", fullAddress],
            ["Governing bodies", site.governingBodies.join(", ")],
            ["Director", site.legalRepresentative],
            ["Email", site.email],
            ["Telephone", site.phoneDisplay],
          ],
        },
      ],
    },
    {
      id: "responsibility",
      heading: "2. Responsibility for content",
      blocks: [
        {
          type: "p",
          text: `${site.legalName} is responsible for the content of this website. Brand names shown belong to ${site.name} or its subsidiaries, or are under registration.`,
        },
      ],
    },
    {
      id: "credits",
      heading: "3. Image credits",
      blocks: [
        { type: "p", text: "Images on this website are illustrative visualisations created for the group and do not depict actual premises, projects or people. They will be replaced by the group's own photography." },
      ],
    },
  ],
};

const disclaimer: LegalDocument = {
  slug: "disclaimer",
  title: "Disclaimer",
  description: "Important information about the brands and statements on the ELION GROUP website.",
  intro: "Please read this disclaimer carefully before relying on any information on this website.",
  sections: [
    {
      id: "development",
      heading: "1. Brands under development",
      blocks: [
        {
          type: "p",
          text: "Several brands, projects and products presented on this website are in development or preparation. Descriptions, images, timelines and features are indicative only and may change or not proceed.",
        },
      ],
    },
    {
      id: "no-offer",
      heading: "2. No investment offer",
      blocks: [
        {
          type: "p",
          text: `Nothing on this website constitutes an offer to sell, or a solicitation of an offer to buy, any securities, shares, interests or other investments in ${site.name} or any of its brands, nor investment, legal, tax or financial advice.`,
        },
      ],
    },
    {
      id: "forward-looking",
      heading: "3. Forward-looking statements",
      blocks: [
        {
          type: "p",
          text: "Statements about plans, intentions and future developments reflect current expectations and are subject to risks and uncertainties. Actual results may differ materially.",
        },
      ],
    },
    {
      id: "accuracy",
      heading: "4. Accuracy of information",
      blocks: [
        {
          type: "p",
          text: "We take care to keep information accurate and current, but give no warranty as to its completeness or accuracy. Figures shown may be illustrative.",
        },
      ],
    },
    {
      id: "images",
      heading: "5. Images",
      blocks: [
        {
          type: "p",
          text: "Images on this website may be illustrative or sourced from photographic libraries, and do not necessarily depict actual properties, products or people of the group.",
        },
      ],
    },
  ],
};

export const legalDocuments: Record<LegalSlug, LegalDocument> = {
  privacy,
  terms,
  cookies,
  notice,
  disclaimer,
};
