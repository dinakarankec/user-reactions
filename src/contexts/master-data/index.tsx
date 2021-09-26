import { createContext, ReactChild, useContext, useEffect, useState, VFC } from 'react';
import { Reaction, User } from '../../typings';
import { constructObjectsByIds } from '../../utils/common';
import { Context, MasterDataState } from './type';
import humps from 'humps';

const initialState: MasterDataState = {
    isFetching: false,
    loaded: false,
    reactions: [],
    users: [],
    reactionsById: {},
    usersById: {},
    error: { code: 0, message: '' },
};

const MasterDataContext = createContext<Context>({
    state: initialState,
});

const fetchUsers = (): Promise<User[]> => {
    return fetch(`${process.env.REACT_APP_API_HOST}/users`)
        .then((response) => response.json())
        .then((resp) => humps.camelizeKeys(resp) as User[])
        .catch((err) => Promise.reject({ code: err.status, message: err.message }));
};

const fetchReactions = (): Promise<Reaction[]> => {
    return fetch(`${process.env.REACT_APP_API_HOST}/reactions`)
        .then((response) => response.json())
        .then((resp) => humps.camelizeKeys(resp) as Reaction[])
        .catch((err) => Promise.reject({ code: err.status, message: err.message }));
};

const fetchMasterData = () => {
    return Promise.all([fetchReactions(), fetchUsers()])
        .then(([reactions, users]) => {
            const reactionsById = constructObjectsByIds<Reaction>(reactions);
            const usersById = constructObjectsByIds<User>(users);
            return {
                users,
                reactions,
                reactionsById,
                usersById,
            };
        })
        .catch((err) => Promise.reject(err));
};

type MasterDataProviderProps = {
    children: ReactChild;
};

const MasterDataProvider: VFC<MasterDataProviderProps> = ({ children }) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState((prev) => ({ ...prev, isFetching: true }));
        fetchMasterData()
            .then((resp) =>
                setState((prev) => ({ ...prev, ...resp, loaded: true, isFetching: false })),
            )
            .catch((err) => setState({ ...initialState, loaded: true, error: err }));
    }, []);

    return <MasterDataContext.Provider value={{ state }}>{children}</MasterDataContext.Provider>;
};

export default MasterDataProvider;

export const useMasterData = () => {
    const { state } = useContext(MasterDataContext);
    return {
        ...state,
    };
};
