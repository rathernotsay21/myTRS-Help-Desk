import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

/**
 * Testimonial Carousel component that displays client testimonials
 * with alternating colors in a carousel format
 */
const TestimonialCarousel = () => {
  // Testimonial data
  const testimonials = [
    {
      quote: "TRS has been one of our most valuable tools to manage our volunteer program. We are happy to recommend TRS. myTRS basically does volunteer recruiting for us - all we have to do is take care of the logistics of our event.",
      organization: "Indiana Sports Corp"
    },
    {
      quote: "The ability to pull reports and get the information you need in a timely manner is incredible. The email & texting features of this software make it easy to communicate with registered volunteers. For an organization who uses repeat volunteers, I'd recommend this software. The individual sites and similar sign-up process leaves frequent users at ease. The simplicity of adding features such as a background check and liability waivers is a plus.",
      organization: "Greater Cleveland Sports Commission"
    },
    {
      quote: "The platform is user-friendly and intuitive, making it easy for new volunteers to navigate without any issues.",
      organization: "Association for Mineral Exploration British Columbia (AME BC)"
    },
    {
      quote: "I appreciated you showing me how to build the site and then enabling me to do it, myself. Your responsiveness was wonderful and short instructional videos very much appreciated. The team is amazing and very responsive - thank you!",
      organization: "Delray Beach Open"
    },
    {
      quote: "The customer service is outstanding. TRS staff are a joy to work with.",
      organization: "National FFA Organization"
    },
    {
      quote: "I am continually impressed with myTRS. Through every job and event, I have brought myTRS with me and encouraged the company to get on board with it as well. I will always support and be an advocate to get people to use this system.",
      organization: "Destination Cleveland"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-advance the carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Determine if the current slide is even/odd for color alternation
  const isEven = activeIndex % 2 === 0;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselControls}>
        <button 
          onClick={prevSlide}
          className={styles.navButton}
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className={clsx(
        styles.testimonialCard,
        isEven ? styles.blueCard : styles.orangeCard
      )}>
        <div className={styles.quoteIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
        
        <div className={styles.testimonialContent}>
          <p className={styles.quote}>{testimonials[activeIndex].quote}</p>
          <p className={styles.organization}>{testimonials[activeIndex].organization}</p>
        </div>
      </div>
      
      <div className={styles.carouselControls}>
        <button 
          onClick={nextSlide}
          className={styles.navButton}
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className={styles.indicators}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(
              styles.indicator,
              activeIndex === index ? styles.activeIndicator : null
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;