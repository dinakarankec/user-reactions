import groupBy from 'lodash.groupby';
import { useMemo, useState, VFC } from 'react';
import styled from 'styled-components';
import { Reaction, User, UserContentReaction, UserContentReactionExt } from '../typings';
import { constructObjectsByIds } from '../utils/common';
import AddReaction from './AddReactions';
import { Flex } from './Layout';
import ReactionSummary from './ReactionSummary';
import ShortSummary from './ShortSummary';
import { reactions, userContentReactions, users } from '../__mock__/mock';

const PostActionsContainer = styled(Flex)`
    position: relative;
`;

const constructUserContentReaction = (
    reactionsById: { [key: string]: Reaction },
    userContentReactions: UserContentReaction[],
    usersbyId: { [key: string]: User },
) => {
    return userContentReactions.map(
        (userContentReaction): UserContentReactionExt => ({
            ...userContentReaction,
            user: usersbyId[userContentReaction.userId],
            reaction: reactionsById[userContentReaction.reactionId],
        }),
    );
};

const prepareDataAndTab = (
    userContentReactionsExt: UserContentReactionExt[],
    reactionsById: { [key: string]: Reaction },
) => {
    const groupedByReaction = groupBy(userContentReactionsExt, 'reactionId');
    const reactionCount = Object.keys(groupedByReaction).map((reactionId: string) => {
        const { emoji } = reactionsById[reactionId];
        return {
            reactionId,
            emoji,
            count: groupedByReaction[reactionId].length,
        };
    });
    return {
        reactionCount,
        groupedByReaction,
        userContentReactionsExt,
    };
};

const PostActions: VFC = () => {
    const [showSummary, toggleSummary] = useState('');

    const { groupedByReaction, reactionCount, userContentReactionsExt } = useMemo(() => {
        const reactionsById = constructObjectsByIds(reactions);
        const usersbyId = constructObjectsByIds(users);
        const userContentReactionsExt = constructUserContentReaction(
            reactionsById,
            userContentReactions,
            usersbyId,
        );
        return prepareDataAndTab(userContentReactionsExt, reactionsById);
    }, []);

    return (
        <PostActionsContainer>
            <ShortSummary
                reactionCount={reactionCount}
                onShortSummaryClick={(reactionId: string) =>
                    toggleSummary(showSummary ? '' : reactionId)
                }
            />
            <AddReaction />
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
