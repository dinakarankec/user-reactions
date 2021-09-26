import { useState } from 'react';
import styled from 'styled-components';
import { useMasterData } from '../contexts/master-data';
import { Reaction } from '../typings';
import { Flex } from './Layout';

const ReactionsEmojisContainer = styled(Flex)`
    border: 1px solid #e0e0e0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
    border-radius: 24px;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);

    .emoji-container {
        position: relative;
        margin-right: 10px;

        &:last-child {
            margin: 0px;
        }

        &:hover {
            button {
                transform: scale(3);
                transform-origin: 33% 88%;
            }
        }
    }

    button {
        padding: 0;
        transition: 0.1s ease-in;

        .emoji {
            font-size: 14px;
            font-weight: 700;
        }

        &:focus-visible {
            transform: scale(3);
            transform-origin: 33% 88%;
            outline: none;
        }
    }

    .title-pos {
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
    }

    .title {
        background-color: #161616;
        color: #ffffff;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 12px;
    }
`;

type ReactionEmojiProps = { emoji: string; title: string; onReact(): void };

const ReactionEmoji = ({ emoji, title, onReact }: ReactionEmojiProps) => {
    const [showTitle, toggleTitle] = useState(false);
    return (
        <div
            className="emoji-container"
            onMouseEnter={() => toggleTitle(true)}
            onMouseLeave={() => toggleTitle(false)}
        >
            {showTitle && (
                <span className="title-pos">
                    <span className="title">{title}</span>
                </span>
            )}
            <button
                onClick={() => onReact()}
                // Which enables when tooltip when we operate with keyboard
                onFocus={() => toggleTitle(true)}
                onBlur={() => toggleTitle(false)}
            >
                <span className="emoji">{emoji}</span>
            </button>
        </div>
    );
};

type ReactionsEmojisProps = {
    onReact(emoji: string): void;
};

const ReactionsEmojis = ({ onReact }: ReactionsEmojisProps) => {
    const { reactions } = useMasterData();
    return (
        <ReactionsEmojisContainer bg="white" p={[6, 21]} justify="space-between">
            {reactions.map(({ emoji, id, name }: Reaction) => (
                <ReactionEmoji key={id} onReact={() => onReact(emoji)} emoji={emoji} title={name} />
            ))}
        </ReactionsEmojisContainer>
    );
};

const Container = styled.div`
    position: relative;
    .emojis {
        width: 32px;
        height: 32px;
        background: #edeef0;
        border: 1px solid #ffffff;
        border-radius: 50%;

        .icon-add-emoji {
            font-size: 15px;
        }
    }
`;

type AddReactionProps = {
    onReaction(emoji: string): void;
};

const AddReaction = () => {
    const [showEmojis, toggleEmojis] = useState(false);

    return (
        <Container>
            <button className="emojis" onClick={() => toggleEmojis(!showEmojis)}>
                <Flex alignItems="center" justify="center">
                    <i className="icon-add-emoji" />
                </Flex>
            </button>
            {showEmojis && (
                <ReactionsEmojis
                    onReact={(emoji: string) => {
                        toggleEmojis(false);
                    }}
                />
            )}
        </Container>
    );
};

export default AddReaction;
