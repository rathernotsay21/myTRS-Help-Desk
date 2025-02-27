import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function WhyTRS() {
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Replace with your preferred form submission service
      // This example uses Formspree - replace YOUR_FORM_ID with your actual form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        e.target.reset();
      } else {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormError(error.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <Layout
      title="Why TRS?"
      description="Discover why myTRS is the right solution for your needs">
      <main className={styles.whyTrsPage}>
        <div className="container">
          <section className={styles.introSection}>
            <h2 className={styles.sectionHeading}>EXPLORE MYTRS SOLUTIONS</h2>
            <div className={styles.sectionContent}>
              <h3 className={styles.mainTitle}>
                We provide powerful registration solutions for events of any size
              </h3>
              <p className={styles.subtext}>
                myTRS offers comprehensive registration management tailored to your organization's needs.
                Our solutions are designed to streamline the registration process while providing 
                powerful reporting and analytics tools.
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
          <section className={styles.formSection}>
            <h2 className={styles.formTitle}>Request a Demo</h2>
            
            {formSubmitted ? (
              <div className={styles.formSuccess}>
                <h3>Thank you for your interest!</h3>
                <p>We've received your demo request and will be in touch shortly.</p>
              </div>
            ) : (
              <form className={styles.demoForm} onSubmit={handleSubmit} name="demo-request" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="demo-request" />
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="firstName">First name <span className={styles.required}>*</span></label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      placeholder="First name" 
                      required 
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
                  ></textarea>
                </div>
                
                {formError && (
                  <div className={styles.formError}>
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
        </div>
      </main>
    </Layout>
  );
}