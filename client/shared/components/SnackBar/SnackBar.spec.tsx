import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { createStore } from 'redux';
import { rootReducer } from 'client/core/store';
import { Provider } from 'react-redux';
import { SnackBar } from './SnackBar';

afterEach(cleanup);

const renderWithRedux = (children: any) => {
    const store = createStore(rootReducer);
    return {
        ...render(<Provider store={store}>{children}</Provider>),
    };
};

describe('SnackBar', () => {
    it('Render hide SnackBar component', () => {
        const { asFragment } = renderWithRedux(
            <SnackBar msg="Hello" type="error" />,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('Render show SnackBar component', () => {
        const { asFragment } = renderWithRedux(
            <SnackBar open msg="Hello" type="success" />,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
