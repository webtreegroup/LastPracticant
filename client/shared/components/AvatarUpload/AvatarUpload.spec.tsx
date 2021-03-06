import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { AvatarUpload } from './AvatarUpload';

afterEach(cleanup);

describe('AvatarUpload', () => {
    it('Render AvatarUpload component', () => {
        const { asFragment } = render(<AvatarUpload name="login" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Render AvatarUpload component with image', () => {
        // eslint-disable-next-line max-len
        const urlImg = 'https://ya-praktikum.tech/api/v2/resources/2fe9d2f9-f3e6-4187-9087-06875845a9a3/cf582f84-7be4-4965-aab8-b97fb7c2afe6_logotip-gruppy-alisa.jpg';
        const { asFragment } = render(<AvatarUpload src={urlImg} name="login" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
