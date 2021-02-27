import React from 'react';
import { PageComponentProps } from 'client/shared/types';

import './Landing.css';
import { Paper } from 'client/shared/components';
import { Grid } from '@material-ui/core';
import { Navigation } from 'client/core';

export const Landing: React.FC<PageComponentProps> = React.memo(() => (
    <Grid className="home" container justify="center" alignItems="center">
        <Paper sizes="small">
            <Navigation />
        </Paper>
    </Grid>
));