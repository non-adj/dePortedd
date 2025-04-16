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
  count?: number;
  statement?: string;
  iceInvolved?: boolean;
  campusSecurity?: boolean;
  homelandSecurity?: boolean;
  localPolice?: boolean;
}

// Mock data for visa revocation events
import type { VisaRevocationEvent } from './types';

export const mockVisaRevocations: VisaRevocationEvent[] = [
  {
    id: '1',
    lat: 44.5638,
    lon: -123.2794,
    state: 'OR',
    school: 'Oregon State University',
    date: '2025-04-05',
    count: 13,
    reason: undefined,
    statement: undefined,
    iceInvolved: true,
    campusSecurity: false,
    homelandSecurity: false,
    localPolice: false,
  },
  {
    id: '2',
    lat: 44.0455,
    lon: -123.0716,
    state: 'OR',
    school: 'University of Oregon',
    date: '2025-04-07',
    count: 4,
    reason: undefined,
    statement: undefined,
    iceInvolved: false,
    campusSecurity: true,
    homelandSecurity: false,
    localPolice: false,
  },
  {
    id: '3',
    lat: 45.5231,
    lon: -122.6784,
    state: 'OR',
    school: 'Portland Community College',
    date: '2025-04-14',
    count: 3,
    reason: undefined,
    statement: undefined,
    iceInvolved: false,
    campusSecurity: false,
    homelandSecurity: true,
    localPolice: false,
  },
  {
    id: '4',
    lat: 45.5118,
    lon: -122.6845,
    state: 'OR',
    school: 'Portland State University',
    date: '2025-04-15',
    count: 3,
    reason: 'Protests',
    statement: undefined,
    iceInvolved: false,
    campusSecurity: false,
    homelandSecurity: false,
    localPolice: false,
  },
];
