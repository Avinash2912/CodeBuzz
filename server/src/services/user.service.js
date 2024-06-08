const { UserRepo, NotificationRepo, BuzzRepo } = require('../repository/index')
class UserService {
    constructor() {
        this.userRepo = new UserRepo()
        this.notificationRepo = new NotificationRepo()
        this.buzzRepo = new BuzzRepo()
    }
    signup = async (data) => {
        const user = await this.userRepo.create(data)
        return user
    }

    signin = async (data) => {
        const user = await this.userRepo.getUserByEmail(data.email)
        console.log(user)
        if (!user) {
            throw new Error('new error')
        }
        const passwordMatch = user.comparePassword(data.password)
        console.log(passwordMatch)
        if (!passwordMatch) {
            throw new Error(
                //   {
                //     message: "Invalid data sent from the client",
                //     explanation: "Password given is not correct, please try again!",
                //   },
                'new error',
            )
        }
        const jwtToken = user.generateJWT()
        console.log(jwtToken)
        return {
            token: jwtToken,
            username: user.username,
            name: user.name,
            id: user._id,
        }
    }

    followToggle = async (cuId, uId) => {
        const cuser = await this.userRepo.getUserById(cuId)
        console.log(cuser)
        let isAdded
        console.log(uId)
        const user = await this.userRepo.getUserById(uId)
        console.log('sdf')
        if (cuser && user) {
            let found = cuser.following.includes(uId)
            console.log(found)
            if (found) {
                cuser.following.pull(uId)
                user.followers.pull(cuId)
                await cuser.save()
                await user.save()
                isAdded = false
            } else {
                cuser.following.push(uId)
                user.followers.push(cuId)
                await cuser.save()
                await user.save()
                //notification service
                const notif = await this.notificationRepo.create({
                    sender: cuId,
                    receiver: uId,
                    onModel: 'User',
                    interactedOn: cuId,
                    content: `${cuser.username} has started following you`,
                })
                if (!notif) {
                    throw new Error('unable to user create notification')
                }
                isAdded = true
            }
        } else {
            throw new Error("invalid user id's")
        }
        console.log(isAdded)
        return isAdded
    }

    getUser = async (username) => {
        const user = await this.userRepo.getUserByUsername(username)
        if (!user) {
            throw new Error('user not found')
        }
        const res = {
            id: user._id,
            username: user.username,
            name: user.name,
            profilePic: user.profilePic,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            totalFollowers: user.followers.length,
            totalFollowing: user.following.length,
            totalBuzzes: await this.buzzRepo.countByuserId(user.id),
            isFollowed: null,
        }
        return res
    }
    getUserifFollowed = async (username, cuId) => {
        console.log(username, cuId)
        const user = await this.userRepo.getUserByUsername(username)
        console.log(user.followers)
        if (!user) {
            throw new Error('user not found')
        }
        const res = {
            id: user._id,
            username: user.username,
            name: user.name,
            profilePic: user.profilePic,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            totalFollowers: user.followers.length,
            totalFollowing: user.following.length,
            totalBuzzes: await this.buzzRepo.countByuserId(user.id),
            isFollowed: user.followers.includes(cuId),
        }
        if (user._id == cuId) {
            res.isFollowed = true
        }
        return res
    }
}

module.exports = UserService
