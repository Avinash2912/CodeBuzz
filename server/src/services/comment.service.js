const {
    CommentRepo,
    BuzzRepo,
    UserRepo,
    NotificationRepo,
} = require('../repository/index')

class CommentService {
    constructor() {
        this.commentRepo = new CommentRepo()
        this.buzzRepo = new BuzzRepo()
        this.userRepo = new UserRepo()
        this.notificationRepo = new NotificationRepo()
    }

    async create(modelId, modelType, userId, content) {
        console.log(modelId, modelType, userId)

        if (modelType == 'Buzz') {
            var commentable = await this.buzzRepo.find(modelId)
            console.log(commentable)
        } else if (modelType == 'Comment') {
            //to do
            console.log('it ran')
            console.log(modelId)
            var commentable = await this.commentRepo.get(modelId)
            console.log(commentable)
        } else {
            throw new Error('unknown model type')
        }
        if (commentable) {
            const comment = await this.commentRepo.create({
                content: content,
                onModel: modelType,
                commentable: modelId,
                userId: userId,
                comments: [],
            })
            commentable.comments.push(comment)
            await commentable.save()
            //notification service
            const user = await this.userRepo.getUserById(userId)
            const notif = await this.notificationRepo.create({
                sender: userId,
                receiver: commentable.userId,
                onModel: modelType,
                interactedOn: commentable.id,
                content: `${user.username} commented on your ${modelType}`,
            })
            if (!notif) {
                throw new Error('unable to create comment notification')
            }
            return comment
        } else {
            throw new Error(`No ${modelId} found with this id`)
        }
    }
    getAll = async (modelId, modelType, start, limit) => {
        if (modelType == 'Buzz') {
            var commentable = await this.buzzRepo.find(modelId)
        } else if (modelType == 'Comment') {
            var commentable = await this.commentRepo.get(modelId)
        } else {
            throw new Error('unknown model type')
        }
        if (commentable) {
            const comments = await this.commentRepo.getAllComments(
                modelId,
                modelType,
                start,
                limit,
            )
            return comments
        } else {
            throw new Error(`No ${modelId} found with this id`)
        }
    }
}

module.exports = CommentService
