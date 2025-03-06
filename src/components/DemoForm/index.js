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
    <section id="demo-form" className={styles['form-section']}>
      <h2 className={styles['form-title']}>Ready to Experience the TRS Difference?</h2>
      
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
    </section>
  );
};

export default DemoForm;
