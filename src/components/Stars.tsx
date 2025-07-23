import { CSSProperties, useMemo, useSyncExternalStore } from "react";
import { classes } from "tgui-core/react";

import { stringToId, typeToPath } from "../common/helpers";
import { STAR_TYPE, stars } from "../common/sectors";
import { textVisibilityStore } from "../common/textVisibility";

export function Stars() {
  const textVisible = useSyncExternalStore(textVisibilityStore.subscribe, textVisibilityStore.get);

  const starElements = useMemo(() => {
    return stars.map((star) => {
      const color = star.affiliation.color;
      const path = typeToPath[star.type] || typeToPath[STAR_TYPE.Controlled];
      const transform = `translate(${star.position.x}, ${star.position.y}) scale(2)`;

      return {
        key: star.name,
        color,
        path,
        transform,
        name: star.name,
        x: star.position.x,
        y: star.position.y,
        labelX: star?.labelShift?.x,
        labelY: star?.labelShift?.y,
      };
    });
  }, []);

  return starElements.map((star) => (
    <g
      key={star.key}
      id={stringToId(star.name)}
      className="Star"
      style={{ "--star-color": star.color } as CSSProperties}
    >
      <path d={star.path} transform={star.transform} />
      <g className={classes(["Star__Label", textVisible && "Star__Label--visible"])}>
        <line
          className="Star__Label--line"
          x1={star.x}
          y1={star.y - 1.75}
          x2={star.x}
          y2={(star.labelY ? star.y + star.labelY : star.y) - 10}
        />
        <foreignObject
          width={125}
          height={11}
          x={(star.labelX ? star.x + star.labelX : star.x) - 125 / 2}
          y={(star.labelY ? star.y + star.labelY : star.y) - 20}
        >
          <div className="Star__Label--text">{star.name}</div>
        </foreignObject>
      </g>
    </g>
  ));
}
