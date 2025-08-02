import { lazy, Suspense, useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Stack } from "tgui-core/components";

import { maxScale, minScale } from "./common/constants";
import { store } from "./common/store";
import { Coordinates, Loading, Sidebar, StarsBackground } from "./components";
import { ContextMenu } from "./components/ContextMenu";

const ScalableContent = lazy(() => import("./components/ScalableContent"));

function App() {
  const cursorPosition = useRef({ x: 0, y: 0 });
  const mapScale = useRef<number>(0.75);
  const dragStarted = useRef(false);
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
  const contextTargetRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) / mapScale.current);
    const y = Math.round((event.clientY - rect.top) / mapScale.current);
    cursorPosition.current = { x, y };
  }

  function handleTransformed({ state }) {
    if (mapScale.current !== state.scale) {
      store.closeFloatingUI();
    }

    mapScale.current = state.scale;

    const visible = state.scale > maxScale * 0.66;
    if (store.get() !== visible) {
      store.set(visible);
    }

    if (dragStarted.current && !dragStartPosition.current) {
      dragStartPosition.current = { x: state.positionX, y: state.positionY };
      document.documentElement.classList.add("dragging");
    }
  }

  function handleDragStart() {
    dragStarted.current = true;
  }

  function handleDragEnd() {
    dragStarted.current = false;
    dragStartPosition.current = null;
    document.documentElement.classList.remove("dragging");
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <TransformWrapper
          centerOnInit
          smooth={false}
          alignmentAnimation={{ sizeX: 220, sizeY: 220 }}
          minScale={minScale}
          initialScale={minScale}
          maxScale={maxScale}
          panning={{ allowRightClickPan: false }}
          wheel={{ step: minScale / 6 }}
          doubleClick={{ disabled: true }}
          onPanningStart={handleDragStart}
          onPanningStop={handleDragEnd}
          onPinchingStart={handleDragStart}
          onPinchingStop={handleDragEnd}
          onTransformed={handleTransformed}
        >
          <TransformComponent
            wrapperClass="MapWrapper"
            wrapperStyle={{ width: "100vw", height: "100vh" }}
            contentStyle={{ alignItems: "center", padding: "300px" }}
          >
            <div ref={contextTargetRef} style={{ position: "relative" }} onMouseMove={handleMouseMove}>
              <ScalableContent />
            </div>
          </TransformComponent>
          <Stack className="Overlay">
            <Sidebar />
          </Stack>
          <Stack className="Overlay" vertical reverse>
            <Coordinates cursorRef={cursorPosition} />
          </Stack>
          <ContextMenu targetRef={contextTargetRef} cursorRef={cursorPosition} mapScale={mapScale} />
        </TransformWrapper>
      </Suspense>
      <StarsBackground />
    </>
  );
}

export default App;
