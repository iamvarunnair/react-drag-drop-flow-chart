import React from 'react';
import { ChartNode } from './types';

/* Component to return UI node element
    input: Node state to render UI from,
    handler: Function to handle children node rendered
        through same Component recursively,
    onDragOver: event function triggered on
        hovering of draggable elements over current component,
    onDrop: event function triggered on
        dropping draggable element on this component
*/
export const ChartNodeEl: React.FC<{
    input: ChartNode;
    onDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
    dragInProgress: boolean;
}> = ({ input, onDrop, dragInProgress }): React.ReactElement => {
    const [hover, setHover] = React.useState(false);
    /* Handler on all possible elements that need to capture
    when a draggable elements hovers over
    to show change in UI state */
    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHover(true);
    };
    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHover(false);
    };
    React.useEffect(() => {
        if (!dragInProgress) setHover(false);
    }, [dragInProgress]);
    return (
        <div
            style={{
                display: 'flex',
                flexShrink: 0,
                flexFlow: 'column',
                alignItems: 'center',
                // alignItems: 'stretch',
                width:
                    input.type === 3 || input.type === 4
                        ? '50%'
                        : 'max-content',
                // width: 'max-content',
            }}
        >
            {/* connectorWrapper manages ui for branching lines */}
            <div
                className='connectorWrapper'
                onDragOver={(event) => onDragOver(event)}
                onDrop={(event) => {
                    onDrop(event, input.id);
                    setHover(false);
                }}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
            >
                {input.type === 1 || input.type === 2 ? (
                    <div
                        className='vh'
                        style={{
                            backgroundColor:
                                hover && dragInProgress
                                    ? 'darkcyan'
                                    : 'blueviolet',
                        }}
                    ></div>
                ) : null}
                {input.type === 3 || input.type === 4 ? (
                    <div
                        className='vh2'
                        style={{
                            alignSelf: input.type === 3 ? 'end' : 'start',
                            backgroundColor:
                                hover && dragInProgress
                                    ? 'darkcyan'
                                    : 'blueviolet',
                        }}
                    ></div>
                ) : null}
                {input.type === 3 || input.type === 4 ? (
                    <div
                        className='hr'
                        style={{
                            alignSelf: input.type === 3 ? 'end' : 'start',
                            backgroundColor:
                                hover && dragInProgress
                                    ? 'darkcyan'
                                    : 'blueviolet',
                        }}
                    ></div>
                ) : null}
                {input.type !== 0 ? (
                    <div
                        className='vh'
                        style={{
                            backgroundColor:
                                hover && dragInProgress
                                    ? 'darkcyan'
                                    : 'blueviolet',
                        }}
                    ></div>
                ) : null}
            </div>
            <p
                style={{
                    backgroundColor:
                        hover && dragInProgress ? 'darkcyan' : 'blueviolet',
                    margin: '0 5px',
                    // margin: '0 auto',
                    textAlign: 'center',
                    padding: '10px',
                    // flexShrink: 0,
                    // // width: 'max-content',
                    // minWidth: '100px',
                }}
                onDragOver={(event) => onDragOver(event)}
                onDrop={(event) => {
                    onDrop(event, input.id);
                    setHover(false);
                }}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
            >
                <span style={{ color: 'lightgray' }}>{input.id}</span>{' '}
                {input.name}
            </p>
            {/* Subsequent children rendered recusrsively */}
            <div style={{ display: 'flex', flexFlow: 'row' }}>
                {input?.children ? (
                    <Preview
                        input={input.children}
                        onDrop={onDrop}
                        dragInProgress={dragInProgress}
                    />
                ) : null}
            </div>
        </div>
    );
};

/* Handler function to render list of Nodes */
export const Preview: React.FC<{
    input: ChartNode[];
    onDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
    dragInProgress: boolean;
}> = ({ input, onDrop, dragInProgress }): React.ReactElement => {
    return (
        <>
            {input.map((el) => (
                // ChartNodeEl({ input: el, handler: preview, onDragOver, onDrop, dragInProgress })
                <ChartNodeEl
                    input={el}
                    onDrop={onDrop}
                    dragInProgress={dragInProgress}
                />
            ))}
        </>
    );
};

/* Function to update id in the sub tree recurcively
    chartNode: subtree that needs modification,
    newAdditionToid: new addition in between the id based on where the new node was added'
        Updation with new value, where new value is allways zero as child only one node is added at a time, not two nodes together,
    depth: position in id where new element is added.
    eg: id 0112324 get a new node X at 01123X24, there for updated id of example node is 01123<0>24
*/
export const updateAllChildNodeIds = (
    chartdNode: ChartNode,
    newAdditionToid: string,
    depth: number
): void => {
    if (chartdNode.children) {
        for (let item of chartdNode.children) {
            updateAllChildNodeIds(item, newAdditionToid, depth);
            item.id =
                item.id.slice(0, depth) +
                newAdditionToid +
                item.id.slice(depth, item.id.length);
        }
    }
};
