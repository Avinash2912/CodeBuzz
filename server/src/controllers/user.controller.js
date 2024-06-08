const { StatusCodes } = require('http-status-codes')
const { UserService } = require('../services/index')

class UserController {
    constructor() {
        this.userService = new UserService()
    }
    signup = async (req, res) => {
        const user = await this.userService.signup({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            name: req.body.name,
        })
        return res.status(StatusCodes.CREATED).json({
            message: 'Successfully created the User',
            err: {},
            data: {
                email: user.email,
                username: user.username,
            },
            success: true,
        })
    }

    signin = async (req, res) => {
        const response = await this.userService.signin({
            email: req.body.email,
            password: req.body.password,
            
        })
        console.log(response)
        return res.status(StatusCodes.OK).json({
            message: 'Successfully signed in',
            data: response,
            err: {},
            success: true,
        })
    }

    followToggle = async (req, res) => {
        const response = await this.userService.followToggle(
            req.user,
            req.body.userId,
        )
        return res.status(StatusCodes.OK).json({
            message: 'Successfully done',
            data: response,
            err: {},
            success: true,
        })
    }

    getUser = async (req, res) => {
        console.log(req.isAuthorized + 'is Authorized')
        if (req.isAuthorized == false) {
            const data = await this.userService.getUser(req.params.username)
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched the User',
                err: {},
                data: data,
                success: true,
            })
        } else {
            console.log(req.params.username)
            const data = await this.userService.getUserifFollowed(
                req.params.username,
                req.user,
            )

            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched the User',
                err: {},
                data: data,
                success: true,
            })
        }
    }
}

module.exports = new UserController()
