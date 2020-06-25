import { Normalize } from "styled-normalize";
import { GlobalCustomStyles } from "./globals";

export function GlobalStyles() {
    return (
        <>
            <Normalize />
            <GlobalCustomStyles />
        </>
    );
}
