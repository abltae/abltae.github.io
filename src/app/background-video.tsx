"use client";

import { useEffect, useRef } from "react";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Playback starts from JS rather than the autoPlay attribute so reduced-motion
  // visitors never see it move; they get the poster frame instead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduceMotion.matches) {
        video.pause();
      } else {
        // Autoplay can still be refused (e.g. iOS Low Power Mode); the poster stays up.
        video.play().catch(() => {});
      }
    };

    sync();
    reduceMotion.addEventListener("change", sync);
    return () => reduceMotion.removeEventListener("change", sync);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-black">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster="/dithering-poster.jpg"
        className="h-full w-full object-cover"
      >
        <source src="/dithering.mp4" type="video/mp4" />
      </video>
      {/* Scrim: the text column sits over the busiest part of the video, so dim it evenly. */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
