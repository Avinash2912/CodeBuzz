const CrudRepo = require('./crud.repository')
const Hashtag = require('../models/hashtag.model')
class HashtagRepo extends CrudRepo {
    constructor() {
        super(Hashtag)
    }
    async bulkCreate(data) {
        const tags = await Hashtag.insertMany(data)
        return tags
    }
    async findByName(titleList) {
        const tags = await Hashtag.find({
            title: titleList,
        })
        return tags
    }
}
module.exports = HashtagRepo
