import styled from "styled-components";

export const Container = styled.div`
    overflow: hidden;
    height: 100%;
    width: ${({ width }) => (width ? `${width}px` : "100%")};

    @media (min-width: 700px) {
        position: relative;
    }
`;
