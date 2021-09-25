import { useState, VFC } from 'react';
import styled from 'styled-components';
import AddReaction from './AddReactions';
import { Flex } from './Layout';
import ReactionSummary from './ReactionSummary';
import ShortSummary from './ShortSummary';

const PostActionsContainer = styled(Flex)`
    position: relative;
`;

const PostActions: VFC = () => {
    const [showSummary, toggleSummary] = useState(false);
    return (
        <PostActionsContainer>
            <ShortSummary onShortSummaryClick={() => toggleSummary(!showSummary)} />
            <AddReaction />
            {showSummary && <ReactionSummary />}
        </PostActionsContainer>
    );
};

export default PostActions;
