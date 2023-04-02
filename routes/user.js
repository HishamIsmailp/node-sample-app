const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/auth.js")
const { getAllUsers, createUser, updateUser, deleteUser, getUser } = require("../controllers/user")

router.get("/", verifyToken, getAllUsers);

router.post("/", createUser);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.get("/:id", verifyToken, getUser);

module.exports = router;