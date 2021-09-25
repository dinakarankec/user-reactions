import { VFC } from 'react';
import AddReaction from './AddReactions';
import { Flex } from './Layout';
import ShortSummary from './ShortSummary';

const ContentReactions: VFC = () => {
    return (
        <Flex>
            <ShortSummary />
            <AddReaction />
        </Flex>
    );
};

export default ContentReactions;
