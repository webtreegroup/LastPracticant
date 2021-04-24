import { StoreProps } from 'client/core/store';
import { matchPath } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getTopicsThunk } from './actions/forum.actions';

interface StoreMapProps {
    path: string
    fetchFn: Function
}

const storeMap: StoreMapProps[] = [
    {
        path: '/forum',
        fetchFn: getTopicsThunk,
    },
];

export const prepareStoreForClient = async (
    dispatch: ThunkDispatch<StoreProps, void, AnyAction>,
    url: string,
) => {
    const currentRoute = storeMap.find((el) => {
        const match = matchPath(url, {
            path: el.path,
            exact: true,
            strict: true,
        });

        return Boolean(match);
    });

    if (currentRoute) {
        await dispatch(currentRoute.fetchFn());
    }
};
