import { ObjectById, Reaction, User } from '../../typings';

export type MasterDataState = {
    isFetching: boolean;
    loaded: boolean;
    users: User[];
    reactions: Reaction[];
    usersById: ObjectById<User>;
    reactionsById: ObjectById<Reaction>;
    error: { code: number; message: string };
};

export type Context = {
    state: MasterDataState;
};
