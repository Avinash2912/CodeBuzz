const { StatusCodes } = require('http-status-codes')
const { LikeService } = require('../services/index')

class LikeController {
    constructor() {
        this.likeservice = new LikeService()
    }
    toggleLike = async (req, res) => {
        const response = await this.likeservice.toggleLike(
            req.query.modelId,
            req.query.modelType,
            req.user,
        )
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully toggled like',
            data: response,
            err: {},
        })
    }
}

module.exports = new LikeController()
