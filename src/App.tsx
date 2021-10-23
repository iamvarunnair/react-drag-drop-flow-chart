/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.scss';

/* ############### Initail attempt with html canvas, dropped for simpler approach ############### */
// const HOOK_SVG =
//     'm129.03125 63.3125c0-34.914062-28.941406-63.3125-64.519531-63.3125-35.574219 0-64.511719 28.398438-64.511719 63.3125 0 29.488281 20.671875 54.246094 48.511719 61.261719v162.898437c0 53.222656 44.222656 96.527344 98.585937 96.527344h10.316406c54.363282 0 98.585938-43.304688 98.585938-96.527344v-95.640625c0-7.070312-4.640625-13.304687-11.414062-15.328125-6.769532-2.015625-14.082032.625-17.960938 6.535156l-42.328125 64.425782c-4.847656 7.390625-2.800781 17.3125 4.582031 22.167968 7.386719 4.832032 17.304688 2.792969 22.160156-4.585937l12.960938-19.71875v42.144531c0 35.582032-29.863281 64.527344-66.585938 64.527344h-10.316406c-36.714844 0-66.585937-28.945312-66.585937-64.527344v-162.898437c27.847656-7.015625 48.519531-31.773438 48.519531-61.261719zm-97.03125 0c0-17.265625 14.585938-31.3125 32.511719-31.3125 17.929687 0 32.511719 14.046875 32.511719 31.3125 0 17.261719-14.582032 31.3125-32.511719 31.3125-17.925781 0-32.511719-14.050781-32.511719-31.3125zm0 0';
// const HOOK_PATH = new Path2D(HOOK_SVG);
// const SCALE = 0.3;
// const OFFSET = 80;

// interface Location {
//     x: number;
//     y: number;
// }

// function draw(ctx: CanvasRenderingContext2D, location: Location) {
//     ctx.fillStyle = 'deepskyblue';
//     ctx.shadowColor = 'dodgerblue';
//     ctx.shadowBlur = 20;
//     ctx.save();
//     ctx.scale(SCALE, SCALE);
//     ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
//     ctx.fill(HOOK_PATH);
//     ctx.restore();
// }

// function App() {
//     const [locations, setLocations] = React.useState<Location[]>([]);
//     const canvasRef = React.useRef<HTMLCanvasElement>(null);

//     React.useEffect(() => {
//         const canvas = canvasRef.current;
//         if (canvas == null) throw new Error('Could not get context');
//         //  const ctx = canvas.getContext('2d');
//         const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
//         ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
//         locations.forEach((location) => draw(ctx, location));
//     });

//     function handleCanvasClick(
//         e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
//     ) {
//         const newLocation = { x: e.clientX, y: e.clientY };
//         setLocations([...locations, newLocation]);
//     }
//     function handleClear() {
//         setLocations([]);
//     }

//     function handleUndo() {
//         setLocations(locations.slice(0, -1));
//     }

//     console.log('check 27', locations);
//     return (
//         <div className='App'>
//             <button onClick={handleClear}>Clear</button>
//             <button onClick={handleUndo}>Undo</button>
//             <canvas
//                 ref={canvasRef}
//                 width={window.innerWidth}
//                 height={window.innerHeight}
//                 onClick={handleCanvasClick}
//             />
//         </div>
//     );
// }
/* ############### Initail attempt with html canvas ############### */

/* ############### Test input ############### */
// const dummyInput = [
//     {
//         name: 'A',
//         children: null,
//     },
//     {
//         name: 'Aa',
//         children: null,
//     },
//     {
//         name: 'B',
//         children: [
//             {
//                 name: 'B1',
//                 children: [
//                     {
//                         name: 'B11',
//                         children: [
//                             {
//                                 name: 'B111',
//                                 children: null,
//                             },
//                             {
//                                 name: 'B112',
//                                 children: null,
//                             },
//                         ],
//                     },
//                 ],
//             },
//             {
//                 name: 'B2',
//                 children: [
//                     {
//                         name: 'B21',
//                         children: [
//                             {
//                                 name: 'B211',
//                                 children: null,
//                             },
//                             {
//                                 name: 'B212',
//                                 children: null,
//                             },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
// ];
/* ############### End of test input ############### */

/* ############### Current code logic ############### */

/* ############### Test logic ############### */
/* Function to see a whole balanced tree in UI */
const dummyInputLoop = (depth: number, id: string): ChartNode[] | null => {
    if (depth > 0) {
        depth--;
        return depth === 0
            ? [
                  {
                      id: id + '0',
                      name: 'end',
                      children: null,
                      type: 1,
                  },
              ]
            : [
                  {
                      id: id + '0',
                      name: '' + depth,
                      children: dummyInputLoop(depth, id + '0'),
                      // children: depth % 2 !== 0 ? dummyInputLoop(depth) : null,
                      type: 3,
                  },
                  {
                      id: id + '1',
                      name: '' + depth,
                      children: dummyInputLoop(depth, id + '1'),
                      // children: depth % 2 === 0 ? dummyInputLoop(depth) : null,
                      type: 4,
                  },
              ];
    } else {
        return null;
    }
};
/* ############### End of test logic ############### */

