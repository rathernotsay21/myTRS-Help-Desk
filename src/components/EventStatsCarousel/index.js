import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

// Default event data if none is provided
const defaultEventData = [
  {
    count: "100+",
    type: "Industry Conferences",
    examples: ["IPW", "ASAE", "NTA", "Envision", "Routes", "NABJ", "MPI"]
  },
  {
    count: "4",
    type: "NFL Events",
    examples: ["Super Bowls", "Drafts", "Combines"]
  },
  {
    count: "10+",
    type: "Political Conventions",
    examples: ["RNC", "DNC", "National League of Cities", "US Conference of Mayors"]
  },
  {
    count: "24+",
    type: "NCAA Final Fours",
    examples: ["Men's", "Women's"]
  },
  {
    count: "21+",
    type: "Professional Golf",
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
    type: "Professional Tennis",
    examples: []
  },
  {
    count: "18",
    type: "National FFA Conventions",
    examples: []
  }
];

/**
 * A carousel component that displays event statistics with auto-scrolling
 * 
 * @param {Array} customData - Optional custom data to display in the carousel
 * @param {number} autoScrollInterval - Time in ms between auto-scrolls
 * @param {boolean} initialPaused - Whether auto-scrolling should be paused initially
 */
function EventStatsCarousel({ 
  customData,
  autoScrollInterval = 4000, 
  initialPaused = false 
}) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isPaused, setIsPaused] = useState(initialPaused);
  const autoScrollIntervalRef = useRef(null);
  
  // Use custom data if provided, otherwise use default data
  const displayData = customData || defaultEventData;

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
      
      // If we've reached the end, scroll back to the beginning after a short delay
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          }
        }, 2000); // 2 seconds delay before scrolling back to start
      }
    }
  };

  // Set up auto-scrolling
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        if (!isPaused && scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          
          // If near the end, scroll back to start
          if (scrollLeft + clientWidth >= scrollWidth - 50) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Otherwise, scroll right
            scrollRight();
          }
        }
      }, autoScrollInterval);
    };

    startAutoScroll();

    // Clean up on unmount
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isPaused, autoScrollInterval]);

  // Pause auto-scrolling when user interacts
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
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
          className={`${styles.navArrow} ${styles.leftArrow}`}
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        {displayData.map((event, index) => (
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
          className={`${styles.navArrow} ${styles.rightArrow}`}
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

EventStatsCarousel.propTypes = {
  customData: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      examples: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ),
  autoScrollInterval: PropTypes.number,
  initialPaused: PropTypes.bool
};

export default EventStatsCarousel;
