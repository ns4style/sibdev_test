import { FC } from "react";
import { LoginField } from "../../components/Login/LoginField";
import { Field } from "redux-form";
import { TextInput } from "../../components/Inputs/TextInput";
import { required } from "../../helpers/validations";

const LoginInput: FC = () => {
    return (
        <LoginField inputId={"username"} label={"Логин"}>
            <Field
                name="username"
                component={TextInput}
                type="text"
                validate={[required]}
            />
        </LoginField>
    );
};

export { LoginInput };
