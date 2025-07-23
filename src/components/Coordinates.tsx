import { useEffect, useState } from "react";

export function Coordinates({ cursorRef }: { cursorRef: React.RefObject<{ x: number; y: number }> }) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pos = cursorRef.current!;
  return (
    <div className="Coordinates">
      X: {pos.x}, Y: {pos.y}
    </div>
  );
}
