"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ── CONFIGURATION (edit these props or pass them in) ─────────────────────────
const DEFAULT_IMAGES = [
  {
    url: "/backgrounds/africa-treasure.jpg",
    caption: "Africa Gift",
  },
  {
    url: "/backgrounds/inferno-man.webp",
    caption: "Ocean Horizon",
  },
  {
    url: "/backgrounds/female-scents.jpg",
    caption: "Forest Serenity",
  },
  {
    url: "/backgrounds/whispering-aura.webp",
    caption: "Night Sky",
  },
];

/**
 * BackgroundStagger
 *
 * Props:
 *  images        — array of { url: string, caption?: string }
 *  cols          — number of grid columns          (default 8)
 *  rows          — number of grid rows             (default 5)
 *  flipDuration  — seconds per tile flip           (default 0.55)
 *  staggerEach   — seconds between tile starts     (default 0.045)
 *  autoInterval  — ms between auto-transitions     (default 4500)
 *  from          — GSAP stagger origin: 'start' | 'center' | 'end' | 'random' (default 'start')
 *  axis          — GSAP stagger axis: 'x' | 'y'   (default 'x')
 *  ease          — GSAP ease string                (default 'power2.inOut')
 *                    Common options: 'power1.in', 'power1.out', 'power2.inOut',
 *                    'power3.out', 'expo.inOut', 'sine.inOut', 'back.out(1.7)', etc.
 *  showDots      — show navigation dots            (default true)
 *  showCaptions  — show captions                   (default true)
 *  className     — extra classes on the root div
 */
