'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { SyncHashIndicator } from './SyncHashIndicator';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftHeader?: string;
  rightHeader?: string;
  defaultLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
}

export function TwoColumnLayout({
  left,
  right,
  leftHeader = 'Editor',
  rightHeader = 'Preview',
  defaultLeftWidth = 33.333,
  minLeftWidth = 20,
  maxLeftWidth = 80,
}: TwoColumnLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Clamp the width within bounds
      const clampedWidth = Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth);
      setLeftWidth(clampedWidth);
    },
    [isDragging, minLeftWidth, maxLeftWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const touch = e.touches[0];
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = ((touch.clientX - containerRect.left) / containerRect.width) * 100;

      const clampedWidth = Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth);
      setLeftWidth(clampedWidth);
    },
    [isDragging, minLeftWidth, maxLeftWidth]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="two-column-layout">
      {/* Main App Header */}
      <header className="vads-u-background-color--primary vads-u-color--white vads-u-padding-x--3 vads-u-padding-y--2" style={{ flexShrink: 0 }}>
        <h1 className="vads-u-font-size--xl vads-u-font-weight--bold vads-u-margin--0">Evidence Request Preview App</h1>
        <p className="vads-u-font-size--sm vads-u-color--gray-light-alt vads-u-margin-top--0p5 vads-u-margin-bottom--0">
          Preview and generate GitHub issues for evidence request improvements
        </p>
      </header>
      <SyncHashIndicator />

      {/* Two Column Content */}
      <div className="two-column-content">
        <div className="two-column-row" ref={containerRef}>
          {/* Left Column - Form */}
          <div
            className="two-column-panel two-column-panel--left"
            style={{ flex: `0 0 ${leftWidth}%` }}
          >
            <div className="two-column-panel-header vads-u-background-color--gray-lightest vads-u-padding-x--2 vads-u-padding-y--1p5">
              <h2 className="vads-u-font-weight--bold vads-u-margin--0">{leftHeader}</h2>
            </div>
            <div className="two-column-panel-content vads-u-background-color--white">
              {left}
            </div>
          </div>

          {/* Resizer Handle */}
          <div
            className={`resizer-handle ${isDragging ? 'resizer-handle--active' : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize panels"
            tabIndex={0}
            onKeyDown={(e) => {
              // Allow keyboard resizing with arrow keys
              if (e.key === 'ArrowLeft') {
                setLeftWidth((w) => Math.max(w - 1, minLeftWidth));
              } else if (e.key === 'ArrowRight') {
                setLeftWidth((w) => Math.min(w + 1, maxLeftWidth));
              }
            }}
          >
            <div className="resizer-handle__grip" />
          </div>

          {/* Right Column - Preview */}
          <div
            className="two-column-panel two-column-panel--right"
            style={{ flex: `1 1 ${100 - leftWidth}%` }}
          >
            <div className="two-column-panel-header vads-u-background-color--gray-lightest vads-u-padding-x--2 vads-u-padding-y--1p5">
              <h2 className="vads-u-font-weight--bold vads-u-margin--0">{rightHeader}</h2>
            </div>
            <div className="two-column-panel-content">
              {right}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoColumnLayout;
