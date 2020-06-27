import { notification } from "antd";

const notificationError = (message: string): void => {
    if (typeof window === "undefined") {
        return;
    }

    notification.error({
        message: "Ошибка",
        description: message,
    });
};

const notificationSuccess = (message: string): void => {
    if (typeof window === "undefined") {
        return;
    }

    notification.success({
        message: "Успешно",
        description: message,
    });
};

export { notificationError, notificationSuccess };
