import { MultiPolygon } from "polygon-clipping";

export type Sector = {
  name: string;
  regin: string;
  head: string;
  population: string;
  gdp: string;
  relationships: string;
  color: string;
  logo?: string;
};

export type Star = {
  name: string;
  position: { x: number; y: number };
  labelShift?: { x: number; y: number };
  affiliation: Sector;
  type: string;
};

export type MergedSectorType = Sector & {
  merged: MultiPolygon;
};
