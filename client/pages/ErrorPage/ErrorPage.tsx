import './ErrorPage.css';

import React from 'react';
import { Link } from 'react-router-dom';
import bem from 'bem-cn';
import { NivelatorXY } from 'client/shared/components';
import { ErrorPageProps } from './ErrorPage.types';

const block = bem('error-page');

export const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode }) => (
    <NivelatorXY className={block}>
        <h3>
			{errorCode}
		</h3>

		<p>
			Вы можете перейти на <Link to="/">Главную</Link>
		</p>
    </NivelatorXY>
);
