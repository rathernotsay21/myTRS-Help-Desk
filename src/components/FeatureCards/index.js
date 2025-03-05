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
      {/* Centered icon with consistent sizing */}
      <div className={styles.featureIcon}>
        {icon}
      </div>
      
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
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Fixed height tab content area */}
          <div className={styles.tabContent}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
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

// Improved icons for the specific cards
const Icons = {
  // Better icon for Multi-Level Admin
  MultiLevelAdmin: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      {/* Font Awesome User Shield - better represents admin access */}
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3zm420.2-93.9c-15.8-17.9-39.1-26.5-62.3-23.7l-47.9 5.9c-6.6-14.5-19.9-24.8-35.9-26.3c-24.1-2.4-45.9 13.7-50.8 37.3L385.3 335c30.9 34.1 48.7 78.9 48.7 126.8c0 3.4-.2 6.8-.5 10.2h73.1c41.8 0 80.4-22.1 101.4-58.3c7.9-13.5 15.3-28.7 21.8-45.3c8.9-22.8 13.7-47 14.2-71.6c.3-13.8-5.2-27-15.2-37.7z"/>
    </svg>
  ),
  
  // Better icon for Automated Scheduling
  AutomatedScheduling: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      {/* Font Awesome Calendar with Check */}
      <path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128c0-35.3 28.7-64 64-64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
    </svg>
  ),
  
  // Better icon for Powerful Reporting
  PowerfulReporting: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      {/* Font Awesome Chart Column */}
      <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c0-17.7 14.3-32 32-32s32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V224zm128-64V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zm128-64c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V128c0-17.7 14.3-32 32-32z"/>
    </svg>
  ),
  
  // EmailSMS icon
  EmailSMS: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      {/* Font Awesome Comment Dots */}
      <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
    </svg>
  ),
  
  // Better icon for Full Integration
  FullIntegration: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      {/* Font Awesome Network Wired */}
      <path d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z"/>
    </svg>
  ),
  
  // MobileFriendly icon
  MobileFriendly: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      {/* Font Awesome Mobile Alt */}
      <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z"/>
    </svg>
  )
};

// Feature cards data
const featureCardsData = [
  {
    icon: Icons.MultiLevelAdmin,
    title: "Multi-Level Admin Access",
    description: "Empower your team with granular access. Delegate responsibilities by granting specific permissions to team members for the sites, activities, areas and groups they oversee.",
    tabs: [
      {
        id: "full",
        label: "Full Access",
        items: ["Complete system access", "Manage all settings", "Oversee all registrations"]
      },
      {
        id: "limited",
        label: "Limited Access",
        items: ["Restricted to specific areas", "View-only reports", "Limited user management"]
      },
      {
        id: "specialized",
        label: "Specialized Access",
        items: ["Send emails & messages", "Manage finances and transactions", "Handle specific event types"]
      }
    ]
  },
  {
    icon: Icons.AutomatedScheduling,
    title: "Automated Scheduling",
    description: "Every event is unique. myTRS offers flexible scheduling tools that adapt to your specific needs. Our system can handle anything from local festivals to the Super Bowl.",
    tabs: [
      {
        id: "self-service",
        label: "Self-Service",
        items: ["User-selected time slots", "Calendar view of availability", "Automatic waitlist management"]
      },
      {
        id: "admin-tools",
        label: "Admin Tools",
        items: ["Bulk scheduling options", "Drag-and-drop interface", "Schedule template library"]
      },
      {
        id: "management",
        label: "Management",
        items: ["Automatic time conflict checks", "Capacity management for activities & time slots", "Schedule change notifications"]
      }
    ]
  },
  {
    icon: Icons.PowerfulReporting,
    title: "Powerful Reporting",
    description: "Gain real-time insights into your program with our custom reports. Instantly access up-to-date data on registrations, scheduling, attendance, and more.",
    tabs: [
      {
        id: "filters",
        label: "Filters",
        items: ["Filter by date ranges", "Filter by registrant types", "Filter by activities or groups"]
      },
      {
        id: "tracking",
        label: "Tracking",
        items: ["Track background check status", "Track terms & conditions signatures", "Track hours, shifts, and activities", "Track payments & refunds"]
      },
      {
        id: "export",
        label: "Export",
        items: ["Export to CSV", "Export to Excel", "Scheduled automated exports"]
      }
    ]
  },
  {
    icon: Icons.EmailSMS,
    title: "Email and SMS",
    description: "Streamline volunteer communication with myTRS's powerful tools. Automate confirmation emails, create custom templates, and schedule your targeted messages.",
    tabs: [
      {
        id: "creation",
        label: "Creation",
        items: ["Create email templates for each event", "Drag-and-drop email builder", "Rich text formatting options"]
      },
      {
        id: "delivery",
        label: "Delivery",
        items: ["Scheduled message delivery", "Bulk email sending", "SMS text messaging"]
      },
      {
        id: "tracking",
        label: "Tracking",
        items: ["Open and click tracking", "Delivery status monitoring", "Message history reporting"]
      }
    ]
  },
  {
    icon: Icons.FullIntegration,
    title: "Full Integration",
    description: "Enhance your workflow with myTRS's seamless integrations. We support background checks through Sterling Volunteers, offer flexible payment options, and provide valuable insights into user behavior.",
    tabs: [
      {
        id: "payments",
        label: "Payments",
        items: ["Stripe integration", "Authorize.net support", "PayPal compatibility"]
      },
      {
        id: "external",
        label: "External",
        items: ["Background check integration", "Google Analytics", "Export to other systems"]
      }
    ]
  },
  {
    icon: Icons.MobileFriendly,
    title: "Mobile Friendly",
    description: "No app needed! myTRS is mobile-friendly. Admins can bookmark and access the system from any phone or tablet to run reports and check in registrants. Even volunteers can assist with check-in!",
    tabs: [
      {
        id: "features",
        label: "Features",
        items: ["Responsive design", "Touch-friendly interface", "On-the-go check-in"]
      },
      {
        id: "compatibility",
        label: "Compatibility",
        items: ["Works on iOS and Android", "No app installation required", "Offline mode support"]
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