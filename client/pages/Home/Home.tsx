import React from 'react';
import { PageComponentProps } from 'client/shared/types';

import './Home.css';
import { Loader, Paper } from 'client/shared/components';
import { Button, Grid } from '@material-ui/core';
import { Navigation } from 'client/core';
import {
    useDispatch, useSelector,
} from 'react-redux';
import { showLoaderAction, hideLoaderAction, StoreProps } from 'client/core/store';

export const Home: React.FC<PageComponentProps> = React.memo(() => {
    const loader = useSelector((store: StoreProps) => ({
        isVisible: store.loader,
    }));

    const dispatch = useDispatch();

    /** TODO: просто для примера, потом убрать */
    const handleShowLoader = () => {
        dispatch(showLoaderAction());

        setTimeout(() => {
            dispatch(hideLoaderAction());
        }, 2000);
    };

    return (
        <Grid className="home" container justify="center" alignItems="center">
            <Paper sizes="small">
                <Navigation />
                <Loader isVisible={loader.isVisible} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleShowLoader}
                    className="game-start__toggle"
                >
                    Показать лоадер
                </Button>
            </Paper>
        </Grid>
    );
});
