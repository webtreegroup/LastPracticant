import React from 'react';
import {
    cleanup, fireEvent, render, screen,
} from '@testing-library/react';
import { InputControlMock } from './InputControl.mock';

afterEach(cleanup);

describe('InputControl', () => {
    it('Render InputControl component', () => {
        const { asFragment } = render(<InputControlMock />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Render InputControl component onchange value', () => {
        const { asFragment } = render(<InputControlMock />);
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Set new value' },
        });
        expect(asFragment()).toMatchSnapshot();
    });
});
