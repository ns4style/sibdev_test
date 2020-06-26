import { notification } from "antd";

const notificationError = (message: string): void => {
    notification.error({
        message: "Ошибка",
        description: message,
    });
};

const notificationSuccess = (message: string): void => {
    notification.success({
        message: "Успешно",
        description: message,
    });
};

export { notificationError, notificationSuccess };
