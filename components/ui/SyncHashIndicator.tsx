'use client';

import { useEffect, useState } from 'react';

interface SyncInfo {
  timestamp: string;
  source: string;
  branch: string;
  commitShort: string;
  commitFull: string;
}

export function SyncHashIndicator() {
  const [syncInfo, setSyncInfo] = useState<SyncInfo | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/sync-info')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setSyncInfo(data))
      .catch(() => setError(true));
  }, []);

  if (error || !syncInfo) {
    return null;
  }

  const repoUrl = 'https://github.com/department-of-veterans-affairs/vets-website';
  const commitUrl = `${repoUrl}/tree/${syncInfo.commitFull}/src/applications/claims-status`;

  return (
    <a
      href={commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Synced from ${syncInfo.source}: ${syncInfo.branch} @ ${syncInfo.commitFull}\n${syncInfo.timestamp}`}
      style={{
        position: 'fixed',
        top: '8px',
        right: '8px',
        backgroundColor: 'rgba(200, 0, 0, 0.7)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 9999,
      }}
    >
      <span style={{ opacity: 0.8 }}>{syncInfo.source === 'remote' ? 'remote' : 'local'}:</span>
      <span>{syncInfo.commitShort}</span>
    </a>
  );
}

export default SyncHashIndicator;
