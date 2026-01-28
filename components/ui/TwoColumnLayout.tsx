'use client';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftHeader?: string;
  rightHeader?: string;
}

export function TwoColumnLayout({
  left,
  right,
  leftHeader = 'Editor',
  rightHeader = 'Preview',
}: TwoColumnLayoutProps) {
  return (
    <div className="two-column-layout">
      {/* Main App Header */}
      <header className="vads-u-background-color--primary vads-u-color--white vads-u-padding-x--3 vads-u-padding-y--2" style={{ flexShrink: 0 }}>
        <h1 className="vads-u-font-size--xl vads-u-font-weight--bold vads-u-margin--0">Evidence Request Preview App</h1>
        <p className="vads-u-font-size--sm vads-u-color--gray-light-alt vads-u-margin-top--0p5 vads-u-margin-bottom--0">
          Preview and generate GitHub issues for evidence request improvements
        </p>
      </header>

      {/* Two Column Content */}
      <div className="two-column-content">
        <div className="two-column-row">
          {/* Left Column - Form (full width on mobile, 1/3 on medium+) */}
          <div className="two-column-panel two-column-panel--left">
            <div className="two-column-panel-header vads-u-background-color--gray-lightest vads-u-padding-x--2 vads-u-padding-y--1p5">
              <h2 className="vads-u-font-weight--bold vads-u-margin--0">{leftHeader}</h2>
            </div>
            <div className="two-column-panel-content vads-u-background-color--white">
              {left}
            </div>
          </div>

          {/* Right Column - Preview (full width on mobile, 2/3 on medium+) */}
          <div className="two-column-panel two-column-panel--right">
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
