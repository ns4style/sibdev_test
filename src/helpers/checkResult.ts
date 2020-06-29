const checkResult = (obj: any): boolean => {
    let result = false;
    Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
            obj[key].forEach((item) => {
                if (!result) {
                    result = checkResult(item);
                }
            });
        } else {
            result = true;
        }
    });
    return result;
};

export { checkResult };
