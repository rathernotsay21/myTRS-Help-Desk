import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import ClientCard from '@site/src/components/ClientCard';
import ServeCategoryCards from '@site/src/components/ServeCategoryCards';
import TestimonialCarousel from '@site/src/components/TestimonialCarousel';
import HomepageHeader from '@site/src/components/HomepageHeader';
import PricingCards from '@site/src/components/PricingCards';
import Section from '@site/src/components/Section';

// Import lazy-loaded components
import {
  ClientLogos,
  EventStatsCarousel,
  SolutionGrid
} from '../utils/lazyComponents';
import IntegrationPartners from '../components/IntegrationPartners';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import featuresStyles from './features/styles.module.css';



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
  
  
  // Info card sections removed

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="my TRS - Powering the World's Most Prestigious Events">
      <HomepageHeader />
      <div className={styles.pricingSection}>
        <PricingCards />
        <IntegrationPartners />
      </div>
      <ClientLogos />
      
{/* Why TRS Sections (Moved from why-trs page) */}
<main className={styles.whyTrsSection}>
  <div className="container">
    {/* Who do we serve section - Moved here */}
    <div className="row">
      <div className="col col--10 col--offset-1">
        <section className={styles.introSection} style={{ padding: 'var(--my-trs-space-xl) 0' }}>
          <h2 className={styles.sectionHeading}>Who do we serve?</h2>
          <div className={styles.sectionContent}>
            <h3 className={styles.mainTitle}>
              Scalable Solutions for Events of Any Size
            </h3>
            <p className={styles.subtext}>
              Whether you are managing 500 or 10,000+ volunteers for your event, we can handle it all with our scalable system built on 25+ years of experience. Our robust platform seamlessly scales to support events of any size, delivering powerful management capabilities without complexity.
            </p>
            <ServeCategoryCards />
          </div>
        </section>
      </div>
    </div>

    <div className="row">
      <div className="col col--10 col--offset-1"> {/* Changed from col--8 col--offset-2 */}
          {/* Why Choose TRS Section */}
          <section className={styles.introSection} style={{ padding: 'var(--my-trs-space-xl) 0' }}>
            <h2 className={styles.sectionHeading}>Why Choose TRS?</h2>
            <div className={styles.sectionContent}>
              <div className={styles.supportSection}>
                <div className={styles.supportContent}>
                  <h3 className={styles.mainTitle}>
                    Unparalleled Support & Partnership
                  </h3>
                  <p className={styles.subtext}>
                  More than just a software company, TRS brings world-class customer service to major events. At myTRS, we understand that successful volunteer management requires more than just powerful software. Our staff provides unparalleled 1-on-1 support and expert advice. We share lessons learned and options gleaned from 25+ years of online event and volunteer management experiences. Even on weekends and holidays, our team is here to help you navigate any challenge, from initial setup and training to troubleshooting and on-site support at the event. We're committed to your success every step of the way.
                  </p>
                </div>
                <div className={styles.supportImageContainer}>
                  <div
                    className={styles.supportImage}
                    style={{
                      backgroundImage: 'url(/img/event_photos/support.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '350px',
                      borderRadius: '8px'
                    }}
                    aria-label="TRS Support Team providing assistance"
                  ></div>
                </div>
              </div>
              <div className={styles.quoteContainer}>
                <blockquote className={styles.testimonialQuote}>
                  <div className={styles.quoteIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p>
                  My experience using the TRS platform has been spectacular. The incredible customer service and consistency in software leaves me and my robust volunteer community at ease. For anyone looking to manage volunteers, I'd strongly recommend looking at this software.
                  </p>
                  <footer>
                    <span className={styles.organizationHighlight}>Greater Cleveland Sports Commission</span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Expertise You Can Trust Section */}
          <section className={styles.introSection} style={{ padding: 'var(--my-trs-space-xl) 0', marginTop: 'var(--my-trs-space-lg)' }}>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
              Trusted by the Industry Experts since 2000
              </h3>
              <p className={styles.subtext}>
              With a track record of supporting top-tier events—ranging from professional sports and national conventions to corporate conferences and festivals, myTRS has been the trusted choice for seamless event and volunteer management since 2000. Our expertise in handling complex logistics ensures every event runs smoothly, no matter the size or scope.
              </p>
              <EventStatsCarousel />
            </div>
          </section>

          {/* Powerful Technology Section */}
          <section className={styles.introSection} style={{ padding: 'var(--my-trs-space-xl) 0', marginTop: 'var(--my-trs-space-lg)' }}>
            <div className={styles.sectionContent}>
              <div className={styles.powerfulSection}>
                <div className={styles.powerfulImageContainer}>
                  <div
                    className={styles.powerfulImage}
                    style={{
                      backgroundImage: 'url(/img/event_photos/mockup_devices_four.png)',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      height: '400px', /* Increased from 350px to 400px */
                      borderRadius: '0' /* Removed rounded corners */
                    }}
                    aria-label="myTRS application on multiple devices"
                  ></div>
                </div>
                <div className={styles.powerfulContent}>
                  <h3 className={styles.mainTitle}>
                  Powerful Event Management Software
                  </h3>
                  <p className={styles.subtext}>
                  myTRS is streamlined to handle events in many scales. From customizable registration platform and automated scheduling to real-time reporting and seamless communication tools, our software empowers you to manage multiple sites, committees, and communications with ease. Access the platform from anywhere, anytime, with our mobile-friendly interface.
                  </p>
                  <div style={{ marginTop: 'var(--my-trs-space-lg)' }}>
                    <Link
                      className="button button--lg"
                      style={{ backgroundColor: '#ea580b', color: 'white' }}
                      to="/features">
                      Explore Features
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </div>
    
    {/* Keep the rest of your sections here */}

    <Section
      heading="myTRS Services"
      title="Comprehensive Support"
    >
      <SolutionGrid solutions={[
        {
          number: 1,
          title: 'Personalized Training',
          text: 'Master the myTRS platform with hands-on training covering site building, registration setup, reporting, communication, and more. We\'ll guide you through the platform, answer your questions, and ensure you have the knowledge and confidence to manage your volunteer program effectively.',
          isPrimary: true
        },
        {
          number: 2,
          title: 'Expert Site Testing',
          text: 'Take control of your registration process with our expert site testing service. Upon request, we\'ll meticulously review your registration setup, identify potential issues, and ensure a smooth registration experience for your volunteers.',
          isPrimary: false
        },
        {
          number: 3,
          title: 'Dedicated Customer Service',
          text: 'Experience unparalleled customer service excellence with myTRS. Our dedicated support team provides 24/7 personalized assistance, rapid response times, and expert solutions to every inquiry. We pride ourselves on building lasting relationships through attentive care, proactive problem-solving, and an unwavering commitment to your success.',
          isPrimary: false
        },
        {
          number: 4,
          title: 'On-Site Support',
          text: 'Focus on your event, not the technology. myTRS offers on-site support to ensure your volunteers and staff have the assistance they need to confidently utilize our system. Request this service to have our expert team provide comprehensive training, personalized guidance, and proactive problem-solving on event day.',
          isPrimary: true
        }
      ]} />
    </Section>





    {/* CTA Section */}
    <div className="row" style={{ marginBottom: 'var(--my-trs-space-xxl)' }}>
      <div className="col col--10 col--offset-1">
        <div className={clsx("trs-card", featuresStyles.ctaSection, 'bg-special-olympics-before')} style={{ padding: 0 }}>
          <div className={featuresStyles.ctaContent}>
            <h2 className={featuresStyles.ctaTitle}>Ready to Experience the TRS Difference?</h2>
            <p className={featuresStyles.ctaText}>
              Request a demo today and discover how myTRS can transform your event management process.
            </p>
            <Link
              className={featuresStyles.ctaButton}
              style={{ backgroundColor: '#ea580b', color: 'white' }}
              to="/contact">
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor" style={{ marginLeft: '10px' }} aria-hidden="true">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
      
      {/* Homepage Features and Info Card sections removed */}
    </Layout>
  );
}