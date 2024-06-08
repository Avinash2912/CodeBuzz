const { StatusCodes } = require('http-status-codes')
const CrudRepo = require('./crud.repository')
const User = require('../models/user.model')
class UserRepo extends CrudRepo {
    constructor() {
        super(User)
    }
    getUserByEmail = async (userEmail) => {
        const user = await User.findOne({
            email: userEmail,
        })
        if (!user) {
            throw new Error(
                //   {
                //     message: "Invalid data sent from the client",
                //     explanation: "No registered user found for the given email",
                //   },
                StatusCodes.NOT_FOUND,
            )
        }

        return user
    }
    getUserById = async (id) => {
        const user = await User.findById(id)
        if (!user) {
            throw new Error(
                //   {
                //     message: "Invalid data sent from the client",
                //     explanation: "No registered user found for the given email",
                //   },
                // add status code
                StatusCodes.NOT_FOUND,
            )
        }
        return user
    }
    getUserByUsername = async (username) => {
        const user = await User.findOne({ username: username })
        if (!user) {
            throw new Error()
        }
        return user
    }
}
module.exports = UserRepo
