import { FC } from "react";
import { Select } from "antd";
import { WrappedFieldProps } from "redux-form";
import { InputError } from "../InputError";
import { InputWrapper } from "../InputWrapper";
import { TOptionsItem } from "../../../types";

const { Option } = Select;

interface IProps {
    options: Array<TOptionsItem>;
}

const SelectInput: FC<WrappedFieldProps & IProps> = ({
    input,
    meta,
    options,
}) => {
    const showError = meta.touched && meta.error;

    function onChangeHandler(value: string) {
        input.onChange(value);
    }

    return (
        <InputWrapper error={showError}>
            <Select
                allowClear
                placeholder={"Выберите"}
                value={input.value}
                size={"large"}
                style={{ width: "100%" }}
                onChange={onChangeHandler}
            >
                {options.map((option) => {
                    return (
                        <Option key={option.key} value={option.value}>
                            {option.key}
                        </Option>
                    );
                })}
            </Select>
            {showError && <InputError> {meta.error}</InputError>}
        </InputWrapper>
    );
};

export { SelectInput };
