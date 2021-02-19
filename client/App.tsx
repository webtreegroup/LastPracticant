import './App.css';

import React from 'react';
import {
    BrowserRouter,
} from 'react-router-dom';
import { Routing } from 'client/routing/Routing';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import './shared/styles/theme.css';
import { useSelector } from 'react-redux';
import { Loader } from './shared/components';
import { StoreProps } from './core/store';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: red[50],
            main: red[500],
            dark: red[700],
        },
    },
});

export const App: React.FC = () => {
    const loader = useSelector((store: StoreProps) => ({
        isVisible: store.loader,
    }));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routing />

                <Loader isVisible={loader.isVisible} />
            </BrowserRouter>
        </ThemeProvider>
    );
};
