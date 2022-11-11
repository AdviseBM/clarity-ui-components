//jsx component
import React from 'react';
import styled from 'styled-components';
import { default as mo } from "../data/months";
import { numberToLetter } from './utils';
// import Col from './Col';

const RowElm = styled.div`
    // position: absolute;
    position: relative;
    white-space: nowrap;
    width: 100%;
`;
const Col = styled.div`
    background: #fff;
    box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: left;
    position: absolute;
`;

const Row = ({ row, index, selectedMonths, topOffset, colWidth, colHeight, labelColWidth, toolBoxWidth, totalColWidth, totalMonths, hideTotal = false }) => {

    let months = mo.map((m) => m.system);
    // select range of months based on selectedMonths
    let monthRange = months.slice(selectedMonths[0] - 1, selectedMonths[1]);
    // calculate the top position of the row
    const topPosition = (index * 50) + topOffset;

    const getTotal = () => {
        let mappings = row.totals_mappings || [];
        let mapping = mappings.find((mapping) => {
            return mapping.begin == selectedMonths[0] && mapping.end == selectedMonths[1];
        });

        // needs more work
        if (mapping) {
            if (!hideTotal) {
                return mapping.total;
            }
            // else {
            //     return row[selectedMonths[selectedMonths.length - 1].system];
            // }
        } else {
            return null;
        }
    }

    const leftOffset = toolBoxWidth + labelColWidth;
    // initial row number is one 
    let rowNumber = index + 1;
    // count the number of cols to determine the id the total col
    let counter = 1
    return (
        //Do we need the height here?
        <RowElm style={{ height: colHeight }} >
            {/*Technically toolbox is not a col*/}
            <Col style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}></Col>
            
            <Col id={'a' + rowNumber} style={{ width: labelColWidth, height: colHeight, top: 0, left: toolBoxWidth }}>{row.name}</Col>
            {/* map through the months and return cols */}
            {monthRange.map((month, i) => {
                const left = leftOffset + i * colWidth;
                const colId = numberToLetter(i + 1) + rowNumber;
                counter++;
                return (
                    <Col id={colId} key={i} style={{ width: colWidth, height: colHeight, top: 0, left: left }}>{row[month]}</Col>
                )
            })}
            <Col id={numberToLetter(counter) + rowNumber} style={{ width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (totalMonths * colWidth) }}>
                {getTotal()}
            </Col>
        </RowElm>
    )
}

export default Row;