import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon, Stack } from "tgui-core/components";

export function ContextMenu(props) {
  const { targetRef, cursorRef } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pos = useRef<{ x: number; y: number } | null>(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    const element = targetRef?.current;
    if (!element) {
      return;
    }

    function handleContextMenu(event) {
      event.preventDefault();
      pos.current = { x: event.clientX, y: event.clientY };
      setIsOpen(!isOpen);
    }

    element.addEventListener("contextmenu", handleContextMenu);
    return () => element.removeEventListener("contextmenu", handleContextMenu);
  }, [isOpen, targetRef]);

  function close(event) {
    event.preventDefault();
    setIsOpen(false);
  }

  return (
    <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={200} classNames="transition" unmountOnExit>
      <div ref={nodeRef} className="ContextMenu__Overlay" onClick={close} onContextMenu={close}>
        {pos.current && (
          <div
            className="MoreInfo ContextMenu"
            style={{ top: pos.current.y + 6, left: pos.current.x + 6 }}
            onClick={close}
          >
            <ContextMenuItem
              icon="copy"
              onClick={() => navigator.clipboard.writeText(`x: ${cursorRef.current.x}, y: ${cursorRef.current.y}`)}
            >
              Скопировать координаты
            </ContextMenuItem>
          </div>
        )}
      </div>
    </CSSTransition>
  );
}

function ContextMenuItem(props) {
  const { children, icon, onClick } = props;

  return (
    <div className="ContextMenu__Item Tab" onClick={onClick}>
      <Stack fill align="center">
        <Stack.Item className="ContextMenu__ItemIcon">
          <Icon name={icon} />
        </Stack.Item>
        <Stack.Item>{children}</Stack.Item>
      </Stack>
    </div>
  );
}
