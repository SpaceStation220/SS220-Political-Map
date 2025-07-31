import "react-lazy-load-image-component/src/effects/blur.css";

import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useClientPoint,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
} from "@floating-ui/react";
import { cloneElement, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon, Stack, Tabs, Tooltip } from "tgui-core/components";

import { SCI } from "../common/planets";
import { store } from "../common/store";
import { Planet } from "../common/types";

export function MoreInfo(props) {
  const { children, content } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(24), shift({ crossAxis: true })],
    placement: "top",
    whileElementsMounted(referenceEl, floatingEl, update) {
      const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: true,
      });
      return cleanup;
    },
  });

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 200,
  });

  const click = useClick(context, {
    enabled: !document.documentElement.classList.contains("dragging"),
  });
  const dismiss = useDismiss(context);
  const clientPoint = useClientPoint(context, { enabled: !isMounted });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, clientPoint]);

  const referenceProps = getReferenceProps({
    ref: refs.setReference,
  });

  const floatingChildren: ReactElement = cloneElement(children as ReactElement, referenceProps);
  const versionRef = useRef(store.getVersion());

  useEffect(() => {
    return store.subscribe(() => {
      const newVersion = store.getVersion();
      if (newVersion !== versionRef.current) {
        versionRef.current = newVersion;
        setIsOpen(false);
      }
    });
  }, []);

  const moreInfoContent = (
    <div
      ref={refs.setFloating}
      data-position={context.placement}
      data-transition={status}
      className="MoreInfo--wrapper"
      style={floatingStyles}
      {...getFloatingProps()}
    >
      <div className="MoreInfo"> {content}</div>
    </div>
  );

  return (
    <>
      {floatingChildren}
      {isMounted && <FloatingPortal>{moreInfoContent}</FloatingPortal>}
    </>
  );
}

export function MoreInfoSector(props) {
  const { children, sector } = props;
  const NO_DATA = "Нет данных";

  const sectorInfo = useMemo(
    () => (
      <>
        <div className="MoreInfo__Title">
          {sector.logo && (
            <img className="MoreInfo__TitleIcon" src={`${import.meta.env.BASE_URL}/logo/${sector.logo}.svg`} />
          )}
          <div className="MoreInfo__TitleContent">
            <div className="MoreInfo__TitleContent--name">{sector.name}</div>
            <div className="MoreInfo__TitleContent--subtitle">{sector.regin || NO_DATA}</div>
          </div>
        </div>
        <hr />
        <div className="MoreInfo__Content">
          <TitledInfo title="Текущий глава">{sector.head || NO_DATA} </TitledInfo>
          <TitledInfo title="Население">{sector.population || NO_DATA} </TitledInfo>
          <TitledInfo title="ВВП">{sector.gdp || NO_DATA} </TitledInfo>
        </div>
        <hr />
        <div className="MoreInfo__Relationships">
          <div className="MoreInfo__Relationships--title">Взаимоотношения</div>
          <div className="MoreInfo__Relationships--content">{sector.relationships || NO_DATA}</div>
        </div>
      </>
    ),
    [sector]
  );

  return <MoreInfo content={sectorInfo}>{children}</MoreInfo>;
}

MoreInfo.Sector = MoreInfoSector;

type SCIItem = { desc: string; subtypes?: Record<string, string> };

export function MoreInfoStar(props) {
  const { children, star } = props;
  const [tab, setTab] = useState("description");

  const planets = useMemo(() => Object.values(star.planets) as Planet[], [star]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo?.({ top: 0 });
  }, [tab, selectedPlanet]);

  const sciTooltip = useMemo(
    () => (
      <div className="MoreInfo__SCITooltip">
        <div className="MoreInfo__SCITooltip--title">Классификация CSI - Colonization Suitability Index</div>
        <div className="MoreInfo__SCITooltip--subtitle">
          Терраформированные планеты, обозначены иконкой <Icon name="leaf" />
        </div>
        <ol type="I">
          {Object.entries(SCI).map(([type, item]: [string, SCIItem]) => (
            <li key={type}>
              {item.desc}
              {item.subtypes && (
                <ol>
                  {Object.entries(item.subtypes).map(([subtype, text]) => (
                    <li key={subtype}>
                      {subtype}. {text}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    ),
    []
  );

  const starInfo = (
    <>
      <div className="MoreInfo__Title star">
        <div className="MoreInfo__TitleContent star">
          <div className="MoreInfo__TitleContent--name">{star.name}</div>
        </div>
      </div>
      {star.planets.length > 0 && (
        <Tabs mt={0}>
          <Tabs.Tab
            selected={tab === "description"}
            onClick={() => {
              setSelectedPlanet(null);
              setTab("description");
            }}
          >
            Описание
          </Tabs.Tab>
          <Tabs.Tab
            selected={tab === "planets"}
            onClick={() => {
              setSelectedPlanet(planets[0]);
              setTab("planets");
            }}
          >
            Планеты
          </Tabs.Tab>
        </Tabs>
      )}
      <hr />
      {tab === "description" && (
        <div ref={contentRef} className="MoreInfo__Content star">
          {star.description}
        </div>
      )}
      {tab === "planets" && selectedPlanet && (
        <>
          <div ref={contentRef} className="MoreInfo__PlanetTitle">
            {selectedPlanet.image ? (
              <LazyLoadImage effect="blur" src={`${import.meta.env.BASE_URL}/planets/${selectedPlanet.image}`} />
            ) : (
              <span />
            )}
            <div className="MoreInfo__Title">
              <div className="MoreInfo__TitleContent">
                <div className="MoreInfo__TitleContent--name">{selectedPlanet.name}</div>
                <div className="MoreInfo__TitleContent--subtitle">{selectedPlanet.subtitle}</div>
              </div>
            </div>
            <Stack vertical className="MoreInfo__PlanetTitle--population" g={0}>
              <Stack.Item>Население</Stack.Item>
              <Stack.Item>{selectedPlanet.population || "Необитаема"}</Stack.Item>
            </Stack>
            <Tooltip content={sciTooltip} position="bottom-end">
              <div className="MoreInfo__PlanetTitle--sci">
                {selectedPlanet.terraformed && <Icon name="leaf" />}
                {selectedPlanet.sci}
              </div>
            </Tooltip>
            <Stack vertical className="MoreInfo__Content" g={2}>
              {selectedPlanet.biggestCities && (
                <InfoSection title="Крупнейшие города">{selectedPlanet.biggestCities}</InfoSection>
              )}
              <InfoSection title="Описание">{selectedPlanet.description}</InfoSection>
            </Stack>
          </div>
          <hr />
          <Tabs>
            {planets.map((planet: Planet) => (
              <Tabs.Tab
                key={planet.name}
                selected={selectedPlanet.name === planet.name}
                onClick={() => setSelectedPlanet(planet)}
              >
                {planet.name}
              </Tabs.Tab>
            ))}
          </Tabs>
        </>
      )}
    </>
  );

  return <MoreInfo content={starInfo}>{children}</MoreInfo>;
}

MoreInfo.Star = MoreInfoStar;

function TitledInfo(props) {
  const { children, title } = props;
  return (
    <div className="MoreInfo__TitledInfo">
      <div className="MoreInfo__TitledInfo--title">{title}</div>
      <div className="MoreInfo__TitledInfo--content">{children}</div>
    </div>
  );
}

function InfoSection(props) {
  const { children, title } = props;
  return (
    <Stack.Item>
      <Stack.Item bold fontSize={1.33}>
        {title}
      </Stack.Item>
      <Stack.Item>{children}</Stack.Item>
    </Stack.Item>
  );
}
