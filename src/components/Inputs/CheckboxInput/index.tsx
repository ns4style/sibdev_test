import { FC } from "react";
import { Checkbox } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";
interface IProps {}

const CheckboxInput: FC<WrappedFieldProps & IProps> = ({ input, meta }) => {
    const showError = meta.touched && meta.error;
    return (
        <InputWrapper error={showError}>
            <Checkbox {...input} />
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { CheckboxInput };
