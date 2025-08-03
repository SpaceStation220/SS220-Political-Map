import { useLocalStorage } from "@uidotdev/usehooks";
import { Stack } from "tgui-core/components";
import { classes } from "tgui-core/react";

import { STAR_TYPE, typeToPath } from "../common";
import { HideButton } from "./HideButton";

export function Legend() {
  const [legendHidden, setLegendHidden] = useLocalStorage("legend-hidden", false);

  const sectorArea = "M33,32H0V7L7,0h33v25l-7,7Z";

  return (
    <aside className={classes(["Legend", legendHidden && "Legend--hidden"])}>
      <HideButton checked={legendHidden} position="left" onClick={() => setLegendHidden(!legendHidden)} />
      <div className="Legend__Title">Легенда</div>
      <div className="Legend__Content">
        <LegendSection title="Звёздные системы">
          <LegendRow path={typeToPath[STAR_TYPE.Capital]}>{STAR_TYPE.Capital}</LegendRow>
          <LegendRow path={typeToPath[STAR_TYPE.Controlled]}>{STAR_TYPE.Controlled}</LegendRow>
          <LegendRow path={typeToPath[STAR_TYPE.Controversial]}>{STAR_TYPE.Controversial}</LegendRow>
        </LegendSection>
        <LegendSection title="Области">
          <LegendRow svg={<line x1="0%" y1="50%" x2="100%" y2="50%" />}>Район</LegendRow>
          <LegendRow svg={<path className="area" d={sectorArea} />}>Сектор</LegendRow>
          <LegendRow svg={<path fill="url(#occupied)" d={sectorArea} />}>Оккупированная территория</LegendRow>
        </LegendSection>
      </div>
    </aside>
  );
}

function LegendSection(props) {
  const { title, children } = props;
  return (
    <Stack vertical>
      <Stack.Item bold fontSize={1.33}>
        {title}
      </Stack.Item>
      <Stack vertical g={0.5}>
        {children}
      </Stack>
    </Stack>
  );
}

function LegendRow(props) {
  const { children, svg, path } = props;

  return (
    <div className="Legend__ContentRow">
      <div className="Legend__ContentRow--icon">
        {path && (
          <svg>
            <g>
              <path d={path} />
            </g>
          </svg>
        )}
        {svg && (
          <svg>
            <defs>
              <pattern id="occupied" patternUnits="userSpaceOnUse" width="12" height="12">
                <path
                  d="M-3,3 l6, -6M0, 12 l12, -12M9, 15 l6, -6"
                  style={{ stroke: `hsl(from var(--color-primary) h s 10)`, strokeWidth: 3 }}
                />
              </pattern>
            </defs>
            {svg}
          </svg>
        )}
      </div>
      <div className="Legend__ContentRow--content">{children}</div>
    </div>
  );
}
