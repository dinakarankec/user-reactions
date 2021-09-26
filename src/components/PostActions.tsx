import { useEffect, useMemo, useState, VFC } from 'react';
import styled from 'styled-components';
import { ObjectById, Reaction, UserContentReactionExt } from '../typings';
import AddReaction from './AddReactions';
import { Flex } from './Layout';
import ReactionSummary from './ReactionSummary';
import ShortSummary from './ShortSummary';

const PostActionsContainer = styled(Flex)`
    position: relative;
`;

const prepareDataAndTab = (
    groupedByReaction: ObjectById<UserContentReactionExt[]>,
    reactionsById: ObjectById<Reaction>,
) => {
    const reactionCount = Object.keys(groupedByReaction).map((reactionId: string) => {
        const { emoji } = reactionsById[reactionId];
        return {
            reactionId,
            emoji,
            count: groupedByReaction[reactionId].length,
        };
    });
    return reactionCount;
};

type PostActionsProps = {
    reactionsById: ObjectById<Reaction>;
    userContentReactionsExt: UserContentReactionExt[];
    groupedByReaction: ObjectById<UserContentReactionExt[]>;
    userReactionId: number;
    onReaction(reactionId: number): void;
};

const PostActions: VFC<PostActionsProps> = ({
    reactionsById,
    userContentReactionsExt,
    groupedByReaction,
    userReactionId,
    onReaction,
}) => {
    const [showSummary, toggleSummary] = useState('');

    useEffect(() => {
        if (userContentReactionsExt.length === 0) {
            toggleSummary('');
        }
    }, [userContentReactionsExt]);

    const reactionCount = useMemo(() => {
        return prepareDataAndTab(groupedByReaction, reactionsById);
    }, [reactionsById, groupedByReaction]);

    return (
        <PostActionsContainer>
            <ShortSummary
                userReactionId={userReactionId}
                reactionCount={reactionCount}
                onShortSummaryClick={(reactionId: string) =>
                    toggleSummary(showSummary ? '' : reactionId)
                }
            />
            <AddReaction onReaction={onReaction} />
            {showSummary && (
                <ReactionSummary
                    initialActiveTab={showSummary}
                    groupedByReaction={groupedByReaction}
                    reactionCount={reactionCount}
                    userContentReactionsExts={userContentReactionsExt}
                />
            )}
        </PostActionsContainer>
    );
};

export default PostActions;
