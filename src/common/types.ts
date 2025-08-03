import { MultiPolygon } from "polygon-clipping";

import { SCI } from "./planets";
import { STAR_TYPE } from "./stars";

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
  description?: string;
  image?: string;
  planets?: Planet[];
  affiliation: Sector;
  occupiedBy?: Sector;
  type: STAR_TYPE;
  position: { x: number; y: number };
  labelShift?: { x: number; y: number };
};

export type Planet = {
  name: string;
  subtitle: string;
  description: string;
  biggestCities?: string;
  population?: string;
  sci: SCIKey;
  terraformed?: true;
  image?: string;
};

export type Mark = {
  icon: string;
  color: string;
  rotation: number;
  scale: number;
  position: { x: number; y: number };
};

export type MergedSectorType = Sector & {
  merged: MultiPolygon;
};

type SCIType = typeof SCI;
type MainKey = keyof SCIType;

type SubtypeMap = {
  [K in MainKey]: SCIType[K] extends { subtypes: Record<string, string> } ? keyof SCIType[K]["subtypes"] : never;
};

type JoinSubtypes<T extends string> = T | `${T}/${T}` | `${T}/${T}/${T}` | `${T}/${T}/${T}/${T}`;

type SCIKey =
  | MainKey
  | {
      [K in keyof SubtypeMap]: SubtypeMap[K] extends string ? `${K}-${JoinSubtypes<SubtypeMap[K] & string>}` : K;
    }[keyof SubtypeMap];
