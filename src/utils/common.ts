import { Base } from '../typings';

export const constructObjectsByIds = <T extends Base>(list: T[]): { [key: string]: T } => {
    return list.reduce((acc: { [key: string]: T }, current: T) => {
        return {
            ...acc,
            [current.id]: current,
        };
    }, {});
};

const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const getRandomID = () => getRandomIntInclusive(300, 1000);

const getDefaultParams = (paramName: string) => {
    if (paramName === 'content_id') {
        return 1;
    } else if (paramName === 'user_id') {
        return 21;
    }
    return 0;
};

export const getURLParams = (paramName: string): number => {
    const [, queryString] = window.location.href.split('?');
    if (queryString) {
        const searchParams = new URLSearchParams(queryString);
        const param = searchParams.get(paramName) || getDefaultParams(paramName);
        return Number(param);
    }
    return getDefaultParams(paramName);
};
