import './App.css';
import './shared/styles/theme.css';

import React, { useCallback, useEffect, useMemo } from 'react';
import { Routing } from 'client/routing/Routing';
import {
    Button, createMuiTheme, CssBaseline, ThemeProvider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import interfaceSound from 'client/core/components/GameCanvas/audio/interface-background-sound.mp3';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import bem from 'bem-cn';
import { Loader, SnackBar, NivelatorXY } from './shared/components';
import { loaderSelector, settingsSelector, snackbarSelector } from './core/store/selectors';
import { DARK_THEME, LIGHT_THEME } from './core/colors';
import { GameMusicTheme } from './pages/Game/Game.config';
import { useElementVisible } from './core/hooks';

const block = bem('app');

export const App: React.FC = () => {
    const loader = useSelector(loaderSelector);
    const snackBar = useSelector(snackbarSelector);
    const userSettings = useSelector(settingsSelector);
    const {
        elementVisible,
        handleChangeElementVisible,
    } = useElementVisible();

    const themeSettings = useMemo(() => createMuiTheme({
        palette: userSettings.isColorThemeLight ? LIGHT_THEME : DARK_THEME,
    }), [userSettings]);

    const handleUnmuteMusic = useCallback(() => {
        GameMusicTheme?.unmute();

        handleChangeElementVisible();
    }, []);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');

        jssStyles?.parentElement?.removeChild(jssStyles);
    }, []);

    useEffect(() => {
        if (!userSettings.isMusicEnabled) return;

        const soundPromise = GameMusicTheme?.change(interfaceSound);

        if (soundPromise) {
            soundPromise.catch(() => {
                handleChangeElementVisible();
            });
        }
    }, [userSettings]);

    return (
        <ThemeProvider theme={themeSettings}>
            <CssBaseline />
            <NivelatorXY>
                <Routing />
                <Loader isVisible={loader.isVisible} />
                <SnackBar open={snackBar.isVisible} {...snackBar} />

                {elementVisible && (
                    <div className={block('unmute-music')}>
                        <Button onClick={handleUnmuteMusic}>
                            <VolumeOffIcon />
                        </Button>
                    </div>
                )}
            </NivelatorXY>
        </ThemeProvider>
    );
};
