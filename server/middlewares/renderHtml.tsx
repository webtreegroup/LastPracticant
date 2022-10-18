import { ServerStyleSheets } from '@material-ui/core';
import { App } from 'client/App';
import { StoreProps } from 'client/core/store';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Store } from 'redux';

interface PageHtmlProps {
    html: string;
    state: StoreProps
    helmet: HelmetData;
    css: string
    styleNonce: string
}

function getPageHtml({
    html,
    state,
    helmet,
    css,
    styleNonce,
}: PageHtmlProps) {
    const staticMarkup = renderToStaticMarkup(
        <html lang="ru">
            <base href="/" />
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                {helmet.script.toComponent()}
                <meta property="csp-nonce" content={styleNonce} />
                <link rel="icon" type="image/png" href="./idea.png" />
                <style nonce={styleNonce} id="jss-server-side">${css}</style>
                <link rel="stylesheet" href="/main.css" type="text/css" />
            </head>

            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
                <script
                    nonce={styleNonce}
                    dangerouslySetInnerHTML={{
                        __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`,
                    }}
                />
                <script src="/main.js" />
                <script src="/start-sw.js" />
            </body>
        </html>,
    );

    return `<!DOCTYPE html> ${staticMarkup}`;
}

export const renderHtml = (reqUrl: string, state: StoreProps, store: Store, styleNonce: string) => {
    const context = {};
    const sheets = new ServerStyleSheets();

    const html = renderToString(
        sheets.collect(
            <ReduxProvider store={store}>
                <StaticRouter context={context} location={reqUrl}>
                    <App />
                </StaticRouter>
            </ReduxProvider>,
        ),
    );

    const helmet = Helmet.rewind();
    const css = sheets.toString();

    return {
        html: getPageHtml({
            html,
            state,
            helmet,
            css,
            styleNonce,
        }),
    };
};
