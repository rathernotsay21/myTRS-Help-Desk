import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

const Section = ({ 
  id,
  heading, 
  title, 
  subtitle, 
  children,
  className,
  contentClassName,
  style = {}
}) => {
  return (
    <section id={id} className={clsx(styles.section, className)} style={style}>
      {heading && <h2 className={styles['section-heading']}>{heading}</h2>}
      
      <div className={clsx(styles['section-content'], contentClassName)}>
        {title && <h3 className={styles['section-title']}>{title}</h3>}
        {subtitle && <p className={styles['section-subtitle']}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default Section;
