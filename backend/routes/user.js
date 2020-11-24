const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
/**
 * @swagger
 * tags:
 * - name: "users"
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *   schemas:
 *      RegisterUserReq:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - password
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         provider:
 *           type: string
 *      LoginUserReq:
 *       type: object
 *       required:
 *         - password
 *         - email
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *      UserRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            provider:
 *              type: string
 *            token:
 *              type: boolean
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string 
 *            __v:
 *              type: string
 *      ForgetPasswordReq:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *      ForgetPasswordRes:
 *       type: object
 *       required:
 *         - messageId
 *         - message
 *       properties:
 *         messageId:
 *           type: string
 *         message:
 *           type: string
 *      ResetPasswordReq:
 *       type: object
 *       required:
 *         - token
 *         - password
 *       properties:
 *         token:
 *           type: string
 *         password:
 *           type: string
 *      ResetPasswordRes:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *      BadRequest:
 *       type: object
 *       properties:
 *           status:
 *             type: string
 *           message:
 *            type: string
 *       required:
 *         - status
 *         - message
 */

/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     tags:
 *       - "users"
 *     summary: Register a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/LoginUserReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/UserRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.post("/login", UserController.loginUser);
/**
 * @swagger
 *
 * /api/user:
 *   post:
 *     tags:
 *       - "users"
 *     summary: Register a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/UserRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.post("/", UserController.registerUser);

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - "users"
 *     summary: Returns loggedin user
 *     security:
 *     - ApiKeyAuth: []
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Get logged in user by token
 *         schema:
 *           $ref: '#/components/schemas/UserRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.get("/", UserController.getUser);

/**
 * @swagger
 *
 * /api/user/forget-password:
 *   post:
 *     tags:
 *       - "users"
 *     summary: Send mail to reset password for a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/ForgetPasswordReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/ForgetPasswordRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.post("/forget-password", UserController.forgetPassword);


/**
 * @swagger
 *
 * /api/user/reset-password:
 *   post:
 *     tags:
 *       - "users"
 *     summary: Reset user password
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/ResetPasswordRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.post("/reset-password", UserController.resetPassword);

module.exports = router;