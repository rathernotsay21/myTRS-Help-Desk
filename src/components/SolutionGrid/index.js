import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import SolutionBlock from '../SolutionBlock';

const SolutionGrid = ({ solutions }) => {
  const blocksRef = useRef(null);
  const [animatedBlocks, setAnimatedBlocks] = useState([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate blocks in sequence
          const animationSequence = solutions.map((_, index) => index);
          
          // Stagger the animations
          animationSequence.forEach((blockIndex, i) => {
            setTimeout(() => {
              setAnimatedBlocks(prev => [...prev, blockIndex]);
            }, i * 150);
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
  }, [solutions]);

  return (
    <div className={styles['blocks-container']} ref={blocksRef}>
      {solutions.map((solution, index) => (
        <SolutionBlock
          key={index}
          number={solution.number}
          title={solution.title}
          text={solution.text}
          isPrimary={solution.isPrimary}
          isAnimated={animatedBlocks.includes(index)}
          icon={solution.icon}
        />
      ))}
    </div>
  );
};

SolutionGrid.propTypes = {
  solutions: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isPrimary: PropTypes.bool,
      icon: PropTypes.node
    })
  ).isRequired
};

export default SolutionGrid;
