import { useLocalStorage } from '@uidotdev/usehooks';
import { CSSProperties, useState } from 'react';
import { useControls } from 'react-zoom-pan-pinch';
import { Input, Stack } from 'tgui-core/components';
import { useFuzzySearch } from 'tgui-core/fuzzysearch';
import { classes } from 'tgui-core/react';

import { Stars } from '../common';
import { stringToId } from '../common/helpers';
import { Star } from '../common/types';
import { Button } from './Button';
import { HideButton } from './HideButton';
import { Preferences } from './Preferences';

export function Sidebar() {
  const [sidebarHidden, setSidebarHidden] = useLocalStorage('sidebar-hidden', false);

  return (
    <aside className={classes(['Sidebar', sidebarHidden && 'Sidebar--hidden'])}>
      <HideButton checked={sidebarHidden} onClick={() => setSidebarHidden(!sidebarHidden)} />
      <SidebarHeader />
      <SidebarContent />
      <Preferences />
    </aside>
  );
}

function SidebarHeader() {
  let sidebarLogo = 'SS220';
  if (window.self !== window.top) {
    sidebarLogo = 'logo/Nanotrasen';
  }

  return (
    <div className="Sidebar__Header">
      <img src={`${import.meta.env.BASE_URL}${sidebarLogo}.svg`} />
      <span>Политическая карта</span>
    </div>
  );
}

function SidebarContent() {
  const { query, setQuery, results } = useFuzzySearch({
    searchArray: Stars.map((s) => s.name),
    matchStrategy: 'smart',
    getSearchString: (name) => name,
  });

  const filteredStars = query ? Stars.filter((star) => results.includes(star.name)) : Stars;

  const sectors: Record<string, Star[]> = {};
  for (const star of filteredStars) {
    const name = star.affiliation.name;
    if (!sectors[name]) sectors[name] = [];
    sectors[name].push(star);
  }

  return (
    <>
      <div className="Sidebar__Content">
        <div className="Sidebar__Sectors">
          {Object.entries(sectors).map(([sectorName, stars]) => (
            <SidebarSector key={sectorName} name={sectorName} stars={stars} open={!!query} />
          ))}
        </div>
      </div>
      <div className="Input--wrapper" tabIndex={0}>
        <Input value={query} placeholder="Найти звезду..." onChange={setQuery} />
      </div>
    </>
  );
}

type SidebarSectorProps = {
  name: string;
  stars: Star[];
  open?: boolean;
};

function SidebarSector({ name, stars, open }: SidebarSectorProps) {
  const [opened, setOpened] = useState(false);
  const { zoomToElement } = useControls();

  return (
    <nav className={classes(['Sector', (opened || open) && 'Sector--opened'])}>
      <div className="Sector__Title" onClick={() => setOpened(!opened)}>
        <Stack fill>
          <Stack.Item className={classes(['Sector__TitleIcon', (opened || open) && 'Sector__TitleIcon--opened'])}>
            <div />
            <div />
            <div />
          </Stack.Item>
          <Stack.Item grow>{name}</Stack.Item>
        </Stack>
      </div>
      <div className="Sector__Stars">
        {stars.map((star, i) => (
          <Button
            key={star.name}
            style={{ '--index': i } as CSSProperties}
            onClick={() => zoomToElement(stringToId(star.name))}
          >
            {star.name}
          </Button>
        ))}
      </div>
    </nav>
  );
}
