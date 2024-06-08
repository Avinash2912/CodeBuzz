const express = require('express')
const router = express.Router()
const {
    BuzzController,
    LikeController,
    CommentController,
    UserController,
} = require('../../controllers/index')
const asyncErrorHandler = require('../../utils/errHandlerCallback')
const { AuthMiddlewares } = require('../../middlewares/index')

router.post(
    '/createbuzz',
    AuthMiddlewares.isAuthenticated,
    asyncErrorHandler(BuzzController.create),
)
router.post(
    '/likes/toggle',
    AuthMiddlewares.isAuthenticated,
    asyncErrorHandler(LikeController.toggleLike),
)
router.post(
    '/comments',
    AuthMiddlewares.isAuthenticated,
    asyncErrorHandler(CommentController.create),
)
router.post(
    '/followtoggle',
    AuthMiddlewares.isAuthenticated,
    asyncErrorHandler(UserController.followToggle),
)
router.post('/signup', asyncErrorHandler(UserController.signup))
router.post('/signin', asyncErrorHandler(UserController.signin))
router.get('/home', AuthMiddlewares.isAuthenticated, (req, res) => {
    return res.status(200).json({ message: 'ok' })
})

router.get(
    '/user/:username',
    AuthMiddlewares.isAuthorized,
    asyncErrorHandler(UserController.getUser),
)
router.get(
    '/buzz/:id',
    AuthMiddlewares.isAuthorized,
    asyncErrorHandler(BuzzController.getBuzz),
)
router.get(
    '/buzzes/:userId',
    AuthMiddlewares.isAuthorized,
    asyncErrorHandler(BuzzController.getUserBuzzes),
)
router.get(
    '/comments/:modelId/:modelType',
    AuthMiddlewares.isAuthenticated,
    asyncErrorHandler(CommentController.getComments),
)

module.exports = router
