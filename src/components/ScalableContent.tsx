import { NonInteractive, SectorBorders, StarMap } from ".";

export default function ScalableContent() {
  return (
    <div style={{ width: "var(--map-size)", height: "var(--map-size)" }}>
      <svg width="100%" height="100%" viewBox={`0 0 1024 1024`}>
        <SectorBorders />
        <StarMap />
      </svg>
      <NonInteractive />
    </div>
  );
}
