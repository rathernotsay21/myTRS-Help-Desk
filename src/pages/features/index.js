import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function Features() {
  const featureSectionsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sections = entry.target.querySelectorAll(`.${styles.featureSection}`);
          sections.forEach((section, index) => {
            setTimeout(() => {
              section.classList.add(styles.animate);
            }, index * 150); // Stagger the animations
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    if (featureSectionsRef.current) {
      observer.observe(featureSectionsRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Layout
      title="Features"
      description="Explore the powerful features of myTRS registration management platform">
      <main className={styles.featuresPage}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Powerful Features for Exceptional Event Management</h1>
            <p className={styles.heroSubtitle}>Discover how myTRS simplifies volunteer management with our comprehensive suite of tools</p>
          </div>
        </div>

        <div className="container">
          <div className={styles.introSection}>
            <h2 className={styles.sectionTitle}>Streamlined Solutions for Every Event</h2>
            <p className={styles.introText}>
              At myTRS, we understand that successful event management requires powerful, flexible tools that adapt to your unique needs. 
              Our platform combines intuitive design with robust functionality to help you manage registrations, scheduling, 
              communication, and reporting with ease. Explore our key features below to see how myTRS can transform your event management process.
            </p>
          </div>

          <div className={styles.featureSections} ref={featureSectionsRef}>
            <div className={clsx(styles.featureSection, styles.featureSectionLeft)}>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-palette"></i>
                </div>
                <h3 className={styles.featureTitle}>Customized Registration Experience</h3>
                <p className={styles.featureDescription}>
                  Create a seamless and professional first impression with custom-branded registration sites. Easily integrate your logo and event banner into our pre-designed template, or collaborate with our team to develop a unique landing page with a custom domain. A branded registration experience reinforces your event's identity and encourages higher registration rates.
                </p>
              </div>
              <div className={styles.featureImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
            </div>

            <div className={clsx(styles.featureSection, styles.featureSectionRight)}>
              <div className={styles.featureImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h3 className={styles.featureTitle}>Automated Scheduling</h3>
                <p className={styles.featureDescription}>
                  Every event is unique. myTRS offers flexible scheduling tools that adapt to your specific needs. Whether you're managing a small local event or a large-scale festival, our system can handle it. We'll work with you to optimize your event structure within myTRS, ensuring seamless registration experience, automatic time conflict checks, registrant curation, and capacity management. Get the scheduling control you need, without the manual effort.
                </p>
              </div>
            </div>

            <div className={clsx(styles.featureSection, styles.featureSectionLeft)}>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h3 className={styles.featureTitle}>Powerful Reporting</h3>
                <p className={styles.featureDescription}>
                  Gain real-time insights into your program with our custom reports. Instantly access up-to-date data on registrations, scheduling, attendance, and more. Use advanced filters and custom headers to tailor reports to your exact needs – organize registrants by type, activity, group, time slot, background check status, even shirt size! All reports can be saved within the system or easily exported as CSV files for further analysis.
                </p>
              </div>
              <div className={styles.featureImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
            </div>

            <div className={clsx(styles.featureSection, styles.featureSectionRight)}>
              <div className={styles.featureImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-comment-dots"></i>
                </div>
                <h3 className={styles.featureTitle}>Email/SMS Communication</h3>
                <p className={styles.featureDescription}>
                  Streamline volunteer communication with myTRS's powerful tools. Automate confirmation emails, create custom email templates for any event, and schedule your targeted messages. Manage individual or bulk communications, track delivery status, and review complete message history – all from one central platform.
                </p>
              </div>
            </div>

            <div className={clsx(styles.featureSection, styles.featureSectionLeft)}>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-user-shield"></i>
                </div>
                <h3 className={styles.featureTitle}>Multi-level Admin Access</h3>
                <p className={styles.featureDescription}>
                  Empower your team with granular admin access. Easily delegate management responsibilities by granting specific permissions (manager, reporting, communication, financial) to different team members for the sites, activities, areas and groups they oversee. With unlimited admin accounts, you can ensure seamless collaboration and efficient management of your volunteer program.
                </p>
              </div>
              <div className={styles.featureImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
            </div>

            <div className={clsx(styles.featureSection, styles.featureSectionRight)}>
              <div className={styles.featureImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3 className={styles.featureTitle}>Mobile Friendly</h3>
                <p className={styles.featureDescription}>
                  No app needed! myTRS is mobile-friendly. Admins can bookmark and access the system from any phone or tablet to run reports and check in registrants. Even volunteers can assist with check-in!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Ready to see myTRS in action?</h2>
            <p className={styles.ctaText}>Schedule a personalized demo and discover how myTRS can transform your event management process.</p>
            <a href="#request-demo" className={styles.ctaButton}>Request a Demo</a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
