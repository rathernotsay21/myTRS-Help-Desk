import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import ClientCard from '@site/src/components/ClientCard';
import HomepageHeader from '@site/src/components/HomepageHeader';
import Section from '@site/src/components/Section';

// Import lazy-loaded components
import {
  HomepageFeatures,
  ClientLogos,
  EventStatsCarousel,
  DemoForm,
  SolutionGrid,
  InfoCard
} from '../utils/lazyComponents';

import Heading from '@theme/Heading';
import styles from './index.module.css';



export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  // Define solution blocks data
  const solutionBlocks = [
    {
      number: 1,
      title: 'Personal',
      text: 'Perfect for individual event organizers and small-scale events. Get started quickly with our intuitive platform and essential features for seamless registration management.',
      isPrimary: true
    },
    {
      number: 2,
      title: 'Insurance',
      text: 'Specialized solutions for insurance events and training sessions. Includes built-in compliance features, attendee certification tracking, and industry-specific reporting.',
      isPrimary: false
    },
    {
      number: 3,
      title: 'Business',
      text: 'Designed for mid-sized businesses hosting multiple events. Includes advanced reporting, custom branding options, payment processing, and multi-user account management.',
      isPrimary: false
    },
    {
      number: 4,
      title: 'Enterprise',
      text: 'Our most comprehensive solution for large organizations with complex registration needs. Includes API access, white-label options, advanced integrations, and dedicated support.',
      isPrimary: true
    }
  ];
  
  // Define client types
  const clientTypes = [
    'Local Organizing Committees',
    'Sports Commissions',
    'Visitor Bureaus',
    'Event Management',
    'Destination Management',
    'Fortune 500 Businesses',
    'Healthcare Organizations',
    'Medical Organizations',
    'Sports & Event Rights Holders',
    'Governing Bodies',
    'Event Sponsors',
    'Tour Operators'
  ];
  
  // Define info card sections
  const infoCardSections = [
    {
      title: 'About myTRS',
      content: [
        'myTRS is a comprehensive transaction reporting system designed to simplify complex reporting processes for businesses. Our platform offers intuitive solutions for financial reporting, compliance, and data management.',
        'With a focus on user-friendly interfaces and powerful backend capabilities, myTRS helps organizations streamline their reporting workflows and gain valuable insights from their transaction data.'
      ]
    },
    {
      title: 'Key Features',
      listItems: [
        'Automated transaction reporting and analysis',
        'Customizable dashboards and reports',
        'Real-time data processing and visualization',
        'Compliance with industry standards and regulations',
        'Secure data storage and management',
        'Integration with existing business systems'
      ]
    },
    {
      title: 'Need Help?',
      content: [
        'This help desk contains comprehensive documentation, tutorials, and resources to help you get the most out of myTRS. Browse our documentation sections or use the search feature to find specific information.'
      ],
      contactInfo: {
        text: 'For additional support, please contact our customer service team at',
        link: 'mailto:support@my-trs.com',
        linkText: 'support@my-trs.com'
      }
    }
  ];

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="my TRS - Powering the World's Most Prestigious Events">
      <HomepageHeader />
      <ClientLogos />
      
{/* Why TRS Sections (Moved from why-trs page) */}
<main className={styles.whyTrsSection}>
  <div className="container">
    <div className="row">
      <div className="col col--10 col--offset-1"> {/* Changed from col--8 col--offset-2 */}
        <div className="trs-card" style={{ padding: 'var(--my-trs-space-xl)', marginBottom: 'var(--my-trs-space-xxl)' }}>
          {/* Why Choose TRS Section */}
          <section className={styles.introSection} style={{ padding: 0 }}>
            <h2 className={styles.sectionHeading}>Why Choose TRS?</h2>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
                Unparalleled Support & Partnership
              </h3>
              <p className={styles.subtext}>
              More than just a software company, TRS brings world-class customer service to major events. At myTRS, we understand that successful volunteer management requires more than just powerful software. Our staff provides unparalleled 1-on-1 support and expert advice. We share lessons learned and options gleaned from 25+ years of online event and volunteer management experiences. Even on weekends and holidays, our team is here to help you navigate any challenge, from initial setup and training to troubleshooting and on-site support at the event. We're committed to your success every step of the way.
              </p>
              <div className={styles.quoteContainer}>
                <blockquote className={styles.testimonialQuote}>
                  <p>
                  My experience using the TRS platform has been spectacular. The incredible customer service and consistency in software leaves me and my robust volunteer community at ease. For anyone looking to manage volunteers, I'd strongly recommend looking at this software.
                  </p>
                  <footer>
                    - Reilly Haas - <span className={styles.organizationHighlight}>Greater Cleveland Sports Commission</span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Expertise You Can Trust Section */}
          <section className={styles.introSection} style={{ padding: 0, marginTop: 'var(--my-trs-space-xxl)' }}>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
              Trusted by the Industry Experts
              </h3>
              <p className={styles.subtext}>
              With a track record of supporting top-tier events—ranging from professional sports and national conventions to corporate conferences and festivals, myTRS has been the trusted choice for seamless event and volunteer management since 2000. Our expertise in handling complex logistics ensures every event runs smoothly, no matter the size or scope.
              </p>
              <EventStatsCarousel />
            </div>
          </section>

          {/* Powerful Technology Section */}
          <section className={styles.introSection} style={{ padding: 0, marginTop: 'var(--my-trs-space-xxl)' }}>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
              Powerful Event Management Software
              </h3>
              <p className={styles.subtext}>
              myTRS is streamlined to handle events in many scales. From customizable registration platform and automated scheduling to real-time reporting and seamless communication tools, our software empowers you to manage multiple sites, committees, and communications with ease. Access the platform from anywhere, anytime, with our mobile-friendly interface.
              </p>
              <div style={{ marginTop: 'var(--my-trs-space-lg)' }}>
                <Link
                  className="button button--secondary button--lg"
                  to="/features">
                  Explore Features
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    
    {/* Keep the rest of your sections here */}
    <Section heading="Who do we serve?">
      <div className="responsive-grid">
        {clientTypes.map((item, i) => (
          <ClientCard key={i} text={item} />
        ))}
      </div>
    </Section>

    <Section
      heading="CHOOSE YOUR TRACK"
      title="Customized plans for every industry sector"
    >
      <SolutionGrid solutions={solutionBlocks} />
    </Section>

    {/* Demo Request Form Section */}
    <div id="demo-form"></div>
    <ErrorBoundary>
      <DemoForm />
    </ErrorBoundary>
  </div>
</main>
      
      <HomepageFeatures />
      
      <div className="responsive-container margin-vert--xl">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <InfoCard sections={infoCardSections} />
          </div>
        </div>
      </div>
    </Layout>
  );
}