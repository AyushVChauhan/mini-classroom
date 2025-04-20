declare module 'axios' {
    export interface AxiosRequestConfig {
        /**
         * Controls whether to show an error notification (default: true)
         */
        showErrorNotification?: boolean;

        /**
         * Shows a loading notification and optionally handles success/error updates
         */
        notificationFeedback?:
            | boolean
            | {
                  loadingMessage?: string;
                  successMessage?: string;
                  errorMessage?: string;
              };

        /**
         * Internal use: holds the ID of the notification to be updated later
         */
        notificationId?: string;
    }
}

import Axios, { InternalAxiosRequestConfig } from 'axios';
import { notifications } from '@mantine/notifications';
import env from '../config/env';
import paths from '../config/paths';
import { getToken } from '../utils/auth';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    config.headers.set('X-Tenant-Id', env.VITE_TENANT_ID);
    config.headers.set('Authorization', 'Bearer ' + getToken());

    const notify = config.notificationFeedback;

    if (notify) {
        const notificationId = crypto.randomUUID();

        const loadingMessage =
            typeof notify === 'boolean' ? 'Loading...' : notify.loadingMessage || 'Loading...';

        notifications.show({
            id: notificationId,
            message: loadingMessage,
            loading: true,
            autoClose: false,
            withCloseButton: false,
        });

        config.notificationId = notificationId;
    }

    return config;
}

export const api = Axios.create({
    baseURL: env.VITE_BACKEND_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
    (response) => {
        const { notificationFeedback, notificationId } = response.config;

        if (notificationFeedback && notificationId) {
            const successMessage =
                typeof notificationFeedback === 'boolean'
                    ? 'Success!'
                    : notificationFeedback.successMessage || 'Success!';

            notifications.update({
                id: notificationId,
                message: successMessage,
                color: 'green',
                autoClose: 2000,
                loading: false,
            });
        }

        return response.data;
    },
    (error) => {
        const config = error.config || {};
        const { notificationFeedback, notificationId } = config;

        const errorMessage = error.response?.data?.message || error.message;

        if (notificationFeedback && notificationId) {
            const finalErrorMessage =
                typeof notificationFeedback === 'boolean'
                    ? errorMessage
                    : notificationFeedback.errorMessage || errorMessage;

            notifications.update({
                id: notificationId,
                message: finalErrorMessage,
                color: 'red',
                autoClose: 3000,
                loading: false,
            });
        }

        if (config.showErrorNotification ?? true) {
            notifications.show({
                title: 'Error',
                message: errorMessage,
                position: 'bottom-right',
                withCloseButton: true,
                color: 'red',
            });
        }

        if (error.response?.status === 401) {
            window.location.href = paths.auth.login.getHref();
        }

        return Promise.reject(error);
    }
);
