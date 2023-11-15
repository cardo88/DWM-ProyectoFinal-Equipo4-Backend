const express = requiere('express')
const userController = requiere('./../controllers/userController')
const authController = requiere('./../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUsers)
    .patch(userController.updateUser)
    .delte(userController.deleteUser)

module.exports = router