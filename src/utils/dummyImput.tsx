import { ChartNode } from './../components/types';

const dummyInput = [
    {
        name: 'A',
        children: null,
    },
    {
        name: 'Aa',
        children: null,
    },
    {
        name: 'B',
        children: [
            {
                name: 'B1',
                children: [
                    {
                        name: 'B11',
                        children: [
                            {
                                name: 'B111',
                                children: null,
                            },
                            {
                                name: 'B112',
                                children: null,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'B2',
                children: [
                    {
                        name: 'B21',
                        children: [
                            {
                                name: 'B211',
                                children: null,
                            },
                            {
                                name: 'B212',
                                children: null,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

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

export { dummyInputLoop, dummyInput };
