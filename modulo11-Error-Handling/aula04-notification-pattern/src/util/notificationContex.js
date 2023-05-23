export default class NotificationContex {
    constructor() {
        this.notifications = []
    }

    hasNotifications() {
        return this.notifications.length > 0
    }

    addNotification(notification) {
        this.notifications.push(notification)
    }
}