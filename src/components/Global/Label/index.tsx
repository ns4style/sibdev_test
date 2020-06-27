import styled from "styled-components";

const Label = styled.label`
    font-size: 1.6rem;
    line-height: 2.2rem;
    margin-bottom: 6px;
    display: block;
    ${(props) =>
        props.required
            ? `&:before {
        position: relative;
        content : "*";
        color : red;
        fontSize : 6px;
    }`
            : ``}
`;

export { Label };
