const { StatusCodes } = require('http-status-codes')
const { CommentService } = require('../services/index')

class CommentController {
    constructor() {
        this.commentService = new CommentService()
    }
    create = async (req, res) => {
        const response = await this.commentService.create(
            req.query.modelId,
            req.query.modelType,
            req.user,
            req.body.content,
        )
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a comment',
            data: response,
            err: {},
        })
    }
    getComments = async (req, res) => {
        const response = await this.commentService.getAll(
            req.params.modelId,
            req.params.modelType,
            req.query.start,
            req.query.limit,
        )
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched the comments',
            data: response,
            err: {},
        })
    }
}

module.exports = new CommentController()
