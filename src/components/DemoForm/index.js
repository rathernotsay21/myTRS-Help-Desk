import React, { useState } from 'react';
import styles from './styles.module.css';

const DemoForm = () => {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    orgType: '',
    eventsNeeded: '',
    registrantsCount: '',
    additionalInfo: ''
  });
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }
    
    if (!formData.orgType.trim()) {
      newErrors.orgType = 'Organization type is required';
    }
    
    if (!formData.eventsNeeded.trim()) {
      newErrors.eventsNeeded = 'Number of events is required';
    } else if (isNaN(formData.eventsNeeded) || parseInt(formData.eventsNeeded) < 1) {
      newErrors.eventsNeeded = 'Please enter a valid number';
    }
    
    if (!formData.registrantsCount.trim()) {
      newErrors.registrantsCount = 'Number of registrants is required';
    }
    
    if (!formData.additionalInfo.trim()) {
      newErrors.additionalInfo = 'Additional information is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handler for Netlify
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // First, validate the form
    if (!validateForm()) {
      // Form has errors, don't submit
      return;
    }
    
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

  // Function to render error message for a field
  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <div className={styles['field-error']} role="alert">
        {errors[fieldName]}
      </div>
    ) : null;
  };

  return (
    <>
      <h2 className={styles['form-title']}>Ready to Experience the TRS Difference?</h2>
      
      <div className={styles['form-container']}>
        {formSubmitted ? (
          <div className={styles['form-success']}>
            <h3>Thank you for your interest!</h3>
            <p>We've received your demo request and will be in touch shortly.</p>
          </div>
        ) : (
          <form 
            className={styles['demo-form']} 
            onSubmit={handleSubmit} 
            name="demo-request" 
            method="POST" 
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
          >
            {/* Hidden fields for Netlify Forms */}
            <input type="hidden" name="form-name" value="demo-request" />
            <input type="hidden" name="bot-field" />
            
            <div className={styles['form-row']}>
              <div className={styles['form-field']}>
                <label htmlFor="firstName">First name <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  placeholder="First name" 
                  required 
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? styles['input-error'] : ''}
                />
                {renderError('firstName')}
              </div>
              
              <div className={styles['form-field']}>
                <label htmlFor="lastName">Last name <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Last name" 
                  required 
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? styles['input-error'] : ''}
                />
                {renderError('lastName')}
              </div>
            </div>
            
            <div className={styles['form-row']}>
              <div className={styles['form-field']}>
                <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles['input-error'] : ''}
                />
                {renderError('email')}
              </div>
              
              <div className={styles['form-field']}>
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className={styles['form-row']}>
              <div className={styles['form-field']}>
                <label htmlFor="organization">Organization/Company Name <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  id="organization" 
                  name="organization" 
                  placeholder="Enter your company/organization name" 
                  required 
                  aria-required="true"
                  aria-invalid={!!errors.organization}
                  aria-describedby={errors.organization ? 'organization-error' : undefined}
                  value={formData.organization}
                  onChange={handleChange}
                  className={errors.organization ? styles['input-error'] : ''}
                />
                {renderError('organization')}
              </div>
              
              <div className={styles['form-field']}>
                <label htmlFor="orgType">Type of Organization/Company <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  id="orgType" 
                  name="orgType" 
                  placeholder="Enter type of organization/company" 
                  required 
                  aria-required="true"
                  aria-invalid={!!errors.orgType}
                  aria-describedby={errors.orgType ? 'orgType-error' : undefined}
                  value={formData.orgType}
                  onChange={handleChange}
                  className={errors.orgType ? styles['input-error'] : ''}
                />
                {renderError('orgType')}
              </div>
            </div>
            
            <div className={styles['form-row']}>
              <div className={styles['form-field']}>
                <label htmlFor="eventsNeeded">Number of Events Needed <span className={styles.required}>*</span></label>
                <input 
                  type="number" 
                  id="eventsNeeded" 
                  name="eventsNeeded" 
                  placeholder="Enter a number" 
                  required 
                  aria-required="true"
                  min="1" 
                  aria-invalid={!!errors.eventsNeeded}
                  aria-describedby={errors.eventsNeeded ? 'eventsNeeded-error' : undefined}
                  value={formData.eventsNeeded}
                  onChange={handleChange}
                  className={errors.eventsNeeded ? styles['input-error'] : ''}
                />
                {renderError('eventsNeeded')}
              </div>
              
              <div className={styles['form-field']}>
                <label htmlFor="registrantsCount">Total Number of Registrants/Volunteers <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  id="registrantsCount" 
                  name="registrantsCount" 
                  placeholder="Enter an estimate or a range (e.g: ~1,000 - 1,500 registrants)" 
                  required 
                  aria-required="true"
                  aria-invalid={!!errors.registrantsCount}
                  aria-describedby={errors.registrantsCount ? 'registrantsCount-error' : undefined}
                  value={formData.registrantsCount}
                  onChange={handleChange}
                  className={errors.registrantsCount ? styles['input-error'] : ''}
                />
                {renderError('registrantsCount')}
              </div>
            </div>
            
            <div className={styles['form-field']}>
              <label htmlFor="additionalInfo">Additional information, requests, urgency <span className={styles.required}>*</span></label>
              <textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                rows="5" 
                placeholder="Message" 
                required 
                aria-required="true"
                aria-invalid={!!errors.additionalInfo}
                aria-describedby={errors.additionalInfo ? 'additionalInfo-error' : undefined}
                value={formData.additionalInfo}
                onChange={handleChange}
                className={errors.additionalInfo ? styles['input-error'] : ''}
              ></textarea>
              {renderError('additionalInfo')}
            </div>
            
            {formError && (
              <div className={styles['form-error']} role="alert">
                <p>Error: {formError}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className={styles['submit-button']} 
              disabled={formSubmitting}
            >
              {formSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
        
        {/* Contact Section */}
        <div className={styles['contact-section']}>
          <h3 className={styles['contact-title']}>Contact Us</h3>
          <div className={styles['contact-info']}>
            <div className={styles['contact-details']}>
              <p className={styles['contact-address']}>
                <strong>The Registration System LLC.</strong><br />
                412 S Maple St. Ste. 230<br />
                Fortville, IN 46040
              </p>
              <div className={styles['contact-email']}>
                <a href="mailto:support@my-trs.com">support@my-trs.com</a>
              </div>
            </div>
            
            <div className={styles['social-links']}>
              <a href="https://www.facebook.com/myTRSVolunteers/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 320 512">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/groups/1900016/profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
              </a>
              <a href="https://mobile.twitter.com/trsonline" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>
              <a href="https://www.google.com/maps/place/412+S+Maple+St,+Fortville,+IN+46040/@39.9307352,-85.8481937,20z/data=!4m5!3m4!1s0x8814cc9e304e27ab:0xedfee02aa7c90ad5!8m2!3d39.9307057!4d-85.8478644" target="_blank" rel="noopener noreferrer" aria-label="Location">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoForm;