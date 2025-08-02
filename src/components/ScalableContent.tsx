import { useMemo } from "react";

import { Nations, stringToId } from "../common";
import { NonInteractive, SectorBorders, StarMap } from ".";

export default function ScalableContent() {
  const patterns = useMemo(() => {
    return Object.values(Nations).map((nation) => (
      <pattern
        key={`pattern-${stringToId(nation.name)}`}
        id={`occupied-${stringToId(nation.name)}`}
        patternUnits="userSpaceOnUse"
        width="12"
        height="12"
      >
        <path
          d="M-3,3 l6, -6M0, 12 l12, -12M9, 15 l6, -6"
          style={{ stroke: `hsl(from ${nation.color} h s 10)`, strokeWidth: 3 }}
        />
      </pattern>
    ));
  }, []);

  return (
    <div style={{ width: "var(--map-size)", height: "var(--map-size)" }}>
      <svg width="100%" height="100%" viewBox={`0 0 1024 1024`}>
        <defs>{patterns}</defs>
        <SectorBorders />
        <StarMap />
      </svg>
      <NonInteractive />
    </div>
  );
}
