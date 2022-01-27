const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema(
    {
        EmployeeID: {
            type: Number,
            required: true,
            unique: true
        },
        EmployeeName: {
            type: String,
            required: true
        },
        EmployeeContact: {
            type: Number,
            required: true
        }

    }
)

module.exports = mongoose.model('employeedetail', employeeSchema)