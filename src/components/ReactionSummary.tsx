import { useState, VFC } from 'react';
import styled from 'styled-components';
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
    left: -420px;
    bottom: -150px;

    .title {
        font-weight: 600;
        color: #161616;
        font-size: 14px;
    }

    .tabs {
        button {
            flex: 1;
            border-bottom: 2px solid #e0e0e0;
            padding: 0px 0px 9px 16px;
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

const ReactionSummary = () => {
    const [activeTab, setActiveTab] = useState('all');
    return (
        <Container direction="column" width="400px" height="300px" bg="#ffffff">
            <Flex m={[0, 0, 16, 0]} direction="column">
                <Flex p={[16]} className="title">
                    Reactions
                </Flex>
                <Flex className="tabs" justify="stretch" width="100%">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`all ${activeTab === 'all' ? 'active' : ''}`}
                    >
                        All
                    </button>
                    <button
                        className={activeTab === '❤️' ? 'active' : ''}
                        onClick={() => setActiveTab('❤️')}
                    >
                        <EmojiAndCount variant="large" emoji="❤️" count={13} />
                    </button>
                    <button
                        className={activeTab === '👏' ? 'active' : ''}
                        onClick={() => setActiveTab('👏')}
                    >
                        <EmojiAndCount variant="large" emoji="👏" count={123} />
                    </button>
                    <button
                        className={activeTab === '👍' ? 'active' : ''}
                        onClick={() => setActiveTab('👍')}
                    >
                        <EmojiAndCount variant="large" emoji="👍" count={7} />
                    </button>
                </Flex>
            </Flex>
            <Flex direction="column" height="calc(100% - 100px)" className="reactions">
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="👏"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="❤️"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="👍"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="👏"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="❤️"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="👍"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="👏"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="❤️"
                />
                <ReactionInfoItem
                    url="https://i.pravatar.cc/20"
                    username="Aeslie Alexander"
                    emoji="👍"
                />
            </Flex>
        </Container>
    );
};

export default ReactionSummary;
