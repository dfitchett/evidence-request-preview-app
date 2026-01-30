import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const syncLogPath = join(process.cwd(), 'vets-website-sync', 'sync.log');
    const content = readFileSync(syncLogPath, 'utf-8');

    // Parse the first non-comment, non-empty line (most recent sync)
    const lines = content.split('\n');
    const dataLine = lines.find(line => line.trim() && !line.startsWith('#'));

    if (!dataLine) {
      return NextResponse.json({ error: 'No sync data found' }, { status: 404 });
    }

    // Format: timestamp | source | branch | commit_short | commit_full
    const parts = dataLine.split('|').map(p => p.trim());

    // Handle both old format (4 parts) and new format (5 parts)
    if (parts.length >= 5) {
      return NextResponse.json({
        timestamp: parts[0],
        source: parts[1],
        branch: parts[2],
        commitShort: parts[3],
        commitFull: parts[4],
      });
    } else if (parts.length >= 4) {
      // Old format: timestamp | branch | commit_short | commit_full
      return NextResponse.json({
        timestamp: parts[0],
        source: 'unknown',
        branch: parts[1],
        commitShort: parts[2],
        commitFull: parts[3],
      });
    }

    return NextResponse.json({ error: 'Invalid sync log format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read sync log' }, { status: 500 });
  }
}
