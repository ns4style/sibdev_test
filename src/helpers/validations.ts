const required = (value) =>
    value || typeof value === "number" ? undefined : "Required";
const phoneNumber = (value) =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? "Invalid phone number, must be 10 digits"
        : undefined;

export { required, phoneNumber };
