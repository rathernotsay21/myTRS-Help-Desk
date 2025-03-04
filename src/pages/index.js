import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ClientLogos from '@site/src/components/ClientLogos';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import EventStatsCarousel from '@site/src/components/EventStatsCarousel';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          Event & Volunteer Management Made Simple
        </Heading>
        <div className={styles.buttons}>
          <Link
            className={`button button--outline-secondary button--lg ${styles.fixedWidthButton}`}
            to="#request-demo">
            Request Free Demo
          </Link>
          <Link
            className={`button button--secondary button--lg ${styles.fixedWidthButton}`}
            to="/docs/intro">
            Explore Solutions
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const blocksRef = useRef(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const blocks = entry.target.querySelectorAll(`.${styles.solutionBlock}`);
          blocks.forEach((block, index) => {
            setTimeout(() => {
              block.classList.add(styles.animate);
            }, index * 150); // Stagger the animations
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    if (blocksRef.current) {
      observer.observe(blocksRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Form submission handler for Netlify
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    try {
      // Let Netlify handle the form submission
      const form = e.target;
      const formData = new FormData(form);
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      
      setFormSubmitted(true);
      form.reset();
    } catch (error) {
      setFormError("Something went wrong. Please try again.");
      console.error('Form submission error:', error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="my TRS - Powering the World's Most Prestigious Events">
      <HomepageHeader />
      <ClientLogos />
      
      {/* Why TRS Sections (Moved from why-trs page) */}
      <main className={styles.whyTrsSection}>
        <div className="container">
          <section className={styles.introSection}>
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

          <section className={styles.introSection}>
            <h2 className={styles.sectionHeading}>Expertise You Can Trust</h2>
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

          <section className={styles.introSection}>
            <h2 className={styles.sectionHeading}>Powerful Technology</h2>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
              Powerful Event Management Software
              </h3>
              <p className={styles.subtext}>
              myTRS is streamlined to handle events in many scales. From customizable registration platform and automated scheduling to real-time reporting and seamless communication tools, our software empowers you to manage multiple sites, committees, and communications with ease. Access the platform from anywhere, anytime, with our mobile-friendly interface.
              </p>
            </div>
          </section>

          <section className={styles.introSection}>
            <h2 className={styles.sectionHeading}> Our Commitment</h2>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
                Your Success is Our Priority
              </h3>
              <p className={styles.subtext}>
                TRS is more than just a software provider; we're your partner in volunteer management. We're committed to continuous improvement, constantly adding new features and enhancements based on client feedback. Our veteran-owned, woman-owned, and LGBTQ+ supportive company is dedicated to providing exceptional service and building long-term relationships with our clients. Your success is our ultimate goal.
              </p>
            </div>
          </section>

          <section className={styles.tracksSection}>
            <h2 className={styles.sectionHeading}>CHOOSE YOUR TRACK</h2>
            <h3 className={styles.mainTitle}>Customized plans for every industry sector</h3>
            
            <div className={styles.blocksContainer} ref={blocksRef}>
              <div className={clsx(styles.solutionBlock, styles.primaryBlock)}>
                <div className={styles.blockNumber}>01</div>
                <h3 className={styles.blockTitle}>Personal</h3>
                <p className={styles.blockText}>
                  Perfect for individual event organizers and small-scale events. Get started quickly 
                  with our intuitive platform and essential features for seamless registration management.
                </p>
              </div>
              
              <div className={clsx(styles.solutionBlock, styles.secondaryBlock)}>
                <div className={styles.blockNumber}>02</div>
                <h3 className={styles.blockTitle}>Insurance</h3>
                <p className={styles.blockText}>
                  Specialized solutions for insurance events and training sessions. Includes built-in 
                  compliance features, attendee certification tracking, and industry-specific reporting.
                </p>
              </div>
              
              <div className={clsx(styles.solutionBlock, styles.secondaryBlock)}>
                <div className={styles.blockNumber}>03</div>
                <h3 className={styles.blockTitle}>Business</h3>
                <p className={styles.blockText}>
                  Designed for mid-sized businesses hosting multiple events. Includes advanced reporting, 
                  custom branding options, payment processing, and multi-user account management.
                </p>
              </div>
              
              <div className={clsx(styles.solutionBlock, styles.primaryBlock)}>
                <div className={styles.blockNumber}>04</div>
                <h3 className={styles.blockTitle}>Enterprise</h3>
                <p className={styles.blockText}>
                  Our most comprehensive solution for large organizations with complex registration needs. 
                  Includes API access, white-label options, advanced integrations, and dedicated support.
                </p>
              </div>
            </div>
          </section>

          {/* Demo Request Form Section */}
          <ErrorBoundary>
            <section id="request-demo" className={styles.formSection}>
              <h2 className={styles.formTitle}>Ready to Experience the TRS Difference?</h2>
              
              {formSubmitted ? (
                <div className={styles.formSuccess}>
                  <h3>Thank you for your interest!</h3>
                  <p>We've received your demo request and will be in touch shortly.</p>
                </div>
              ) : (
                <form 
                  className={styles.demoForm} 
                  onSubmit={handleSubmit} 
                  name="demo-request" 
                  method="POST" 
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                >
                  {/* Hidden fields for Netlify Forms */}
                  <input type="hidden" name="form-name" value="demo-request" />
                  <input type="hidden" name="bot-field" />
                  
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="firstName">First name <span className={styles.required}>*</span></label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        placeholder="First name" 
                        required 
                        aria-required="true"
                      />
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="lastName">Last name <span className={styles.required}>*</span></label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Last name" 
                        required 
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                        aria-required="true"
                      />
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="phone">Phone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="Phone" 
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="organization">Organization/Company Name <span className={styles.required}>*</span></label>
                      <input 
                        type="text" 
                        id="organization" 
                        name="organization" 
                        placeholder="Enter your company/organization name" 
                        required 
                        aria-required="true"
                      />
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="orgType">Type of Organization/Company <span className={styles.required}>*</span></label>
                      <input 
                        type="text" 
                        id="orgType" 
                        name="orgType" 
                        placeholder="Enter type of organization/company" 
                        required 
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="eventsNeeded">Number of Events Needed <span className={styles.required}>*</span></label>
                      <input 
                        type="number" 
                        id="eventsNeeded" 
                        name="eventsNeeded" 
                        placeholder="Enter a number" 
                        required 
                        aria-required="true"
                        min="1" 
                      />
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="registrantsCount">Total Number of Registrants/Volunteers <span className={styles.required}>*</span></label>
                      <input 
                        type="text" 
                        id="registrantsCount" 
                        name="registrantsCount" 
                        placeholder="Enter an estimate or a range (e.g: ~1,000 - 1,500 registrants)" 
                        required 
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formField}>
                    <label htmlFor="additionalInfo">Additional information, requests, urgency <span className={styles.required}>*</span></label>
                    <textarea 
                      id="additionalInfo" 
                      name="additionalInfo" 
                      rows="5" 
                      placeholder="Message" 
                      required 
                      aria-required="true"
                    ></textarea>
                  </div>
                  
                  {formError && (
                    <div className={styles.formError} role="alert">
                      <p>Error: {formError}</p>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton} 
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </section>
          </ErrorBoundary>
        </div>
      </main>
      
      <HomepageFeatures />
      
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="trs-card" style={{ padding: 'var(--my-trs-space-xl)' }}>
              <div className="padding-vert--md">
                <h2 className="trs-section-title">About myTRS</h2>
                <p>
                  myTRS is a comprehensive transaction reporting system designed to simplify 
                  complex reporting processes for businesses. Our platform offers intuitive
                  solutions for financial reporting, compliance, and data management.
                </p>
                <p>
                  With a focus on user-friendly interfaces and powerful backend capabilities,
                  myTRS helps organizations streamline their reporting workflows and gain
                  valuable insights from their transaction data.
                </p>
              </div>
              
              <div className="padding-vert--md">
                <h2 className="trs-section-title">Key Features</h2>
                <ul>
                  <li>Automated transaction reporting and analysis</li>
                  <li>Customizable dashboards and reports</li>
                  <li>Real-time data processing and visualization</li>
                  <li>Compliance with industry standards and regulations</li>
                  <li>Secure data storage and management</li>
                  <li>Integration with existing business systems</li>
                </ul>
              </div>

              <div className="padding-vert--md">
                <h2 className="trs-section-title">Need Help?</h2>
                <p>
                  This help desk contains comprehensive documentation, tutorials, and
                  resources to help you get the most out of myTRS. Browse our documentation
                  sections or use the search feature to find specific information.
                </p>
                <p>
                  For additional support, please contact our customer service team at 
                  <a href="mailto:support@my-trs.com"> support@my-trs.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}