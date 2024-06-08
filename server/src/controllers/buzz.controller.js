const { StatusCodes } = require('http-status-codes')
const { BuzzService } = require('../services/index')

class BuzzController {
    constructor() {
        this.buzzservice = new BuzzService()
    }
    create = async (req, res) => {
        const payload = req.body
        console.log(payload)
        const response = await this.buzzservice.create({
            title: payload.title,
            content: payload.content,
            userId: req.user,
        })
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new Buzz',
            data: response,
            err: {},
        })
    }
    getBuzz = async (req, res) => {
        if (req.isAuthorized) {
            const response = await this.buzzservice.getBuzzifAuth(
                req.params.id,
                req.user,
            )
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully fetched the Buzz',
                data: response,
                err: {},
            })
        } else {
            const response = await this.buzzservice.getBuzz(req.params.id)
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully fetched the Buzz',
                data: response,
                err: {},
            })
        }
    }
    getAllBuzzes = async (req, res) => {
        const start = parseInt(req.query.start)
        const limit = parseInt(req.query.limit)
        const userId = req.params.userId

        if (req.isAuthorized) {
            const response = await this.buzzservice.getAllBuzzifAuth(
                userId,
                start,
                limit,
            )
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully fetched the Buzz',
                data: response,
                err: {},
            })
        } else {
            const response = await this.buzzservice.getAllBuzz(
                userId,
                start,
                limit,
            )
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully fetched the Buzz',
                data: response,
                err: {},
            })
        }
    }
}

module.exports = new BuzzController()
