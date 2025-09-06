/**
 * Stolen from - https://ui.aceternity.com/components/shooting-stars-and-stars-background
 * Created by - https://x.com/realvjy
 */

import { useLocalStorage } from '@uidotdev/usehooks';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface StarProps {
  x: number;
  y: number;
  radius: number;
  color: number;
  opacity: number;
  twinkleSpeed: number | null;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export function StarsBackground(props: StarBackgroundProps) {
  const {
    starDensity = 0.00015,
    allStarsTwinkle = true,
    twinkleProbability = 0.5,
    minTwinkleSpeed = 0.5,
    maxTwinkleSpeed = 1,
  } = props;

  const [spaceBackground] = useLocalStorage('space-background', true);
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const area = width * height;
      const starHues = [220, 240, 45, 35, 15];
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.2 + 0.4,
          color: starHues[Math.floor(Math.random() * starHues.length)],
          opacity: Math.random() * 0.25 + 0.5,
          twinkleSpeed: shouldTwinkle ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) : null,
        };
      });
    },
    [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const updateStars = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setStars(generateStars(width, height));
    };
    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      resizeObserver.unobserve(canvas);
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    generateStars,
    spaceBackground,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const intervalId = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.color}, 100%, 90%, ${star.opacity})`;
        ctx.fill();

        if (star.twinkleSpeed !== null) {
          star.opacity = 0.25 + Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });
    }, 75);

    return () => {
      clearInterval(intervalId);
    };
  }, [stars, spaceBackground]);

  return (
    spaceBackground && (
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}
      />
    )
  );
}
