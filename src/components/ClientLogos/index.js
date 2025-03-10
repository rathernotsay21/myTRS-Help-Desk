// src/components/ClientLogos/index.js
import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';
import ResponsiveImage from '@site/src/components/ResponsiveImage';
import PricingCards from '@site/src/components/PricingCards';

// Payment service logos for our new section
const paymentLogos = [
  { name: 'Authorize.net', src: '/img/payment_services/authorize_net.svg' },
  { name: 'Braintree', src: '/img/payment_services/Braintree.svg' },
  { name: 'Payeezy', src: '/img/payment_services/payeezy.svg' },
  { name: 'Payflow', src: '/img/payment_services/Payflow.svg' },
  { name: 'PayPal', src: '/img/payment_services/paypal.svg' },
  { name: 'Stripe', src: '/img/payment_services/stripe.svg' }
];

// Define client logos with names, sizes and dimensions for better accessibility and performance
const clientLogos = [
  { file: 'superbowl_logo_processed.webp', name: 'Super Bowl', width: 800, height: 450 },
  { file: 'Special_Olympics_Logo.webp', name: 'Special Olympics', width: 3840, height: 2160 },
  { file: 'USA_Gymnastics_Logo.webp', name: 'USA Gymnastics', width: 1200, height: 675 },
  { file: 'USA_Track_and_Field_Logo.webp', name: 'USA Track and Field', width: 1200, height: 630 },
  { file: 'NCAA_Logo.webp', name: 'NCAA', width: 1200, height: 1200 },
  { file: 'big_ten_conference_logo.webp', name: 'Big Ten Conference', width: 1200, height: 630 },
  { file: 'National_League_of_Cities_Logo.webp', name: 'National League of Cities', width: 805, height: 456 },
  { file: 'indy_500_logo.webp', name: 'Indianapolis 500', width: 800, height: 447 },
  { file: 'usa_diving_logo.webp', name: 'USA Diving', width: 792, height: 612 },
  { file: 'PGA_of_America_Logo_2023.webp', name: 'PGA of America', width: 901, height: 900 },
  { file: 'NFL_Draft_Logo.webp', name: 'NFL Draft', width: 1200, height: 1148 },
  { file: 'ciaa_logo.webp', name: 'CIAA', width: 771, height: 771 },
  { file: 'National_FFA-Logo.webp', name: 'National FFA', width: 3840, height: 2160 },
  { file: 'NorthCarolinaAzaleaFestival.webp', name: 'North Carolina Azalea Festival', width: 518, height: 502 },
];

export default function ClientLogos() {
  const logosRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (logosRef.current) {
      observer.observe(logosRef.current);
    }

    return () => {
      if (logosRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Create srcset paths for responsive loading
  const getSrcSet = (file) => {
    return `/img/client_logos/${file} 800w`;
  };

  // Render a set of logo items
  const renderLogoItems = (startIndex = 0) => {
    return clientLogos.map((logo, index) => (
      <div 
        key={`logo-${startIndex}-${index}`} 
        className={styles['logo-carousel-item']}
      >
        <ResponsiveImage
          src={`/img/client_logos/${logo.file}`}
          srcSet={getSrcSet(logo.file)}
          sizes="120px"
          alt={`${logo.name} logo`}
          width={logo.width}
          height={logo.height}
          className={styles.logo}
          lazy={true}
        />
      </div>
    ));
  };

  return (
    <>
      {/* Pricing Cards Section */}
      <PricingCards />
      
      {/* Payment Services Section */}
      <div className="container">
        <div className={styles['payment-services']}>
          <div className={styles['payment-icons']}>
            {paymentLogos.map((logo, index) => (
              <div key={index} className={styles['payment-icon-wrapper']}>
                <ResponsiveImage
                  src={logo.src}
                  alt={`${logo.name} payment method`}
                  className={styles['payment-icon']}
                  width={100}
                  height={40}
                  lazy={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Client Logos Section */}
      <section className={styles['client-logos']} ref={logosRef}>
        <div className="container">
          <h2 className={styles['section-title']}>Trusted by the Industry Experts since 2000</h2>
          <p className={styles['section-subtitle']}>Who do we serve?</p>
        
          {/* Pure CSS marquee-style logo carousel */}
          <div className={styles['logo-carousel-container']}>
            {isVisible && (
              <div className={styles['logo-carousel-track']}>
                {/* First set of logos */}
                <div className={styles['logo-carousel-content']}>
                  {renderLogoItems(1)}
                </div>
                
                {/* Duplicate set for continuous effect */}
                <div className={styles['logo-carousel-content']}>
                  {renderLogoItems(2)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}