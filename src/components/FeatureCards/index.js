import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

// Enhanced Feature Card component that implements all requested improvements
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  tabs, 
  link = "/docs/intro" 
}) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '');

  return (
    <div className={styles.featureCard}>
      {/* Icon is now a component that includes SVG */}
      {icon}
      
      {/* Centered heading */}
      <h3 className={styles.featureTitle}>{title}</h3>
      
      <p className={styles.featureDescription}>{description}</p>
      
      {/* Tab navigation - only render if tabs exist */}
      {tabs && tabs.length > 0 && (
        <div className={styles.tabsContainer}>
          <div className={styles.tabsNav}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={clsx(styles.tabButton, { [styles.active]: activeTab === tab.id })}
                onClick={() => setActiveTab(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
                aria-controls={`tabpanel-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Responsive tab content area */}
          <div className={styles.tabContent}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`tabpanel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                className={clsx(styles.tabPane, { [styles.active]: activeTab === tab.id })}
              >
                <ul className={styles.featureList}>
                  {tab.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

// Updated icon components to use stroke-based style similar to PricingCards
const MultiLevelAdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" aria-hidden="true" className={styles.featureIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const AutomatedSchedulingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" aria-hidden="true" className={styles.featureIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm4-7l2 2 4-4" />
  </svg>
);

const PowerfulReportingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" aria-hidden="true" className={styles.featureIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const EmailSMSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" aria-hidden="true" className={styles.featureIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const FullIntegrationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" aria-hidden="true" className={styles.featureIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const MobileFriendlyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" aria-hidden="true" className={styles.featureIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

// Feature cards data
const featureCardsData = [
  {
    icon: <MultiLevelAdminIcon />,
    title: "Multi-Level Access",
    description: "Empower your team with granular admin access to ensure seamless collaboration and efficient management of your event. Easily delegate management responsibilities by granting specific permissions based on their roles and management areas.",
    tabs: [
      {
        id: "full",
        label: "Access Level",
        items: ["Full access", "Site build", "Reporting", "Communication", "Financial"]
      },
      {
        id: "limited",
        label: "Manage",
        items: ["All sites", "Specific sites", "Specific activities", "Specific groups"]
      },
    ]
  },
  {
    icon: <AutomatedSchedulingIcon />,
    title: "Smart Scheduling",
    description: "Every event is unique. Whether you're managing less than 500 or over 10,000 volunteers, our system scales to meet your needs. Explore the options for individual and group registration, bulk scheduling, registration imports, and much more!",
    tabs: [
      {
        id: "self-service",
        label: "Schedule",
        items: ["Self-scheduling", "Group registration", "Bulk shift assignment", "Edit/view schedules", "Availability collection"]
      },
      {
        id: "admin-tools",
        label: "Admin",
        items: ["Time slot imports", "Team leader management", "Time conflict checks", "Capacity management", "Registration imports"]
      },
    ]
  },
  {
    icon: <PowerfulReportingIcon />,
    title: "Advanced Reports",
    description: "Gain real-time insights into your program with our custom reports. Instantly access up-to-date data on registrations, scheduling, attendance, and more.",
    tabs: [
      {
        id: "filters",
        label: "Sort by",
        items: ["Roles & activity groups",
"Activities & shifts",
"Responses (e.g: shirt size)",
"Location",
"Time slot capacity"]
      },
      {
        id: "tracking",
        label: "Track",
        items: ["Background check status", "Waiver signature",
"Volunteer hours",
"Payments & refunds",
"Number of shifts"]
      },
      {
        id: "export",
        label: "Export",
        items: ["Save reports with filters", "Export to CSV"]
      }
    ]
  },
  {
    icon: <FullIntegrationIcon />,
    title: "Custom Registration",
    description: "Create a tailored registration experience with customizable fields, access controls, and security measures. Use pre-built templates or clone past events for a quick and seamless setup.",
    tabs: [
      {
        id: "creation",
        label: "Tailored",
        items: ["Role-based questions",
"Custom activity structure",
"Custom landing page",
"Registrant curation"]
      },
      {
        id: "delivery",
        label: "Easy",
        items: ["Pre-built templates",
"Clone past events",
"Time slot imports"]
      },
      {
        id: "tracking",
        label: "Secure",
        items: ["Waiver e-signatures",
"Encrypted fields",
"Activity access controls"]
      }
    ]
  },
  {
    icon: <EmailSMSIcon />,
    title: "Email & SMS",
    description: "Streamline volunteer communication with myTRS's powerful tools. Explore the options to customize, schedule, track, and send bulk emails/SMS to your volunteers!",
    tabs: [
      {
        id: "automation",
        label: "Automated",
        items: ["Auto registration confirmation",
"Schedule emails",
"Bulk resend confirmation",
"Bulk emails/SMS"
        ]
      },
      {
        id: "customization",
        label: "Custom",
        items: ["Personalized mail merge",
"Custom email templates",
"Add file hyperlinks",
"Embed maps & images"]
      },
      {
        id: "manage",
        label: "Manage",
        items: ["Shift cancellation notifications", 
"Track email history", 
"Track delivery status", 
"Cc' emails & reply-to options"]
      }
    ]
  },
  {
    icon: <MobileFriendlyIcon />,
    title: "Full Integrations",
    description: "Connect with leading systems for payments, background checks, analytics, multilingual support, and credential printing. Integrate seamlessly to enhance efficiency and user experience.",
    tabs: [
      {
        id: "features",
        label: "Essential",
        items: ["Sterling backgroud checks", "Payment processing", "Transifex multilingual setup"]
      },
      {
        id: "compatibility",
        label: "Additional",
        items: ["Google Analytics",
"DYMO credential printing",
"CRM"]
      }
    ]
  }
];

// Main component that renders all feature cards
const FeatureCards = () => {
  return (
    <div className={styles.featureCardsGrid}>
      {featureCardsData.map((card, index) => (
        <FeatureCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          tabs={card.tabs}
        />
      ))}
    </div>
  );
};

export default FeatureCards;