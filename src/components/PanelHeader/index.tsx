import { FC } from "react";
import styled from "styled-components";
import { typeOptions } from "../../helpers/typeOptions";

interface IProps {
    title: string;
    type: string;
    fieldKey: string;
    onClickHandler: any;
    isActive: boolean;
}

const PanelHeader: FC<IProps> = ({
    title,
    type,
    fieldKey,
    onClickHandler,
    isActive,
}) => {
    let resolvedValue: null | string = null;
    if (type) {
        resolvedValue = typeOptions.find((item) => item.key === type).value;
    }
    return (
        <PanelWrapper onClick={onClickHandler}>
            <div>{`${title}`}</div>
            {!isActive && (
                <div>
                    {`${resolvedValue ? `${resolvedValue};` : ""} ${
                        fieldKey ? fieldKey : ""
                    }`}
                </div>
            )}
        </PanelWrapper>
    );
};

const PanelWrapper = styled.div`
    width: 50%;
    display: inline-block;
`;

export { PanelHeader };
