"use client";
import React, { useEffect } from "react";
import Lenis from 'lenis'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup if needed
    return () => {};
  }, []);

  return <>{children}</>;
}