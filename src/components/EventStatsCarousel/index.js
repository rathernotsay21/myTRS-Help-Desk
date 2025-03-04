import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';

const eventData = [
  {
    count: "100+",
    type: "Industry Conferences",
    examples: ["IPW", "ASAE", "NTA", "Envision", "Routes", "NABJ", "MPI"]
  },
  {
    count: "4",
    type: "Super Bowls & Numerous NFL Events",
    examples: ["Drafts", "Combines"]
  },
  {
    count: "10+",
    type: "National Political Conventions",
    examples: ["RNC", "DNC", "National League of Cities", "US Conference of Mayors"]
  },
  {
    count: "30+",
    type: "Multi-Event Games",
    examples: ["USA Games", "Special Olympic State Games", "National Senior", "Transplant", "Golden Age", "Wheelchair", "The Gay Games", "The Euro Games"]
  },
  {
    count: "24+",
    type: "Men's & Women's NCAA Final Fours",
    examples: []
  },
  {
    count: "21+",
    type: "Professional Golf Events",
    examples: []
  },
  {
    count: "75+",
    type: "Local Festivals",
    examples: ["North Carolina Azalea Festival", "Peoria Irish Festival"]
  },
  {
    count: "20+",
    type: "US Olympic Trials",
    examples: []
  },
  {
    count: "10+",
    type: "Professional Tennis Events",
    examples: []
  },
  {
    count: "18",
    type: "National FFA Conventions",
    examples: []
  }
];

export default function EventStatsCarousel() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  // Function to check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show left arrow if not at the start
      setShowLeftArrow(scrollLeft > 0);
      
      // Show right arrow if not at the end
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className={styles.carouselContainer}>
      {/* Left Arrow */}
      {showLeftArrow && (
        <button 
          onClick={scrollLeft}
          className={styles.navArrow + ' ' + styles.leftArrow}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {/* Horizontal scrolling container */}
      <div 
        ref={scrollContainerRef}
        className={styles.scrollContainer}
      >
        {eventData.map((event, index) => (
          <div 
            key={index} 
            className={styles.eventCard}
          >
            <div className={styles.cardContent}>
              <div className={styles.countContainer}>
                <span className={styles.count}>{event.count}</span>
              </div>
              <h3 className={styles.eventType}>{event.type}</h3>
              {event.examples.length > 0 && (
                <div className={styles.examplesContainer}>
                  <div className={styles.examples}>
                    {event.examples.map((example, i) => (
                      <span key={i} className={styles.exampleTag}>
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Right Arrow */}
      {showRightArrow && (
        <button 
          onClick={scrollRight}
          className={styles.navArrow + ' ' + styles.rightArrow}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}