import { useCallback, useEffect, useState } from 'react';
import { useMasterData } from '../contexts/master-data';
import { ObjectById, UserContentReaction, UserContentReactionExt } from '../typings';
import PostActions from './PostActions';
import humps from 'humps';
import { groupBy } from 'lodash';
import {
    constructUserContentReactionExt,
    addReaction,
    findCurrentUserEmoji,
} from './../utils/post';
import { getURLParams } from '../utils/common';
import { Flex } from './Layout';
import styled from 'styled-components';

const PostCard = styled(Flex)`
    img.profile {
        width: 32px;
        height: 32px;
        margin-right: 16px;
    }

    .profile-name {
        font-weight: 600;
        color: #161616;
    }

    .posted-time {
        margin-left: 8px;
        color: #6f6f6f;
        font-size: 12px;
    }

    .post-image {
        width: 500px;
        height: 300px;
    }
`;

/**
 * We have added more state variable to store the cache the few results
 * This would avoid the unnecessary loops during the render
 */
type PostState = {
    isFetching: boolean;
    userReactionId: number;
    userContentReactionsExt: UserContentReactionExt[];
    groupedByReaction: ObjectById<UserContentReactionExt[]>;
    error: { code: number; message: string };
};

const initialState = {
    isFetching: false,
    userReactionId: 0,
    userContentReactionsExt: [],
    groupedByReaction: {},
    error: { code: 0, message: '' },
};

const fetchContent = (contentId: number): Promise<UserContentReaction[]> => {
    return fetch(`${process.env.REACT_APP_API_HOST}/user_content_reactions?content_id=${contentId}`)
        .then((response) => response.json())
        .then((resp) => humps.camelizeKeys(resp) as UserContentReaction[])
        .catch((err) => Promise.reject({ code: err.status, message: err.message }));
};

const Post = () => {
    const [{ userReactionId, userContentReactionsExt, groupedByReaction, ...state }, setState] =
        useState<PostState>(initialState);

    const { isFetching, loaded, reactionsById, usersById, error } = useMasterData();

    const userId = getURLParams('user_id');
    const contentId = getURLParams('content_id');

    useEffect(() => {
        if (loaded) {
            /**
             * Fetch post content by id
             */
            setState((prev) => ({ ...prev, isFetching: true }));
            fetchContent(contentId).then((userContentReactions: UserContentReaction[]) => {
                const userContentReactionsExt = constructUserContentReactionExt(
                    userContentReactions,
                    reactionsById,
                    usersById,
                );
                setState({
                    ...initialState,
                    userReactionId: findCurrentUserEmoji(userContentReactionsExt, userId),
                    isFetching: false,
                    userContentReactionsExt,
                    groupedByReaction: groupBy(userContentReactionsExt, 'reactionId'),
                });
            });
        }
    }, [loaded, reactionsById, usersById, userId, contentId]);

    const handleReaction = useCallback(
        (reactionId: number) => {
            setState((prev) => {
                const userReactionId = prev.userReactionId === reactionId ? 0 : reactionId;

                const userId = getURLParams('user_id');
                const contentId = getURLParams('content_id');

                const nextUserReactions = addReaction({
                    userContentReactionsExt: prev.userContentReactionsExt,
                    userId,
                    reactionId: userReactionId,
                    contentId,
                    reactionsById,
                    usersById,
                });
                return {
                    ...prev,
                    userReactionId,
                    userContentReactionsExt: nextUserReactions,
                    groupedByReaction: groupBy(nextUserReactions, 'reactionId'),
                };
            });
        },
        [reactionsById, usersById],
    );

    if (isFetching || !loaded) {
        return <div>Loading master data...</div>;
    }

    if (state.isFetching) {
        return <div>Loading post data...</div>;
    }

    if (state.error.message || error.message) {
        return <div>Error in loading posts</div>;
    }

    return (
        <PostCard>
            <img className="profile" src="https://i.pravatar.cc/32" alt="Profile" />
            <Flex direction="column">
                <Flex alignItems="baseline">
                    <span className="profile-name">Truman Disbury</span>
                    <span className="posted-time">4:04 PM</span>
                </Flex>
                <Flex m={[16, 0, 16, 0]}>
                    <img className="post-image" src="https://picsum.photos/500/300" alt="Post" />
                </Flex>
                <PostActions
                    onReaction={handleReaction}
                    userReactionId={userReactionId}
                    groupedByReaction={groupedByReaction}
                    userContentReactionsExt={userContentReactionsExt}
                    reactionsById={reactionsById}
                />
            </Flex>
        </PostCard>
    );
};

export default Post;
