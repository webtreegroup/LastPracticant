import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Paper } from './Paper';

afterEach(cleanup);

it('Render Paper', () => {
    const { queryByLabelText, getByLabelText } = render(
        <Paper title="Test Paper" sizes="full">
            <span>LP</span>
        </Paper>,
    );
    console.log(queryByLabelText, getByLabelText);
});
