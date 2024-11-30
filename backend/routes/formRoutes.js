const express = require('express')
const router = express.Router()
const formController = require('../controller/formController')

router.post('/create', formController.createForm)
router.get("/all", formController.getAllForms)
router.get("/each/:id", formController.getFormById)
router.put("/update/:id", formController.updateForm)
router.delete("/delete/:id", formController.deleteForm)

module.exports = router