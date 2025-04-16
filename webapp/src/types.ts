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
