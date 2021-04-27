import React, { useCallback, useState } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { Meta, PageLayout } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';
import { FormControlLabel, Switch } from '@material-ui/core';
import { LOCAL } from 'client/shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
    profileSelector, settingsSelector, setUserSettingsAction, updateUserSettingsThunk,
} from 'client/core/store';
import { ColorThemes } from './Settings.config';
import { GameMusicTheme } from '../Game/Game.config';

const SettingsComponent: React.FC<PageComponentProps> = ({ title }) => {
    const dispatch = useDispatch();
    const userSettings = useSelector(settingsSelector);
    const profile = useSelector(profileSelector);
    const [isMusicEnabled, setMusicEnable] = useState(false);

    const handleChangeColorTheme = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const settings = {
            colorTheme: event.target.checked ? ColorThemes.Dark : ColorThemes.Light,
        };

        dispatch(setUserSettingsAction(settings));
        dispatch(updateUserSettingsThunk({
            id: profile.id,
            settings: JSON.stringify(settings),
        }));
    }, []);

    const handleEnableMusic = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setMusicEnable((prev) => !prev);

        if (event.target.checked) {
            GameMusicTheme?.play();
        } else {
            GameMusicTheme?.stop();
        }
    }, []);

    return (
        <PageLayout goBackLink={ROUTES.HOME.path}>
            <Meta title={title} />
            <Paper title={title}>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={userSettings.colorTheme !== ColorThemes.Light}
                            onChange={handleChangeColorTheme}
                            name="isColorThemeDark"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      )}
                    label={LOCAL.SETTINGS_THEME}
                />

                <FormControlLabel
                    control={(
                        <Switch
                            checked={isMusicEnabled}
                            onChange={handleEnableMusic}
                            name="isMusicEnable"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      )}
                    label={LOCAL.MUSIC}
                />
            </Paper>
        </PageLayout>
    );
};

export const Settings = withCheckAuth(SettingsComponent);
