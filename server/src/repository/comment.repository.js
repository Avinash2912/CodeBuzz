const CrudRepo = require('./crud.repository')
const Comments = require('../models/comment.model')
class CommentRepo extends CrudRepo {
    constructor() {
        super(Comments)
    }

    async getAllComments(modelId, modelType, start, limit) {
        const res = await Comments.find({
            commentable: modelId,
            onModel: modelType,
        })
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'username' },
            })
            .limit(limit)
            .skip(start)
        return res
    }
}
module.exports = CommentRepo