/* CharNode.id logic
          0
     00      01
  000  001  010   011
 0000      0100
00000
*/
interface ChartNode {
    id: string;
    name: string;
    children: ChartNode[] | null;
    type: 0 | 1 | 2 | 3 | 4;
    /* type
        0 for start node,
        1 for end node, as many as breath(horizontal levels) ,
        2 for single child,
        3 for left child,
        4 for right child,
    */
}

/* Component to return UI node element
    input: Node state to render UI from,
    handler: Function to handle children node rendered
        through same Component recursively,
    onDragOver: event function triggered on
        hovering of draggable elements over current component,
    onDrop: event function triggered on
        dropping draggable element on this component
*/
const CharNodeEl = (
    input: ChartNode,
    handler: (
        input: ChartNode[],
        onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
        onDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void
    ) => Element,
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
    onDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void
) => (
    <div
        style={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
        }}
    >
        {/* connectorWrapper manages ui for branching lines */}
        <div
            className='connectorWrapper'
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => {
                onDrop(event, input.id);
            }}
        >
            {input.type === 1 || input.type === 2 ? (
                <div className='vh'></div>
            ) : null}
            {input.type === 3 || input.type === 4 ? (
                <div
                    className='vh2'
                    style={{ alignSelf: input.type === 3 ? 'end' : 'start' }}
                ></div>
            ) : null}
            {input.type === 3 || input.type === 4 ? (
                <div
                    className='hr'
                    style={{ alignSelf: input.type === 3 ? 'end' : 'start' }}
                ></div>
            ) : null}
            {input.type !== 0 ? <div className='vh'></div> : null}
        </div>
        <p
            style={{
                backgroundColor: 'blueviolet',
                margin: '0 5px',
                textAlign: 'center',
                padding: '10px',
            }}
        >
            <span style={{ color: 'lightgray' }}>{input.id}</span> {input.name}
        </p>
        {/* Subsequent children rendered recusrsively */}
        <div style={{ display: 'flex', flexFlow: 'row' }}>
            {input?.children
                ? handler(input.children, onDragOver, onDrop)
                : null}
        </div>
    </div>
);

/* Handler function to render list of Nodes */
const preview = (
    input: ChartNode[],
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
    onDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void
) => {
    return (
        <>{input.map((el) => CharNodeEl(el, preview, onDragOver, onDrop))}</>
    );
};

function App() {
    const [chartNode, setChartNode] = React.useState<ChartNode[] | null>([
        /* Default 'start' and 'end' nodes*/
        {
            id: '0',
            name: 'start',
            children: [
                {
                    id: '00',
                    name: 'end',
                    children: null,
                    type: 1,
                },
            ],
            type: 0,
        },
    ]);

    React.useEffect(() => {
        /* Test logic: Uncomment with/ to use dummyInputLoop */
        setChartNode([
            {
                id: '0',
                name: '' + 7,
                children: dummyInputLoop(7, '0'),
                type: 0,
            },
        ]);
        /* End of test logic comment */
    }, []);

    /* handler on draggable elements to set data
    for transferring from draggable element
    to 'dropped on' element */
    const onDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        name: string
    ) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('name', name);
        }
    };

    /* Handler on all possible elements that need to capture
    when a draggable elements hovers over
    to show change in UI state */
    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    /* Handler on 'drooped on' element to read transferable data
    from draggable element to 'dropped on'(current element) and
    update component state to reflect changes in UI*/
    const onDrop = (event: React.DragEvent<HTMLDivElement>, id: string) => {
        if (event.dataTransfer) {
            /* Fetch set data from draggable lement */
            let name = event.dataTransfer.getData('name');
            /* Get the current element from the ui node tree using id to modify component state*/
            const element = id
                .split('')
                .reduce(
                    (final, el) =>
                        final && final[parseInt(id, 10)].children
                            ? final[parseInt(el, 10)].children
                            : final
                            ? [final[parseInt(id, 10)]]
                            : null,
                    chartNode
                );
            /* Add element to the lst node for adding a node at the end(user case) */
            if (element && element.length === 1) {
                const transferName = element[0].name;
                element[0].name = name;
                element[0].type = 2;
                element[0].children = [
                    ...[
                        {
                            id: element[0].id + '0',
                            name: transferName,
                            children: null,
                            type: 1,
                        },
                    ],
                ] as ChartNode[];
            }
            /* Update state immutabily to refect changes in state in UI rendering */
            setChartNode([...(chartNode as [])]);
        }
    };

    return (
        <div className='App'>
            <div className='left'>
                <h4 style={{ color: 'darkcyan', marginBottom: '10px' }}>
                    Draggable objects
                </h4>
                <div
                    className='dragableBox'
                    onDragStart={(event) => onDragStart(event, 'Item')}
                    draggable
                >
                    Item
                </div>
                <br />
            </div>
            <div className='right'>
                <div className='appChild'>
                    {preview(chartNode as ChartNode[], onDragOver, onDrop)}
                </div>
            </div>
        </div>
    );
}

export default App;
