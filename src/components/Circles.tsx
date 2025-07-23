import { useLocalStorage } from "@uidotdev/usehooks";
import { useSyncExternalStore } from "react";

import { CIRCLE_TEXT_INDENT } from "../common/constants";
import { textVisibilityStore } from "../common/textVisibility";

export function Circles() {
  const translucent = useSyncExternalStore(textVisibilityStore.subscribe, textVisibilityStore.get);
  const [circlesDisabled] = useLocalStorage("circles-disabled", false);

  function calcTextIndent(radius: number) {
    return 512 - radius - CIRCLE_TEXT_INDENT;
  }

  return (
    <div className="StaticObjects">
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
      <img className="DeadSpace" src="/DeadSpace.svg" />
    </div>
  );
}
