import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    setTopicsAction,
    StoreProps,
} from 'client/core/store';
import { users } from 'server/controllers/controllers.mixins';
import { postgres } from '../../models';

export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
    dispatch,
) => {
    await postgres.topics.table.findAll({
        attributes: { exclude: ['description'] },
        order: [
            ['updatedAt', 'ASC'],
        ],
        include: [users],
    }).then((topics) => {
        console.log('============', topics, '================');
        dispatch(
            setTopicsAction({ topics }),
        );
    }).catch(console.error);
};
