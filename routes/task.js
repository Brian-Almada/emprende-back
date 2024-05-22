const express = require('express')
const { getAll, update, create, remove } = require('../controllers/task')
const router = express.Router()

router.get('/', getAll)
router.post("/", create)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router