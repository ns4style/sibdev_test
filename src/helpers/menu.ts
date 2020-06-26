const getSelectedKeys = (pathname: string): Array<string> => {
    const keys: Array<string> = [];
    switch (pathname) {
        case "/schemas":
            keys.push("schemas");
            break;
        case "/create":
            keys.push("create");
            break;
        default:
            break;
    }
    return keys;
};

export { getSelectedKeys };
