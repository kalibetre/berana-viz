import { Update } from '@reduxjs/toolkit';
import { Node } from '.';

type AlgoGenerator = Generator<{
    selectedId: string;
    updates: Update<Node>[];
    found?: boolean;
}>;

export default AlgoGenerator;
