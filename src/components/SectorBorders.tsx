import { Delaunay } from "d3-delaunay";
import polygonClipping, { type MultiPolygon } from "polygon-clipping";
import { CSSProperties, useMemo } from "react";

import { POPULATED_SYSTEMS } from "../common/constants";
import { findBestLogoPositionAndSize } from "../common/helpers";
import { Nations, stars } from "../common/sectors";
import { MergedSectorType } from "../common/types";
import { MoreInfo } from "./MoreInfo";

export function SectorBorders() {
  const mergedSectors = useMemo(() => {
    const delaunay = Delaunay.from(
      stars,
      (d) => d.position.x,
      (d) => d.position.y
    );
    const voronoi = delaunay.voronoi([0, 0, 1024, 1024]);
    const polygons = stars.map((_, i) => voronoi.cellPolygon(i));

    const sectorPolygons: { [affiliation: string]: MultiPolygon } = {};
    polygons.forEach((polygon, i) => {
      if (!polygon) {
        return;
      }

      const star = stars[i];
      const key = star.affiliation.name;
      if (!sectorPolygons[key]) {
        sectorPolygons[key] = [];
      }

      sectorPolygons[key].push([polygon]);
    });

    const result: MergedSectorType[] = [];
    const sectors = Object.values(Nations);
    for (const affiliation in sectorPolygons) {
      const union = polygonClipping.union(sectorPolygons[affiliation]);
      const clipped = polygonClipping.intersection(union, POPULATED_SYSTEMS);
      const sector = sectors.find((sector) => sector.name === affiliation);
      if (!sector) {
        throw new Error(`Sector with name ${affiliation} not found!`);
      }

      result.push({
        merged: clipped,
        ...sector,
      });
    }
    return result;
  }, []);

  function getCentroid(ring: number[][]): [number, number] {
    let xSum = 0,
      ySum = 0,
      area = 0;
    for (let i = 0; i < ring.length; i++) {
      const [x1, y1] = ring[i];
      const [x2, y2] = ring[(i + 1) % ring.length];
      const a = x1 * y2 - x2 * y1;
      area += a;
      xSum += (x1 + x2) * a;
      ySum += (y1 + y2) * a;
    }
    area /= 2;
    return [xSum / (6 * area), ySum / (6 * area)];
  }

  return mergedSectors.map((sector) =>
    sector.merged.map((polygon, j) =>
      polygon.map((ring, k) => {
        const [cx, cy] = getCentroid(ring);
        const [logoX, logoY, logoSize] = findBestLogoPositionAndSize(ring, cx, cy);

        return (
          <MoreInfo.Sector key={`${sector.name}-logo-${j}-${k}`} sector={sector}>
            <g>
              <path
                className="SectorBorder"
                data-name={sector.name}
                style={{ "--sector-color": sector.color } as CSSProperties}
                d={`M${ring.map((p) => p.join(",")).join("L")}Z`}
              />
              {sector.logo && logoSize > 0 && (
                <image
                  href={`${import.meta.env.BASE_URL}/logo/${sector.logo}.svg`}
                  x={logoX - logoSize / 2}
                  y={logoY - logoSize / 2}
                  width={logoSize}
                  height={logoSize}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
            </g>
          </MoreInfo.Sector>
        );
      })
    )
  );
}
