import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import {
  Cursor,
  SectionContainer,
  SectionElm,
  SectionHandle,
  SectionHandleItem,
} from "./styled";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DataContext } from "../Grid";
import Col from "../Col";
import Plus from "../../../icons/Plus";
import DragHandle from "../../../icons/DragHandle";
import { compute, getRowId, useController } from "../hooks";

function Section({ widths, isBeforeDragging, index, row, breakpoint }) {
  // Define a ref to store a reference to the section element.
  const sectionRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(null);
  const [height, setHeight] = useState("initial");
  const { colId, data, setData, sectionId, minWidth, maxCols } =
    useContext(DataContext);
  const { addRow, removeRow } = useController(data, setData, maxCols);
  // Define a state variable to store the flex factors of each column based on the number of columns
  // const [widths, updateWidths] = useState(() => initialWidths);

  function setWidths(widthsData) {
    // const row = data[index];
    row.columns = row.columns.map((col, index) => {
      col.width = widthsData[index];
      return col;
    });
    const newData = [...data];

    setData(newData);
  }

  // useLayoutEffect(() => {
  //   if (sectionRef.current) {
  //     setInitialHeight(sectionRef.current.offsetHeight);
  //   }
  // }, []);

  useLayoutEffect(() => {
    if (isBeforeDragging) {
      if (initialHeight) {
        setHeight(initialHeight);
      }
    } else {
      setHeight("initial");
      if (sectionRef.current) {
        setInitialHeight(sectionRef.current.offsetHeight);
      }
    }
  }, [isBeforeDragging]);

  // Initialize widths on component mount
  useEffect(() => {
    // Debounce function
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // If the sectionRef is defined (i.e., the component has mounted),
    // calculate the initial flex factors for each column
    function calculateWidths() {
      if (sectionRef.current) {
        const initialWidths = widths.map(() => 1 / widths.length);
        // Update the state with the new flex factors
        setWidths(initialWidths);
      }
    }

    const debouncedCalculateWidths = debounce(calculateWidths, 300);

    debouncedCalculateWidths();

    window.addEventListener("resize", debouncedCalculateWidths);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", debouncedCalculateWidths);
    };
  }, [row]);

  const onResize = (index, event, { size }) => {
    // Ensure the index is not out of range (i.e., not the last column)
    if (index < widths.length - 1) {
      const newWidths = compute(
        widths,
        index,
        size,
        sectionRef.current.offsetWidth,
        minWidth
      );

      // Update the state with the new flex factors
      setWidths(newWidths);
    }
  };

  const columnHeight = useRef(null);
  const resizing = useRef(false);

  // the resizeable is used because we have to detect changes in the height of the row
  // that are trigged by a change in the height of the columns children provided
  // by the user(aka dumby widget)
  useEffect(() => {
    const rowElement = document.querySelector("#section-" + row.rowId);
    if (rowElement) {
      columnHeight.current = rowElement.clientHeight;

      let timeout;

      const resizeObserver = new ResizeObserver((entries) => {
        if (window) {
          const computedStyle = window.getComputedStyle(rowElement);

          const currentHeight = parseFloat(computedStyle.height);

          if (currentHeight !== columnHeight.current) {
            if (!resizing.current) {
              resizing.current = true;

              if (timeout) clearTimeout(timeout);

              timeout = setTimeout(() => {
                // setInitialHeight(currentHeight + 13);// what is the +13 for?
                setInitialHeight(currentHeight);
                resizing.current = false;
              }, 100);
            }
          }
        }
      });

      resizeObserver.observe(rowElement);
    }
  }, []);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const draggableId = "draggable_" + row.rowId;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(draggableProvided) => {
        return (
          <SectionContainer
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            isDraggingOver={
              isDraggingOver && getRowId(colId) != getRowId(draggableId)
            }
          >
            <Droppable
              droppableId={"col_" + row.rowId}
              type="col"
              direction={"horizontal"}
            >
              {(droppableProvided, snapshot) => {
                setIsDraggingOver(snapshot.isDraggingOver);

                return (
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    style={{ height: height }}
                  >
                    <SectionElm
                      id={"section_" + row.rowId}
                      ref={sectionRef}
                      style={{ position: "relative" }}
                      breakpoint={breakpoint}
                      beingDragged={
                        sectionId === draggableId || sectionId === null
                      }
                    >
                      {row.columns.map((column, colIndex) => (
                        <Col
                          key={column.columnId}
                          index={colIndex}
                          columnId={column.columnId}
                          width={column.width}
                          data={column.data}
                          rowId={row.rowId}
                          onResize={onResize}
                          sectionRef={sectionRef}
                          isLast={colIndex === row.columns.length - 1}
                          breakpoint={breakpoint}
                        >
                          {column.data.map((data, index) => {
                            const marginBottom =
                              column.data.length > 1 &&
                              index != column.data.length - 1
                                ? 10
                                : 0;
                            const Component = data.component;
                            return Component ? (
                              <Component
                                key={index}
                                style={{
                                  marginBottom,
                                  border: "dashed 1px #9ca5aea6",
                                }}
                              />
                            ) : null;
                          })}
                        </Col>
                      ))}
                      <SectionHandle>
                        <SectionHandleItem
                          {...draggableProvided.dragHandleProps}
                        >
                          <DragHandle />
                        </SectionHandleItem>
                        <Cursor type="pointer">
                          <SectionHandleItem
                            onClick={() => {
                              addRow(row.rowId);
                            }}
                          >
                            <Plus />
                          </SectionHandleItem>
                        </Cursor>
                        <Cursor type="pointer">
                          <SectionHandleItem
                            onClick={() => {
                              removeRow(row.rowId);
                            }}
                          >
                            <Plus style={{ transform: "rotate(45deg)" }} />
                          </SectionHandleItem>
                        </Cursor>
                      </SectionHandle>
                    </SectionElm>
                    {droppableProvided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </SectionContainer>
        );
      }}
    </Draggable>
  );
}

export default Section;
