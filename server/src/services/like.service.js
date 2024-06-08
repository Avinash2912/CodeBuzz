const {
    LikeRepo,
    BuzzRepo,
    CommentRepo,
    NotificationRepo,
    UserRepo,
} = require('../repository/index')

class LikeService {
    constructor() {
        this.likeRepo = new LikeRepo()
        this.buzzRepo = new BuzzRepo()
        this.commentRepo = new CommentRepo()
        this.notificationRepo = new NotificationRepo()
        this.userRepo = new UserRepo()
    }

    async toggleLike(modelId, modelType, userId) {
        console.log(modelId, modelType, userId)
        let isAdded
        if (modelType == 'Buzz') {
            var buzz = await this.buzzRepo.find(modelId)
            console.log(buzz)
        } else if (modelType == 'Comment') {
            //to do
            var buzz = await this.commentRepo.get(modelId)
        } else {
            throw new Error('unknown model type')
        }
        const exists = await this.likeRepo.findByuserAndlikeable({
            onModel: modelType,
            likeable: modelId,
            userId: userId,
        })
        if (exists) {
            buzz.likes.pull(exists.id)
            await buzz.save()
            await exists.deleteOne()
            isAdded = false
        } else {
            const newLike = await this.likeRepo.create({
                userId: userId,
                onModel: modelType,
                likeable: modelId,
            })
            buzz.likes.push(newLike)
            await buzz.save()
            // notification logic
            const user = await this.userRepo.getUserById(userId)
            const notif = await this.notificationRepo.create({
                sender: userId,
                receiver: buzz.userId,
                onModel: modelType,
                interactedOn: buzz.id,
                content: `${user.username} liked your ${modelType}`,
            })
            if (!notif) {
                throw new Error('unable to create notification')
            }
            isAdded = true
        }
        return isAdded
    }
}

module.exports = LikeService
