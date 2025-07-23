import { Circles, SectorBorders, Stars } from ".";

export default function ScalableContent() {
  return (
    <div style={{ width: "var(--map-size)", height: "var(--map-size)" }}>
      <svg width="100%" height="100%" viewBox={`0 0 1024 1024`}>
        <SectorBorders />
        <Stars />
      </svg>
      <Circles />
    </div>
  );
}
