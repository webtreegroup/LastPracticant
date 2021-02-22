import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { PageLayout } from 'client/core';
import { NivelatorXY, Paper } from 'client/shared/components';
import { Button } from '@material-ui/core';
import { ROUTES } from 'client/routing';
import { useHistory } from 'react-router-dom';
import bem from 'bem-cn';

const block = bem('game-start');

export const GameStart: React.FC<PageComponentProps> = React.memo(() => {
    const history = useHistory();

    const handleGameStart = () => {
        history.push(ROUTES.GAME.path);
    };

    return (
        <PageLayout className={block()}>
            <Paper>
                <NivelatorXY>
                    <div>
                        <div className={block('help')}>
                            <h3>Управление</h3>

                            <div className={block('control')}>
                                <p>Прыгнуть - стрелка вверх</p>
                                <p>Присесть - стрелка вниз</p>
                                <p>Выстрел - пробел</p>
                            </div>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleGameStart}
                                className={block('toggle')}
                            >
                                Начать игру
                            </Button>
                        </div>
                    </div>
                </NivelatorXY>
            </Paper>
        </PageLayout>
    );
});