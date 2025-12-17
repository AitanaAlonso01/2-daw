const employeeService = require("../services/employee.service");

// Obtener todos los empleados
exports.findAllEmployees = (req, res) => {
    employeeService.getAll((err, data) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(data);
        }
    });
};

// Obtener un empleado por ID
exports.findEmployeeById = (req, res) => {
    const { id } = req.params;
    employeeService.getById(id, (err, data) => {
        if (err) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(200).json(data);
        }
    });
};

// Crear un nuevo empleado
exports.createEmployee = (req, res) => {
    employeeService.create(req.body, (err, data) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(201).json(data);
        }
    });
};

// Actualizar un empleado existente
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    employeeService.update(id, req.body, (err, data) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(200).json(data);
        }
    });
};

// Eliminar un empleado por ID
exports.deleteEmployeeById = (req, res) => {
    const { id } = req.params;
    employeeService.remove(id, (err, data) => {
        if (err) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(200).json({
                message: "Empleado eliminado correctamente",
                deletedEmployee: data,
            });
        }
    });
};
