import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Button } from '@material-ui/core';
import { ButtonsToolbar } from './ButtonsToolbar';

afterEach(cleanup);

describe('ButtonsToolbar', () => {
    it('Render ButtonsToolbar component no children', () => {
        const { asFragment } = render(<ButtonsToolbar />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Render ButtonsToolbar component with noMargin no children', () => {
        const { asFragment } = render(<ButtonsToolbar noMargin />);
        expect(asFragment()).toMatchSnapshot();
    });
    it('Render ButtonsToolbar component with noMargin with children', () => {
        const { asFragment } = render(
            <ButtonsToolbar noMargin>
                <Button variant="contained">Button 1</Button>
                <Button variant="text">Button 2</Button>
            </ButtonsToolbar>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
