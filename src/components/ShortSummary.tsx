import { VFC } from 'react';
import styled from 'styled-components';
import { ReactionCount } from '../typings';
import { Flex } from './Layout';

const Container = styled(Flex)`
    .emoji {
        font-size: 12px;
    }

    .count {
        font-size: 12px;
        font-weight: 400;
        color: #525252;

        &:before {
            content: ' ';
            margin: 0px 7px 0px 5px;
            width: 2px;
            height: 2px;
            background-color: #525252;
            display: inline-block;
        }
    }

    &.large {
        .emoji,
        .count {
            font-size: 14px;
        }
    }
`;

type EmojiAndCountProps = {
    count: number;
    emoji: string;
    variant?: 'large';
};

export const EmojiAndCount: VFC<EmojiAndCountProps> = ({ count, emoji, variant = '' }) => {
    return (
        <Container alignItems="center" className={variant}>
            <span className="emoji">{emoji}</span>
            <Flex alignItems="center" className="count">
                {count}
            </Flex>
        </Container>
    );
};

const ShortSummaryContainer = styled(Flex)`
    border-radius: 24px;
    border: 1px solid #ffffff;

    &.active {
        background: #edf5ff;
        border: 1px solid #0f62fe;
    }
`;

type ShortSummaryProps = {
    onShortSummaryClick(reactionId: string): void;
    reactionCount: ReactionCount[];
};

const ShortSummary: VFC<ShortSummaryProps> = ({ onShortSummaryClick, reactionCount }) => {
    return (
        <>
            {reactionCount.map(({ count, emoji, reactionId }) => (
                <ShortSummaryContainer key={reactionId} p={[5, 8]} m={[0, 6, 0, 0]} bg="#F4F4F4">
                    {/* Adding button to support the basic accessibility */}
                    <button onClick={() => onShortSummaryClick(reactionId)}>
                        <EmojiAndCount emoji={emoji} count={count} />
                    </button>
                </ShortSummaryContainer>
            ))}
        </>
    );
};

export default ShortSummary;
