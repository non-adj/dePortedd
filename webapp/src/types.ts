export interface ALPR {
  id: string;
  lat: number;
  lon: number;
  tags: Record<string, string>;
  type: string;
};

export interface WikidataItem {
  name: string;
  nickname: string;
  wikidata: string;
  exampleImage: string|undefined;
}

export interface VisaRevocationEvent {
  id: string;
  lat: number;
  lon: number;
  state: string;
  school: string;
  date: string;
  reason?: string;
}

// Mock data for visa revocation events
import type { VisaRevocationEvent } from './types';

export const mockVisaRevocations: VisaRevocationEvent[] = [
  {
    id: '1',
    lat: 40.7128,
    lon: -74.0060,
    state: 'NY',
    school: 'New York University',
    date: '2024-11-01',
    reason: 'Status violation',
  },
  {
    id: '2',
    lat: 34.0689,
    lon: -118.4452,
    state: 'CA',
    school: 'UCLA',
    date: '2024-10-15',
    reason: 'Academic probation',
  },
  {
    id: '3',
    lat: 41.8781,
    lon: -87.6298,
    state: 'IL',
    school: 'University of Chicago',
    date: '2024-09-20',
    reason: 'Unauthorized employment',
  },
  // Add more mock events as needed
];
