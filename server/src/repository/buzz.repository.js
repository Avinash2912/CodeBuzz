const CrudRepo = require('./crud.repository')
const Buzz = require('../models/buzz.model')
class BuzzRepo extends CrudRepo {
    constructor() {
        super(Buzz)
    }
    async find(id) {
        const res = await Buzz.findById(id).populate({ path: 'likes' })
        return res
    }
    async findOnebyId(id) {
        const res = await Buzz.findById(id)
        return res
    }

    async getAllbyUserId(userId, start, limit) {
        const res = await Buzz.find({ userId: userId }).limit(limit).skip(start)
        return res
    }

    async countByuserId(userId) {
        const res = await Buzz.count({ userId: userId })
        return res
    }
}
module.exports = BuzzRepo
