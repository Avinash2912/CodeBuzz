const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/server.config')
const { userRepo } = require('../repository/index')

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(StatusCodes.FORBIDDEN).json('No token provided')
        }
        console.log(token)
        const response = jwt.verify(token, JWT_SECRET)
        if (!response) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json('Token not verified')
        }
        const userRepository = new userRepo()
        const user = await userRepository.getUserById(response.id)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json('User not found')
        }
        req.user = user.id
        next()
    } catch (error) {
        console.log(error)
        if (error.name == 'JsonWebTokenError') {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }
        if (error.name == 'TokenExpiredError') {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            return res.status(StatusCodes.NOT_FOUND).json(error)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

const isAuthorized = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            req.isAuthorized = false
            next()
        }
        const response = jwt.verify(token, JWT_SECRET)
        if (!response) {
            req.isAuthorized = false
            next()
        }

        const userRepository = new userRepo()
        const user = await userRepository.getUserById(response.id)
        if (!user) {
            req.isAuthorized = false
            next()
        }
        req.user = user.id
        req.isAuthorized = true
        next()
    } catch (error) {
        if (error.name == 'JsonWebTokenError') {
            req.isAuthorized = false
        }
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            req.isAuthorized = false
        }
        req.isAuthorized = false
    }
}

module.exports = {
    isAuthenticated,
    isAuthorized,
}
