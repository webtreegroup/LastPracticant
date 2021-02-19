import React from 'react';
import { FieldError } from 'react-hook-form';
import { ComponentCommonProps } from 'client/shared/types';
import './InputControl.css';

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
            name,
            error,
            errorMessage = 'ошибка',
            type = 'text',
        },
        ref,
    ) => (
        <div>
            <input
                name={name}
                ref={ref}
                id={name}
                type={type}
            />
            <span>{error && errorMessage}</span>
        </div>
    ),
);

export const InputControl = React.memo(InputControlComponent);
