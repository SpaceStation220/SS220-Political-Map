import { STAR_TYPE } from "./stars";

export const typeToPath: { [key in STAR_TYPE]: string } = {
  [STAR_TYPE.Capital]:
    "M3 0 L2.22 0.78 L2.22 2.1225 L0.8775 2.1225 L0 3 L-0.8775 2.1225 L-2.02125 2.1225 L-2.02125 0.97875 L-3 0 L-2.02125 -0.97875 L-2.02125 -2.1225 L-0.8775 -2.1225 L0 -3 L0.8775 -2.1225 L2.22 -2.1225 L2.22 -0.78 L3 0 Z",
  [STAR_TYPE.Controlled]: "M0 -1.5 L1.5 0 L0 1.5 L-1.5 0 Z",
  [STAR_TYPE.Controversial]: "M0 -1.5 L-1.5 0 L0 1.5 L1.5 0 Z M-1 0 L0 -1 L1 0 L0 1 Z",
};

export function stringToId(str: string) {
  return str.replace(/[^а-яА-Яa-zA-Z0-9\u0370-\u03FF-]/g, "").toLowerCase();
}

function getBounds(ring: number[][]): [number, number, number, number] {
  const xs = ring.map(([x]) => x);
  const ys = ring.map(([, y]) => y);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

function isPointInsidePolygon(point: [number, number], ring: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

export function findBestLogoPositionAndSize(ring: number[][], cx: number, cy: number): [number, number, number] {
  const [minX, minY, maxX, maxY] = getBounds(ring);
  const width = maxX - minX;
  const height = maxY - minY;
  const step = Math.min(width, height) / 25;
  let maxSize = 100;
  let bestX = cx;
  let bestY = cy;

  const positions: [number, number][] = [[cx, cy]];
  for (let r = step; r <= Math.max(width, height) / 2; r += step) {
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const dx = r * Math.cos(rad);
      const dy = r * Math.sin(rad);
      positions.push([cx + dx, cy + dy]);
    }
  }

  positions.sort((a, b) => {
    const distA = Math.sqrt((a[0] - cx) ** 2 + (a[1] - cy) ** 2);
    const distB = Math.sqrt((b[0] - cx) ** 2 + (b[1] - cy) ** 2);
    return distA - distB;
  });

  for (const [testX, testY] of positions) {
    if (!isPointInsidePolygon([testX, testY], ring)) continue;

    let size = 20;
    while (size <= 150) {
      let fits = true;
      const halfSize = size / 2;
      const points: [number, number][] = [
        [testX - halfSize, testY - halfSize],
        [testX + halfSize, testY - halfSize],
        [testX - halfSize, testY + halfSize],
        [testX + halfSize, testY + halfSize],
        [testX, testY - halfSize],
        [testX, testY + halfSize],
        [testX - halfSize, testY],
        [testX + halfSize, testY],
        [testX - halfSize / 2, testY - halfSize / 2],
        [testX + halfSize / 2, testY + halfSize / 2],
      ];

      for (const point of points) {
        if (!isPointInsidePolygon(point, ring)) {
          fits = false;
          break;
        }
      }

      if (!fits) {
        break;
      }

      size += 2;
    }

    size = Math.max(20, size - 2);
    if (size > maxSize) {
      maxSize = size;
      bestX = testX;
      bestY = testY;
    }
  }

  return [bestX, bestY, Math.min(200, maxSize)];
}
