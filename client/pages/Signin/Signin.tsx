import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { SigninForm } from './components';

export const Signin: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<NivelatorXY className="home">
		<Paper>
			<h1 className="auth-pannel__title">{title}</h1>
			<SigninForm />
		</Paper>
	</NivelatorXY>
));
