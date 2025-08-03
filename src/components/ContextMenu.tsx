import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon, Stack } from "tgui-core/components";
import { classes } from "tgui-core/react";

import { Nations } from "../common";
import { availableMarks } from "../common/marks";
import { Mark } from "./Mark";
import { Range } from "./Range";

export function ContextMenu(props) {
  const { targetRef, cursorRef, mapScale } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openPosition, setOpenPosition] = useState({ x: 0, y: 0 });

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    middleware: [flip(), offset(12)],
    placement: "bottom-start",
    transform: false,
    whileElementsMounted: autoUpdate,
  });

  const nodeRef = useRef(null);

  useEffect(() => {
    const element = targetRef?.current;
    if (!element) {
      return;
    }

    function handleContextMenu(event) {
      if (!event.ctrlKey) {
        return;
      }

      event.preventDefault();
      refs.setReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: event.clientX,
            y: event.clientY,
            top: event.clientY,
            left: event.clientX,
            right: event.clientX,
            bottom: event.clientY,
          };
        },
      });
      setIsOpen(true);
      setOpenPosition({ x: event.clientX, y: event.clientY });
    }

    element.addEventListener("contextmenu", handleContextMenu);
    return () => element.removeEventListener("contextmenu", handleContextMenu);
  }, [refs, targetRef]);

  const [iconColor, setIconColor] = useState<string>(Object.values(Nations)[0].color);
  const [selectedIcon, setSelectedIcon] = useState<string>(availableMarks[0]);
  const [iconRotation, setIconRotation] = useState<number>(0);
  const [iconScale, setIconScale] = useState<number>(1);

  const colors = useMemo(() => {
    return Object.values(Nations).map((nation) => (
      <div
        key={nation.name}
        className={classes(["CreateMark__Choose", iconColor === nation.color && "CreateMark__Choose--selected"])}
        onClick={() => setIconColor(nation.color)}
        style={{ backgroundColor: nation.color }}
      />
    ));
  }, [iconColor]);

  const icons = useMemo(() => {
    return availableMarks.map((mark) => (
      <div
        key={mark}
        className={classes(["CreateMark__Choose", selectedIcon === mark && "CreateMark__Choose--selected"])}
        onClick={() => setSelectedIcon(mark)}
      >
        <Icon name={mark} />
      </div>
    ));
  }, [selectedIcon]);

  function close(event) {
    event.preventDefault();
    setIsOpen(false);
  }

  const markCode = `{
    icon: "${selectedIcon}",
    color: "${iconColor}",
    rotation: ${iconRotation},
    scale: ${iconScale},
    position: { x: ${cursorRef.current.x}, y: ${cursorRef.current.y} },
  },`;

  return (
    <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={200} classNames="transition" unmountOnExit>
      <div ref={nodeRef} className="ContextMenu__Overlay" onClick={close} onContextMenu={close}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="MoreInfo ContextMenu"
          onClick={(event) => event.stopPropagation()}
        >
          <CreateMarkSection title="Иконка">{icons}</CreateMarkSection>
          <CreateMarkSection title="Цвет">{colors}</CreateMarkSection>
          <CreateMarkSection title="Поворот">
            <Range minValue={0} value={iconRotation} maxValue={360} setValue={setIconRotation} />
          </CreateMarkSection>
          <CreateMarkSection title="Масштаб">
            <Range minValue={1} value={iconScale} maxValue={5} setValue={setIconScale} />
          </CreateMarkSection>
          <Stack>
            <ContextMenuItem
              onClick={() => {
                navigator.clipboard.writeText(markCode);
                setIsOpen(false);
              }}
            >
              Код метки
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                navigator.clipboard.writeText(`x: ${cursorRef.current.x}, y: ${cursorRef.current.y}`);
                setIsOpen(false);
              }}
            >
              Координаты
            </ContextMenuItem>
          </Stack>
        </div>
        <Mark
          icon={selectedIcon}
          color={iconColor}
          rotation={iconRotation}
          scale={iconScale * mapScale.current}
          position={openPosition}
        />
      </div>
    </CSSTransition>
  );
}
function ContextMenuItem(props) {
  const { children, onClick } = props;

  return (
    <div className="ContextMenu__Item Tab" onClick={onClick}>
      <Stack fill width="100%" textAlign="center">
        <Stack.Item className="ContextMenu__ItemIcon">
          <Icon name={"copy"} />
        </Stack.Item>
        <Stack.Item grow>{children}</Stack.Item>
      </Stack>
    </div>
  );
}

function CreateMarkSection(props) {
  const { children, title } = props;

  return (
    <Stack vertical mx={0.5}>
      <Stack.Item className="CreateMark__SectionTitle">{title}</Stack.Item>
      <Stack wrap g={0}>
        {children}
      </Stack>
    </Stack>
  );
}
