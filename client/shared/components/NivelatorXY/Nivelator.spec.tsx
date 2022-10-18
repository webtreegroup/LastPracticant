import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { NivelatorXY } from './NivelatorXY';

afterEach(cleanup);

describe('NivelatorXY', () => {
    it('Render NivelatorXY component', () => {
        const { asFragment } = render(<NivelatorXY />);
        expect(asFragment()).toMatchSnapshot();
    });
});
