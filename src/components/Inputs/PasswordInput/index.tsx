import { FC } from "react";
import { Input } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";

interface IProps {
    placeholder?: string;
}

const PasswordInput: FC<WrappedFieldProps & IProps> = ({
    input,
    meta,
    placeholder,
}) => {
    const showError = meta.touched && meta.error;
    return (
        <InputWrapper error={showError}>
            <Input.Password
                {...input}
                size={"large"}
                placeholder={placeholder}
            />
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { PasswordInput };
