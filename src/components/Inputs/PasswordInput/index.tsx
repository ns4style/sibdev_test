import { FC } from "react";
import { Input } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";

interface IProps {}

const PasswordInput: FC<WrappedFieldProps & IProps> = ({ input, meta }) => {
    const showError = meta.touched && meta.error;
    return (
        <InputWrapper error={showError}>
            <Input.Password {...input} size={"large"} />
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { PasswordInput };
