const ErrorWithStatusCode = require('./error-class')
class Badrequest extends ErrorWithStatusCode {
    constructor(message) {
        super(message, 400)
    }
}
module.exports = Badrequest
