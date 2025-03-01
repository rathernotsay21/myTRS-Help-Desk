import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function Features() {
  return (
    <Layout
      title="Features"
      description="Explore the powerful features of myTRS registration management platform">
      <main className={styles.featuresPage}>
        {/* Hero Section with Background Image */}
        <div className={styles.heroWrapper}>
          <div className={styles.hero}>
            <div className="container">
              <h1 className={styles.heroTitle}>Powerful Features for Exceptional Event Management</h1>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome Palette */}
                  <path d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7c41.2-6.4 61.4-54.6 42.5-91.7c-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3c0-58.8-31.8-113.8-83.4-217.7C386.7 14.3 302.4 0 204.3 5zm4 432.9c-42.6-6.9-82.7-34.8-110.5-81.2c-10.7-17.9-18.4-37.8-22.9-59.6c-3.5-16.9 8.9-32.1 25.9-35.6c3.9-.8 7.9-.8 11.8 0c34 6.9 68.2 10.4 102.6 10.4c51.2 0 101.6-8.5 149.9-25.3c13.5-4.7 28.3 1.6 36.1 13.8c8.5 13.3 8.9 30.8 .9 44.5c-32.2 54.7-89.3 77.3-143.9 83.5l-49.9 49.9zM256 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm173.7-160H234.6c-29.4 0-53.3-23.9-53.3-53.3c0-29.4 23.9-53.3 53.3-53.3h195.1c29.4 0 53.3 23.9 53.3 53.3c0 29.4-23.9 53.3-53.3 53.3z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Customized Registration Experience</h3>
              <p className={styles.serviceDescription}>
                Create a seamless and professional first impression with custom-branded registration sites. Easily integrate your logo and event banner into our pre-designed template, or collaborate with our team to develop a unique landing page with a custom domain. A branded registration experience reinforces your event's identity and encourages higher registration rates.
              </p>
              <Link to="/docs/intro" className={styles.serviceLink}>Learn More</Link>
            </div>

            {/* Feature 2 */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome Calendar Alt */}
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v320c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm320-80c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16zm-208 0c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16zm-96 0c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16zm304 0c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Automated Scheduling</h3>
              <p className={styles.serviceDescription}>
                Every event is unique. myTRS offers flexible scheduling tools that adapt to your specific needs. Whether you're managing a small local event or a large-scale festival, our system can handle it. We'll work with you to optimize your event structure within myTRS, ensuring seamless registration experience, automatic time conflict checks, registrant curation, and capacity management. Get the scheduling control you need, without the manual effort.
              </p>
              <Link to="/docs/intro" className={styles.serviceLink}>Learn More</Link>
            </div>

            {/* Feature 3 */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome Chart Bar */}
                  <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32zm0 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32zm0 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Powerful Reporting</h3>
              <p className={styles.serviceDescription}>
                Gain real-time insights into your program with our custom reports. Instantly access up-to-date data on registrations, scheduling, attendance, and more. Use advanced filters and custom headers to tailor reports to your exact needs – organize registrants by type, activity, group, time slot, background check status, even shirt size! All reports can be saved within the system or easily exported as CSV files for further analysis.
              </p>
              <Link to="/docs/intro" className={styles.serviceLink}>Learn More</Link>
            </div>

            {/* Feature 4 */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome Comment Dots */}
                  <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Email/SMS Communication</h3>
              <p className={styles.serviceDescription}>
                Streamline volunteer communication with myTRS's powerful tools. Automate confirmation emails, create custom email templates for any event, and schedule your targeted messages. Manage individual or bulk communications, track delivery status, and review complete message history – all from one central platform.
              </p>
              <Link to="/docs/intro" className={styles.serviceLink}>Learn More</Link>
            </div>

            {/* Feature 5 */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="28" height="28" aria-hidden="true">
                  {/* Font Awesome User Shield */}
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3zm420.2-93.9c-15.8-17.9-39.1-26.5-62.3-23.7l-47.9 5.9c-6.6-14.5-19.9-24.8-35.9-26.3c-24.1-2.4-45.9 13.7-50.8 37.3L385.3 335c30.9 34.1 48.7 78.9 48.7 126.8c0 3.4-.2 6.8-.5 10.2h73.1c41.8 0 80.4-22.1 101.4-58.3c7.9-13.5 15.3-28.7 21.8-45.3c8.9-22.8 13.7-47 14.2-71.6c.3-13.8-5.2-27-15.2-37.7z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Multi-level Admin Access</h3>
              <p className={styles.serviceDescription}>
                Empower your team with granular admin access. Easily delegate management responsibilities by granting specific permissions (manager, reporting, communication, financial) to different team members for the sites, activities, areas and groups they oversee. With unlimited admin accounts, you can ensure seamless collaboration and efficient management of your volunteer program.
              </p>
              <Link to="/docs/intro" className={styles.serviceLink}>Learn More</Link>
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
              <Link to="/docs/intro" className={styles.serviceLink}>Learn More</Link>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to see myTRS in action?</h2>
              <p className={styles.ctaText}>Schedule a personalized demo and discover how myTRS can transform your event management process.</p>
              <Link to="/why-trs#request-demo" className={styles.ctaButton}>
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