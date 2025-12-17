const mysql = require("mysql2");
const dbConn = require("../utils/mysql.config");
const Employee = require("../models/employee.model");

// Obtener todos los empleados
exports.getAll = function(callback) {
    const connection = mysql.createConnection(dbConn);
    connection.connect(err => {
        if (err) return callback(err, null);
        const sql = "SELECT * FROM employees";
        connection.query(sql, (err, results) => {
            connection.end();
            callback(err, results);
        });
    });
};

// Obtener un empleado por ID
exports.getById = function(id, callback) {
    const connection = mysql.createConnection(dbConn);
    connection.connect(err => {
        if (err) return callback(err, null);
        const sql = "SELECT * FROM employees WHERE id = ?";
        connection.query(sql, [id], (err, results) => {
            connection.end();
            callback(err, results);
        });
    });
};

// Crear un nuevo empleado
exports.create = function(employeeData, callback) {
    const newEmployee = new Employee(employeeData);
    const connection = mysql.createConnection(dbConn);
    connection.connect(err => {
        if (err) return callback(err, null);
        const sql = "INSERT INTO employees SET ?";
        connection.query(sql, newEmployee, (err, results) => {
            connection.end();
            callback(err, results);
        });
    });
};

// Actualizar un empleado existente
exports.update = function(id, employeeData, callback) {
    const updateEmployee = new Employee(employeeData);
    const connection = mysql.createConnection(dbConn);
    connection.connect(err => {
        if (err) return callback(err, null);
        const sql = "UPDATE employees SET ? WHERE id = ?";
        connection.query(sql, [updateEmployee, id], (err, results) => {
            connection.end();
            callback(err, results);
        });
    });
};

// Eliminar un empleado por ID
exports.remove = function(id, callback) {
    const connection = mysql.createConnection(dbConn);
    connection.connect(err => {
        if (err) return callback(err, null);
        const sql = "DELETE FROM employees WHERE id = ?";
        connection.query(sql, [id], (err, results) => {
            connection.end();
            callback(err, results);
        });
    });
};
