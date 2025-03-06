import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import clsx from 'clsx';

const AccordionItem = ({ title, icon, description, listTitle, items, footer, isOpen, toggleOpen, index }) => {
  return (
    <div className={clsx(styles.accordionItem, index === 0 ? styles.firstItem : '')}>
      <button 
        onClick={toggleOpen}
        className={styles.accordionButton}
      >
        <div className={clsx(styles.iconContainer, isOpen ? styles.iconOpen : styles.iconClosed)}>
          {icon}
        </div>
        <h3 className={styles.accordionTitle}>{title}</h3>
        <svg 
          className={clsx(styles.chevron, isOpen ? styles.chevronOpen : '')}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={clsx(styles.accordionContent, isOpen ? styles.contentOpen : '')}>
        <div className={styles.contentInner}>
          <p className={styles.description}>{description}</p>
          
          <div>
            <h4 className={styles.listTitle}>{listTitle}</h4>
            <ul className={styles.itemsList}>
              {items.map((item, idx) => (
                <li key={idx} className={styles.listItem}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {footer && (
            <div className={styles.footer}>
              <p>{footer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};  

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  listTitle: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  footer: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

const ServicesSection = () => {
  const [openSection, setOpenSection] = useState('training');
  
  const services = [
    {
      id: 'training',
      title: 'Personalized Training',
      icon: (
        <svg className={styles.iconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: "Our onboarding process includes tailored training sessions designed to meet your unique needs. We'll guide you through the platform, answer your questions, and ensure you have the knowledge and confidence to manage your volunteer program effectively.",
      listTitle: "What You'll Learn:",
      items: [
        "Essential Skills: Master the myTRS platform with hands-on training covering site building, registration setup, reporting, communication, and more.",
        "Customized Approach: Our training is tailored to your specific event needs, technical expertise, and registration process.",
        "Dedicated Support: Our expert team will guide you every step of the way, ensuring a smooth onboarding experience."
      ],
      footer: "All new clients receive two personalized training sessions focused on site building and reporting. We're here to help you unlock the full potential of myTRS!"
    },
    {
      id: 'testing',
      title: 'Expert Site Testing',
      icon: (
        <svg className={styles.iconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description: "Take control of your registration process with our expert site testing service. Upon request, we'll meticulously review your setup, identify potential issues, and provide you with the knowledge and tools to make updates proactively.",
      listTitle: "Benefits of Site Testing:",
      items: [
        "Minimize Errors: Catch and correct issues before they impact your registrants.",
        "Boost Confidence: Launch your registration with peace of mind.",
        "Gain Control: Learn how to make updates and manage your site effectively.",
        "Enhance User Experience: Ensure a positive and seamless registration process for your volunteers."
      ]
    },
    {
      id: 'support',
      title: 'Unwavering Support',
      icon: (
        <svg className={styles.iconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      description: "At myTRS, you're never alone. Our dedicated account representatives are your partners in success, providing personalized guidance, prompt solutions, and unwavering support whenever you need it.",
      listTitle: "Experience the myTRS Support Difference:",
      items: [
        "Dedicated Account Rep: Receive 1-on-1 support from a knowledgeable and friendly expert.",
        "Rapid Response: Get your questions answered and issues addressed promptly, even on weekends and holidays.",
        "Human-Centered Support: Connect with real people who understand your challenges and are committed to finding solutions. No chatbots, just genuine human interaction.",
        "Helpful Resources: Access our comprehensive Help Desk filled with tutorials and detailed instructions to guide you through any task."
      ]
    },
    {
      id: 'onsite',
      title: 'On-Site Support (Upon Request)',
      icon: (
        <svg className={styles.iconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      description: "Focus on your event, not the technology. myTRS offers on-site support to ensure your volunteers and staff have the assistance they need to confidently utilize our system. Request this service to have our expert team provide comprehensive training, personalized guidance, and proactive problem-solving on event day.",
      listTitle: "Benefits of On-Site Support:",
      items: [
        "Confident Volunteers: Empower your volunteers with the knowledge and support they need to succeed.",
        "Smooth Event Flow: Address any issues quickly and efficiently to minimize disruptions.",
        "Reduced Stress: Focus on your event, knowing that myTRS experts are handling the technical aspects.",
        "Enhanced Efficiency: Maximize the effectiveness of your volunteer program with on-site guidance and support."
      ]
    }
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.servicesInner}>
        <div className={styles.header}>
          <h2 className={styles.title}>myTRS Services</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Comprehensive support to ensure your success at every stage of your myTRS journey.
          </p>
        </div>
        
        <div className={styles.accordionContainer}>
          {services.map((service, index) => (
            <AccordionItem
              key={service.id}
              index={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              listTitle={service.listTitle}
              items={service.items}
              footer={service.footer}
              isOpen={openSection === service.id}
              toggleOpen={() => toggleSection(service.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;

ServicesSection.propTypes = {
  // This component doesn't accept any props currently
};