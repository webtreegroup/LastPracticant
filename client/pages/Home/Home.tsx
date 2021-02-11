import React from 'react';
import { PageComponentProps } from 'client/shared/types';

import './Home.css';
import { Loader, Paper } from 'client/shared/components';
import { Button, Grid } from '@material-ui/core';
import { Navigation } from 'client/core';
import { connect, ConnectedProps } from 'react-redux';
import { showLoaderAction, hideLoaderAction, StoreProps } from 'client/core/store';

const mapStateToProps = (store: StoreProps) => ({
    loader: store.loader,
});

const mapDispatchToProps = {
    showLoaderAction,
    hideLoaderAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const HomeComponent: React.FC<PageComponentProps & PropsFromRedux> = React.memo(({
    loader,
    showLoaderAction: showLoader,
    hideLoaderAction: hideLoader,

}) => {
    /** TODO: просто для примера, потом убрать */
    const handleShowLoader = () => {
        showLoader();

        setTimeout(hideLoader, 2000);
    };

    return (
        <Grid className="home" container justify="center" alignItems="center">
            <Paper sizes="small">
                <Navigation />
                <Loader isVisible={loader} />
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

export const Home = connector(HomeComponent);
