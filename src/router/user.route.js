const router = require("express").Router();
const requestService = require("../services/request.service");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/isAdmin.middleware");
const {
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  verifyEmail,
} = require("../controller/user.controller");
const userController = require("../controller/user.controller");

router.get("/", [auth, admin], requestService(getUser));
router.get("/me", auth, requestService(getCurrentUser));
router.get("/userid/:id", [auth, admin], requestService(getUserById));
router.get("/email_verification/:token", requestService(verifyEmail));
router.post("/register", requestService(createUser));

/**
 * @swagger
 *
 * path:
 *   /api/user:
 *      get:
 *          tags:
 *              - "user"
 *          summary: "Get all user"
 *          description: ""
 *          operationId: "getUser"
 *          proceduces:
 *          -   "application/json"
 *          parameters: []
 *          responses:
 *              "200":
 *                  description: "success"
 *              "401":
 *                  description: "Unauthorized"
 *              "400":
 *                  description: "Invalid Token!"
 *              "403":
 *                  description: "Access denied"
 *          security:
 *             - ApiKeyAuth: []
 *   /api/user/me:
 *      get:
 *          tags:
 *              - "user"
 *          summary: "Get current user"
 *          description: "Must logged in first"
 *          operationId: "getCurrentUser"
 *          proceduces:
 *          -   "application/json"
 *          responses:
 *              "200":
 *                  description: "success"
 *              "401":
 *                  description: "Unauthorized"
 *              "400":
 *                  description: "Invalid Token!"
 *              "403":
 *                  description: "Access denied"
 *          security:
 *             - ApiKeyAuth: []
 *   /api/user/register:
 *      post:
 *          tags:
 *              - "user"
 *          summary: "add new user"
 *          description: ""
 *          operationId: "addUser"
 *          consumes:
 *          -   "application/json"
 *          proceduces:
 *          -   "application/json"
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/definitions/User"
 *          responses:
 *               "201":
 *                  description: "created"
 *               "500":
 *                  description: "Invalid input"
 *
 *   /api/user/update_user:
 *      post:
 *          tags:
 *              - "user"
 *          summary: "Update user"
 *          description: "Must logged in "
 *          operationId: "updateUser"
 *          proceduces:
 *          -   "application/json"
 *          requestBody:
 *              required: true
 *              content:
 *                  "application/json":
 *                      schema:
 *                          $ref: "#/definitions/User"
 *          responses:
 *              "200":
 *                  description: "Success"
 *              "404":
 *                  description: "Not found"
 *              "500":
 *                  description: "Error!"
 *   /api/user/deleteuser/{userId}:
 *      delete:
 *          tags:
 *              - "user"
 *          summary: "Delete user"
 *          description: "Must logged in with admin account "
 *          operationId: "deleteUser"
 *          proceduces:
 *          -   "application/json"
 *          parameters:
 *          -   name: "userId"
 *              in: "path"
 *              description: "ID of user to return"
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: "Success"
 *                  schema:
 *                      $ref: "#/definitions/User"
 *              "404":
 *                  description: "Not found"
 *              "500":
 *                  description: "Error!"
 *          security:
 *             - ApiKeyAuth: []
 * definitions:
 *   Profile:
 *       type: "object"
 *       properties:
 *          firstName:
 *              type: "string"
 *          lastName:
 *              type: "string"
 *          phoneNumber:
 *              type: "string"
 *   User:
 *       type: "object"
 *       properties:
 *           email:
 *               type: "string"
 *           password:
 *               type: "string"
 *           profile:
 *               $ref: "#/definitions/Profile"
 *           status:
 *                type: "number"
 *                description: "Account status 0: Active 1: Deactivate"
 *                enum:
 *                  - 0
 *                  - 1
 *       xml:
 *          name: "User"
 *
 */

router.post("/update_user/", auth, requestService(updateUser));

router.delete("/deleteuser/:id", [auth, admin], requestService(deleteUser));

module.exports = router;
