import React, { FC, memo } from 'react';
import classnames from 'classnames';
import './Loader.css';

import { ComponentCommonProps } from 'client/shared/types';
import loader from './loader.gif';
import { NivelatorXY } from '../NivelatorXY';

interface LoaderProps extends ComponentCommonProps {
    isVisible: boolean
}

export const Loader: FC<LoaderProps> = memo(
    ({
        className,
        isVisible,
    }) => (
        <div
            className={classnames(
                'loader',
                className,
                { loader_visible: isVisible },
            )}
        >
            <NivelatorXY>
                <img src={loader} alt="loader" />
            </NivelatorXY>
        </div>
    ),
);
