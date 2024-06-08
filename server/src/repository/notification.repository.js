const CrudRepo = require('./crud.repository')
const Notification = require('../models/notification.model')
class NotificationRepo extends CrudRepo {
    constructor() {
        super(Notification)
    }
}
module.exports = NotificationRepo
