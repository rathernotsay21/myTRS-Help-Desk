import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Features() {
  const {siteConfig} = useDocusaurusContext();
  
  // Add these state variables for the tabbed features
  const [emailActiveTab, setEmailActiveTab] = useState('creation');
  const [scheduleActiveTab, setScheduleActiveTab] = useState('self');
  const [reportingActiveTab, setReportingActiveTab] = useState('filters');
  const [adminActiveTab, setAdminActiveTab] = useState('full');
  
return (
    <Layout
      title="Features"
      description="Explore the powerful features of myTRS registration management platform">
      <main className={styles.featuresPage}>
        {/* Hero Section with Background Image */}
        <div className={styles.heroWrapper}>
          <div className={styles.hero}>
            <div className="container">
              <h1 className={styles.heroTitle}>Powerful Event Management Features</h1>
              <p className={styles.heroSubtitle}>Discover how myTRS simplifies volunteer management with our comprehensive suite of tools</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.introSection}>
            <div className={styles.introContent}>
              <h2 className={styles.sectionTitle}>Streamlined Solutions for Every Event</h2>
              <div className={styles.titleUnderline}></div>
              <p className={styles.introText}>
                At myTRS, we understand that successful event management requires powerful, flexible tools that adapt to your unique needs. 
                Our platform combines intuitive design with robust functionality to help you manage registrations, scheduling, 
                communication, and reporting with ease. Explore our key features below to see how myTRS can transform your event management process.
              </p>
            </div>
          </div>

          {/* New Grid Layout for Features */}
          <div className={styles.servicesGrid}>
            {/* Feature 1 */}
            <div className={styles.serviceCard}>
  <div className={styles.serviceIcon}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
    </svg>
  </div>
  <h3 className={styles.serviceTitle}>Multi-Level Admin Access</h3>
  <p className={styles.serviceDescription}>
    Empower your team with granular admin access. Easily delegate responsibilities by granting specific permissions to team members for sites, activities, areas and groups they oversee.
  </p>
  
  {/* Tabbed Features */}
  <div className={styles.featureTabs}>
    <button 
      className={`${styles.tabButton} ${adminActiveTab === 'full' ? styles.activeTab : ''}`}
      onClick={() => setAdminActiveTab('full')}
    >
      Full Access
    </button>
    <button 
      className={`${styles.tabButton} ${adminActiveTab === 'limited' ? styles.activeTab : ''}`}
      onClick={() => setAdminActiveTab('limited')}
    >
      Limited Access
    </button>
    <button 
      className={`${styles.tabButton} ${adminActiveTab === 'specialized' ? styles.activeTab : ''}`}
      onClick={() => setAdminActiveTab('specialized')}
    >
      Specialized Access
    </button>
  </div>
  
  <div className={styles.tabContent}>
    {adminActiveTab === 'full' && (
      <ul className={styles.featureList}>
        <li>Full manager capability</li>
      </ul>
    )}
    
    {adminActiveTab === 'limited' && (
      <ul className={styles.featureList}>
        <li>Build and set up registration site</li>
        <li>View, save, and export reports</li>
      </ul>
    )}
    
    {adminActiveTab === 'specialized' && (
      <ul className={styles.featureList}>
        <li>Send emails & messages</li>
        <li>Manage finances and transactions</li>
      </ul>
    )}
  </div>
  
  
</div>

            {/* Feature 2 */}
            <div className={styles.serviceCard}>
  <div className={styles.serviceIcon}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v320c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24z"/>
    </svg>
  </div>
  <h3 className={styles.serviceTitle}>Automated Scheduling</h3>
  <p className={styles.serviceDescription}>
    Every event is unique. myTRS offers flexible scheduling that adapts to your needs. Our system can handle anything from local festivals to the Super Bowl.
  </p>
  
  {/* Tabbed Features */}
  <div className={styles.featureTabs}>
    <button 
      className={`${styles.tabButton} ${scheduleActiveTab === 'self' ? styles.activeTab : ''}`}
      onClick={() => setScheduleActiveTab('self')}
    >
      Self-Service
    </button>
    <button 
      className={`${styles.tabButton} ${scheduleActiveTab === 'admin' ? styles.activeTab : ''}`}
      onClick={() => setScheduleActiveTab('admin')}
    >
      Admin Tools
    </button>
    <button 
      className={`${styles.tabButton} ${scheduleActiveTab === 'management' ? styles.activeTab : ''}`}
      onClick={() => setScheduleActiveTab('management')}
    >
      Management
    </button>
  </div>
  
  <div className={styles.tabContent}>
    {scheduleActiveTab === 'self' && (
      <ul className={styles.featureList}>
        <li>Registrant self-scheduling</li>
        <li>Group registration</li>
        <li>General availability collection</li>
      </ul>
    )}
    
    {scheduleActiveTab === 'admin' && (
      <ul className={styles.featureList}>
        <li>Bulk schedule assignment</li>
        <li>Registration imports</li>
      </ul>
    )}
    
    {scheduleActiveTab === 'management' && (
      <ul className={styles.featureList}>
        <li>Automatic time conflict checks</li>
        <li>Capacity management for activities & time slots</li>
      </ul>
    )}
  </div>
  
  
</div>

            {/* Feature 3 */}
            <div className={styles.serviceCard}>
  <div className={styles.serviceIcon}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32z"/>
    </svg>
  </div>
  <h3 className={styles.serviceTitle}>Powerful Reporting</h3>
  <p className={styles.serviceDescription}>
    Gain real-time insights into your program with our custom reports. Instantly access up-to-date data on registrations, scheduling, attendance, and more.
  </p>
  
  {/* Tabbed Features */}
  <div className={styles.featureTabs}>
    <button 
      className={`${styles.tabButton} ${reportingActiveTab === 'filters' ? styles.activeTab : ''}`}
      onClick={() => setReportingActiveTab('filters')}
    >
      Filters
    </button>
    <button 
      className={`${styles.tabButton} ${reportingActiveTab === 'tracking' ? styles.activeTab : ''}`}
      onClick={() => setReportingActiveTab('tracking')}
    >
      Tracking
    </button>
    <button 
      className={`${styles.tabButton} ${reportingActiveTab === 'export' ? styles.activeTab : ''}`}
      onClick={() => setReportingActiveTab('export')}
    >
      Export
    </button>
  </div>
  
  <div className={styles.tabContent}>
    {reportingActiveTab === 'filters' && (
      <ul className={styles.featureList}>
        <li>Filter by registrant types & activities</li>
        <li>Filter by time slots & schedules</li>
        <li>Advanced filters for custom fields</li>
      </ul>
    )}
    
    {reportingActiveTab === 'tracking' && (
      <ul className={styles.featureList}>
        <li>Track background check status</li>
        <li>Track terms & conditions signatures</li>
        <li>Track hours, shifts, and activities</li>
        <li>Track payments & refunds</li>
      </ul>
    )}
    
    {reportingActiveTab === 'export' && (
      <ul className={styles.featureList}>
        <li>Save & view real-time reports</li>
        <li>Export to CSV files</li>
        <li>Custom report layouts</li>
      </ul>
    )}
  </div>
  
  
</div>

            {/* Feature 4 */}
            <div className={styles.serviceCard}>
  <div className={styles.serviceIcon}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/>
    </svg>
  </div>
  <h3 className={styles.serviceTitle}>Email and SMS</h3>
  <p className={styles.serviceDescription}>
    Streamline volunteer communication with myTRS's powerful tools. Automate confirmation emails, create custom email templates, and schedule your targeted messages – all from one central platform.
  </p>
  
  {/* Tabbed Features */}
  <div className={styles.featureTabs}>
    <button 
      className={`${styles.tabButton} ${emailActiveTab === 'creation' ? styles.activeTab : ''}`}
      onClick={() => setEmailActiveTab('creation')}
    >
      Creation
    </button>
    <button 
      className={`${styles.tabButton} ${emailActiveTab === 'delivery' ? styles.activeTab : ''}`}
      onClick={() => setEmailActiveTab('delivery')}
    >
      Delivery
    </button>
    <button 
      className={`${styles.tabButton} ${emailActiveTab === 'tracking' ? styles.activeTab : ''}`}
      onClick={() => setEmailActiveTab('tracking')}
    >
      Tracking
    </button>
  </div>
  
  <div className={styles.tabContent}>
    {emailActiveTab === 'creation' && (
      <ul className={styles.featureList}>
        <li>Create email templates for each event</li>
        <li>Automate confirmation emails</li>
        <li>Schedule your targeted messages</li>
      </ul>
    )}
    
    {emailActiveTab === 'delivery' && (
      <ul className={styles.featureList}>
        <li>Emails/SMS individual registrants</li>
        <li>Bulk send from filtered reports</li>
        <li>Personalized dynamic field messages</li>
      </ul>
    )}
    
    {emailActiveTab === 'tracking' && (
      <ul className={styles.featureList}>
        <li>Review complete email history</li>
        <li>Track message delivery status</li>
        <li>Monitor open and engagement rates</li>
      </ul>
    )}
  </div>
  
  
</div>

            {/* Feature 5 */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome User Shield */}
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3zm420.2-93.9c-15.8-17.9-39.1-26.5-62.3-23.7l-47.9 5.9c-6.6-14.5-19.9-24.8-35.9-26.3c-24.1-2.4-45.9 13.7-50.8 37.3L385.3 335c30.9 34.1 48.7 78.9 48.7 126.8c0 3.4-.2 6.8-.5 10.2h73.1c41.8 0 80.4-22.1 101.4-58.3c7.9-13.5 15.3-28.7 21.8-45.3c8.9-22.8 13.7-47 14.2-71.6c.3-13.8-5.2-27-15.2-37.7z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Full Integration</h3>
              <p className={styles.serviceDescription}>
              Enhance your workflow with myTRS's seamless integrations. We support background checks through Sterling Volunteers, offer flexible payment options via Stripe, Authorized.net, PayPal Payflow Pro, Payeezy, and Braintree, and provide valuable insights into user behavior with Google Analytics.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome Mobile Alt */}
                  <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Mobile Friendly</h3>
              <p className={styles.serviceDescription}>
                No app needed! myTRS is mobile-friendly. Admins can bookmark and access the system from any phone or tablet to run reports and check in registrants. Even volunteers can assist with check-in!
              </p>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to see myTRS in action?</h2>
              <p className={styles.ctaText}>Schedule a personalized demo and discover how myTRS can transform your event management process.</p>
              <Link to="/#request-demo" className={styles.ctaButton}>
                Request a Demo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor" style={{ marginLeft: '10px' }} aria-hidden="true">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}