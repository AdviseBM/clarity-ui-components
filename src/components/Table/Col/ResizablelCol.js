import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Brick from "./Brick";

const Resizer = styled.div`
    position: absolute;
    top: 0;
    width: 5px;
    height: 100%;
    cursor: col-resize;
    background: ${(props) => (props.isResizing ? "#64b2fe" : "transparent")};
    border-${({ direction }) => direction}: solid 1px #ccc;
    ${({ direction, position = 0 }) => {
    return direction === "right" ? `right: ${0 - position}px;` : `left: ${position}px;`;
}}
    &:hover {
        background: #64b2fe;
    }
`;

const Fill = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: ${(props) => props.horizontalAlign};
  position: relative;
`;

const ResizablelCol = ({
  theTheme,
  showGrid,
  children,
  onResize,
  direction = "right",
  style,
  type,
  horizontalAlign = "right",
  location,
  autoAdjustFirstColWidth,
  autoAdjustLastColWidth,
}) => {
  const [w, setW] = useState(0);
  const [x, setX] = useState(0);
  const newWidthRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const colRef = useRef(null);

  // This is a hack to only run the effect once
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // Attach the listeners to `document`
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    return () => {
      // Remove the listeners from `document`
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [x]);

  const mouseDownHandler = (e) => {
    // Get the current mouse position
    setX(e.clientX);
    // Get current width of the column
    setW(colRef.current.offsetWidth);
  };

  const mouseMoveHandler = (e) => {
    // How far the mouse has been moved
    setIsResizing(true);
    let newWidth;
    let dx;
    // revert logic based on direction
    if (direction === "right") {
      dx = e.clientX - x;
      newWidth = w + dx;
    } else {
      dx = x - e.clientX;
      newWidth = w + dx;
    }
    newWidthRef.current = newWidth;
    setPosition(dx);
  };

  const mouseUpHandler = () => {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    setIsResizing(false);
    onResize(newWidthRef.current);
    setPosition(0);
  };

  const doubleClickHandler = () => {
    if (type === "first") {
      autoAdjustFirstColWidth();
    }
    if (type === "last") {
      autoAdjustLastColWidth();
    }
  };

  return (
    <Brick
      location={location}
      style={{ ...style, zIndex: 4 }}
      theTheme={theTheme}
      showGrid={showGrid}
    >
      {/* Fill element is used to get ref and messure the col with. ForwardRef on Col did not work in this case */}
      <Fill className="fill" ref={colRef} horizontalAlign={horizontalAlign}>
        {children}
        <Resizer
          onMouseDown={mouseDownHandler}
          onDoubleClick={doubleClickHandler}
          direction={direction}
          position={position}
          isResizing={isResizing}
          ref={resizeRef}
        >

        </Resizer>
      </Fill>
    </Brick>
  );
}


export default ResizablelCol;
