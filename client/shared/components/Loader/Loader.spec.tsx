import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Loader } from './Loader';

afterEach(cleanup);

describe('Loader', () => {
    it('Render hide Loader component', () => {
        const { asFragment } = render(<Loader isVisible={false} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Render show Loader component', () => {
        const { asFragment } = render(<Loader isVisible />);
        expect(asFragment()).toMatchSnapshot();
    });
});
