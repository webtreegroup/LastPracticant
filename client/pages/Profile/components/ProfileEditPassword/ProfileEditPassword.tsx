import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ChangePasswordProps } from 'client/core/api';
import {
    GRID_SPACE, LOCAL,
} from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { useDispatch } from 'react-redux';
import { editPasswordThunk } from 'client/core/store';
import { PROFILE_EDIT_PASSWORD_CONTROLS } from './ProfileEditPassword.config';

export const ProfileEditPassword: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    const { control, handleSubmit, errors } = useForm<ChangePasswordProps>();

    const onSubmit = (data: ChangePasswordProps) => {
        dispatch(editPasswordThunk(data));
    };

    const controls = React.useMemo(
        () => PROFILE_EDIT_PASSWORD_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;

            return (
                    <InputControl
                        key={inputConfig.name}
                        fullWidth
                        margin="dense"
                        error={Boolean(error)}
                        helperText={error}
                        control={control}
                        variant="outlined"
                        {...inputConfig}
                    />
            );
        }),
        [errors],
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="profile_form">
            <Grid container spacing={GRID_SPACE}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit" variant="contained">
                            {LOCAL.COMMON_PREFIXES.SAVE}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE.path}
                            color="primary"
                        >
                            {LOCAL.BACK}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
