import React, { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { InputControl } from './InputControl';

export const InputControlMock: FC = memo(() => {
    const { control } = useForm();
    return (
        <InputControl
            variant="outlined"
            name="login"
            label="Login"
            control={control}
        />
    );
});
