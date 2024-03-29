import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: 1px solid #e8eaed;
    background: #ffffff;
    flex-shrink: 0;
    border-left-width: ${({ borderLeftWidth }) => borderLeftWidth || 1}px;
    border-right-width: ${({ borderRightWidth }) => borderRightWidth || 1}px;
    pointer-events: initial;
`;
