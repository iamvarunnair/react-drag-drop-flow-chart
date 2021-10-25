/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.scss';
import { ChartNode } from './components/types';
import { Preview, updateAllChildNodeIds } from './components/ChartNode';
// import { dummyInputLoop } from './utils/dummyImput';

/* CharNode.id logic
           0
      00       01
  000  001  010   011
 0000      0100
00000
*/

function App() {
    const [dragInProgress, setDragInProgress] = React.useState(false);
    const [chartNode] = React.useState<ChartNode[] | null>([
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
    const draggableElemens: {
        name: string;
        type: 0 | 1;
    }[] = [
        {
            name: 'Item',
            type: 0,
        },
        {
            name: 'Condition',
            type: 1,
        },
    ];

    /* Test logic: Uncomment with/ to use dummyInputLoop */
    // React.useEffect(() => {
    //     setChartNode([
    //         {
    //             id: '0',
    //             name: '' + 7,
    //             children: dummyInputLoop(7, '0'),
    //             type: 0,
    //         },
    //     ]);
    // }, []);
    /* End of test logic comment */

    /* handler on draggable elements to set data
    for transferring from draggable element
    to 'dropped on' element */
    const onDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        config: { name: string; type: 0 | 1 }
        /* config.type
            1 for normal item in the flowchart,
            2 for adding a conditional split in flowchart,
        */
    ) => {
        // event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.setData('config', JSON.stringify(config));
            setDragInProgress(true);
        }
    };

    const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragInProgress(false);
    };

    /* Handler on 'drooped on' element to read transferable data
    from draggable element to 'dropped on'(current element) and
    update component state to reflect changes in UI*/
    const onDrop = (event: React.DragEvent<HTMLDivElement>, id: string) => {
        // event.preventDefault();
        setDragInProgress(false);
        if (event.dataTransfer && id.length !== 1) {
            /* Fetch set data from draggable elment */
            const { name, type } = JSON.parse(
                event.dataTransfer.getData('config')
            );
            /* Get the current element from the ui node tree using id to modify component state*/
            const element = id.split('').reduce(
                (
                    final: { nodes: ChartNode[] | null; dir: null | number },
                    el,
                    i,
                    arr
                ) => {
                    if (i === arr.length - 1) {
                        return { nodes: final.nodes, dir: parseInt(el, 10) };
                    } else {
                        return {
                            nodes:
                                final &&
                                final.nodes &&
                                final.nodes[parseInt(el, 10)].children,
                            dir: null,
                        };
                    }
                },
                { nodes: chartNode, dir: null }
            );
            /* Direction to identify left or right node */
            const { resultArray, direction } = {
                resultArray: element.nodes,
                direction: element.dir,
            };
            if (
                resultArray &&
                (resultArray.length === 1 || resultArray.length === 2)
            ) {
                let node = null;
                /* Direction '1' for right node, '0' for left node */
                if (direction && direction === 1) {
                    node = resultArray[direction];
                } else {
                    node = resultArray[0];
                }
                /* Change data from existing node to data from draggable element */
                const transferName: string = node.name;
                const transferChildren: ChartNode[] | null = node.children;
                /* assignNode takes the value of current node and adds it as a child node */
                let assignChildren: ChartNode[] | null = [];
                node.name = name;
                if (type === 0) {
                    assignChildren = [
                        ...[
                            {
                                id: node.id + '0',
                                name: transferName,
                                children: transferChildren
                                    ? transferChildren
                                    : null,
                                type: transferChildren ? 2 : 1,
                            },
                        ],
                    ] as ChartNode[];
                } else if (type === 1) {
                    assignChildren = [
                        ...[
                            {
                                id: node.id + '0',
                                name: transferName,
                                children: transferChildren
                                    ? transferChildren
                                    : null,
                                type: 3,
                            },
                            {
                                id: node.id + '1',
                                name: 'end',
                                children: null,
                                type: 4,
                            },
                        ],
                    ] as ChartNode[];
                }
                node.children = assignChildren;
                /* Update ids of all following chilren nodes to reflect addition of parent */
                if (node?.children[0]?.children) {
                    updateAllChildNodeIds(
                        node.children[0],
                        '0',
                        resultArray[0].id.length
                    );
                }
            }
        }
    };

    return (
        <div className='App'>
            <div className='left'>
                <h4 style={{ color: 'darkcyan', marginBottom: '10px' }}>
                    Draggable objects
                </h4>
                {draggableElemens &&
                    draggableElemens.map((el) => (
                        <div
                            className='dragableBox'
                            onDragStart={(event) =>
                                onDragStart(event, {
                                    name: el.name,
                                    type: el.type,
                                })
                            }
                            onDragEnd={onDragEnd}
                            draggable
                        >
                            {el.name}
                        </div>
                    ))}
                <br />
            </div>
            <div className='right'>
                <div className='appChild'>
                    <Preview
                        input={chartNode as ChartNode[]}
                        onDrop={onDrop}
                        dragInProgress={dragInProgress}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
