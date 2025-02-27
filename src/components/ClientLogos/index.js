// src/components/ClientLogos/index.js
import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

// Define client logos with names for better accessibility
const clientLogos = [
  { file: 'Superbowl_Logo-min.png', name: 'Super Bowl' },
  { file: 'ciaa_logo-min.png', name: 'CIAA' },
  { file: 'Special_Olympics_Logo-min.png', name: 'Special Olympics' },
  { file: 'USA_Gymnastics_Logo-min.jpg', name: 'USA Gymnastics' },
  { file: 'PGA_of_America_Logo-min.png', name: 'PGA of America' },
  { file: 'NFL_Draft_Logo-min.png', name: 'NFL Draft' },
  { file: 'USA_Track_and_Field_Logo-min.png', name: 'USA Track and Field' },
  { file: 'NCAA_Logo-min.png', name: 'NCAA' },
  { file: 'big_ten_conference_logo-min.jpg', name: 'Big Ten Conference' },
  { file: 'National_League_of_Cities_Logo-min.jpg', name: 'National League of Cities' },
  { file: 'RunDisney_Logo-min.png', name: 'Run Disney' },
  { file: 'usa_diving_logo-min.png', name: 'USA Diving' },
  { file: 'PGA_of_America_Logo_2023-min.png', name: 'PGA of America 2023' },
];

// Group logos into arrays for the animation to work in waves
const groupedLogos = [
  clientLogos.slice(0, Math.ceil(clientLogos.length / 2)),
  clientLogos.slice(Math.ceil(clientLogos.length / 2)),
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

  return (
    <section className={styles.clientLogos} ref={logosRef}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Trusted by industry leaders</h2>
        <p className={styles.sectionSubtitle}>More than software. We are committed to building true partnerships.</p>
        <div className={styles.logoGrid}>
          {groupedLogos.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.logoRow}>
              {group.map((logo, index) => (
                <div 
                  key={index} 
                  className={clsx(
                    styles.logoWrapper,
                    isVisible && styles.animate,
                    `${styles.delayedAppearance}${index + (groupIndex * 7)}`
                  )}
                >
                  <div className={styles.logoInner}>
                    <img
                      src={`/img/client_logos/${logo.file}`}
                      alt={`${logo.name} logo`}
                      className={styles.logo}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}