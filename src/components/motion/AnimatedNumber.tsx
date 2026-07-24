import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  duration?: number;
  formatFn?: (value: number) => string;
  delay?: number;
}

export const AnimatedNumber = ({
  value,
  duration = 2000,
  formatFn = (val) => val.toLocaleString(),
  delay = 0,
  className,
  ...props
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Wait for delay before starting animation
    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function: easeOutExpo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setDisplayValue(Math.floor(easeOut * value));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasAnimated, value, duration, delay]);

  return (
    <span ref={ref} className={cn("inline-block", className)} {...props}>
      {formatFn(displayValue)}
    </span>
  );
};
