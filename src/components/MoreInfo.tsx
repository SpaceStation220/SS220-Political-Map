import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
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
import { LabeledList } from "tgui-core/components";

import { store } from "../common/store";

export function MoreInfo(props) {
  const { children, content } = props;

  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(24),
      flip({ padding: 6 }),
      shift(),
      arrow({
        element: arrowRef,
        padding: 10,
      }),
    ],
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
      <FloatingArrow ref={arrowRef} context={context} fill="var(--color-primary)" width={20} height={10} />
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
          {sector.logo && <img className="MoreInfo__TitleIcon" src={sector.logo} />}
          <div className="MoreInfo__TitleContent">
            <div className="MoreInfo__TitleContent--name">{sector.name}</div>
            <div className="MoreInfo__TitleContent--regin">{sector.regin || NO_DATA}</div>
          </div>
        </div>
        <hr />
        <div className="MoreInfo__Content">
          <LabeledList>
            <LabeledList.Item label="Текущий глава">{sector.head || NO_DATA}</LabeledList.Item>
            <LabeledList.Item label="Население">{sector.population || NO_DATA}</LabeledList.Item>
            <LabeledList.Item label="ВВП">{sector.gdp || NO_DATA}</LabeledList.Item>
          </LabeledList>
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
