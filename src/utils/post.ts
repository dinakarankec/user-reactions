import {
    ObjectById,
    Reaction,
    User,
    UserContentReaction,
    UserContentReactionExt,
} from '../typings';
import { getRandomID } from './common';

export const constructUserContentReactionExt = (
    userContentReactions: UserContentReaction[],
    reactionsById: ObjectById<Reaction>,
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

type AddReactionParams = {
    userContentReactionsExt: UserContentReactionExt[];
    userId: number;
    reactionId: number;
    contentId: number;
    reactionsById: ObjectById<Reaction>;
    usersById: ObjectById<User>;
};

const updateOrCreateReaction = ({
    userContentReactionsExt,
    userId,
    reactionId,
    contentId,
    reactionsById,
    usersById,
}: AddReactionParams) => {
    const existingUser = userContentReactionsExt.find(
        (usrCntRction) => usrCntRction.userId === userId,
    );
    if (existingUser) {
        return userContentReactionsExt.map((usrCntRction) =>
            usrCntRction.userId === userId
                ? {
                      ...usrCntRction,
                      reactionId,
                      reaction: reactionsById[reactionId],
                  }
                : usrCntRction,
        );
    }

    const userContentReactionExt = {
        id: getRandomID(),
        userId,
        contentId,
        reactionId,
        user: usersById[userId],
        reaction: reactionsById[reactionId],
    };
    return [...userContentReactionsExt, userContentReactionExt];
};

export const addReaction = ({
    userContentReactionsExt,
    userId,
    reactionId,
    contentId,
    reactionsById,
    usersById,
}: AddReactionParams) => {
    const nextUserReactions =
        reactionId === 0
            ? userContentReactionsExt.filter((usrCntRction) => usrCntRction.userId !== userId)
            : updateOrCreateReaction({
                  userContentReactionsExt,
                  userId,
                  reactionId,
                  contentId,
                  reactionsById,
                  usersById,
              });
    return nextUserReactions;
};

export const findCurrentUserEmoji = (
    userContentReactionsExt: UserContentReactionExt[],
    userId: number,
) => {
    const userReaction = userContentReactionsExt.find((usrCntExt) => usrCntExt.userId === userId);
    return userReaction ? userReaction.reactionId : 0;
};
