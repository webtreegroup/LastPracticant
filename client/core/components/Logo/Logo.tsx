import React, { FC, memo } from 'react';
import './Logo.css';

import { ComponentCommonProps } from 'client/shared/types';
import bem from 'bem-cn';

const block = bem('logo');

export const Logo: FC<ComponentCommonProps> = memo(
    ({
        className,
    }) => (
        <div className={block({}).mix(className).toString()} />
    ),
);
