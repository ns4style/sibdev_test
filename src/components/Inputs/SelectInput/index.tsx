import { FC } from "react";
import { Select } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";
import { TOptionsItem } from "../../../types";
import { placeholder } from "@babel/types";

const { Option } = Select;

interface IProps {
    options: Array<TOptionsItem>;
    placeholder?: string;
}

const SelectInput: FC<WrappedFieldProps & IProps> = ({
    input,
    meta,
    options,
    placeholder,
}) => {
    const showError = meta.touched && meta.error;

    function onChangeHandler(value: string) {
        input.onChange(value);
    }

    return (
        <InputWrapper error={showError}>
            <Select
                allowClear
                placeholder={placeholder}
                value={!!input.value ? input.value : undefined}
                size={"large"}
                style={{ width: "100%" }}
                onChange={onChangeHandler}
            >
                {options.map((option) => {
                    return (
                        <Option key={option.key} value={option.key}>
                            {option.value}
                        </Option>
                    );
                })}
            </Select>
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { SelectInput };
