"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, for staggering siblings. */
  delay?: number;
}

/** Fades and lifts content in once when it enters the viewport (AGENT.md §17). */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}