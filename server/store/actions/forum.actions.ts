import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    setTopicsAction,
    StoreProps,
} from 'client/core/store';
import { fetchTopics } from 'server/controllers/controllers.utils';

export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
    dispatch,
) => {
    await fetchTopics().then((response) => {
        const topics = response.map((el) => el.get({ plain: true }));

        dispatch(
            setTopicsAction({ topics }),
        );
    }).catch(console.error);
};
