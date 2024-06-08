const CrudRepo = require('./crud.repository')
const Likes = require('../models/like.model')
class LikeRepo extends CrudRepo {
    constructor() {
        super(Likes)
    }
    async findByuserAndlikeable(data) {
        const res = await Likes.findOne(data)
        return res
    }
    async findAllbyUserandLikeable(data) {
        const res = await Likes.find(data).exec()
        return res
    }
}
module.exports = LikeRepo