export default function BackgroundStagger({
  images = DEFAULT_IMAGES,
  cols = 8,
  rows = 5,
  flipDuration = 0.95,
  staggerEach = 0.15,
  autoInterval = 7500,
  from = "start",
  axis = "x",
  ease = "power2.inOut",
  showDots = false,
  showCaptions = false,
  className = "",
}) {
  const containerRef = useRef(null);
  const cellInnersRef = useRef([]); // array of .cell-inner DOM nodes
  const cellFrontsRef = useRef([]);
  const cellBacksRef = useRef([]);
  const captionRef = useRef(null);
  const autoTimerRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Keep a mutable ref for current index so callbacks don't go stale
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const goToRef = useRef(null);

  const totalCells = cols * rows;

  // ── BACKGROUND SLICE ───────────────────────────────────────────────────────
  // Sets each tile to show only its slice of the full image.
  const applyTileBg = useCallback(
    (el, imgUrl, col, row) => {
      if (!containerRef.current) return;
      const W = containerRef.current.offsetWidth;
      const H = containerRef.current.offsetHeight;
      el.style.backgroundImage = `url('${imgUrl}')`;
      el.style.backgroundSize = `${W}px ${H}px`;
      el.style.backgroundPosition = `${-(col * (W / cols))}px ${-(row * (H / rows))}px`;
    },
    [cols, rows]
  );

  const paintFronts = useCallback(
    (imgUrl) => {
      cellFrontsRef.current.forEach((el, i) => {
        if (!el) return;
        const col = i % cols;
        const row = Math.floor(i / cols);
        applyTileBg(el, imgUrl, col, row);
      });
    },
    [cols, applyTileBg]
  );

  // Repaint on resize
  useEffect(() => {
    const handleResize = () => paintFronts(images[currentRef.current].url);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [paintFronts, images]);

  // Initial paint
  useEffect(() => {
    paintFronts(images[0].url);
  }, [paintFronts, images]);

  // ── GSAP TRANSITION ────────────────────────────────────────────────────────
  const { contextSafe } = useGSAP({ scope: containerRef });

  const flipTo = useCallback(
    (nextIdx, onDone) =>
      contextSafe(() => {
        const nextUrl = images[nextIdx].url;

        // Load next image slices onto back faces
        cellBacksRef.current.forEach((el, i) => {
          if (!el) return;
          const col = i % cols;
          const row = Math.floor(i / cols);
          applyTileBg(el, nextUrl, col, row);
        });

        const inners = cellInnersRef.current.filter(Boolean);

        // Reset any leftover rotation
        gsap.set(inners, { rotationY: 0 });

        gsap.to(inners, {
          rotationY: 180,
          duration: flipDuration,
          ease,
          stagger: {
            each: staggerEach,
            from,
            grid: [rows, cols],
            axis,
          },
          onComplete: () => {
            // Silently reset: bring fronts up to date, clear rotation
            gsap.set(inners, { rotationY: 0 });
            cellFrontsRef.current.forEach((el, i) => {
              if (!el) return;
              const col = i % cols;
              const row = Math.floor(i / cols);
              applyTileBg(el, nextUrl, col, row);
            });
            if (onDone) onDone();
          },
        });
      })(),
    [contextSafe, images, cols, rows, flipDuration, ease, staggerEach, from, axis, applyTileBg]
  );

  // ── NAVIGATION ─────────────────────────────────────────────────────────────
  const scheduleAuto = useCallback(() => {
    clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => {
      const next = (currentRef.current + 1) % images.length;
      goToRef.current?.(next);
    }, autoInterval);
  }, [autoInterval, images.length]);

  const goTo = useCallback(
    (nextIdx) => {
      if (isAnimatingRef.current || nextIdx === currentRef.current) return;
      isAnimatingRef.current = true;
      setIsAnimating(true);
      clearTimeout(autoTimerRef.current);

      // Fade caption out
      if (captionRef.current) {
        gsap.to(captionRef.current, { opacity: 0, duration: 0.25 });
      }

      flipTo(nextIdx, () => {
        currentRef.current = nextIdx;
        setCurrent(nextIdx);
        isAnimatingRef.current = false;
        setIsAnimating(false);

        // Fade caption in
        if (captionRef.current) {
          gsap.to(captionRef.current, { opacity: 1, duration: 0.5, delay: 0.1 });
        }

        scheduleAuto();
      });
    },
    [flipTo, scheduleAuto]
  );
  // Keep the ref current so scheduleAuto's closure can always reach the latest goTo
  useLayoutEffect(() => {
    goToRef.current = goTo;
  });

  // Kick off auto-play on mount
  useEffect(() => {
    scheduleAuto();
    return () => clearTimeout(autoTimerRef.current);
  }, [scheduleAuto]);

  // ── CELL REFS HELPER ───────────────────────────────────────────────────────
  // Because we render cells in a loop, we collect refs into arrays.
  const setInnerRef = (el, i) => { cellInnersRef.current[i] = el; };
  const setFrontRef = (el, i) => { cellFrontsRef.current[i] = el; };
  const setBackRef  = (el, i) => { cellBacksRef.current[i]  = el; };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
    >
      {/* ── GRID ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => {
          return (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{ perspective: "900px" }}
            >
              {/* cell-inner: GSAP rotates this */}
              <div
                ref={(el) => setInnerRef(el, i)}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front face */}
                <div
                  ref={(el) => setFrontRef(el, i)}
                  className="absolute inset-0 bg-no-repeat"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                />
                {/* Back face */}
                <div
                  ref={(el) => setBackRef(el, i)}
                  className="absolute inset-0 bg-no-repeat"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── UI OVERLAY ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 gap-3 pointer-events-none">

        {/* Caption */}
        {showCaptions && (
          <p
            ref={captionRef}
            className="text-white text-sm tracking-[0.28em] uppercase drop-shadow-lg opacity-0"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
          >
            {images[current].caption}
          </p>
        )}

        {/* Dots */}
        {showDots && (
          <div className="flex gap-2.5 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                disabled={isAnimating}
                aria-label={`Go to slide ${i + 1}`}
                className={`
                  w-2.5 h-2.5 rounded-full border-2 border-white/75 transition-colors duration-300
                  ${i === current ? "bg-white" : "bg-white/25"}
                  disabled:cursor-not-allowed
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
