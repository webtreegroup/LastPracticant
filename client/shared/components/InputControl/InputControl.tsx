import React from 'react';
import { FieldError } from 'react-hook-form';
import classnames from 'classnames';
import { ComponentCommonProps } from 'client/shared/types';
import './InputControl.css';
import { OutlinedInput } from '@material-ui/core';

export interface InputControlProps extends ComponentCommonProps {
    name: string
    label?: string
    error?: FieldError
    errorMessage?: string
    type?: string
    required?: boolean
    pattern?: RegExp
}

const InputControlComponent = React.forwardRef<
HTMLInputElement,
InputControlProps
>(
    (
        {
            label,
            name,
            error,
            errorMessage = 'ошибка',
            type = 'text',
            className,
        },
        ref,
    ) => (
        <div>
            <OutlinedInput
                name={name}
                placeholder={label}
                ref={ref}
                id={name}
                type={type}
                className={classnames('input-control', className)}
            />
            <span>{error && errorMessage}</span>
        </div>
    ),
);

export const InputControl = React.memo(InputControlComponent);
