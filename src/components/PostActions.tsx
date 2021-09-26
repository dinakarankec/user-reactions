import groupBy from 'lodash.groupby';
import { useMemo, useState, VFC } from 'react';
import styled from 'styled-components';
import {
    ObjectById,
    Reaction,
    User,
    UserContentReaction,
    UserContentReactionExt,
} from '../typings';
import AddReaction from './AddReactions';
import { Flex } from './Layout';
import ReactionSummary from './ReactionSummary';
import ShortSummary from './ShortSummary';
import { userContentReactions } from '../__mock__/mock';

const PostActionsContainer = styled(Flex)`
    position: relative;
`;

const constructUserContentReaction = (
    reactionsById: ObjectById<Reaction>,
    userContentReactions: UserContentReaction[],
    usersbyId: ObjectById<User>,
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
    reactionsById: ObjectById<Reaction>,
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

type PostActionsProps = {
    reactionsById: ObjectById<Reaction>;
    usersById: ObjectById<User>;
};

const PostActions: VFC<PostActionsProps> = ({ reactionsById, usersById }) => {
    const [showSummary, toggleSummary] = useState('');

    const { groupedByReaction, reactionCount, userContentReactionsExt } = useMemo(() => {
        const userContentReactionsExt = constructUserContentReaction(
            reactionsById,
            userContentReactions,
            usersById,
        );
        return prepareDataAndTab(userContentReactionsExt, reactionsById);
    }, [reactionsById, usersById]);

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
