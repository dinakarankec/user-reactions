import { VFC } from 'react';
import styled from 'styled-components';
import { Flex } from './Layout';

const ReactionCount = styled(Flex)`
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
`;

type EmojiAndCountProps = {
    count: number;
    emoji: string;
};

const EmojiAndCount: VFC<EmojiAndCountProps> = ({ count, emoji }) => {
    return (
        <ReactionCount alignItems="center">
            <span className="emoji">{emoji}</span>
            <Flex alignItems="center" className="count">
                {count}
            </Flex>
        </ReactionCount>
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

const ShortSummary: VFC = () => {
    return (
        <>
            <ShortSummaryContainer className="active" p={[5, 8]} m={[0, 6, 0, 0]} bg="#F4F4F4">
                <EmojiAndCount emoji="❤️" count={13} />
            </ShortSummaryContainer>
            <ShortSummaryContainer p={[5, 8]} m={[0, 6, 0, 0]} bg="#F4F4F4">
                <EmojiAndCount emoji="👏" count={123} />
            </ShortSummaryContainer>
            <ShortSummaryContainer p={[5, 8]} m={[0, 6, 0, 0]} bg="#F4F4F4">
                <EmojiAndCount emoji="👍" count={7} />
            </ShortSummaryContainer>
        </>
    );
};

export default ShortSummary;
