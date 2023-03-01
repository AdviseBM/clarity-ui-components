import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  EditOutlined,
  VerticalAlignBottomOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import DragHandle from "./icons/DragHandle";

import { Table, Row, Col } from "./Table";
import { view, ui_prefs } from "./data/example2";
import { default as mo } from "./data/months";
import Plus from "./icons/Plus";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  cursor: pointer;
  ${({ hover }) => {
    if (hover) {
      return `
      &:hover {
        background-color: #e6f4ff;
      }
    `;
    }
  }}
`;

function Example({
  theme,
  draggable,
  autoAdjustTrigger,
  selectionMode,
  footerVissible,
  headerOffset,
  showGrid,
  allowEdition,
}) {
  const [viewData, setViewData] = useState(view);
  const [subRows, setSubRows] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  // const [containerWidth, setContainerWidth] = useState(0);
  // const [selectionMode, setSelectionMode] = useState('row');
  // const tableRef = useRef(null);
  // const tableRef3 = useRef(null);

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  //   tableRef.current.autoAdjust();
  // }, [autoAdjustTrigger]);

  let months = mo.map((m) => m.system);
  // select range of months based on selectedMonths
  let [monthRange, setMonthRange] = useState(
    months.slice(ui_prefs.months[0] - 1, ui_prefs.months[1])
  );

  const header = [
    { title: "" },
    ...monthRange.map((m) => {
      return { title: m };
    }),
    // { title: "Total" },
  ];

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const cloneViewData = [...viewData];
    const [reorderedItem] = cloneViewData.splice(result.source.index, 1);
    cloneViewData.splice(result.destination.index, 0, reorderedItem);
    setViewData(cloneViewData);
  };

  const leftBrickContent = (dragHandleProps, rowId) => {
    return (
      <Flex>
        <Flex
          cursor={"pointer"}
          style={{ marginLeft: 4 }}
          onClick={() => {
            if (expandedIds.includes(rowId)) {
              setExpandedIds(expandedIds.filter((id) => id !== rowId));
            } else {
              setExpandedIds([...expandedIds, rowId]);
            }
          }}
        >
          <Plus />
        </Flex>
      </Flex>
    );
  };

  const rowMenuContent = (dragHandleProps) => {
    return (
      <>
        <MenuItem {...dragHandleProps} style={{ cursor: "grab" }}>
          <DragHandle />
        </MenuItem>
        <MenuItem hover>
          <EditOutlined />
        </MenuItem>
        <MenuItem hover>
          <ClearOutlined />
        </MenuItem>
        <MenuItem hover>
          <VerticalAlignBottomOutlined />
        </MenuItem>
      </>
    );
  };

  const loadMoreItems = (startIndex, stopIndex) => {
    return new Promise((resolve) => {
      for (let i = startIndex; i <= stopIndex; i++) {
        subRows.push(subRows[0]);
      }
      setSubRows(subRows);
      // setTimeout(() => {
      resolve();
      // }, 200);
    });
  };

  const SubRowList = (props) => {
    console.log(props.tableProvided);
    return (
      <div style={{ height: 250 }}>
        <InfiniteLoader
          isItemLoaded={(index) => {
            return index < subRows.length;
          }}
          itemCount={100}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            // <AutoSizer>
            //   {({ height, width }) => (
            <List
              className="List"
              height={250}
              itemCount={100}
              itemSize={40}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={props.tableProvided.rowProps.totalWidth}
            >
              {({ index, style }) => {
                return (
                  // <div style={{ background: "red", ...style }}>
                  //   Hello World...
                  // </div>
                  <Row
                    {...props.tableProvided.rowProps}
                    type={"secondary"}
                    style={{
                      // minHeight: 40,
                      // background: "#f7f7f7",
                      ...style,
                    }}
                  >
                    <Col horizontalAlign="left">lykill 1004</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                    <Col allowEdition={allowEdition}>34567</Col>
                  </Row>
                );
              }}
            </List>
            //   )}
            // </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  };

  return (
    <div className="App">
      <Table
        headerData={header}
        theme={theme}
        showGrid={true}
        selectionMode={selectionMode}
        tableId={"bigTable"}
        footer={footerVissible}
        headerStickyTopOffset={headerOffset}
        lasColumnRisizeable={true}
        hasTotalColumn={false}
        onSelection={(selectedReport) => {
          // console.log("selectedReport", selectedReport);
        }}
      >
        {(tableProvided) => {
          return (
            <>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                <Col colspan={'fullwidth'}>Some text</Col>
              </Row>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps} type="secondary">
                <Col colspan={'fullwidth'}>Some text</Col>
              </Row>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps} type="secondary">
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
              </Row>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps} type="secondary">
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>

              </Row>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps} type="secondary">
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>

              </Row>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps} type="secondary">
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>
                <Col allowEdition={allowEdition}>Some text</Col>

              </Row>
              <Row style={{ minHeight: 40 }} {...tableProvided.rowProps} type="secondary">
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>
                <Col allowEdition={true}>Some text</Col>

              </Row>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {viewData.map((row, i) => {
                        return (
                          <Draggable
                            isDragDisabled={!draggable}
                            draggableId={"id-" + row.id}
                            key={"id-" + row.id}
                            index={i}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <Row
                                  key={i}
                                  style={{ minHeight: 40 }}
                                  leftBrickContent={leftBrickContent(
                                    provided.dragHandleProps,
                                    row.id
                                  )}
                                  {...tableProvided.rowProps}
                                  menuContent={rowMenuContent(
                                    provided.dragHandleProps
                                  )}
                                >
                                  <Col horizontalAlign="left">{row.name}</Col>

                                  {monthRange.map((month, i) => (
                                    <Col
                                      key={i}
                                      allowEdition={allowEdition}
                                      onSubmitCallback={alert}
                                      inputType={"number"}
                                    >
                                      {row[month]}
                                    </Col>
                                  ))}

                                  {/* <Col>{total}</Col> */}
                                </Row>

                                {
                                  expandedIds.includes(row.id) && (
                                    <SubRowList tableProvided={tableProvided} />
                                  )
                                  // expandedIds.includes(row.id) && (
                                  //   // The motion divs are optional and just an example of how to animate the conditional rendered rows
                                  //   // it shows how dynamic the table can be
                                  //   // Optional animation starts
                                  //   <div>
                                  //     <div>
                                  //       {/* Optional animation ends */}

                                  //       <Row
                                  //         selectable={false}
                                  //         {...tableProvided.rowProps}
                                  //         type={"secondary"}
                                  //         style={{
                                  //           minHeight: 40,
                                  //           background: "#f7f7f7",
                                  //         }}
                                  //       >
                                  //         <Col horizontalAlign="left">
                                  //           lykill 1004
                                  //         </Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //       </Row>
                                  //       <Row
                                  //         selectable={false}
                                  //         {...tableProvided.rowProps}
                                  //         type={"secondary"}
                                  //         style={{
                                  //           minHeight: 40,
                                  //           background: "#f7f7f7",
                                  //         }}
                                  //       >
                                  //         <Col horizontalAlign="left">
                                  //           lykill 1006
                                  //         </Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //         <Col>34567</Col>
                                  //       </Row>
                                  //       {/* Optional animation starts */}
                                  //     </div>
                                  //   </div>
                                  // )
                                  // Optional animation ends
                                }
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          );
        }}
      </Table>
    </div>
  );
}

export default Example;
