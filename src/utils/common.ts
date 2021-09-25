import { Base } from '../typings';

export const constructObjectsByIds = <T extends Base>(list: T[]): { [key: string]: T } => {
    return list.reduce((acc: { [key: string]: T }, current: T) => {
        return {
            ...acc,
            [current.id]: current,
        };
    }, {});
};
