import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import './Home.css';
import { ButtonsToolbar, Paper } from 'client/shared/components';
import { Button, Grid } from '@material-ui/core';
import {
    useDispatch,
} from 'react-redux';
import { hideLoaderAction, showLoaderAction } from 'client/core/store/actions/loader.actions';
import bem from 'bem-cn';
import { RECORD, EXIT } from 'client/shared/consts';
import { ROUTES } from 'client/routing';
import { Link } from 'react-router-dom';


const block = bem('home');

export const Home: React.FC<PageComponentProps> = React.memo(() => {
    const dispatch = useDispatch();

    /** TODO: просто для примера, потом убрать */
    const handleShowLoader = () => {
        dispatch(showLoaderAction());

        setTimeout(() => {
            dispatch(hideLoaderAction());
        }, 2000);
    };

    return (
        <Grid className={block()} container justify='center' alignItems='center'>
            <Paper className='home__paper' sizes='small'>
                <div className='home__userdata'>
                    <div className='home__avatar_small' />
                    <p className='home__username'>username</p>
                    <p className='home__user-result'>{RECORD}: result</p>
                </div>
                <div className='divider' />
                <ul className='home__navigation-items'>
                    <li><Link to={ROUTES.GAME_START.path}>{ROUTES.GAME_START.title}</Link></li>
                    <li><Link to={ROUTES.PROFILE.path}>{ROUTES.PROFILE.title}</Link></li>
                    <li><Link to={ROUTES.LEADERBOARD.path}>{ROUTES.LEADERBOARD.title}</Link></li>
                    <li><Link to={ROUTES.FORUM.path}>{ROUTES.FORUM.title}</Link></li>
                </ul>
                <ButtonsToolbar justify="center">
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        {EXIT}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleShowLoader}
                    >
                        Показать лоадер
                </Button>
                </ButtonsToolbar>
            </Paper>
        </Grid>
    )
});
