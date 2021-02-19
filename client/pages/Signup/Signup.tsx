import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from '@material-ui/core';
import { NivelatorXY } from 'client/shared/components';
import { SignupForm } from './components';

export const Signup: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<NivelatorXY className="home">
		<Paper>
			<h1 className="auth-pannel__title">{title}</h1>
			<SignupForm />
		</Paper>
	</NivelatorXY>
));
