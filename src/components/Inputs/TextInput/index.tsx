import { FC } from "react";
import { Input } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";

interface IProps {
    placeholder?: string;
}

const TextInput: FC<WrappedFieldProps & IProps> = ({
    input,
    meta,
    placeholder,
}) => {
    const showError = meta.touched && meta.error;
    return (
        <InputWrapper error={showError}>
            <Input {...input} size={"large"} placeholder={placeholder} />
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { TextInput };
