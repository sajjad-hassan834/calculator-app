import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type RevealVariant = "fade-up" | "fade-scale" | "float" | "none";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // In milliseconds
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0.1,
  once = true,
  className,
  ...props
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const getVariantClass = () => {
    if (!isVisible) return "reveal-hidden";
    switch (variant) {
      case "fade-up":
        return "animate-fade-up reveal-visible";
      case "fade-scale":
        return "animate-fade-scale reveal-visible";
      case "float":
        return "animate-float reveal-visible";
      default:
        return "reveal-visible";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(getVariantClass(), className)}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};
