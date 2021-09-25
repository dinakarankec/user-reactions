export interface Base {
    id: number;
}

export type Reaction = {
    id: number;
    name: string;
    emoji: string;
};

export type UserContentReaction = {
    id: number;
    userId: number;
    reactionId: number;
    contentId: number;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
};

export type UserContentReactionExt = UserContentReaction & {
    user: User;
    reaction: Reaction;
};

type ReactionCount = {
    reactionId: string;
    emoji: string;
    count: number;
};
