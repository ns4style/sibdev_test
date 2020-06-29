import { FC } from "react";
import styled from "styled-components";
import { Alert } from "antd";

interface IProps {
    submitFailed: boolean;
    submitSucceeded: boolean;
}

const ResultItem: FC<IProps> = ({ submitSucceeded, submitFailed }) => {
    if (!submitFailed && !submitSucceeded) {
        return null;
    }
    return (
        <Wrapper>
            {submitSucceeded && (
                <Alert
                    type="success"
                    message={"Валидация пройдена успешно!"}
                    showIcon={true}
                />
            )}
            {submitFailed && (
                <Alert
                    type="error"
                    message={"Валидация не пройдена"}
                    showIcon={true}
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 40px;
`;

export { ResultItem };
