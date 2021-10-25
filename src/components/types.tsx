type ChartNodeType = 0 | 1 | 2 | 3 | 4;
/* ChartNodeType
        0 for start node,
        1 for end node, as many as breath(horizontal levels) ,
        2 for single child,
        3 for left child,
        4 for right child,
    */

interface ChartNode {
    id: string;
    name: string;
    children: ChartNode[] | null;
    type: ChartNodeType;
}

export type { ChartNodeType, ChartNode };
