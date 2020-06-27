import { FC } from "react";
import { InputNumber } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";
interface IProps {}

const NumberInput: FC<WrappedFieldProps & IProps> = ({ input, meta }) => {
    const showError = meta.touched && meta.error;
    return (
        <InputWrapper error={showError}>
            <InputNumber {...input} size={"large"} style={{ width: "100%" }} />
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { NumberInput };
