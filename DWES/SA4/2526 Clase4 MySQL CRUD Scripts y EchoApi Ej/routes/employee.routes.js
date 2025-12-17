const employeeController = require("../controllers/employee.controller")
const express = require("express")
const router = express.Router()

router.get("/",employeeController.findAllEmployees)
router.get("/:id",employeeController.findEmployeeById)
router.post("/",employeeController.createEmployee)
router.patch("/:id",employeeController.updateEmployee)
router.delete("/:id",employeeController.deleteEmployeeById)

module.exports = router