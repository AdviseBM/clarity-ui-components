//react component  
import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { debounce} from 'lodash';
import { TableContext } from './context';
import Cell from './Cell';


const Column = styled.div`
    background: #fff;
    box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: ${props => props.horizontalAlign};
    // background: ${props => props.selected ? '#e9f0fd' : 'white'};
    position: absolute;
    user-select: none;
    &.hightlighted {
        background: #e9f0fd;
    }
`;

const Col = React.forwardRef((props, ref) => {
    const { 
        horizontalAlign='right',
        children, 
        style={}, 
        selectable=true,
        type,
        x,
        y,
    } = props;
    // console.log(x,' ',y);

    const {
        setSelectColDraging,
        setMouseDownColCord, 
        setMouseMoveColCord, 
        setMouseUpColCord,
        selectColDraging,
        mouseDownColCord,
        mouseMoveColCord,
        mouseUpColCord,
    } = useContext(TableContext); 
    const [selected, setSelected] = useState(false);

    
    // const isFirstRun = useRef(true);
    // useEffect(() => {
    //     if (isFirstRun.current) {
    //         isFirstRun.current = false;
    //         return;
    //     }
    //     // document.addEventListener('mousemove', mouseMoveHandler);
    //     // document.addEventListener('mouseup', mouseUpHandler);
    // },[selected]);

    
    const mouseDownHandler = (e, cord) => {
        if (!selectable) return;
        setSelected(true);
        setSelectColDraging(true);
        setMouseDownColCord(cord);
    }
    
    const mouseMoveHandler = (e, cord) => {
        if (!selectable) return;
        setMouseMoveColCord(cord);
    }

    const mouseUpHandler = (e, cord) => {
        if (!selectable) return;
        setSelectColDraging(false);
        setMouseUpColCord(cord);
    }

    const debounceMouseUpHandler = debounce(mouseMoveHandler, 100);

    const isHightlighted = () => {

        if (!selectable) return false;
        if (!selectColDraging) return false; 
     
        let isX = false;
        let isY = false;
        if(mouseDownColCord) {
            // Find the min and max of the mouseDownColCord and mouseMoveColCord
            const minX = Math.min(mouseDownColCord[0], mouseMoveColCord[0]);
            const maxX = Math.max(mouseDownColCord[0], mouseMoveColCord[0]);
            const minY = Math.min(mouseDownColCord[1], mouseMoveColCord[1]);
            const maxY = Math.max(mouseDownColCord[1], mouseMoveColCord[1]);

            if(x >= minX && x <= maxX) {
                isX = true;
            }
            if(y >= minY && y <= maxY) {  
                isY = true;
            }
        }
        if(isX && isY) { 
            return true
        }        
        return false;
    }
    
    return (
        <Column 
            horizontalAlign={horizontalAlign}
            style={{...style}} 
            ref={ref}
            x={x}
            y={y}
            onMouseDown={(e)=>mouseDownHandler(e, [x, y])}
            onMouseUp={(e)=>mouseUpHandler(e, [x, y])}
            onMouseMove={(e)=>debounceMouseUpHandler(e, [x, y])}
            selected={selected}
            className={`tableCol ${isHightlighted() ? 'hightlighted' : ''}`}
        >
            <Cell parentWidth={style.width} parentType={type}>
                {children}
            </Cell>
        </Column>
    )
});

export default Col;