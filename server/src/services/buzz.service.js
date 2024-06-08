const {
    BuzzRepo,
    HashtagRepo,
    LikeRepo,
    UserRepo,
    CommentRepo,
} = require('../repository/index')
class BuzzService {
    constructor() {
        this.buzzRepo = new BuzzRepo()
        this.hashRepo = new HashtagRepo()
        this.likeRepo = new LikeRepo()
        this.commenRepo = new CommentRepo()
        this.userRepo = new UserRepo()
    }
    create = async (data) => {
        const result = await this.buzzRepo.create(data)
        console.log(result)
        let content = result.content
        let tags = content
            // eslint-disable-next-line no-control-regex
            .match(/(#(?:[^\x00-\x7F]|\w)+)/g)
            ?.map((e) => e.substring(1).toLowerCase())

        if (tags !== undefined || null) {
            let presentTags = await this.hashRepo.findByName(tags)
            let presentTagnames = presentTags.map((e) => e.title)
            let newTags = tags.filter((e) => !presentTagnames.includes(e))
            newTags = newTags.map((e) => {
                return { title: e, buzzs: result._id }
            })
            await this.hashRepo.bulkCreate(newTags)
            presentTags.forEach((e) => {
                e.buzzs.push(result._id)
                e.save()
            })
        }
        return result
    }
    getBuzz = async (id) => {
        const result = await this.buzzRepo.find(id)
        const user = await this.userRepo.getUserById(result.userId)
        const comments = await this.commenRepo.getAllComments(
            result._id,
            'Buzz',
            0,
            5,
        )
        // sample comment
        console.log(comments)
        return {
            id: result._id,
            title: result.title,
            content: result.content,
            userId: result.userId,
            username: user.username,
            name: user.name,
            totalComments: result.comments.length,
            comments: comments,
            createdAt: result.createdAt,
            totalLikes: result.likes.length,
            isLiked: null,
        }
    }
    getBuzzifAuth = async (id, userId) => {
        const result = await this.buzzRepo.findOnebyId(id)
        const user = await this.userRepo.getUserById(result.userId)
        console.log(id)
        const comments = await this.commenRepo.getAllComments(
            result._id,
            'Buzz',
            0,
            5,
        )
        console.log(comments)
        if (!result) {
            throw new Error('No buzz found')
        }
        const like = await this.likeRepo.findByuserAndlikeable({
            onModel: 'Buzz',
            likeable: id,
            userId: userId,
        })

        const res = {
            id: result._id,
            title: result.title,
            content: result.content,
            userId: result.userId,
            username: user.username,
            name: user.name,
            comments: comments,
            createdAt: result.createdAt,
            totalComments: result.comments.length,
            totalLikes: result.likes.length,
            isLiked: like ? result.likes.includes(like.id) : false,
        }
        return res
    }

    getAllBuzz = async (userId, start, limit) => {
        const result = await this.buzzRepo.getAllbyUserId(userId, start, limit)
        const user = await this.userRepo.getUserById(userId)
        console.log(result)
        return result.map((e) => {
            return {
                id: e._id,
                title: e.title,
                content: e.content,
                userId: e.userId,
                username: user.username,
                name: user.name,
                totalComments: e.comments.length,
                totalLikes: e.likes.length,
                createdAt: e.createdAt,
                isLiked: null,
            }
        })
    }
    getAllBuzzifAuth = async (userId, start, limit) => {
        const result = await this.buzzRepo.getAllbyUserId(userId, start, limit)
        const user = await this.userRepo.getUserById(userId)
        const likes = await this.likeRepo.findAllbyUserandLikeable({
            onModel: 'Buzz',
            userId: userId,
        })
        console.log('likes array ' + (likes instanceof Array))
        return result.map((e) => {
            return {
                id: e._id,
                title: e.title,
                content: e.content,
                userId: e.userId,
                username: user.username,
                name: user.name,
                totalComments: e.comments.length,
                totalLikes: e.likes.length,
                createdAt: e.createdAt,
                // returns true as likes.some() returns true if any of the element in the array satisfies the condition
                isLiked: likes.some((like) => e.likes.includes(like.id)),
            }
        })
    }
}

module.exports = BuzzService
