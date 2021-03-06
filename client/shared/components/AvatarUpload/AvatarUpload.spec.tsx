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
        const urlImg = 'https://million-wallpapers.ru/wallpapers/5/57/459836597849189/rembo.jpg';
        const { asFragment } = render(<AvatarUpload src={urlImg} name="login" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
