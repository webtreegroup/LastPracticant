import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Logo } from './Logo';

afterEach(cleanup);

describe('Loader', () => {
    it('Render Logo component', () => {
        const { asFragment } = render(<Logo />);
        expect(asFragment()).toMatchSnapshot();
    });
});
