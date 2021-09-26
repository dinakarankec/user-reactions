import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { ReactionCount, UserContentReactionExt } from '../typings';
import { Flex } from './Layout';
import { EmojiAndCount } from './ShortSummary';

const ReactionItemContainer = styled(Flex)`
    .avatar-container {
        margin-right: 14px;
    }

    .avatar {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-right: 14px;
    }

    .emoji {
        margin-right: 8px;
        font-size: 14px;
    }

    .username {
        font-size: 14px;
    }
`;

type ReactionInfoItemProps = {
    url: string;
    emoji: string;
    username: string;
};

const ReactionInfoItem: VFC<ReactionInfoItemProps> = ({ url, emoji, username }) => {
    return (
        <ReactionItemContainer p={[6, 14]} alignItems="center">
            <img src={url} className="avatar" alt="User avatar" />
            <span className="emoji">{emoji}</span>
            <span className="username">{username}</span>
        </ReactionItemContainer>
    );
};

const Container = styled(Flex)`
    position: absolute;
    left: -20px;
    bottom: -150px;
    transform: translateX(-100%);
    min-width: 250px;

    .title {
        font-weight: 600;
        color: #161616;
        font-size: 14px;
    }

    .tabs {
        button {
            flex: 1;
            border-bottom: 2px solid #e0e0e0;
            padding: 0px 16px 9px 16px;
            text-align: left;
            margin-right: 2px;

            &.active {
                border-color: #0f62fe;
            }

            &:last-child {
                margin-right: 0px;
            }

            &.all {
                font-weight: 600;
                color: #161616;
                font-size: 14px;
            }
        }
    }

    .reactions {
        overflow-y: auto;
    }
`;

type ReactionSummaryProps = {
    userContentReactionsExts: UserContentReactionExt[];
    reactionCount: ReactionCount[];
    groupedByReaction: { [key: string]: UserContentReactionExt[] };
    initialActiveTab: string;
};

const ReactionSummary: React.VFC<ReactionSummaryProps> = ({
    userContentReactionsExts,
    reactionCount,
    groupedByReaction,
    initialActiveTab,
}) => {
    const [activeTab, setActiveTab] = useState(initialActiveTab);

    useEffect(() => {
        const keys = Object.keys(groupedByReaction);
        if (!(activeTab in groupedByReaction) && keys.length > 0 && activeTab !== 'all') {
            setActiveTab(keys[0]);
        }
    }, [groupedByReaction, activeTab]);

    const contentReactions =
        activeTab === 'all' ? userContentReactionsExts : groupedByReaction[activeTab] || [];

    return (
        <Container direction="column" height="300px" bg="#ffffff">
            <Flex m={[0, 0, 16, 0]} direction="column">
                <Flex p={[16]} className="title">
                    Reactions
                </Flex>
                <Flex className="tabs" justify="stretch" width="100%">
                    {reactionCount.length > 1 && (
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`all ${activeTab === 'all' ? 'active' : ''}`}
                        >
                            All
                        </button>
                    )}
                    {reactionCount.map(({ reactionId, emoji, count }) => (
                        <button
                            key={reactionId}
                            className={reactionId === activeTab ? 'active' : ''}
                            onClick={() => setActiveTab(reactionId)}
                        >
                            <EmojiAndCount variant="large" emoji={emoji} count={count} />
                        </button>
                    ))}
                </Flex>
            </Flex>
            <Flex direction="column" height="calc(100% - 100px)" className="reactions">
                {contentReactions.map(({ id, user, reaction }: UserContentReactionExt) => {
                    console.log('user, reaction, id', user, reaction, id);
                    return (
                        <ReactionInfoItem
                            key={id}
                            url={user.avatar}
                            username={`${user.firstName} ${user.lastName}`}
                            emoji={reaction.emoji}
                        />
                    );
                })}
            </Flex>
        </Container>
    );
};

export default ReactionSummary;
