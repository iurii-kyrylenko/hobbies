type NotificationType = 'success' | 'info' | 'warning' | 'danger';

export interface Notification {
    type: NotificationType;
    message: string;
}
