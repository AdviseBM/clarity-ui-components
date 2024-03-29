import React, { useRef, useState, useEffect, memo } from 'react';
import { useLayoutEffect } from 'react';
import styled from 'styled-components';

const cellPaddingLeftRight = 5;

const StaticCell = styled.div`
  // padding: 0 ${cellPaddingLeftRight}px;
  padding: 3px;
  font-size: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  ${({ parentType }) => {
    if (parentType === 'first') {
      return `
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      `;
    }
  }}

  word-break: ${({ fixedSize }) => (!fixedSize ? 'unset' : 'break-all')};
`;

const EditableCell = styled.input`
  border: 1px #1f97f3 solid;
  box-shadow: 0 2px 6px 2px rgb(60 64 67 / 15%);
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  margin: 0;
  max-height: 9900px;
  max-width: 9900px;
  width: 100%;
  outline: none;
  overflow: auto;
  padding: 0 2px;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 15;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  padding: 1px 2px;
  max-height: 464px;
  // min-width: 84px;
  /* min-height: 25px; */
  height: 100%;
  display: block;
  justify-content: right;
  align-items: center;
  text-align: inherit;
`;

const Cell = ({
  children,
  parentWidth,
  parentType,
  totalWidth,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
  editable = false,
  setIsEditable,
  inputValue,
  setInputValue,
  inputType,
  allowEdition,
  lastColPaddingLeft,
  fixedSize,
}) => {
  const ref = useRef(null);
  const inputRef = useRef(null);
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

  /**
   * Find the widest cell and update the state so we can use it to auto adjust the width of the columns
   */
  useLayoutEffect(() => {
    const width = getElementWidth(ref.current);

    if (parentType === 'middle') {
      setBiggestDataCellWidth((value) => {
        return width > value ? width : value;
      });
    }
    if (parentType === 'first') {
      setBiggestLabelCellWidth((value) => {
        if (width > value) {
          return width;
        } else {
          return value;
        }
      });
    }
    if (parentType === 'last') {
      setBiggestTotalCellWidth((value) => {
        if (width > value) {
          return width + lastColPaddingLeft;
        } else {
          return value >= 80 ? value : 80;
        }
      });
    }
  }, [ref?.current?.offsetWidth, parentType]);

  useEffect(() => {
    if (editable) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editable, allowEdition]);

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

  const handleOnInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnBlur = () => {
    setIsEditable(false);
  };

  return (
    <>
      <StaticCell
        ref={ref}
        isOverflowing={isOverflowing}
        parentType={parentType}
        fixedSize={fixedSize}
        style={{ display: editable ? 'none' : 'flex' }}
      >
        {children}
      </StaticCell>
      <EditableCell
        type={inputType}
        style={{ display: editable ? 'block' : 'none' }}
        onChange={handleOnInput}
        onBlur={handleOnBlur}
        ref={inputRef}
        value={inputValue}
      />
    </>
  );
};

export default Cell;
