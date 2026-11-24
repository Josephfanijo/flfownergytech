import React, { useState, useEffect, useRef } from 'react';
import { ELECTRICAL_GALLERY_MEDIA } from '../data/electricalGalleryData';
import { SOLAR_GALLERY_IMAGES } from '../data/solarGalleryData';
import { CCTV_GALLERY_MEDIA } from '../data/cctvGalleryData';
import { PROPERTY_GALLERY_IMAGES } from '../data/propertyGalleryData';

const INTERVAL_MS = 15000; // 15 seconds per slide
const FADE_DURATION_MS = 1000; // 1.0s smooth cross-fade

const FALLBACK_SLIDE = {
  src: '/images/flownergy-team.jpg',
  alt: 'FLOWNERGY Engineering Team on Site',
  category: 'Team'
};

/**
 * Compiles and deduplicates all project photographs from the four core service galleries.
 * Interleaves categories so all services are represented in the opening rotation.
 */
function buildProjectSlides() {
  const electrical = ELECTRICAL_GALLERY_MEDIA
    .filter(m => m.type === 'image' || (!m.type && typeof m.src === 'string' && !m.src.endsWith('.mp4')))
    .map(m => ({
      src: m.src,
      alt: m.alt || 'FLOWNERGY Electrical Installation Project',
      category: 'Electrical Installation'
    }));

  const solar = SOLAR_GALLERY_IMAGES.map(m => ({
    src: m.src,
    alt: m.alt || 'FLOWNERGY Solar Energy Project',
    category: 'Solar Energy'
  }));

  const cctv = CCTV_GALLERY_MEDIA
    .filter(m => m.poster || (m.type === 'image' && m.src))
    .map(m => ({
      src: m.poster || m.src,
      alt: m.alt || 'FLOWNERGY CCTV & Security Systems Project',
      category: 'CCTV & Security Systems'
    }));

  const property = PROPERTY_GALLERY_IMAGES.map(m => ({
    src: m.src,
    alt: m.alt || 'FLOWNERGY Property Management Project',
    category: 'Property Management'
  }));

  // Interleave the four categories: Electrical, Solar, CCTV, Property
  const queues = [
    [...electrical],
    [...solar],
    [...cctv],
    [...property]
  ];

  const interleaved = [];
  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const q of queues) {
      if (q.length > 0) {
        interleaved.push(q.shift());
        hasMore = true;
      }
    }
  }

  // Deduplicate by image URL path
  const seen = new Set();
  const unique = [];
  for (const item of interleaved) {
    if (!seen.has(item.src)) {
      seen.add(item.src);
      unique.push(item);
    }
  }

  return unique.length > 0 ? unique : [FALLBACK_SLIDE];
}

// Build once at module load to avoid re-calculating across renders
const PROJECT_SLIDES = buildProjectSlides();

export default function HeroSlideshow() {
  const slides = PROJECT_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const timerRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const isMountedRef = useRef(false);
  const failedImagesRef = useRef(new Set());

  // Listen for changes to user motion preferences
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Preload only the next image in background
  useEffect(() => {
    if (slides.length <= 1) return;
    let next = (currentIndex + 1) % slides.length;
    let attempts = 0;
    while (failedImagesRef.current.has(slides[next].src) && attempts < slides.length) {
      next = (next + 1) % slides.length;
      attempts++;
    }
    const nextSrc = slides[next]?.src;
    if (nextSrc) {
      const img = new Image();
      img.src = nextSrc;
      img.onerror = () => {
        failedImagesRef.current.add(nextSrc);
      };
    }
  }, [currentIndex, slides]);

  // Main 15-second slideshow timer & Page Visibility handling
  useEffect(() => {
    isMountedRef.current = true;
    if (slides.length <= 1) return;

    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        advanceSlide();
      }, INTERVAL_MS);
    };

    const advanceSlide = () => {
      if (!isMountedRef.current || (typeof document !== 'undefined' && document.hidden)) return;

      setCurrentIndex((current) => {
        let next = (current + 1) % slides.length;
        let attempts = 0;
        while (failedImagesRef.current.has(slides[next].src) && attempts < slides.length) {
          next = (next + 1) % slides.length;
          attempts++;
        }
        if (next === current) return current;

        setPrevIndex(current);
        setIsTransitioning(true);

        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setIsTransitioning(false);
            setPrevIndex(null);
          }
        }, prefersReducedMotion ? 0 : FADE_DURATION_MS);

        return next;
      });

      startTimer();
    };

    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearTimeout(timerRef.current);
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [slides, prefersReducedMotion]);

  const handleImageError = (failedIdx) => {
    const failedSrc = slides[failedIdx]?.src;
    if (failedSrc) {
      failedImagesRef.current.add(failedSrc);
    }
    // Skip to next slide if current fails to load
    setCurrentIndex((current) => {
      let next = (current + 1) % slides.length;
      let attempts = 0;
      while (failedImagesRef.current.has(slides[next].src) && attempts < slides.length) {
        next = (next + 1) % slides.length;
        attempts++;
      }
      return next;
    });
  };

  const currentSlide = slides[currentIndex] || FALLBACK_SLIDE;
  const prevSlide = prevIndex !== null ? slides[prevIndex] : null;

  // If only one slide exists, render static without animation overhead
  if (slides.length <= 1) {
    return (
      <div className="hero-slideshow">
        <img
          src={currentSlide.src}
          alt={currentSlide.alt}
          className="hero-engineer-img hero-slideshow-img"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div className="hero-slideshow" role="region" aria-label="FLOWNERGY Project Showcase Slideshow">
      {/* Underlying previous slide (visible during cross-fade) */}
      {prevSlide && isTransitioning && (
        <img
          key={`prev-${prevSlide.src}`}
          src={prevSlide.src}
          alt={prevSlide.alt}
          className="hero-engineer-img hero-slideshow-img"
          style={{ zIndex: 1, opacity: 1 }}
          aria-hidden="true"
        />
      )}

      {/* Incoming / Active slide */}
      <img
        key={`curr-${currentSlide.src}`}
        src={currentSlide.src}
        alt={currentSlide.alt}
        className={`hero-engineer-img hero-slideshow-img ${isTransitioning ? 'hero-slideshow-incoming' : ''}`}
        style={{ zIndex: 2 }}
        loading={currentIndex === 0 && prevIndex === null ? 'eager' : 'lazy'}
        fetchPriority={currentIndex === 0 && prevIndex === null ? 'high' : 'auto'}
        onError={() => handleImageError(currentIndex)}
      />
    </div>
  );
}
