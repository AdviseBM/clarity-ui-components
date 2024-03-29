import React, { memo } from "react";
import styled from "styled-components";
import { toInteger } from "lodash";
import { formatNumber } from "../utils";

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  height: 30px;
  background: ${(props) => (props.vissible ? "#f5f5f5" : "transparent")};
  padding: 0 10px;
  box-sizing: border-box;
  color: #333;
  font-size: 13px;
`;

const Left = styled.div`
  display: inline-flex;
`;
const Middle = styled.div`
  display: inline-flex;
`;
const Right = styled.div`
  display: inline-flex;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  padding: 0 5px;
  span {
    font-weight: bold;
    margin-left: 5px;
  }
`;

/**
 * The footer is a nessasary component because it used to track when selection is outside the table
 * If the footer is not desired, it can be rendered with white or transparent background and no content
 * TODO make the footer optional with a prop from the table
 */
const Footer = memo(
  ({ count, sum, min, max, avg, maxWidth, vissible, numberFormat }) => {
    return (
      <TableFooter
        style={{ maxWidth: maxWidth }}
        className="tableCol tableFooter"
        data-end={true}
        vissible={vissible}
      >
        {vissible && (
          <>
            <Left></Left>
            <Middle></Middle>
            <Right>
              {/* This needs more work to account for some scenarios like when one column is selected after bigger selection */}
              {count > 1 && (
                <>
                  <Box>
                    count: <span>{count}</span>
                  </Box>
                  {!isNaN(min) && (
                    <Box>
                      min: <span>{formatNumber(min, numberFormat)}</span>
                    </Box>
                  )}
                  {!isNaN(max) && (
                    <Box>
                      max: <span>{formatNumber(max, numberFormat)}</span>
                    </Box>
                  )}
                  {!isNaN(avg) && (
                    <Box>
                      avg:{" "}
                      <span>{formatNumber(toInteger(avg), numberFormat)}</span>
                    </Box>
                  )}
                  {!isNaN(sum) && (
                    <Box>
                      sum: <span>{formatNumber(sum, numberFormat)}</span>
                    </Box>
                  )}
                </>
              )}
              {count === 1 && <></>}
            </Right>
          </>
        )}
      </TableFooter>
    );
  }
);

export default Footer;
