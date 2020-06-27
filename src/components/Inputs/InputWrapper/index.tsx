import styled from "styled-components";

const InputWrapper = styled.div`
    position: relative;

    .ant-input {
        border: 1px solid ${(props) => (props.error ? "red" : "inherit")};
    }

    .ant-input-password {
        border: 1px solid ${(props) => (props.error ? "red" : "inherit")};
    }

    .ant-input-number {
        border: 1px solid ${(props) => (props.error ? "red" : "inherit")};
    }

    .ant-select-selector {
        border: 1px solid ${(props) => (props.error ? "red" : "inherit")} !important;
    }
`;

export { InputWrapper };
