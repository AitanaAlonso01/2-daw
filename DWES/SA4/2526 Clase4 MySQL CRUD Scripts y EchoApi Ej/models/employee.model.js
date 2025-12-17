//ORM (Object Relationship Mapper)
let employee = function(empleado) {
    //id (auto incremental 1)
    this.first_name = empleado.first_name,
    this.last_name = empleado.last_name,
    this.email = empleado.email,
    this.phone = empleado.phone,
    this.organization = empleado.organization,
    this.designation = empleado.designation,
    this.salary = empleado.salary,
    this.state = empleado.state,
    this.create_at = new Date() //fecha actual NOW
}

module.exports = employee