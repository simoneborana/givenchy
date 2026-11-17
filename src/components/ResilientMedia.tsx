import React, { useEffect, useState } from 'react';
import { isVideoMediaUrl } from '../utils/mediaUrl';

interface ResilientMediaProps {
  src: string;
  alt: string;
  className?: string;
  animateMotion?: boolean;
  isPlaying?: boolean;
  fallbackTitle?: string;
}

export const ResilientMedia: React.FC<ResilientMediaProps> = ({
  src,
  alt,
  className = '',
  animateMotion = false,
  isPlaying = true,
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const isVideo = isVideoMediaUrl(src);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[var(--bg-surface)] text-[var(--text-muted)] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          className="mb-3 opacity-45"
          aria-hidden="true"
        >
          <rect x="9" y="2" width="14" height="7" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 9V12H20V9" stroke="currentColor" strokeWidth="1.2" />
          <rect x="4" y="12" width="24" height="25" rx="2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="font-display text-sm tracking-wide text-[var(--text-primary)]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  if (isVideo) {
    return (
      <video
        key={src}
        src={src}
        autoPlay={isPlaying}
        muted
        loop
        playsInline
        onError={() => setHasError(true)}
        className={`object-cover ${className}`}
        aria-label={alt}
      />
    );
  }

  const motionClass = animateMotion
    ? isPlaying
      ? 'animate-cinema-pan'
      : 'animate-cinema-pan animate-cinema-paused'
    : '';

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${motionClass} ${className}`}
    />
  );
};
