import { FC } from "react";
import { LoginField } from "../../components/Login/LoginField";
import { Field } from "redux-form";
import { PasswordInput as PassInput } from "../../components/Inputs";
import { required } from "../../helpers/validations";

const PasswordInput: FC = () => {
    return (
        <LoginField inputId={"password"} label={"Пароль"}>
            <Field
                name="password"
                component={PassInput}
                type="password"
                validate={[required]}
            />
        </LoginField>
    );
};

export { PasswordInput };
