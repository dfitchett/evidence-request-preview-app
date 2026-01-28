'use client';

import { useEffect, useRef, useState } from 'react';

interface WidthIndicatorProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function WidthIndicator({ containerRef }: WidthIndicatorProps) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateWidth();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '8px',
        right: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
      }}
    >
      {width}px
    </div>
  );
}

export default WidthIndicator;
