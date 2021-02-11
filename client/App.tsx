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

export const App: React.FC = () => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<Routing />
		</BrowserRouter>
	</ThemeProvider>
);
