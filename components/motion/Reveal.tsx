"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: keyof typeof motion;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : y }}
      transition={{
        duration: reduced ? 0.01 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  stagger?: number;
  delay?: number;
  once?: boolean;
  className?: string;
  itemClassName?: string;
}

export function StaggerReveal({
  children,
  stagger = 0.07,
  delay = 0,
  once = true,
  className,
  itemClassName,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }
          }
          transition={{
            duration: reduced ? 0.01 : 0.55,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
