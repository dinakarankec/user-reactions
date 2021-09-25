import styled from 'styled-components';

type Space =
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];

type BoxProps = {
    p?: Space; // padding
    m?: Space; //margin
    width?: string;
    height?: string;
    bg?: string;
};

export const Box = styled.div<BoxProps>`
    ${({ m }: BoxProps) =>
        m &&
        `
        margin: ${m.map((mar: number) => `${mar}px`).join(' ')};
    `}

    ${({ p }: BoxProps) =>
        p &&
        `
        padding: ${p.map((pad: number) => `${pad}px`).join(' ')};
    `}

    ${({ height }: BoxProps) =>
        height &&
        `
            height: ${height};
    `}

    ${({ width }: BoxProps) =>
        width &&
        `
            width: ${width};
        `}
    ${({ bg }: BoxProps) =>
        bg &&
        `
        background-color: ${bg};
    `}
`;

type AlignItems =
    | 'baseline'
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'left'
    | 'right'
    | 'safe'
    | 'self-end'
    | 'self-start'
    | 'start'
    | 'stretch';

type JustifyContent =
    | 'baseline'
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'left'
    | 'right'
    | 'safe'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'start'
    | 'stretch';

type FlexProps = {
    alignItems?: AlignItems;
    justify?: JustifyContent;
    direction?: 'row' | 'column';
};

export const Flex = styled(Box)<FlexProps & BoxProps>`
    display: flex;
    ${({ alignItems }: FlexProps) =>
        alignItems &&
        `
        align-items: ${alignItems};
    `}
    ${({ justify }: FlexProps) =>
        justify &&
        `
        justify-content: ${justify};
    `}
    ${({ direction }: FlexProps) =>
        direction &&
        `
        flex-direction: ${direction};
    `}
`;
