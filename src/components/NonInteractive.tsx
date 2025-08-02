import { useLocalStorage } from "@uidotdev/usehooks";
import { useSyncExternalStore } from "react";

import { CIRCLE_TEXT_INDENT } from "../common/constants";
import { Marks } from "../common/marks";
import { store } from "../common/store";
import { Mark, RandomText } from ".";

export function NonInteractive() {
  const translucent = useSyncExternalStore(store.subscribe, store.get);
  const [circlesDisabled] = useLocalStorage("circles-disabled", false);

  function calcTextIndent(radius: number) {
    return 512 - radius - CIRCLE_TEXT_INDENT;
  }

  return (
    <div className="StaticObjects">
      {Array.from({ length: 6 }).map((_, i) => (
        <svg key={i} className="SectorBorder RestrictedSpace" viewBox="0 0 599.19 342.36">
          <g>
            <polyline points="376.86 341.86 376.86 291.53 385.41 282.99 428.03 282.99 445.1 265.92 445.1 256.53 453.64 247.98 573.09 247.98 598.69 222.39 598.69 204.45 590.16 195.92 351.23 195.92 342.7 187.39 291.46 187.39 275.24 171.17 248.83 171.17 164.36 86.7 164.36 9.04 155.81 .5 129.35 .5 103.73 26.12 103.73 85.85 95.19 94.39 95.19 127.67 85.84 137.02 .5 137.02 .5 341.86 376.86 341.86" />
            {i === 0 && (
              <foreignObject x={200} y={220} width={250} height={60}>
                <RandomText>
                  <span>Область потенциальной</span> активности
                </RandomText>
              </foreignObject>
            )}
          </g>
        </svg>
      ))}
      {!circlesDisabled && (
        <svg className={translucent ? "translucent" : ""} width="100%" height="100%" viewBox={`0 0 1024 1024`}>
          <circle cx="512" cy="512" r="85.73" />
          <text x="512" y={calcTextIndent(85.73)} textAnchor="middle">
            Центр
          </text>
          <circle cx="512" cy="512" r="257.61" />
          <text x="512" y={calcTextIndent(257.61)} textAnchor="middle">
            Пояс
          </text>
          <circle cx="512" cy="512" r="	425.02" />
          <text x="512" y={calcTextIndent(425.02)} textAnchor="middle">
            Долина
          </text>
        </svg>
      )}
      {Marks.length > 0 && Marks.map((mark, i) => <Mark key={i} {...mark} />)}
      <img className="RestrictedSpace__Logo" src={`${import.meta.env.BASE_URL}/logo/RestrictedTransparent.svg`} />
      <img className="NorthSign" src={`${import.meta.env.BASE_URL}/assets/NorthSign.svg`} />
      <img className="NorthEastSign" src={`${import.meta.env.BASE_URL}/assets/NorthEastSign.svg`} />
      <img className="DeadSpace first" src={`${import.meta.env.BASE_URL}/assets/DeadSpace.svg`} />
      <img className="DeadSpace second" src={`${import.meta.env.BASE_URL}/assets/DeadSpace.svg`} />
    </div>
  );
}
