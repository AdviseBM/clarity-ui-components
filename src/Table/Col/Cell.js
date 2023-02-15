import React, { useRef, useState, useEffect, memo } from "react";
import { useLayoutEffect } from "react";
import styled from "styled-components";

const cellPaddingLeftRight = 5;

const SpaceAround = styled.div`
  padding: 0 ${cellPaddingLeftRight}px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// x and y are only for debugging if needed
const Cell = ({
  children,
  parentWidth,
  parentType,
  totalWidth,
  hasTotalColumn,
  biggestDataCellWidth,
  biggestLabelCellWidth,
  biggestTotalCellWidth,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
}) => {
  const ref = useRef(null);
  const [refOffsetWidth, setRefOffsetWidth] = useState(
    ref && ref.current ? ref.current.offsetWidth : null
  );
  const [isOverflowing, setIsOverflowing] = useState(false);

  /**
   * This function gets the total width of an element, we use it to check if the cell is overflowing
   */
  function getElementWidth(element) {
    const style = element.currentStyle || window.getComputedStyle(element);
    const width = element.offsetWidth;
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const padding =
      parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const border =
      parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    return width + margin + padding + border;
  }

  useLayoutEffect(() => {
    setRefOffsetWidth(getElementWidth(ref.current));
  }, [ref?.current?.offsetWidth]);

  /**
   * Find the widest cell and update the state so we can use it to auto adjust the width of the columns
   */
  useLayoutEffect(() => {
    if (parentType === "middle") {
      setBiggestDataCellWidth((value) => {
        return refOffsetWidth > value ? refOffsetWidth : value;
      });
    }
    if (parentType === "first") {
      setBiggestLabelCellWidth((value) => {
        if (refOffsetWidth > value) {
          return refOffsetWidth;
        } else {
          return value;
        }
      });
    }
    if (parentType === "last") {
      setBiggestTotalCellWidth((value) => {
        if (refOffsetWidth > value) {
          return refOffsetWidth;
        } else {
          return value >= 80 ? value : 80;
        }
      });
    }
  }, [refOffsetWidth]);

  /**
   * Check if the cell is overflowing and set the state
   */
  useEffect(() => {
    if (ref.current.offsetWidth > parentWidth) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [parentWidth, totalWidth]);

  return (
    <SpaceAround ref={ref} isOverflowing={isOverflowing}>
      {children}
    </SpaceAround>
  );
};

export default Cell;
