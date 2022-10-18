import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Paper } from './Paper';

afterEach(cleanup);

describe('Paper', () => {
    it('Render Paper component', () => {
        const { asFragment } = render(<Paper title="Hello Paper" sizes="full" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
