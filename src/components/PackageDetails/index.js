import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import CheckIcon from '../../components/svgs/CheckIcon';

// Icon components for each plan type
const StandardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.packageSvgIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ProIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.packageSvgIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const EnterpriseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.packageSvgIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

// Get icon component based on plan title
const getIconComponent = (title) => {
  if (title.toLowerCase().includes('pro')) return ProIcon;
  if (title.toLowerCase().includes('enterprise')) return EnterpriseIcon;
  return StandardIcon;
};

const getIconBackground = (color) => {
  switch(color) {
    case 'blue': return '#9FC1FD';
    case 'green': return '#86efac';
    case 'orange': return '#fdba74';
    default: return '#9FC1FD';
  }
};

const getVolunteerLimit = (title) => {
  if (title.toLowerCase().includes('pro')) return 'Up to 2,000 volunteers';
  if (title.toLowerCase().includes('enterprise')) return 'Up to 10,000 volunteers';
  return 'Up to 500 volunteers';
};

const PackageDetails = ({ packageData, additionalServices }) => {
  return (
    <div className={styles.packageSection}>
      <div className="container">
        <h2 className={styles.industryExpertsHeading}>Package Details</h2>
        <div className={styles.headingUnderline}></div>

        {/* Detailed Features Section */}
        <div className={styles.packageGrid}>
          {packageData.map((plan, index) => {
            const IconComponent = getIconComponent(plan.title);
            const iconBackground = getIconBackground(plan.color);
            const volunteerLimit = getVolunteerLimit(plan.title);
            
            return (
              <div 
                key={index} 
                className={`${styles.packageCard} ${styles[`card-${plan.color}`]}`}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div 
                  className={styles.packageAccent}
                  style={{ backgroundColor: plan.accentColor }}
                ></div>
                <div className={styles.packageContent} style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Top Package Info */}
                  <div className={styles.packageTopHeader} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <div 
                      className={styles.packageIconWrapper}
                      style={{ 
                        backgroundColor: iconBackground,
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                      }}
                    >
                      <IconComponent />
                    </div>
                    <h3 className={styles.packageTopTitle} style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
                      {plan.title.replace(' Plan', '')}
                    </h3>
                    <p className={styles.packageTopDescription} style={{ fontSize: '18px', lineHeight: '1.5', marginBottom: '0' }}>{volunteerLimit}</p>
                  </div>
                  
                  <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', margin: '0 0 20px' }}></div>

                  <ul className={styles.featuresList} style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {plan.features.map((feature, featureIndex) => (
                      feature.section ? (
                        <li key={featureIndex} className={styles.sectionHeader} style={{ fontWeight: '700', marginTop: 'var(--my-trs-space-md)', marginBottom: 'var(--my-trs-space-xs)', fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-800)' }}>
                          {feature.section}
                        </li>
                      ) : (
                        <li key={featureIndex} className={styles.featureItem} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', gap: '8px' }}>
                          <span className={styles.checkIcon} style={{ display: 'flex', alignItems: 'center', color: 'var(--ifm-color-success)' }}>
                            <CheckIcon />
                          </span>
                          <span>{feature.item}</span>
                        </li>
                      )
                    ))}
                  </ul>

                  <div className={styles.packageButtonContainer} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 'auto', paddingTop: '16px' }}>
                    <Link
                      to="/contact"
                      className={styles.packageCtaButton}
                      style={{ 
                        backgroundColor: plan.accentColor,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'auto',
                        borderRadius: '50px',
                        color: 'white',
                        fontWeight: '600',
                        textDecoration: 'none',
                        padding: '1rem 1rem',
                        width: 'auto',
                        marginBottom: '16px',
                        transition: 'all 0.3s ease',
                        fontSize: '1.125rem'
                      }}
                    >
                      Request Demo
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {additionalServices && (
          <div style={{
            maxWidth: '1200px',
            margin: '2.5rem auto 0',
            background: 'var(--ifm-color-emphasis-0)',
            backgroundImage: 'linear-gradient(to right, rgba(37, 99, 235, 0.05), rgba(22, 163, 74, 0.05), rgba(234, 88, 12, 0.05))',
            borderRadius: '12px',
            padding: '28px 32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              background: 'linear-gradient(to bottom, #2563eb, #16a34a, #ea580c)'
            }}></div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'var(--ifm-color-primary)',
              borderBottom: '1px solid var(--ifm-color-emphasis-200)',
              paddingBottom: '1rem'
            }}>
              Additional Services Upon Request <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: '0.7' }}>(fees apply)</span>
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {additionalServices.map((service, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ifm-card-background-color)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  gap: '12px'
                }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'var(--ifm-color-success)',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    padding: '8px',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}>
                    <CheckIcon />
                  </span>
                  <span style={{ fontWeight: '500' }}>{service.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;