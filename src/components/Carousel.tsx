"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./Carousel.module.css";

/* -------------------------------------------------------------------------- */
/*                              types & constants                             */
/* -------------------------------------------------------------------------- */

type CarouselProps = {
  images: string[];
};

type Layout = {
  carouselWidth: number;
  slideWidth: number;
  gap: number;
};

const TRANSITION_DURATION = 300;
const INITIAL_LAYOUT: Layout = { carouselWidth: 0, slideWidth: 0, gap: 0 };

export default function Carousel({ images }: CarouselProps) {
  if (images.length === 0) return null;

  /* refs (persist across renders, mutable) */
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const transitionTimeoutRef = useRef<number | null>(null);

  /* state (drives re-render) */
  const [layout, setLayout] = useState<Layout>(INITIAL_LAYOUT);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* derived values */
  const { carouselWidth, slideWidth, gap } = layout;
  const step = slideWidth + gap;
  const baseOffset = slideWidth > 0 ? (carouselWidth - slideWidth) / 2 : 0;
  const translateX =
    slideWidth > 0 ? baseOffset - currentIndex * step + dragOffset : dragOffset;

  const trackStyle: React.CSSProperties = {
    transform: `translateX(${translateX}px)`,
    transition: isDragging ? "none" : `transform ${TRANSITION_DURATION}ms ease`,
  };

  const isBlurring = isDragging || isTransitioning;

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */
  // cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // measure on mount + window resize
  useEffect(() => {
    function onResize() {
      measureLayout();
    }
    measureLayout();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // observe element resizes for more robust measurement
  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    if (!carousel || !track || !("ResizeObserver" in window)) return;

    const ro = new ResizeObserver(() => measureLayout());
    ro.observe(carousel);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // clamp current index if images length shrinks
  useEffect(() => {
    if (currentIndex >= images.length && images.length > 0) {
      setCurrentIndex(images.length - 1);
    }
  }, [currentIndex, images.length]);

  /* -------------------------------------------------------------------------- */
  /*                                   helpers                                  */
  /* -------------------------------------------------------------------------- */

  // measure layout from DOM (reads refs only)
  function measureLayout() {
    const carousel = carouselRef.current;
    const slide = firstSlideRef.current;
    const track = trackRef.current;
    if (!carousel || !slide || !track) return;

    const cs = window.getComputedStyle(track);
    const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0; // normalize gap value

    setLayout({
      carouselWidth: carousel.offsetWidth,
      slideWidth: slide.offsetWidth,
      gap,
    });
  }

  // start transition state with timeout cleanup
  function startTransition() {
    setIsTransitioning(true);
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }

  // decide if swipe should page
  function shouldAdvance(offsetPx: number) {
    const threshold = layout.slideWidth > 0 ? layout.slideWidth * 0.2 : 40; // 20% or 40px
    return Math.abs(offsetPx) > threshold;
  }

  /* -------------------------------------------------------------------------- */
  /*                              pointer handlers                              */
  /* -------------------------------------------------------------------------- */

  // start drag
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (images.length <= 1) return;

    measureLayout();
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
  }

  // move drag
  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;

    event.preventDefault();
    const offset = event.clientX - dragStartXRef.current;
    dragOffsetRef.current = offset;
    setDragOffset(offset);
  }

  // end drag (shared by up/leave/cancel)
  function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);

    const offset = dragOffsetRef.current;
    let next = currentIndex;

    if (shouldAdvance(offset)) {
      if (offset < 0 && currentIndex < images.length - 1)
        next = currentIndex + 1;
      else if (offset > 0 && currentIndex > 0) next = currentIndex - 1;
    }

    dragOffsetRef.current = 0;
    setDragOffset(0);

    if (next !== currentIndex) {
      setCurrentIndex(next);
      startTransition();
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      aria-roledescription="carousel"
    >
      <div
        ref={trackRef}
        className={`${styles.track} ${isBlurring ? styles.blurring : ""}`}
        style={trackStyle}
      >
        {images.map((src, index) => (
          <div
            ref={index === 0 ? firstSlideRef : undefined}
            className={styles.slide}
            key={`${src}-${index}`}
          >
            <img
              className={styles.image}
              src={src}
              alt={`Slide ${index + 1}`}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
